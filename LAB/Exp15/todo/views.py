from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from .models import Task
from .utils import get_external_data


def task_list(request):
    tasks = Task.objects.all().order_by('-created_at', '-id')
    return render(request, 'todo/task_list.html', {'tasks': tasks})


@require_http_methods(['GET', 'POST'])
def add_task(request):
    title = ''
    error = ''
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        if not title:
            error = 'Please enter a task title.'
        elif len(title) > 200:
            error = 'The title must be 200 characters or fewer.'
        else:
            Task.objects.create(title=title)
            return redirect('task_list')
    return render(request, 'todo/add_task.html', {'title': title, 'error': error},
                  status=400 if error else 200)


@require_POST
def toggle_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.completed = not task.completed
    task.save(update_fields=['completed'])
    return redirect('task_list')


@require_POST
def delete_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.delete()
    return redirect('task_list')


@require_GET
def external_data(request, post_id):
    result = get_external_data(post_id)
    if result['error']:
        return JsonResponse({'error': result['error']}, status=503)
    return JsonResponse(result['data'])
