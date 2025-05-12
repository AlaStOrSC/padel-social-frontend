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

  export { generateAvatarUrl, renderPendingRequestCount };