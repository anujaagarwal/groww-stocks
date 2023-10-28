import axios from "axios";

// Function to fetch data from the API and cache it
export async function fetchAndCacheApiData(
  apiUrl,
  cacheKey,
  expirationTime = 60
) {
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Cache the data in local storage with an expiration time
    cacheData(cacheKey, data, expirationTime);

    return data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}

// Function to get cached data
export function getCachedData(cacheKey) {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, expiration } = JSON.parse(cachedData);
    if (expiration && Date.now() < expiration) {
      return data;
    }
  }
  return null;
}

// Function to cache data with an expiration time
export function cacheData(cacheKey, data, expirationTime) {
  const expiration =
    expirationTime > 0 ? Date.now() + expirationTime * 1000 : 0;
  localStorage.setItem(cacheKey, JSON.stringify({ data, expiration }));
}
