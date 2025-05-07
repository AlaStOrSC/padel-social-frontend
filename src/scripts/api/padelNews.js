import { getToken } from '/src/scripts/api.js';

const isProduction = window.location.hostname !== 'localhost';
const API_BASE_URL = isProduction
  ? 'https://padel-social-network-backend.onrender.com/api'
  : 'http://localhost:3000/api';

export async function fetchPadelNews() {
  const token = getToken();
  const url = `${API_BASE_URL}/news`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo las noticias:', error);
    throw error;
  }
}