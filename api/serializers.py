from rest_framework import serializers
from .models import Usuario, Tarefa, Postagem, Comentario, Album, Foto

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa
        fields = '__all__'

class PostagemSerializer(serializers.ModelSerializer):
    class Meta:
        usuario_nome = serializers.CharField(source='usuario.nome', read_only=True)
        model = Postagem
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['id', 'postagem', 'nome', 'email', 'conteudo']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = '__all__'
