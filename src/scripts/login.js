import { loginUser, registerUser, fetchUserProfile } from '/src/scripts/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegisterLink = document.getElementById('showRegister');
  const showLoginLink = document.getElementById('showLogin');

  const toggleForms = () => {
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
  };

  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const data = await loginUser({ email, password });
      console.log('Respuesta del login:', data);

      const userProfile = await fetchUserProfile();
      console.log('Perfil del usuario después del login:', userProfile);

      if (userProfile) {
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
        console.log('Perfil guardado en sessionStorage, redirigiendo a /home...');
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000); // Retraso de 1 segundo para asegurar que la cookie se establezca
      } else {
        throw new Error('No se pudo obtener el perfil del usuario');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.message);
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;
    const city = document.getElementById('register-city').value;

    try {
      const data = await registerUser({ username, email, password, phone, city });
      if (data.message !== 'Usuario registrado exitosamente') {
        throw new Error(data.message || 'Error al registrarse');
      }
      alert('Registro exitoso. Por favor, inicia sesión.');
      toggleForms();
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert(error.message);
    }
  });
});