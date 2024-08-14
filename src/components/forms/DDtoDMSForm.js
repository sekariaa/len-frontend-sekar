import React from "react";

export default function DDtoDMSForm({ coordinates, setCoordinates }) {
  return (
    <>
      <div className="mb-4">
        <label className="font-bold">Latitude</label>
        <input
          type="text"
          placeholder="90.000000"
          value={coordinates.latitude}
          className="p-2 w-full border border-gray-300 rounded"
          onChange={(e) =>
            setCoordinates({ ...coordinates, latitude: e.target.value })
          }
        />
      </div>
      <div>
        <label className="font-bold">Longitude</label>
        <input
          type="text"
          placeholder="33.230000"
          value={coordinates.longitude}
          className="p-2 w-full border border-gray-300 rounded"
          onChange={(e) =>
            setCoordinates({ ...coordinates, longitude: e.target.value })
          }
        />
      </div>
    </>
  );
}
