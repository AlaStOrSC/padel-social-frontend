import { Navbar } from '/src/scripts/modules/navbar.js';
import { logout, fetchUsers, API_BASE_URL } from '/src/scripts/api.js';
import { checkAuth } from '/src/scripts/utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Cargando admin.js...');

  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo a /login...');
    return;
  }

  const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
  if (!userProfile || userProfile.role !== 'admin') {
    console.log('Usuario no es administrador, redirigiendo a /home...');
    window.location.href = '/home';
    return;
  }

  const adminLink = document.getElementById('admin-link');
  if (adminLink && userProfile.role === 'admin') {
    adminLink.style.display = 'block';
  } else if (adminLink) {
    adminLink.style.display = 'none';
  }

  Navbar();

  const usersTableBody = document.getElementById('users-table-body');
  if (!usersTableBody) {
    console.error('Elemento con ID "users-table-body" no encontrado en el DOM');
    return;
  }

  const renderUsers = (users) => {
    usersTableBody.innerHTML = '';
    users.forEach(user => {
      const row = document.createElement('tr');
      row.dataset.userId = user._id;
      row.innerHTML = `
        <td class="username">${user.username}</td>
        <td class="email">${user.email}</td>
        <td class="role">${user.role}</td>
        <td class="phone">${user.phone || 'No especificado'}</td>
        <td class="city">${user.city || 'No especificado'}</td>
        <td>
          <div class="action-buttons">
            <button class="action-button edit">Editar</button>
            <button class="action-button delete">Eliminar</button>
          </div>
        </td>
      `;

      row.querySelector('.edit').addEventListener('click', () => {
        const usernameCell = row.querySelector('.username');
        const emailCell = row.querySelector('.email');
        const roleCell = row.querySelector('.role');
        const phoneCell = row.querySelector('.phone');
        const cityCell = row.querySelector('.city');

        usernameCell.innerHTML = `<input type="text" value="${user.username}" />`;
        emailCell.innerHTML = `<input type="email" value="${user.email}" />`;
        roleCell.innerHTML = `<select><option value="user" ${user.role === 'user' ? 'selected' : ''}>user</option><option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option></select>`;
        phoneCell.innerHTML = `<input type="text" value="${user.phone || ''}" />`;
        cityCell.innerHTML = `<input type="text" value="${user.city || ''}" />`;

        const actionButtons = row.querySelector('.action-buttons');
        actionButtons.innerHTML = `
          <button class="action-button save">Guardar</button>
          <button class="action-button cancel">Cancelar</button>
        `;

        actionButtons.querySelector('.save').addEventListener('click', async () => {
          const updatedUser = {
            username: usernameCell.querySelector('input').value,
            email: emailCell.querySelector('input').value,
            role: roleCell.querySelector('select').value,
            phone: phoneCell.querySelector('input').value || null,
            city: cityCell.querySelector('input').value || null,
          };

          try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al actualizar el usuario');
            }

            alert('Usuario actualizado exitosamente');
            loadUsers();
          } catch (error) {
            alert('Error al actualizar el usuario: ' + error.message);
          }
        });

        actionButtons.querySelector('.cancel').addEventListener('click', () => {
          loadUsers();
        });
      });

      row.querySelector('.delete').addEventListener('click', async () => {
        if (confirm(`¿Estás seguro de que quieres eliminar al usuario ${user.username}?`)) {
          try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${user._id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al eliminar el usuario');
            }

            alert('Usuario eliminado exitosamente');
            loadUsers();
          } catch (error) {
            alert('Error al eliminar el usuario: ' + error.message);
          }
        }
      });

      usersTableBody.appendChild(row);
    });
  };

  const loadUsers = async () => {
    try {
      const users = await fetchUsers();
      console.log('Usuarios obtenidos:', users);
      renderUsers(users);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
      usersTableBody.innerHTML = '<tr><td colspan="6">Error al cargar los usuarios.</td></tr>';
    }
  };

  loadUsers();

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
});