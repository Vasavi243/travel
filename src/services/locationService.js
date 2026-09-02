/**
 * WanderAI Location Service
 * Safely wraps navigator.geolocation with friendly error handling.
 */

export function getCurrentUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(
        new Error("Geolocation is not supported by your browser.")
      );
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let friendlyMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            friendlyMessage = "Location access was denied. Please enable location permissions in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            friendlyMessage = "Location information is currently unavailable. Please check your network connection.";
            break;
          case error.TIMEOUT:
            friendlyMessage = "Location request timed out. Please try again.";
            break;
          default:
            friendlyMessage = "An unexpected error occurred while requesting your location.";
            break;
        }
        reject(new Error(friendlyMessage));
      },
      options
    );
  });
}