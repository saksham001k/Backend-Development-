from django.urls import path
from . import views

urlpatterns = [
    path('', views.student_list, name='student-list'),
    path('<int:student_id>/', views.student_detail, name='student-detail'),
    path('external/<int:post_id>/', views.external_data_view, name='external-data'),
]
