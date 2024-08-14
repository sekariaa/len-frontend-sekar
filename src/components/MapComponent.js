"use client";
import React, { useState, useEffect, useCallback } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Form from "./forms/Form";
import { toLonLat } from "ol/proj";
import { convertDMStoDD, convertDDtoDMS } from "../utils/convert";

const MapComponent = () => {
  /**
   * Map: State untuk menyimpan instansi peta
   * showForm: State untuk mengontrol tampilan formulir konversi
   * coordinates: State untuk menyimpan koordinat yang dipilih
   * conversionType: State untuk menentukan jenis konversi koordinat
   * convertedResult: State untuk menyimpan hasil konversi
   */
  const [map, setMap] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [coordinates, setCoordinates] = useState({
    longitude: "",
    latitude: "",
  });
  const [conversionType, setConversionType] = useState("DMS");
  const [convertedResult, setConvertedResult] = useState("");

  /**
   * Menginisialisasi peta ketika komponen pertama kali dimuat
   */
  useEffect(() => {
    const mapElement = document.getElementById("map");

    if (mapElement && mapElement.children.length > 0) {
      return;
    }

    initializeMap();
  });

  /**
   * Menghapus hasil konversi saat jenis konversi berubah
   */
  useEffect(() => {
    setConvertedResult("");
  }, [conversionType]);

  /**
   * Menginisialisasi peta OpenLayers dan menyiapkan event listener
   * Membuat instansi peta dan menambahkan event listener untuk klik
   */
  const initializeMap = () => {
    if (!map) {
      const mapInstance = new Map({
        target: "map",
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
          maxZoom: 7,
        }),
      });
      // Menambahkan event listener klik untuk menangani klik pada peta
      mapInstance.on("click", (event) => {
        setConversionType("DD");
        const coordinate = toLonLat(event.coordinate);
        handleCoordinateClick(coordinate);
      });
      setMap(mapInstance);
    }
  };

  /**
   * Menangani klik pada koordinat peta untuk menyetel koordinat dan menampilkan formulir.
   */
  const handleCoordinateClick = useCallback((coordinate) => {
    setCoordinates({
      longitude: coordinate[0].toFixed(5),
      latitude: coordinate[1].toFixed(5),
    });
    openFormPopup();
  }, []);

  /**
   * Membuka atau menutup formulir konversi
   */
  const openFormPopup = () => setShowForm((prev) => !prev);

  /**
   * Mengonversi koordinat berdasarkan jenis konversi yang berlaku saat ini
   */
  const handleConvert = () => {
    const result =
      conversionType === "DMS"
        ? convertDMStoDD(coordinates)
        : convertDDtoDMS(coordinates);
    setConvertedResult(result);
  };

  /**
   * Menambahkan marker ke peta pada koordinat yang ditentukan.
   */
  const addMarkerToMap = () => {
    removeExistingMarkers();
    const marker = createMarkerFeature();
    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features: [marker] }),
    });
    map.addLayer(vectorLayer);
    map.getView().setCenter(marker.getGeometry().getCoordinates());
    map.getView().setZoom(12);
  };

  /**
   * Membuat fitur marker dengan koordinat yang ditentukan
   */
  const createMarkerFeature = () => {
    const markerFeature = new Feature({
      geometry: new Point(
        fromLonLat([
          parseFloat(coordinates.longitude),
          parseFloat(coordinates.latitude),
        ])
      ),
    });

    markerFeature.on("click", () => {
      handleCoordinateClick(
        toLonLat(markerFeature.getGeometry().getCoordinates())
      );
    });

    return markerFeature;
  };

  /**
   * Menghapus semua layer marker yang ada di peta.
   */
  const removeExistingMarkers = () => {
    map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) map.removeLayer(layer);
    });
  };

  return (
    <div className="relative h-screen">
      <div id="map" className="w-full h-full"></div>
      <button
        onClick={openFormPopup}
        className="absolute top-4 right-4 px-6 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 transition duration-300 z-10"
      >
        Konversi
      </button>
      {showForm && (
        <Form
          conversionType={conversionType}
          setConversionType={setConversionType}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          handleConvert={handleConvert}
          convertedResult={convertedResult}
          toggleMarkerDisplay={() => {
            setShowForm(false);
            addMarkerToMap();
          }}
        />
      )}
    </div>
  );
};

export default MapComponent;
