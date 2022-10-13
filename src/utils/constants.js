export const apiConfig = {
  baseUrl: 'https://api.mesto.bezprobeloff.nomoredomains.icu',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};
