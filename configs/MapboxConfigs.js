import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

// Replace with your Mapbox API key
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYW5idTc3NyIsImEiOiJjbThldDQzeGIwNXRpMmpzNWE1NGl3eXAyIn0.kOTg583FDrZ5xzwbry9qJA';

// Create Mapbox client
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

export const searchMapboxPlaces = async (query) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: query,
        autocomplete: true,
        limit: 10,
        types: ['place', 'address', 'poi'],
        language: ['en'],
        proximity: [78.9629, 20.5937], // India proximity (optional)
      })
      .send();

    // Map results to return required fields
    const places = response.body.features.map((feature) => ({
      id: feature.id,
      name: feature.place_name,
      description: feature.text || feature.place_name,
      geometry: {
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
      },
      photoReference: getPhotoReference(feature),
      url: getGoogleMapsUrl(feature),
    }));

    return places;
  } catch (error) {
    console.error('Mapbox Error:', error);
    return [];
  }
};

// Generate photo reference using Mapbox Static Images API
const getPhotoReference = (feature) => {
  const { geometry } = feature;
  const lat = geometry.coordinates[1];
  const lon = geometry.coordinates[0];
  const mapboxApiKey = MAPBOX_ACCESS_TOKEN;

  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${lon},${lat})/${lon},${lat},14/600x400?access_token=${mapboxApiKey}`;
};

// Generate Google Maps URL for the place
const getGoogleMapsUrl = (feature) => {
  const { geometry, place_name } = feature;
  const lat = geometry.coordinates[1];
  const lon = geometry.coordinates[0];
  const encodedName = encodeURIComponent(place_name);

  return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${feature.id}`;
};
