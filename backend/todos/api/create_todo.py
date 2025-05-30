from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Todo

class CreateTodoView(APIView):
    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description', '')
        
        if not title:
            return Response(
                {'error': 'Title is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        todo = Todo.objects.create(
            title=title,
            description=description
        )
        
        return Response({
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'completed': todo.completed,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        }, status=status.HTTP_201_CREATED) 