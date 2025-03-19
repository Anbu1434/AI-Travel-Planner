import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

// Replace with your own Mapbox API key
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYW5idTc3NyIsImEiOiJjbThldDQzeGIwNXRpMmpzNWE1NGl3eXAyIn0.kOTg583FDrZ5xzwbry9qJA';

// Create Mapbox client
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

export const searchMapboxPlaces = async (query) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: query,
        autocomplete: true, // Enable autocomplete
        limit: 5, // Limit results to 5
      })
      .send();

    return response.body.features; // Return place data
  } catch (error) {
    console.error('Mapbox Error:', error);
    return [];
  }
};
