"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiSave, FiTrash2 } from "react-icons/fi";

type WidgetType = "about" | "experience" | "projects" | "skills" | "contact";
type Widget = {
  id: string;
  type: WidgetType | "text";
  x: number; // canvas-space (not scaled)
  y: number;
  w: number;
  h: number;
  content?: string; // for text blocks
};

const PALETTE: Record<WidgetType, { title: string; content: string }> = {
  about: {
    title: "About Me",
    content:
      "James Patrick Paloyo — Full-Stack & Cross-Platform Dev. Passionate about scalable apps, AI integrations, and immersive UX.",
  },
  experience: {
    title: "Experience",
    content:
      "CTO • JD Telecommunication\n— Led engineering, built billing systems, shipped AI features.\nAI Integrator • REEV Tech Inc (Japan)\n— Integrated LLMs & Unity NPC systems.",
  },
  projects: {
    title: "Projects",
    content:
      "BillWise SaaS — Next.js • Node • Stripe • Postgres\nAI NPC System — Unity • GPT • C#\nISP Billing App — Flutter • Sheets • Bluetooth",
  },
  skills: {
    title: "Skills",
    content:
      "React, Next.js, Flutter, Unity, TypeScript, Python, LLMs, Docker, AWS, Postgres",
  },
  contact: {
    title: "Contact",
    content:
      "Email: payloyo@gmail.com\nGitHub: github.com/jppdp\nLinkedIn: /in/james-patrick-paloyo-3ab052298/",
  },
};

// util
const uid = () => Math.random().toString(36).slice(2, 9);

export default function BuilderPage() {
  // canvas & zoom
  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef<HTMLDivElement>(null);

  // widgets on canvas
  const [widgets, setWidgets] = useState<Widget[]>([
    // starter layout (you can remove these)
    { id: uid(), type: "about", x: 60, y: 60, w: 420, h: 150 },
    { id: uid(), type: "projects", x: 60, y: 240, w: 520, h: 220 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // drag-from-sidebar → drop
  const handleDragStart = (e: React.DragEvent, type: WidgetType) => {
    e.dataTransfer.setData("application/x-widget", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("application/x-widget") as WidgetType;
    if (!type) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    // translate screen → canvas space (remove zoom scaling)
    const scale = zoom / 100;
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;

    setWidgets((prev) => [
      ...prev,
      {
        id: uid(),
        type,
        x: Math.max(0, x - 40),
        y: Math.max(0, y - 20),
        w: type === "skills" ? 420 : 520,
        h: type === "about" ? 150 : 200,
      },
    ]);
  };

  // move (drag within canvas)
  const onDragEnd = (id: string, e: any, info: { point: { x: number; y: number } }) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scale = zoom / 100;
    const x = (info.point.x - rect.left) / scale;
    const y = (info.point.y - rect.top) / scale;
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  };

  // resize (bottom-right handle)
  const resizingId = useRef<string | null>(null);
  const startSize = useRef<{ w: number; h: number; x: number; y: number; mx: number; my: number } | null>(null);

  const onResizeStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const widget = widgets.find((w) => w.id === id);
    if (!widget) return;
    resizingId.current = id;
    startSize.current = {
      w: widget.w,
      h: widget.h,
      x: widget.x,
      y: widget.y,
      mx: e.clientX,
      my: e.clientY,
    };
    window.addEventListener("mousemove", onResizing);
    window.addEventListener("mouseup", onResizeEnd);
  };

  const onResizing = (e: MouseEvent) => {
    if (!resizingId.current || !startSize.current) return;
    const scale = zoom / 100;
    const dx = (e.clientX - startSize.current.mx) / scale;
    const dy = (e.clientY - startSize.current.my) / scale;
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === resizingId.current
          ? { ...w, w: Math.max(200, startSize.current!.w + dx), h: Math.max(120, startSize.current!.h + dy) }
          : w
      )
    );
  };

  const onResizeEnd = () => {
    resizingId.current = null;
    startSize.current = null;
    window.removeEventListener("mousemove", onResizing);
    window.removeEventListener("mouseup", onResizeEnd);
  };

  // inline text editing
  const updateContent = (id: string, text: string) => {
    setWidgets((prev) => prev.map((w) => (w.id === id ? { ...w, content: text } : w)));
  };

  // toolbar actions
  const zoomOut = () => setZoom((z) => Math.max(50, z - 10));
  const zoomIn = () => setZoom((z) => Math.min(200, z + 10));
  const resetLayout = () => {
    setZoom(100);
    setWidgets([
      { id: uid(), type: "about", x: 60, y: 60, w: 420, h: 150 },
      { id: uid(), type: "projects", x: 60, y: 240, w: 520, h: 220 },
    ]);
    setSelectedId(null);
  };
  const removeSelected = () => {
    if (!selectedId) return;
    setWidgets((prev) => prev.filter((w) => w.id !== selectedId));
    setSelectedId(null);
  };
  const saveLayout = () => {
    localStorage.setItem("jpp-builder-layout", JSON.stringify({ zoom, widgets }));
  };
  const loadLayout = useCallback(() => {
    try {
      const raw = localStorage.getItem("jpp-builder-layout");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.widgets) setWidgets(data.widgets);
      if (data.zoom) setZoom(data.zoom);
    } catch {}
  }, []);
  // load on first render
  useMemo(loadLayout, [loadLayout]);

  // render helpers
  const renderWidgetBody = (w: Widget) => {
    if (w.type === "text") {
      return (
        <div
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          className="other-page outline-none whitespace-pre-wrap"
          onInput={(e) => updateContent(w.id, (e.target as HTMLElement).innerText)}
        >
          {w.content ?? "Double-click to edit text"}
        </div>
      );
    }
    const item = PALETTE[w.type as WidgetType];
    return (
      <div className="space-y-2">
        <div className="text-sm uppercase tracking-wide text-fuchsia-300/90">{item.title}</div>
        <div
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          className="text-[15px] leading-relaxed text-white/90 outline-none whitespace-pre-wrap"
          onInput={(e) => updateContent(w.id, (e.target as HTMLElement).innerText)}
        >
          {w.content ?? item.content}
        </div>
      </div>
    );
  };

  return (
    <div className="h-dvh w-dvw overflow-hidden bg-[#0b0b0f] text-white">
      {/* TOP BAR */}
      <div className="h-14 border-b border-white/10 bg-[#121217] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-600" />
          <div className="font-semibold tracking-wide">James.dev Builder</div>
          <div className="text-white/40 text-sm ml-3">Interactive Resume</div>
        </div>
        <div className="flex items-center gap-2 text-white/85">
          <button onClick={zoomOut} className="px-2 py-1 rounded hover:bg-white/10"><FiZoomOut /></button>
          <div className="w-16 text-center text-white/70">{zoom}%</div>
          <button onClick={zoomIn} className="px-2 py-1 rounded hover:bg-white/10"><FiZoomIn /></button>
          <div className="mx-2 h-6 w-px bg-white/10" />
          <button onClick={resetLayout} className="px-2 py-1 rounded hover:bg-white/10"><FiRotateCcw /></button>
          <button onClick={saveLayout} className="px-2 py-1 rounded hover:bg-white/10"><FiSave /></button>
          <button onClick={removeSelected} className="px-2 py-1 rounded hover:bg-white/10"><FiTrash2 /></button>
        </div>
      </div>

      <div className="flex h-[calc(100dvh-56px)]">
        {/* LEFT: WIDGETS PALETTE */}
        <aside className="w-72 border-r border-white/10 bg-[#121217] p-4 overflow-y-auto">
          <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3">Widgets</h3>

          <div className="space-y-3">
            {(Object.keys(PALETTE) as WidgetType[]).map((t) => (
              <div
                key={t}
                draggable
                onDragStart={(e) => handleDragStart(e, t)}
                className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition p-3 cursor-grab"
                title="Drag into canvas"
              >
                <div className="text-sm font-semibold capitalize">{t}</div>
                <div className="text-xs text-white/50 line-clamp-2">{PALETTE[t].content}</div>
              </div>
            ))}

            {/* Quick-add Text block */}
            <button
              onClick={() => {
                setWidgets((prev) => [
                  ...prev,
                  { id: uid(), type: "text", x: 80, y: 80, w: 360, h: 120, content: "New text block" },
                ]);
              }}
              className="w-full mt-4 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 transition p-3 text-sm font-semibold"
            >
              + Text Block
            </button>
          </div>
        </aside>

        {/* CENTER: CANVAS */}
        <main className="relative flex-1 bg-[radial-gradient(ellipse_at_50%_20%,rgba(139,92,246,.12),transparent_55%),#0b0b0f]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30 pointer-events-none" />
          <div
            ref={canvasRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-2xl bg-white/5 backdrop-blur p-10 shadow-[0_10px_50px_rgba(0,0,0,.4)]"
            style={{
              width: 1100,
              height: 720,
              transform: `translate(-50%, -50%) scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Canvas content */}
            {widgets.map((w) => (
              <motion.div
                key={w.id}
                drag
                dragMomentum={false}
                onDragEnd={(e, info) => onDragEnd(w.id, e, info)}
                onMouseDown={() => setSelectedId(w.id)}
                className={`group absolute rounded-xl border ${
                  selectedId === w.id ? "border-fuchsia-400/60" : "border-white/10"
                } bg-[#1b1b22]/80 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,.35)]`}
                style={{ left: w.x, top: w.y, width: w.w, height: w.h, cursor: "grab", padding: 16 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span className="uppercase tracking-widest">
                    {w.type === "text" ? "Text" : (w.type as string)}
                  </span>
                  <span className="opacity-60">{Math.round(w.w)}×{Math.round(w.h)}</span>
                </div>

                {/* Body */}
                <div className="h-[calc(100%-22px)] overflow-auto pr-2">
                  {renderWidgetBody(w)}
                </div>

                {/* Resize handle */}
                <div
                  onMouseDown={(e) => onResizeStart(w.id, e)}
                  className="absolute w-3 h-3 right-1.5 bottom-1.5 rounded-[3px] border border-white/30 bg-fuchsia-500/60 opacity-80 cursor-se-resize"
                  title="Resize"
                />
              </motion.div>
            ))}
          </div>
        </main>

        {/* RIGHT: (future) PROPERTIES */}
        <aside className="w-80 border-l border-white/10 bg-[#121217] p-4 overflow-y-auto">
          <h3 className="text-xs uppercase tracking-widest text-white/50 mb-3">Properties</h3>
          {selectedId ? (
            <>
              <div className="text-sm text-white/70 mb-2">Selected: <span className="text-white">{selectedId}</span></div>
              <button
                onClick={removeSelected}
                className="rounded-lg border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 transition px-3 py-2 text-sm"
              >
                Delete Block
              </button>
              <div className="mt-4 text-xs text-white/50">More styling controls coming soon (typography, color, background, spacing)…</div>
            </>
          ) : (
            <div className="text-xs text-white/50">Select a block to edit its properties.</div>
          )}
        </aside>
      </div>
    </div>
  );
}
