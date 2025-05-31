from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import Todo

class ListTodosView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filter todos by the authenticated user
        todos = Todo.objects.filter(user=request.user)
            
        return Response([{
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'completed': todo.completed,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        } for todo in todos], status=status.HTTP_200_OK)
        
    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description', '')
        
        if not title:
            return Response(
                {'error': 'Title is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        todo = Todo.objects.create(
            user=request.user,  # Associate the todo with the authenticated user
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