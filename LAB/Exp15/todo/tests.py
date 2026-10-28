from unittest.mock import Mock, patch
import requests
from django.contrib.auth import get_user_model
from django.test import Client, SimpleTestCase, TestCase
from django.urls import reverse
from .models import Task
from .utils import get_external_data


class TodoTests(TestCase):
    def test_empty_page_uses_shared_templates(self):
        response = self.client.get(reverse('task_list'))
        self.assertContains(response, 'No tasks yet.')
        self.assertContains(response, 'Saksham Katiyar')
        self.assertContains(response, reverse('external_data', args=[1]))
        for template in ['todo/base.html', 'todo/header.html', 'todo/footer.html']:
            self.assertTemplateUsed(response, template)

    def test_create_and_read_task(self):
        response = self.client.post(reverse('add_task'), {'title': '  Finish lab  '})
        self.assertRedirects(response, reverse('task_list'))
        task = Task.objects.get()
        self.assertEqual(task.title, 'Finish lab')
        self.assertFalse(task.completed)
        self.assertIsNotNone(task.created_at)
        self.assertContains(self.client.get('/'), 'Finish lab')

    def test_invalid_titles_are_not_saved(self):
        for title in ['', '   ', 'x' * 201]:
            response = self.client.post(reverse('add_task'), {'title': title})
            self.assertEqual(response.status_code, 400)
        self.assertEqual(Task.objects.count(), 0)

    def test_complete_and_incomplete(self):
        task = Task.objects.create(title='Review Django')
        for expected in [True, False]:
            self.client.post(reverse('toggle_task', args=[task.pk]))
            task.refresh_from_db()
            self.assertEqual(task.completed, expected)

    def test_delete(self):
        task = Task.objects.create(title='Remove this task')
        self.assertRedirects(self.client.post(reverse('delete_task', args=[task.pk])), '/')
        self.assertFalse(Task.objects.exists())

    def test_mutations_require_post(self):
        task = Task.objects.create(title='Keep this task')
        for name in ['toggle_task', 'delete_task']:
            self.assertEqual(self.client.get(reverse(name, args=[task.pk])).status_code, 405)
        task.refresh_from_db()
        self.assertFalse(task.completed)

    def test_missing_tasks_return_404(self):
        for name in ['toggle_task', 'delete_task']:
            self.assertEqual(self.client.post(reverse(name, args=[9999])).status_code, 404)

    def test_csrf_is_required_for_every_mutation(self):
        client = Client(enforce_csrf_checks=True)
        task = Task.objects.create(title='CSRF check')
        paths = [reverse('add_task'), reverse('toggle_task', args=[task.pk]),
                 reverse('delete_task', args=[task.pk])]
        for path in paths:
            self.assertEqual(client.post(path, {'title': 'Rejected'}).status_code, 403)
        client.get(reverse('add_task'))
        token = client.cookies['csrftoken'].value
        response = client.post(reverse('add_task'), {'title': 'Valid token',
                                                   'csrfmiddlewaretoken': token})
        self.assertEqual(response.status_code, 302)

    def test_admin_lists_filters_and_searches_tasks(self):
        user = get_user_model().objects.create_superuser('testadmin', 'test@example.com', 'TestPassword123!')
        Task.objects.create(title='Review Django')
        self.client.force_login(user)
        response = self.client.get('/admin/todo/task/?q=Review')
        self.assertContains(response, 'Review Django')
        self.assertContains(response, 'By completed')

    def test_titles_are_escaped(self):
        Task.objects.create(title='<script>alert(1)</script>')
        response = self.client.get('/')
        self.assertContains(response, '&lt;script&gt;alert(1)&lt;/script&gt;')
        self.assertNotContains(response, '<script>alert(1)</script>')


class ExternalDataTests(SimpleTestCase):
    @patch('todo.utils.requests.get')
    def test_service_success(self, mock_get):
        response = Mock()
        response.json.return_value = {'id': 1, 'title': 'Example post'}
        mock_get.return_value = response
        result = get_external_data(1)
        self.assertEqual(result, {'data': {'id': 1, 'title': 'Example post'}, 'error': None})
        mock_get.assert_called_once_with('https://jsonplaceholder.typicode.com/posts/1', timeout=2)
        response.raise_for_status.assert_called_once_with()

    @patch('todo.utils.requests.get', side_effect=requests.Timeout)
    def test_timeout(self, mock_get):
        self.assertEqual(get_external_data(1)['error'], 'External service timed out')

    @patch('todo.utils.requests.get')
    def test_network_and_http_failures(self, mock_get):
        mock_get.side_effect = requests.ConnectionError
        self.assertEqual(get_external_data(1)['error'], 'External service is unavailable')
        mock_get.side_effect = None
        mock_get.return_value.raise_for_status.side_effect = requests.HTTPError
        self.assertEqual(get_external_data(1)['error'], 'External service is unavailable')

    @patch('todo.utils.requests.get')
    def test_invalid_json(self, mock_get):
        for error in [ValueError(), requests.exceptions.JSONDecodeError('Invalid JSON', 'x', 0)]:
            with self.subTest(error=type(error).__name__):
                mock_get.return_value.json.side_effect = error
                self.assertEqual(get_external_data(1)['error'], 'External service returned invalid JSON')

    @patch('todo.utils.requests.get')
    def test_non_object_json(self, mock_get):
        mock_get.return_value.json.return_value = []
        self.assertEqual(get_external_data(1)['error'], 'External service returned an invalid post')

    @patch('todo.utils.requests.get')
    def test_endpoint_success(self, mock_get):
        mock_get.return_value.json.return_value = {'id': 1, 'title': 'Example post'}
        response = self.client.get(reverse('external_data', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['title'], 'Example post')

    @patch('todo.utils.requests.get', side_effect=requests.Timeout)
    def test_endpoint_timeout_is_503(self, mock_get):
        response = self.client.get(reverse('external_data', args=[1]))
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), {'error': 'External service timed out'})

    @patch('todo.utils.requests.get', side_effect=requests.ConnectionError)
    def test_endpoint_network_failure_is_503(self, mock_get):
        self.assertEqual(self.client.get(reverse('external_data', args=[1])).status_code, 503)

    @patch('todo.utils.requests.get')
    def test_non_get_does_not_call_dependency(self, mock_get):
        self.assertEqual(self.client.post(reverse('external_data', args=[1])).status_code, 405)
        mock_get.assert_not_called()

    def test_non_integer_post_id_is_404(self):
        self.assertEqual(self.client.get('/api/external/abc/').status_code, 404)
