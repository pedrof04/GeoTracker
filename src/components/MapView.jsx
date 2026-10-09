import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Popup,
  useMap,
} from "react-leaflet";
import { getCategoryConfig } from "../lib/categoryConfig.js";

function FlyToSelected({ selectedId, events }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const feature = events.find((e) => e.properties?.id === selectedId);
    if (!feature?.geometry) return;
    const g = feature.geometry;
    if (g.type === "Point") {
      map.flyTo(
        [g.coordinates[1], g.coordinates[0]],
        Math.max(map.getZoom(), 5),
        { duration: 1.2 },
      );
    } else if (g.type === "Polygon") {
      const lats = g.coordinates[0].map((c) => c[1]);
      const lngs = g.coordinates[0].map((c) => c[0]);
      map.flyToBounds(
        [
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ],
        { duration: 1.2 },
      );
    }
  }, [selectedId]);
  return null;
}

export function MapView({ events, selectedId, onSelectEvent, theme }) {
  const tileUrl = useMemo(
    () =>
      theme === "light"
        ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    [theme],
  );

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={1}
      maxZoom={14}
      style={{ height: "100%", width: "100%" }}
      worldCopyJump
    >
      <TileLayer
        url={`https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_KEY}`}
        attribution='&copy; <a href="[https://carto.com/](https://carto.com/)" target="_blank">CARTO</a> &copy; <a href="[https://openstreetmap.org](https://openstreetmap.org)" target="_blank">OSM</a>'
        maxZoom={20}
      />
      <FlyToSelected selectedId={selectedId} events={events} />

      {events.map((feature) => {
        const props = feature.properties;
        if (!props || !feature.geometry) return null;
        const { id, title, categories, closed } = props;
        const catId = categories?.[0]?.id;
        const cfg = getCategoryConfig(catId);
        const color = cfg.color;
        const geom = feature.geometry;
        const isSelected = id === selectedId;

        if (geom.type === "Point") {
          const [lng, lat] = geom.coordinates;
          return (
            <CircleMarker
              key={id}
              center={[lat, lng]}
              radius={isSelected ? 11 : 7}
              pathOptions={{
                color: isSelected ? "#fff" : color,
                fillColor: color,
                fillOpacity: closed ? 0.35 : 0.82,
                weight: isSelected ? 2.5 : 1.2,
              }}
              eventHandlers={{ click: () => onSelectEvent(id) }}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 160 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: color,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {cfg.icon} {cfg.label}
                  </div>
                  <strong style={{ fontSize: 13 }}>{title}</strong>
                  <div style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>
                    {closed ? "⬤ Encerrado" : "⬤ Ativo"}
                  </div>
                  <button
                    onClick={() => onSelectEvent(id)}
                    style={{
                      marginTop: 8,
                      fontSize: 11,
                      color: color,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                  >
                    Ver detalhes →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        }

        if (geom.type === "Polygon") {
          const positions = geom.coordinates[0].map(([lng, lat]) => [lat, lng]);
          return (
            <Polygon
              key={id}
              positions={positions}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: closed ? 0.1 : 0.2,
                weight: isSelected ? 2.5 : 1.5,
              }}
              eventHandlers={{ click: () => onSelectEvent(id) }}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 160 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: color,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {cfg.icon} {cfg.label}
                  </div>
                  <strong style={{ fontSize: 13 }}>{title}</strong>
                </div>
              </Popup>
            </Polygon>
          );
        }

        return null;
      })}
    </MapContainer>
  );
}
