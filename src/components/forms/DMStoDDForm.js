import React from "react";

export default function DMStoDDFOrm({ coordinates, setCoordinates }) {
  return (
    <>
      <div className="mb-4">
        <label className="font-bold">Latitude</label>
        <input
          type="text"
          placeholder="90°0'0&quot;N"
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
          placeholder="33°13'48&quot;E"
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
