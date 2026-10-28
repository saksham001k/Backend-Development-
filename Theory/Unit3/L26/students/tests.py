from unittest.mock import Mock, patch
import requests
from django.test import SimpleTestCase
from django.urls import reverse
from .utils import get_external_data


class RoutingTests(SimpleTestCase):
    def test_root_and_health(self):
        self.assertEqual(self.client.get('/').json()['status'], 'running')
        self.assertEqual(self.client.get('/api/health/').json(), {'status': 'ok'})

    def test_student_list(self):
        self.assertEqual(self.client.get(reverse('student-list')).json()['students'], [])

    def test_detail_route_passes_integer(self):
        response = self.client.get(reverse('student-detail', args=[42]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['student_id'], 42)

    def test_wrong_prefix_and_non_integer_return_404(self):
        for url in ['/api/student/42/', '/api/students/abc/']:
            self.assertEqual(self.client.get(url).status_code, 404)

    def test_middleware_logs_request_status_and_time(self):
        with self.assertLogs('students.middleware', level='INFO') as logs:
            self.client.get('/api/health/')
        self.assertIn('GET /api/health/', logs.output[0])
        self.assertRegex(logs.output[1], r'Response: 200 in \d+\.\d+ ms')


class ExternalDataTests(SimpleTestCase):
    @patch('students.utils.requests.get')
    def test_service_success_and_timeout_argument(self, mock_get):
        response = Mock()
        response.json.return_value = {'id': 1, 'title': 'Example'}
        mock_get.return_value = response
        result = get_external_data(1)
        self.assertEqual(result, {'data': {'id': 1, 'title': 'Example'}, 'error': None})
        response.raise_for_status.assert_called_once_with()
        mock_get.assert_called_once_with('https://jsonplaceholder.typicode.com/posts/1', timeout=2)

    @patch('students.utils.requests.get', side_effect=requests.Timeout)
    def test_timeout(self, mock_get):
        self.assertEqual(get_external_data(1)['error'], 'External service timed out')

    @patch('students.utils.requests.get', side_effect=requests.ConnectionError)
    def test_network_failure(self, mock_get):
        self.assertEqual(get_external_data(1)['error'], 'External service is unavailable')

    @patch('students.utils.requests.get')
    def test_upstream_http_error(self, mock_get):
        mock_get.return_value.raise_for_status.side_effect = requests.HTTPError
        self.assertEqual(get_external_data(1)['error'], 'External service is unavailable')

    @patch('students.utils.requests.get')
    def test_invalid_json(self, mock_get):
        mock_get.return_value.json.side_effect = ValueError
        self.assertEqual(get_external_data(1)['error'], 'External service returned invalid JSON')

    @patch('students.utils.requests.get')
    def test_requests_json_decode_error(self, mock_get):
        mock_get.return_value.json.side_effect = requests.exceptions.JSONDecodeError('Invalid JSON', 'x', 0)
        self.assertEqual(get_external_data(1)['error'], 'External service returned invalid JSON')

    @patch('students.utils.requests.get')
    def test_unexpected_json_shape(self, mock_get):
        mock_get.return_value.json.return_value = []
        self.assertEqual(get_external_data(1)['error'], 'External service returned an invalid post')

    @patch('students.utils.requests.get')
    def test_external_route_success(self, mock_get):
        mock_get.return_value.json.return_value = {'id': 1, 'title': 'Example'}
        response = self.client.get(reverse('external-data', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['title'], 'Example')

    @patch('students.utils.requests.get', side_effect=requests.Timeout)
    def test_external_route_timeout_returns_503(self, mock_get):
        response = self.client.get(reverse('external-data', args=[1]))
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json()['error'], 'External service timed out')
