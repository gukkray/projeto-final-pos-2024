from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, TarefaViewSet, PostagemViewSet,
    ComentarioViewSet, AlbumViewSet, FotoViewSet
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tarefas', TarefaViewSet)
router.register(r'postagens', PostagemViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'albuns', AlbumViewSet)
router.register(r'fotos', FotoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
