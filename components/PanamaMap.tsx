"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Image from "next/image";

const isDev = process.env.NODE_ENV === "development";

// ─── Simplemaps projection ────────────────────────────────────────────────────
// Calibration points from countrymap.js `proj_coordinates`.
// SVG viewBox is 0 0 1000 421.
const PROJ_REFS = [
  { px: 90.9,  py: 382.5, lat: 7.324609,  lng: -82.75542  },
  { px: 545.5, py: 229.8, lat: 8.30261,   lng: -79.817431 },
  { px: 909.1, py: 38.3,  lat: 9.525111,  lng: -77.46704  },
];
const R = 6378137;

function toMercator(lat: number, lng: number) {
  return {
    x: R * lng * (Math.PI / 180),
    y: R * Math.log(Math.tan(Math.PI / 4 + lat * (Math.PI / 360))),
  };
}

function buildForwardProjection() {
  const refs = PROJ_REFS.map((r) => ({ ...r, m: toMercator(r.lat, r.lng) }));
  const [r1, r2, r3] = refs;
  const Dmx13 = r1.m.x - r3.m.x, Dmy13 = r1.m.y - r3.m.y;
  const Dmx23 = r2.m.x - r3.m.x, Dmy23 = r2.m.y - r3.m.y;
  const det = Dmx13 * Dmy23 - Dmx23 * Dmy13;
  const a11 = ((r1.px - r3.px) * Dmy23 - (r2.px - r3.px) * Dmy13) / det;
  const a12 = (Dmx13 * (r2.px - r3.px) - Dmx23 * (r1.px - r3.px)) / det;
  const bx  = r3.px - a11 * r3.m.x - a12 * r3.m.y;
  const a21 = ((r1.py - r3.py) * Dmy23 - (r2.py - r3.py) * Dmy13) / det;
  const a22 = (Dmx13 * (r2.py - r3.py) - Dmx23 * (r1.py - r3.py)) / det;
  const by  = r3.py - a21 * r3.m.x - a22 * r3.m.y;
  return (lat: number, lng: number): [number, number] => {
    const { x, y } = toMercator(lat, lng);
    return [a11 * x + a12 * y + bx, a21 * x + a22 * y + by];
  };
}

function buildInverseProjection() {
  const refs = PROJ_REFS.map((r) => ({ ...r, m: toMercator(r.lat, r.lng) }));
  const [r1, r2, r3] = refs;
  const d = r1.px - r3.px, f = r1.py - r3.py;
  const h = r2.px - r3.px, yy = r2.py - r3.py;
  const $_ = r1.m.x - r3.m.x, v = r1.m.y - r3.m.y;
  const _  = r2.m.x - r3.m.x, g = r2.m.y - r3.m.y;
  const det = d * yy - h * f;
  const A1 = ($_ * yy - _ * f) / det, B1 = (_ * d - $_ * h) / det;
  const A2 = (v * yy - g * f) / det,  B2 = (g * d - v * h) / det;
  return (svgX: number, svgY: number): [number, number] => {
    const mx = A1 * (svgX - r3.px) + B1 * (svgY - r3.py) + r3.m.x;
    const my = A2 * (svgX - r3.px) + B2 * (svgY - r3.py) + r3.m.y;
    return [
      Math.atan(Math.sinh(my / R)) * (180 / Math.PI),
      mx / R * (180 / Math.PI),
    ];
  };
}

const projectLatLng = buildForwardProjection();
const pixelToLatLng = buildInverseProjection();
const SVG_W = 1000, SVG_H = 421;
// ─────────────────────────────────────────────────────────────────────────────

type Location = {
  id: string; name: string; province: string;
  coords: [number, number]; mapsUrl: string; active: boolean;
};
type EditForm = { name: string; active: boolean; lat: string; lng: string; mapsUrl: string };

const initialLocations: Location[] = [
  {
    id: "arraijan",
    name: "Iglesia Nueva Visión La Misericordia Arraiján",
    province: "PA10",
    coords: [-79.72803129743886, 8.99268298428215],
    mapsUrl: "https://www.google.com/maps?q=8.99268298428215,-79.72803129743886",
    active: true,
  },
  {
    id: "talitacumi",
    name: "Talita Cumi",
    province: "PA8",
    coords: [-79.62069616554106, 9.188830251741543],
    mapsUrl: "https://www.google.com/maps?q=9.188830251741543,-79.62069616554106",
    active: true,
  },
  {
    id: "darien",
    name: "Darién",
    province: "PA5",
    coords: [-77.7, 7.7],
    mapsUrl: "https://www.google.com/maps?q=7.7,-77.7",
    active: false,
  },
  {
    id: "garachinae",
    name: "Garachiné",
    province: "PA5",
    coords: [-78.3667, 6.7167],
    mapsUrl: "https://www.google.com/maps?q=6.7167,-78.3667",
    active: false,
  },
];

export default function PanamaMap() {
  const svgRef       = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geojson, setGeojson] = useState<any>(null);

  const [editMode,  setEditMode]  = useState(false);
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [tooltip,   setTooltip]   = useState<{ id: string; x: number; y: number } | null>(null);

  // pendingPin stores SVG viewBox coordinates (not container pixels)
  const [pendingPin,  setPendingPin]  = useState<{ svgX: number; svgY: number; lat: number; lng: number } | null>(null);
  const [newPinForm,  setNewPinForm]  = useState({ name: "", active: true });

  // Edit pin
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const editingPinIdRef = useRef<string | null>(null);
  editingPinIdRef.current = editingPinId;
  const [editPinForm, setEditPinForm] = useState<EditForm>({
    name: "", active: true, lat: "0", lng: "0", mapsUrl: "",
  });

  // Export
  const [showExport, setShowExport] = useState(false);
  const [copied,     setCopied]     = useState(false);

  // Fetch GeoJSON once
  useEffect(() => {
    fetch("/panama.json").then((r) => r.json()).then(setGeojson);
  }, []);

  // SVG viewBox coords → container-relative pixel (accounts for letterboxing via getScreenCTM)
  const getScreenPos = useCallback((svgX: number, svgY: number): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg || !containerRef.current) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = svgX; pt.y = svgY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const screen = pt.matrixTransform(ctm);
    const rect = containerRef.current.getBoundingClientRect();
    return { x: screen.x - rect.left, y: screen.y - rect.top };
  }, []);

  // Client/screen coords → SVG viewBox coords
  const screenToSvg = useCallback((clientX: number, clientY: number): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  // Main D3 effect: draws provinces + pins as native SVG elements.
  // Pins live inside the SVG viewBox so they scale correctly on any screen size.
  useEffect(() => {
    if (!geojson || !svgRef.current) return;

    const geoTransform = d3.geoTransform({
      point(lng: number, lat: number) {
        const [x, y] = projectLatLng(lat, lng);
        (this as any).stream.point(x, y);
      },
    });
    const pathGen = d3.geoPath(geoTransform as any);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    setTooltip(null);

    // ── Provinces ──
    svg.selectAll("path")
      .data(geojson.features)
      .enter().append("path")
      .attr("d", pathGen as any)
      .attr("fill", (d: any) => {
        const hasActive = locations.some((l) => l.province === d.properties.id && l.active);
        const hasSoon   = locations.some((l) => l.province === d.properties.id && !l.active);
        if (hasActive) return "#dfc4ec";
        if (hasSoon)   return "#f5eefa";
        return "#f3f0f7";
      })
      .attr("stroke", "#9461a9")
      .attr("stroke-width", "0.8");

    svg.selectAll("text.province")
      .data(geojson.features)
      .enter().append("text")
      .attr("class", "province")
      .attr("x", (d: any) => pathGen.centroid(d)[0])
      .attr("y", (d: any) => pathGen.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "7")
      .attr("fill", "#6b278b")
      .attr("opacity", "0.7")
      .attr("pointer-events", "none")
      .text((d: any) => d.properties.name ?? "");

    // ── Pending-pin marker (edit mode "+" dot) ──
    if (pendingPin) {
      svg.append("circle")
        .attr("cx", pendingPin.svgX)
        .attr("cy", pendingPin.svgY)
        .attr("r", 10)
        .attr("fill", "#f59e0b")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr("pointer-events", "none");
      svg.append("text")
        .attr("x", pendingPin.svgX)
        .attr("y", pendingPin.svgY + 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "14")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("pointer-events", "none")
        .text("+");
    }

    // ── Pins ──
    locations.forEach((loc) => {
      const [svgX, svgY] = projectLatLng(loc.coords[1], loc.coords[0]);

      // Highlight ring around selected pin (edit mode)
      if (editMode && editingPinId === loc.id) {
        svg.append("circle")
          .attr("cx", svgX)
          .attr("cy", svgY - 20)
          .attr("r", 20)
          .attr("fill", "none")
          .attr("stroke", "#f59e0b")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4 2")
          .attr("pointer-events", "none");
      }

      // Pulse ring for active locations (view mode only, via SVG SMIL animation)
      if (loc.active && !editMode) {
        const pulse = svg.append("circle")
          .attr("cx", svgX)
          .attr("cy", svgY - 5)
          .attr("r", 8)
          .attr("fill", "#6b278a")
          .attr("opacity", 0.2)
          .attr("pointer-events", "none");
        pulse.append("animate")
          .attr("attributeName", "r")
          .attr("from", "8").attr("to", "20")
          .attr("dur", "1.5s").attr("repeatCount", "indefinite");
        pulse.append("animate")
          .attr("attributeName", "opacity")
          .attr("from", "0.2").attr("to", "0")
          .attr("dur", "1.5s").attr("repeatCount", "indefinite");
      }

      // Pin image — rendered inside SVG viewBox so it scales with the map
      const pinEl = svg.append("image")
        .attr("href", "/mercy.svg")
        .attr("x", svgX - 15)
        .attr("y", svgY - 40)
        .attr("width", 30)
        .attr("height", 40)
        .attr("opacity", loc.active ? 1 : 0.35)
        .style("filter", loc.active ? "none" : "grayscale(100%)")
        .style("cursor", editMode ? "grab" : "pointer")
        .style("pointer-events", "all");

      if (!editMode) {
        // View mode: click → open Google Maps; hover → tooltip
        pinEl
          .on("click", (event: MouseEvent) => {
            event.stopPropagation();
            setTimeout(() => window.open(loc.mapsUrl, "_blank", "noopener,noreferrer"), 0);
          })
          .on("mouseenter", () => {
            const pos = getScreenPos(svgX, svgY);
            setTooltip({ id: loc.id, x: pos.x, y: pos.y });
          })
          .on("mouseleave", () => setTooltip(null));
      } else {
        // Edit mode: D3 drag to reposition; zero-movement click → select for editing
        let dragMoved = false;

        const drag = d3.drag()
          .on("start", () => { dragMoved = false; })
          .on("drag", function(event: any) {
            dragMoved = true;
            const c = screenToSvg(event.sourceEvent.clientX, event.sourceEvent.clientY);
            d3.select(this as SVGImageElement)
              .attr("x", c.x - 15)
              .attr("y", c.y - 40);
            if (editingPinIdRef.current === loc.id) {
              const [lat, lng] = pixelToLatLng(c.x, c.y);
              setEditPinForm((f) => ({
                ...f, lat: lat.toFixed(6), lng: lng.toFixed(6),
                mapsUrl: `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`,
              }));
            }
          })
          .on("end", function(event: any) {
            if (dragMoved) {
              const c = screenToSvg(event.sourceEvent.clientX, event.sourceEvent.clientY);
              const [lat, lng] = pixelToLatLng(c.x, c.y);
              setLocations((prev) =>
                prev.map((l) =>
                  l.id === loc.id
                    ? { ...l, coords: [lng, lat], mapsUrl: `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}` }
                    : l
                )
              );
            } else {
              event.sourceEvent?.stopPropagation();
              setEditingPinId(loc.id);
              setEditPinForm({
                name: loc.name, active: loc.active,
                lat: loc.coords[1].toFixed(6), lng: loc.coords[0].toFixed(6),
                mapsUrl: loc.mapsUrl,
              });
              setPendingPin(null);
            }
          });

        pinEl.call(drag as any);
      }
    });
  }, [geojson, locations, editMode, editingPinId, pendingPin, getScreenPos, screenToSvg]);

  // SVG click: add new pin at clicked position (edit mode only, skips existing pins)
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!editMode) return;
    if ((e.target as SVGElement).tagName === "image") return;
    const c = screenToSvg(e.clientX, e.clientY);
    const [lat, lng] = pixelToLatLng(c.x, c.y);
    setPendingPin({ svgX: c.x, svgY: c.y, lat, lng });
    setEditingPinId(null);
    setNewPinForm({ name: "", active: true });
  };

  const handleAddPin = () => {
    if (!pendingPin || !newPinForm.name.trim()) return;
    const slug = newPinForm.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setLocations((prev) => [
      ...prev,
      {
        id: `${slug}-${Date.now()}`,
        name: newPinForm.name.trim(), province: "",
        coords: [pendingPin.lng, pendingPin.lat],
        mapsUrl: `https://www.google.com/maps?q=${pendingPin.lat},${pendingPin.lng}`,
        active: newPinForm.active,
      },
    ]);
    setPendingPin(null);
    setNewPinForm({ name: "", active: true });
  };

  const handleEditCoordChange = (field: "lat" | "lng", val: string) => {
    setEditPinForm((f) => {
      const nf = { ...f, [field]: val };
      const lat = parseFloat(field === "lat" ? val : f.lat);
      const lng = parseFloat(field === "lng" ? val : f.lng);
      if (!isNaN(lat) && !isNaN(lng)) nf.mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      return nf;
    });
  };

  const handleSavePin = () => {
    if (!editingPinId) return;
    const lat = parseFloat(editPinForm.lat), lng = parseFloat(editPinForm.lng);
    const ok = !isNaN(lat) && !isNaN(lng);
    setLocations((prev) =>
      prev.map((l) =>
        l.id === editingPinId
          ? { ...l, name: editPinForm.name, active: editPinForm.active,
              coords: ok ? [lng, lat] : l.coords,
              mapsUrl: editPinForm.mapsUrl || l.mapsUrl }
          : l
      )
    );
    setEditingPinId(null);
  };

  const handleDeletePin = () => {
    setLocations((prev) => prev.filter((l) => l.id !== editingPinId));
    setEditingPinId(null);
  };

  const exportCode = `const locations = ${JSON.stringify(
    locations.map(({ id, name, province, coords, mapsUrl, active }) => ({
      id, name, province, coords, mapsUrl, active,
    })), null, 2
  )};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Popup positions — derived via getScreenPos (getScreenCTM-based, always accurate)
  const editingLoc      = editingPinId ? locations.find((l) => l.id === editingPinId) : null;
  const editPopupPos    = editingLoc
    ? getScreenPos(...projectLatLng(editingLoc.coords[1], editingLoc.coords[0]))
    : null;
  const pendingPopupPos = pendingPin ? getScreenPos(pendingPin.svgX, pendingPin.svgY) : null;
  const cw = containerRef.current?.clientWidth ?? SVG_W;

  return (
    <div className="relative w-full">
      {isDev && (
        <div className="flex justify-end mb-2">
          <button
            onClick={() => {
              setEditMode((m) => !m);
              setPendingPin(null); setEditingPinId(null);
              setShowExport(false); setTooltip(null);
            }}
            className={`text-xs font-sans font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              editMode
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-navy-900/60 border-navy-900/20 hover:border-primary-500 hover:text-primary-500"
            }`}
          >
            {editMode ? "✅ Ver mapa" : "✏️ Editar mapa"}
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "1000/421", height: "auto" }}
      >
        {/* SVG owns the entire coordinate space — pins are native SVG elements inside */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          onClick={handleSvgClick}
          className={editMode ? "cursor-crosshair" : ""}
        />

        {/* Add-pin popup — HTML overlay, positioned via getScreenPos */}
        {pendingPin && pendingPopupPos && (
          <div
            className="absolute z-40 bg-white rounded-xl shadow-xl p-4 w-52"
            style={{
              left: Math.min(pendingPopupPos.x + 14, cw - 220),
              top: Math.max(pendingPopupPos.y - 110, 8),
              border: "1px solid rgba(8,15,46,0.10)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans font-bold text-xs text-navy-900 mb-1">📍 Nuevo punto</p>
            <p className="font-mono text-[10px] text-navy-900/40 mb-2 select-all">
              {pendingPin.lat.toFixed(6)}, {pendingPin.lng.toFixed(6)}
            </p>
            <input
              autoFocus type="text" placeholder="Nombre del lugar" value={newPinForm.name}
              onChange={(e) => setNewPinForm((f) => ({ ...f, name: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && handleAddPin()}
              className="w-full text-xs border rounded-lg px-2 py-1.5 mb-2 font-sans focus:outline-none focus:ring-1 focus:ring-primary-500"
              style={{ borderColor: "rgba(8,15,46,0.15)" }}
            />
            <div className="flex gap-1 mb-3">
              {[true, false].map((active) => (
                <button key={String(active)} onClick={() => setNewPinForm((f) => ({ ...f, active }))}
                  className={`flex-1 text-[10px] font-sans font-semibold py-1 rounded-lg transition-colors ${
                    newPinForm.active === active
                      ? active ? "bg-primary-500 text-white" : "bg-amber-500 text-white"
                      : "bg-stone-100 text-navy-900/50"
                  }`}>
                  {active ? "Activa" : "Próx."}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button onClick={handleAddPin} className="flex-1 bg-primary-500 text-white text-xs font-sans font-semibold py-1.5 rounded-lg hover:bg-primary-600 transition-colors">Agregar</button>
              <button onClick={() => setPendingPin(null)} className="px-2 text-navy-900/40 hover:text-navy-900 text-xs transition-colors">✕</button>
            </div>
          </div>
        )}

        {/* Edit-pin popup — HTML overlay, positioned via getScreenPos */}
        {editingPinId && editingLoc && editPopupPos && (
          <div
            className="absolute z-40 bg-white rounded-xl shadow-xl p-4 w-56"
            style={{
              left: Math.min(editPopupPos.x + 14, cw - 240),
              top: Math.max(editPopupPos.y - 185, 8),
              border: "1px solid rgba(8,15,46,0.10)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans font-bold text-xs text-navy-900 mb-2">✏️ Editar punto</p>
            <input
              type="text" value={editPinForm.name} placeholder="Nombre"
              onChange={(e) => setEditPinForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full text-xs border rounded-lg px-2 py-1.5 mb-2 font-sans focus:outline-none focus:ring-1 focus:ring-primary-500"
              style={{ borderColor: "rgba(8,15,46,0.15)" }}
            />
            <div className="grid grid-cols-2 gap-1 mb-2">
              {(["lat", "lng"] as const).map((field) => (
                <div key={field}>
                  <label className="font-sans text-[10px] text-navy-900/50 mb-0.5 block">
                    {field === "lat" ? "Latitud" : "Longitud"}
                  </label>
                  <input
                    type="number" step="0.000001" value={editPinForm[field]}
                    onChange={(e) => handleEditCoordChange(field, e.target.value)}
                    className="w-full text-[10px] border rounded-lg px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                    style={{ borderColor: "rgba(8,15,46,0.15)" }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-1 mb-2">
              {[true, false].map((active) => (
                <button key={String(active)} onClick={() => setEditPinForm((f) => ({ ...f, active }))}
                  className={`flex-1 text-[10px] font-sans font-semibold py-1 rounded-lg transition-colors ${
                    editPinForm.active === active
                      ? active ? "bg-primary-500 text-white" : "bg-amber-500 text-white"
                      : "bg-stone-100 text-navy-900/50"
                  }`}>
                  {active ? "Activa" : "Próx."}
                </button>
              ))}
            </div>
            <input
              type="text" value={editPinForm.mapsUrl} placeholder="URL Google Maps"
              onChange={(e) => setEditPinForm((f) => ({ ...f, mapsUrl: e.target.value }))}
              className="w-full text-[10px] border rounded-lg px-2 py-1.5 mb-3 font-mono focus:outline-none focus:ring-1 focus:ring-primary-500 truncate"
              style={{ borderColor: "rgba(8,15,46,0.15)" }}
            />
            <div className="flex gap-1">
              <button onClick={handleSavePin} className="flex-1 bg-primary-500 text-white text-xs font-sans font-semibold py-1.5 rounded-lg hover:bg-primary-600 transition-colors">Guardar</button>
              <button onClick={handleDeletePin} className="flex-1 bg-red-500 text-white text-xs font-sans font-semibold py-1.5 rounded-lg hover:bg-red-600 transition-colors">Eliminar</button>
              <button onClick={() => setEditingPinId(null)} className="px-2 text-navy-900/40 hover:text-navy-900 text-xs transition-colors">✕</button>
            </div>
          </div>
        )}

        {/* View-mode tooltip */}
        {!editMode && tooltip && (
          <div className="absolute z-20 pointer-events-none" style={{ left: tooltip.x - 55, top: tooltip.y - 70 }}>
            <div className="bg-navy-900 text-white rounded-lg px-3 py-2 text-center shadow-lg min-w-[110px]">
              <p className="font-sans font-bold text-xs">{locations.find((l) => l.id === tooltip.id)?.name}</p>
              <p className="font-sans text-amber-400 text-[10px] mt-0.5">
                {locations.find((l) => l.id === tooltip.id)?.active ? "Iglesia activa ✓" : "Próximamente"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit mode panel */}
      {editMode && (
        <div className="mt-4 rounded-xl border bg-stone-50 p-4" style={{ borderColor: "rgba(8,15,46,0.07)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans font-bold text-xs text-navy-900">Ubicaciones actuales ({locations.length})</p>
            <button onClick={() => setShowExport((s) => !s)} className="text-xs font-sans font-semibold text-primary-500 hover:text-primary-600 transition-colors">
              {showExport ? "Ocultar JSON" : "Exportar ubicaciones →"}
            </button>
          </div>
          <div className="space-y-1.5 mb-3">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2" style={{ border: "1px solid rgba(8,15,46,0.07)" }}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${loc.active ? "bg-primary-500" : "bg-amber-400"}`} />
                  <span className="font-sans font-medium text-xs text-navy-900 truncate">{loc.name}</span>
                  <span className="font-sans text-[10px] text-navy-900/40 shrink-0">{loc.active ? "activa" : "próximamente"}</span>
                </div>
                <span className="font-mono text-[10px] text-navy-900/30 shrink-0 ml-2">
                  {loc.coords[1].toFixed(4)}, {loc.coords[0].toFixed(4)}
                </span>
              </div>
            ))}
          </div>
          {showExport && (
            <div className="relative">
              <pre className="bg-[#0f1729] text-green-400 text-[10px] font-mono rounded-lg p-3 overflow-x-auto max-h-64 leading-relaxed">{exportCode}</pre>
              <button onClick={handleCopy} className="absolute top-2 right-2 text-[10px] font-sans font-semibold px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors">
                {copied ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-5">
        <div className="flex items-center gap-2">
          <Image src="/mercy.svg" alt="activa" width={20} height={20} className="object-contain" />
          <span className="font-sans text-xs text-navy-900/60">Iglesia activa</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/mercy.svg" alt="pronto" width={20} height={20} className="opacity-40 grayscale object-contain" />
          <span className="font-sans text-xs text-navy-900/60">Próximamente</span>
        </div>
      </div>
    </div>
  );
}
