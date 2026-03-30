const FAVORITES_KEY = "rsu_housing_favorites";

export function getFavorites() {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorites:", error);
    return [];
  }
}

export function saveFavorites(favorites) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}

export function toggleFavorite(listingId) {
  const favorites = getFavorites();

  if (favorites.includes(listingId)) {
    const updated = favorites.filter((id) => id !== listingId);
    saveFavorites(updated);
    return updated;
  }

  const updated = [...favorites, listingId];
  saveFavorites(updated);
  return updated;
}