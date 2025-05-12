import { getPendingRequestsCount } from '/src/scripts/api.js';



const generateAvatarUrl = (username) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=05374d&color=ffff&rounded=true`;
  };

const renderPendingRequestCount = async (welcomeText, userName) => {
  try {
    const { pendingCount } = await getPendingRequestsCount();
    console.log('Solicitudes pendientes:', pendingCount);

    const pendingMessage = document.createElement('p');
    pendingMessage.id = 'pending-message';
    pendingMessage.className = 'pending-message';
    pendingMessage.style.marginTop = '10px';

    const config = getMessageConfig(pendingCount);
    pendingMessage.textContent = config.text;
    pendingMessage.style.color = config.color;

    welcomeText.parentElement.appendChild(pendingMessage);
  } catch (error) {
    console.error('Error al obtener el conteo de solicitudes pendientes:', error);
    renderErrorMessage(welcomeText.parentElement);
  }
};

const getMessageConfig = (count) => {
  if (count === 0) {
    return {
      text: 'No tienes nuevas solicitudes de amistad',
      color: '#4657f3',
    };
  }
  return {
    text: `Tienes ${count} solicitud${count === 1 ? '' : 'es'} de amistad nueva${count === 1 ? '' : 's'}`,
    color: '#4657f3',
  };
};

const renderErrorMessage = (parentElement) => {
  const errorMessage = document.createElement('p');
  errorMessage.id = 'pending-message';
  errorMessage.className = 'pending-message';
  errorMessage.textContent = 'Error al cargar las solicitudes de amistad';
  errorMessage.style.color = 'orange';
  errorMessage.style.marginTop = '10px';
  parentElement.appendChild(errorMessage);
};

const checkAuth = async () => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (isAuthenticated === 'true') {
    console.log('Usuario autenticado según sessionStorage, omitiendo verificación con el backend');
    return true;
  }

  try {
    const userProfile = await fetchUserProfile();
    console.log('Verificación de autenticación con el backend:', userProfile);

    if (!userProfile) {
      console.log('No se pudo verificar la autenticación, redirigiendo a /login...');
      window.location.href = '/login';
      return false;
    }

    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile)); 
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