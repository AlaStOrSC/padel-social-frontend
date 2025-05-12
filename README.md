# Padel Social Network

https://padel-social-frontend.onrender.com/

Padel Social Network (Nombre provisional PSC) es una aplicacion web diseñada para conectar a jugadores de padel de todo el mundo permitiéndoles planificar partidos, hacer amistades, competir en un ranking y mantenerse al día con las últimas noticias del mundo del pádel.

  #################### #################### IMPORTANTE PARA DENIS  #################### ####################

Si accedes como administrador con el usuario, denis@gmail.com//admin1234, tendras acceso al panel de administracion para borrar o editar usuarios, cambiarles su rol a admin si es necesario.

# TECNOLOGIAS EMPLEADAS
Las tecnologias empleadas para el frontend han sido: CSS, HTML y JAVASCRIPT.

## 🎾 Funcionamiento

### Características principales
- **Autenticación y registro**: Los usuarios pueden registrarse e iniciar sesión para acceder a las funcionalidades de la aplicación.
- **Gestión de amistades**: Los usuarios pueden enviar, aceptar y rechazar solicitudes de amistad, así como eliminar amigos.
- **Planificador de partidos**: Permite a los usuarios crear, actualizar y eliminar partidos de pádel.
- **Ranking**: Muestra un ranking de usuarios basado en su puntuación, con estadísticas personales.
- **Noticias de pádel**: Integra una API de noticias para mantener a los usuarios informados.
- **API del tiempo**: He utilizado una API para obtener el clima segun la hora y la ciudad a la que crees el partido para poder saber si va a llover o no, dato muy importante si quieres jugar al padel en exterior.
- **API de cohereE**: He utilizado esta IA para poder mandarle consejos a los usuarios dependiendo de lo que pongan en los comentarios del partido, para asi poder mejorar su juego.
- **Panel de aAdministración**: Los administradores pueden gestionar usuarios (editar y eliminar) desde un panel exclusivo.
- **Interfaz intuitiva**: Diseño responsive y atractivo, con una navegación clara.
- **Multer**: He utilizado multer para la subida de archivos.
- **Nodemailer**: He utilizado nodemailer para el email de bienvenida personalizado.


## 📖 Tutorial.

Puedes crear una cuenta, que se registrara de forma predeterminada como usuario, podras crear partidos en la zona de "gestor" donde tendras que poner usuarios existentes como miembros del partido, para poder probarla,
permito crear partidos con una fecha pasada y que asi se desplieguen los campos de resultados, comentarios y estilo del rival y puedas guardar el resultado del partido, no se permite la edicion de un partido para evitar
que algun usuario pueda cambiar esto e influya en las posiciones del ranking con un resultado que no haya sucedido, mas adelante añadire funcionamiento para que si quieres cambiar el resultado de un partido, puedas reportarlo
a un administrador y que el pueda editarlo si el contexto del partido asi lo requiere.
Puedes acceder a tu perfil para subir una foto de perfil, por defecto he utilizado una URL externa que te genera un avatar con las iniciales de tu nombre, para darle un toque mas personalizado a la interfaz por defecto.
En el ranking podras comprobar tu posicion y la de otros usuarios, dando la capacidad de filtrar por ciudad y nivel, para que agregues o chatees con los usuarios que creas que coinciden con tu nivel, para entablar conversaciones
o planificar partidos con ellos.

