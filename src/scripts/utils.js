import { getPendingRequestsCount } from '/src/scripts/api.js';



const generateAvatarUrl = (username) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=05374d&color=ffff&rounded=true`;
  };

const renderPendingRequestCount = async (welcomeText, userName) => { 

  try {
    const { pendingCount } = await getPendingRequestsCount();
    console.log('Solicitudes pendientes:', pendingCount);

    if (pendingCount === 1) {
      const pendingMessage = document.createElement('p');
      pendingMessage.id = 'pending-message';
      pendingMessage.className = 'pending-message';
      pendingMessage.textContent = `Tienes ${pendingCount} solicitud de amistad nueva`;
      pendingMessage.style.color = 'red';
      pendingMessage.style.marginTop = '10px';

      const welcomeMessageDiv = welcomeText.parentElement;
      welcomeMessageDiv.appendChild(pendingMessage);
    } else if (pendingCount > 1) {
      const pendingMessage = document.createElement('p');
      pendingMessage.id = 'pending-message';
      pendingMessage.className = 'pending-message';
      pendingMessage.textContent = `Tienes ${pendingCount} solicitudes de amistad nuevas`;
      pendingMessage.style.color = 'red';
      pendingMessage.style.marginTop = '10px';

      const welcomeMessageDiv = welcomeText.parentElement;
      welcomeMessageDiv.appendChild(pendingMessage);
    } else if (pendingCount === 0) {
      const pendingMessage = document.createElement('p');
      pendingMessage.id = 'pending-message';
      pendingMessage.className = 'pending-message';
      pendingMessage.textContent = `No tienes nuevas solicitudes de amistad`;
      pendingMessage.style.color = 'blue';
      pendingMessage.style.marginTop = '10px';

      const welcomeMessageDiv = welcomeText.parentElement;
      welcomeMessageDiv.appendChild(pendingMessage);
    }

  } catch (error) {
    console.error('Error al obtener el conteo de solicitudes pendientes:', error);
  }

}

const checkAuth = async () => {
  // Verificar si el usuario ya está autenticado en sessionStorage
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (isAuthenticated === 'true') {
    console.log('Usuario autenticado según sessionStorage, omitiendo verificación con el backend');
    return true;
  }

  // Si no está en sessionStorage, verificar con el backend
  try {
    const userProfile = await fetchUserProfile();
    console.log('Verificación de autenticación con el backend:', userProfile);

    if (!userProfile) {
      console.log('No se pudo verificar la autenticación, redirigiendo a /login...');
      window.location.href = '/login';
      return false;
    }

    // Guardar el estado de autenticación en sessionStorage
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile)); // Actualizar el perfil
    console.log('Autenticación verificada, estado guardado en sessionStorage');
    return true;
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userProfile');
    window.location.href = '/login';
    return false;
  }
};

  export { generateAvatarUrl, renderPendingRequestCount, checkAuth };