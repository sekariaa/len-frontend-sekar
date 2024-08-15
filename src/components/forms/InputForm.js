import React from "react";

export default function InputForm({ coordinates, setCoordinates, format }) {
  return (
    <>
      <div className="mb-4">
        <label className="font-bold">Latitude</label>
        <input
          type="text"
          placeholder={format === "DD" ? "90.00000" : "90°0'0\"N"}
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
          placeholder={format === "DD" ? "33.23000" : "33°13'48\"E"}
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
