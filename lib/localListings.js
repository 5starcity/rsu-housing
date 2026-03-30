const STORAGE_KEY = "rsu_housing_listings";

export function getStoredListings() {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading listings from localStorage:", error);
    return [];
  }
}

export function saveStoredListings(listings) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (error) {
    console.error("Error saving listings to localStorage:", error);
  }
}

export function addStoredListing(listing) {
  const currentListings = getStoredListings();
  const updatedListings = [listing, ...currentListings];
  saveStoredListings(updatedListings);
}