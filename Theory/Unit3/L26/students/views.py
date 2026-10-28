from django.http import JsonResponse
from .utils import get_external_data


def index(request):
    return JsonResponse({
        'message': 'Welcome to the Student Management API',
        'version': '1.0',
        'status': 'running',
    })


def health_check(request):
    return JsonResponse({'status': 'ok'})


def student_list(request):
    return JsonResponse({'students': [], 'message': 'Student list endpoint'})


def student_detail(request, student_id):
    return JsonResponse({'student_id': student_id, 'message': 'Student detail endpoint'})


def external_data_view(request, post_id):
    result = get_external_data(post_id)
    if result['error']:
        return JsonResponse({'error': result['error']}, status=503)
    return JsonResponse(result['data'])
