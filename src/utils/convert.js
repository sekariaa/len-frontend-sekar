/**
 * Mengonversi koordinat dalam format derajat menit detik (DMS) ke format derajat desimal (DD).
 * @param {Object} coordinates - Objek yang berisi koordinat latitude dan longitude dalam format DMS.
 * @param {string} coordinates.latitude - Koordinat latitude dalam format DMS, misalnya "12°34'56.78"N".
 * @param {string} coordinates.longitude - Koordinat longitude dalam format DMS, misalnya "98°76'54.32"E".
 * @returns {Object} Objek yang berisi koordinat latitude dan longitude dalam format derajat desimal (DD).
 * @returns {string} returns.latitude - Koordinat latitude dalam format derajat desimal (DD) dengan 5 angka desimal.
 * @returns {string} returns.longitude - Koordinat longitude dalam format derajat desimal (DD) dengan 5 angka desimal.
 */
function convertDMStoDD({ latitude, longitude }) {
  const convert = (coord) => {
    const match = coord.match(/(\d+)°(\d+)'([\d.]+)"(\w)/);

    // Mengekstrak derajat, menit, detik, dan arah dari hasil pencocokan regex
    const degrees = parseFloat(match[1]);
    console.log("degrees=", degrees);
    const minutes = parseFloat(match[2]);
    console.log("minutes=", minutes);
    const seconds = parseFloat(match[3]);
    console.log("seconds=", seconds);
    const direction = match[4];
    console.log("direction=", direction);
    // Menghitung derajat desimal
    let decimalDegrees = degrees + minutes / 60 + seconds / 3600;
    console.log("decimal degrees=", decimalDegrees);
    // Menyesuaikan arah jika perlu (S atau W)
    if (direction === "S" || direction === "W") {
      decimalDegrees *= -1;
    }
    return decimalDegrees;
  };

  return {
    latitude: convert(latitude).toFixed(5),
    longitude: convert(longitude).toFixed(5),
  };
}

/**
 * Mengonversi koordinat dalam format derajat desimal (DD) ke format derajat menit detik (DMS).
 * @param {Object} coordinates - Objek yang berisi koordinat latitude dan longitude dalam format derajat desimal (DD).
 * @param {number} coordinates.latitude - Koordinat latitude dalam format derajat desimal (DD).
 * @param {number} coordinates.longitude - Koordinat longitude dalam format derajat desimal (DD).
 * @returns {Object} Objek yang berisi koordinat latitude dan longitude dalam format derajat menit detik (DMS).
 * @returns {string} returns.latitude - Koordinat latitude dalam format derajat menit detik (DMS).
 * @returns {string} returns.longitude - Koordinat longitude dalam format derajat menit detik (DMS).
 */
function convertDDtoDMS({ longitude, latitude }) {
  const convert = (coord) => {
    const degrees = Math.floor(coord);
    console.log("degrees=", degrees);
    const minutes = Math.floor((coord - degrees) * 60);
    console.log("minutes=", minutes);
    const seconds = ((coord - degrees - minutes / 60) * 3600).toFixed(2);
    console.log("seconds=", seconds);
    return { degrees, minutes, seconds };
  };

  const lat = convert(latitude);
  const lon = convert(longitude);

  // Menentukan arah koordinat
  const latDirection = latitude >= 0 ? "N" : "S";
  const lonDirection = longitude >= 0 ? "E" : "W";

  return {
    latitude: `${lat.degrees}°${lat.minutes}'${lat.seconds}"${latDirection}`,
    longitude: `${lon.degrees}°${lon.minutes}'${lon.seconds}"${lonDirection}`,
  };
}

module.exports = {
  convertDMStoDD,
  convertDDtoDMS,
};
