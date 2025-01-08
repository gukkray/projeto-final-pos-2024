from django.contrib import admin
from .models import Usuario, Tarefa, Postagem, Comentario, Album, Foto

admin.site.register(Usuario)
admin.site.register(Tarefa)
admin.site.register(Postagem)
admin.site.register(Comentario)
admin.site.register(Album)
admin.site.register(Foto)
