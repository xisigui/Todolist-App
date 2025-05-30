from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Todo

class DeleteTodoView(APIView):
    def delete(self, request, todo_id):
        try:
            todo = Todo.objects.get(id=todo_id)
        except Todo.DoesNotExist:
            return Response(
                {'error': 'Todo not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 