import React from "react";
import DMStoDDForm from "./DMStoDDForm";
import DDtoDMSForm from "./DDtoDMSForm";

export default function Form({
  conversionType,
  setConversionType,
  coordinates,
  setCoordinates,
  handleConvert,
  convertedResult,
  toggleMarkerDisplay,
}) {
  const isCoordinatesEmpty =
    !coordinates || !coordinates.latitude || !coordinates.longitude;
  return (
    <div className="p-8 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-lg absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-80 z-50 text-gray-800">
      <select
        value={conversionType}
        onChange={(e) => setConversionType(e.target.value)}
        className="w-full p-2 text-lg rounded border border-gray-300 bg-white shadow-sm mb-4"
      >
        <option value="DMS">DMS to DD</option>
        <option value="DD">DD to DMS</option>
      </select>
      {conversionType === "DMS" ? (
        <DMStoDDForm
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
      ) : (
        <DDtoDMSForm
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
      )}
      <button
        disabled={isCoordinatesEmpty}
        onClick={handleConvert}
        className={`bg-green-600 text-white p-2 rounded w-full mt-4 transition-colors duration-300 ${
          isCoordinatesEmpty
            ? "bg-green-400 cursor-not-allowed"
            : "hover:bg-green-700"
        }`}
      >
        Konversi
      </button>
      {convertedResult && (
        <div className="mt-2">
          {conversionType === "DMS"
            ? "Hasil konversi ke DD adalah"
            : "Hasil konversi ke DMS adalah"}
          <div className="mt-2 text-md font-semibold">
            <p>Latitude: {convertedResult.latitude}</p>
            <p>Longitude: {convertedResult.longitude}</p>
          </div>
        </div>
      )}
      <button
        disabled={isCoordinatesEmpty}
        onClick={toggleMarkerDisplay}
        className={`bg-blue-600 text-white p-2 rounded w-full mt-4 transition-colors duration-300 ${
          isCoordinatesEmpty
            ? "bg-blue-400 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
      >
        Tambahkan ke Maps
      </button>
    </div>
  );
}
