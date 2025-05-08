export const API_BASE_URL = 'https://padel-social-network-backend.onrender.com/api';

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario');
    }
    return data;
  } catch (error) {
    throw new Error('Error al registrar usuario: ' + error.message);
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error.message);
  }
}

export async function createMatch(matchData) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al crear partido');
    }
    return data;
  } catch (error) {
    throw new Error('Error al crear partido: ' + error.message);
  }
}

export async function getMatches() {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al listar partidos');
    }
    return data;
  } catch (error) {
    throw new Error('Error al listar partidos: ' + error.message);
  }
}

export async function updateMatch(matchId, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar partido');
    }
    return data;
  } catch (error) {
    throw new Error('Error al actualizar partido: ' + error.message);
  }
}

export async function saveMatch(matchId, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/savematches/${matchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar partido');
    }
    return data;
  } catch (error) {
    throw new Error('Error al actualizar partido: ' + error.message);
  }
}

export async function deleteMatch(matchId) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar partido');
    }
    return data;
  } catch (error) {
    throw new Error('Error al eliminar partido: ' + error.message);
  }
}

// export const updateProfilePicture = async (formData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/files/upload-profile-picture`, {
//       method: 'POST',
//       body: formData,
//       credentials: 'include',
//     });

//     const clonedResponse = response.clone();

//     if (!response.ok) {
//       let errorMessage = 'Error desconocido';
//       try {
//         const errorData = await response.json();
//         errorMessage = errorData.error || errorData.message || 'Error al subir la foto de perfil';
//       } catch (err) {
//         const errorText = await clonedResponse.text();
//         errorMessage = `Error al subir la foto de perfil: ${errorText.substring(0, 100)}...`;
//       }
//       throw new Error(errorMessage);
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export const fetchUserProfile = async (retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          await logout();
          window.location.href = 'login.html';
          return null;
        }
        throw new Error(`Error al obtener el perfil del usuario: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      return null;
    }
  }
};

export async function sendFriendRequest(recipientId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends/request/${recipientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar solicitud de amistad');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function acceptFriendRequest(requesterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends/accept/${requesterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al aceptar solicitud de amistad');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function rejectFriendRequest(requesterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends/reject/${requesterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al rechazar solicitud de amistad');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeFriend(friendId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends/${friendId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al eliminar amigo');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getFriends() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener amigos');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPendingRequests() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/friends/requests`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener solicitudes pendientes');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al cerrar sesión');
    }
    return data;
  } catch (error) {
    throw new Error('Error al cerrar sesión: ' + error.message);
  }
}

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        window.location.href = '/login';
        return [];
      }
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

export async function fetchPadelNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo las noticias:', error);
    throw error;
  }
};

export async function createMatch(matchData) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear partido:', error);
    throw new Error('Error al crear partido: ' + error.message);
  }
};

export const updateProfilePicture = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/upload-profile-picture`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await logout();
        window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al subir la foto de perfil:', error);
    throw new Error(error.message);
  }
};