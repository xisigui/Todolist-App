from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import Todo

class UpdateTodoView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_todo(self, todo_id):
        try:
            # Only get todos belonging to the authenticated user
            return Todo.objects.get(id=todo_id, user=self.request.user)
        except Todo.DoesNotExist:
            return Response({"No Content Found!"}, status=status.HTTP_204_NO_CONTENT)

    def put(self, request, todo_id):
        todo = self.get_todo(todo_id)
        if not todo:
            return Response(
                {'error': 'Task ID not found!'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        title = request.data.get('title')
        description = request.data.get('description')
        completed = request.data.get('completed')

        if title is not None:
            todo.title = title
        if description is not None:
            todo.description = description
        if completed is not None:
            todo.completed = completed

        todo.save()

        return Response({
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'completed': todo.completed,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        }, status=status.HTTP_200_OK)

    def delete(self, request, todo_id):
        todo = self.get_todo(todo_id)
        if not todo:
            return Response(
                {'error': 'Task ID not found!'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 