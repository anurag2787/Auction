const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const getItems = async () => {
  const response = await fetch(`${API_BASE}/items`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    serverTime: data.serverTime,
    items: data.items,
  };
};
