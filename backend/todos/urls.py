from django.urls import path
from .api.list_todos import ListTodosView
from .api.update_todo import UpdateTodoView
from .api.auth import RegisterView, LoginView, LogoutView

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    
    # Todo endpoints
    path('todos/', ListTodosView.as_view(), name='todos'),
    path('todos/<int:todo_id>/', UpdateTodoView.as_view(), name='todo-detail'),
] 