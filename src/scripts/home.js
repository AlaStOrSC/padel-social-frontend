import { fetchPadelNews } from '/src/scripts/api/padelNews.js';
import { Navbar } from '/src/scripts/modules/navbar.js';
import { logout, fetchUserProfile } from '/src/scripts/api.js';
import { renderPendingRequestCount } from '/src/scripts/utils.js';

// Función para esperar a que un elemento esté disponible en el DOM
const waitForElement = (id, maxRetries = 10, delay = 100) => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const interval = setInterval(() => {
      const element = document.getElementById(id);
      if (element) {
        clearInterval(interval);
        resolve(element);
      } else if (retries >= maxRetries) {
        clearInterval(interval);
        reject(new Error(`Elemento con ID "${id}" no encontrado después de ${maxRetries} intentos`));
      }
      retries++;
    }, delay);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  Navbar();

  let welcomeText;
  try {
    welcomeText = await waitForElement('welcome-text');
    console.log('Elemento welcome-text encontrado:', welcomeText);
  } catch (error) {
    console.error(error.message);
    return;
  }

  let userName = 'Usuario'; // Valor por defecto
  let userProfile = null;

  // Verificar si el perfil está en sessionStorage
  const storedProfile = sessionStorage.getItem('userProfile');
  if (storedProfile) {
    try {
      userProfile = JSON.parse(storedProfile);
      console.log('Perfil obtenido de sessionStorage:', userProfile);
      if (userProfile && userProfile.username) {
        userName = userProfile.username;
      }
    } catch (error) {
      console.error('Error al parsear userProfile de sessionStorage:', error);
    }
  }

  // Si no se encontró el perfil en sessionStorage o no tiene username, intentar obtenerlo del backend
  if (!userName || userName === 'Usuario') {
    try {
      userProfile = await fetchUserProfile();
      console.log('Perfil del usuario recibido del backend:', userProfile);
      if (userProfile && userProfile.username) {
        userName = userProfile.username;
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile)); // Actualizar sessionStorage
      } else {
        console.warn('No se pudo obtener el username del perfil:', userProfile);
      }
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      // Continuar con el valor por defecto
    }
  }

  welcomeText.textContent = `¡Bienvenid@, ${userName}!`;

  // Renderizar el mensaje de solicitudes pendientes
  try {
    await renderPendingRequestCount(welcomeText, userName);
  } catch (error) {
    console.error('Error al renderizar el conteo de solicitudes pendientes:', error);
  }

  const logoutButton = document.createElement('button');
  logoutButton.id = 'logoutButton';
  logoutButton.className = 'logout-button';
  logoutButton.textContent = 'Cerrar Sesión';
  logoutButton.addEventListener('click', () => {
    logout();
    window.location.href = '/login';
  });

  const authActions = document.createElement('div');
  authActions.className = 'auth-actions';
  authActions.appendChild(logoutButton);

  const header = document.querySelector('.header');
  if (header) {
    header.insertAdjacentElement('afterend', authActions);
  }

  function createNewsLink(url, text) {
    const link = document.createElement('a');
    link.classList.add('news__item-link');
    link.href = url || '#';
    link.textContent = text || 'Leer más...';
    link.target = '_blank';
    return link;
  }

  const fillNewsDivs = async () => {
    const newsItems = document.querySelectorAll('.news__item');
    if (!newsItems.length) {
      console.error('No hay news');
      return;
    }

    try {
      const articles = await fetchPadelNews();
      articles.forEach((article, index) => {
        if (index < newsItems.length) {
          const titleElement = newsItems[index].querySelector('.news__item-title');
          const descriptionElement = newsItems[index].querySelector('.news__item-description');
          let imageElement = newsItems[index].querySelector('.news__item-image');

          titleElement.textContent = article.title || 'Sin título';
          descriptionElement.textContent = article.description || 'Sin descripción disponible';

          if (article.urlToImage) {
            if (!imageElement) {
              imageElement = document.createElement('img');
              imageElement.classList.add('news__item-image');
              newsItems[index].prepend(imageElement);
            }
            imageElement.src = article.urlToImage;
            imageElement.alt = article.title || 'Imagen de la noticia';
          } else if (imageElement) {
            imageElement.remove(); 
          }

          const existingLink = newsItems[index].querySelector('.news__item-link');
          if (existingLink) existingLink.remove();
          newsItems[index].appendChild(createNewsLink(article.url, 'Leer más...'));
        }
      });
    } catch (error) {
      newsItems.forEach(item => {
        item.querySelector('.news__item-title').textContent = 'Error';
        item.querySelector('.news__item-description').textContent = 'No se pudieron cargar las noticias.';
        const existingLink = item.querySelector('.news__item-link');
        if (existingLink) existingLink.remove();
        const imageElement = item.querySelector('.news__item-image');
        if (imageElement) imageElement.remove();
        item.appendChild(createNewsLink('#', 'Leer más...'));
      });
    }
  };

  fillNewsDivs();
});