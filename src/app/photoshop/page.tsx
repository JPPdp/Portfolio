"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reorder } from "framer-motion";
import { FiMove, FiEdit, FiType, FiZoomIn, FiLayers, FiX } from "react-icons/fi";

const projects = [
  { id: 1, name: "BillWise SaaS", tech: "Next.js • Node • PostgreSQL", desc: "Subscription billing platform with Stripe & invoices." },
  { id: 2, name: "AI NPC System", tech: "Unity • GPT • C#", desc: "AI-driven NPC dialogues using GPT." },
  { id: 3, name: "ISP Billing App", tech: "Flutter • Sheets • Bluetooth", desc: "Collector app for ISP with Google Sheets backend." },
];

export default function PhotoshopPortfolio() {
  const [activeTool, setActiveTool] = useState("Move");
  const [zoom, setZoom] = useState(100);
  const [layers, setLayers] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);

  const [activeTab, setActiveTab] = useState("portfolio.psd");
  const tabs = ["portfolio.psd", "resume.psd", "about.psd"];

  return (
    <div className="photoshop-page flex h-screen bg-[#1c1c1c] text-white font-sans">
      {/* Toolbar */}
      <div className="w-20 bg-[#262626] flex flex-col items-center py-6 space-y-6 border-r border-[#3a3a3a] shadow-lg">
        {["Move", "Brush", "Text", "Zoom"].map((tool) => (
          <motion.button
            key={tool}
            whileHover={{ scale: 1.1 }}
            className={`w-14 h-14 flex items-center justify-center rounded-xl text-xl ${
              activeTool === tool
                ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white"
                : "bg-[#333] hover:bg-[#444] text-gray-300"
            }`}
            onClick={() => setActiveTool(tool)}
          >
            {tool === "Move" && <FiMove />}
            {tool === "Brush" && <FiEdit />}
            {tool === "Text" && <FiType />}
            {tool === "Zoom" && <FiZoomIn />}
          </motion.button>
        ))}
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Tabs */}
        <div className="h-12 bg-[#2b2b2b] flex items-center px-4 border-b border-[#3a3a3a] space-x-4">
          {tabs.map((tab) => (
            <motion.div
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer ${
                activeTab === tab
                  ? "bg-[#1f1f1f] border-t-2 border-purple-500 text-white"
                  : "bg-[#3a3a3a] text-gray-400 hover:text-white"
              }`}
            >
              {tab}
              <FiX size={16} className="hover:text-red-400" />
            </motion.div>
          ))}
        </div>

        {/* Workspace */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#181818] to-[#232323] overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "portfolio.psd" && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ scale: zoom / 100 }}
                className="bg-[#2c2c2c]/80 border border-[#444] rounded-2xl shadow-2xl w-[75%] h-[80%] p-6 overflow-auto"
              >
                <Reorder.Group axis="y" values={layers} onReorder={setLayers}>
                  {layers.map((project) =>
                    project.visible !== false ? (
                      <Reorder.Item
                        key={project.id}
                        value={project}
                        drag
                        className="glass rounded-xl px-6 py-5 mb-4 text-center shadow-lg border border-white/10 bg-gradient-to-br from-[#2d2d2d] to-[#1f1f1f] hover:scale-105 transition cursor-pointer"
                        onDoubleClick={() => setSelectedProject(project)}
                      >
                        <h3 className="text-2xl font-bold">{project.name}</h3>
                        <p className="text-gray-300 mt-2">{project.tech}</p>
                      </Reorder.Item>
                    ) : null
                  )}
                    <Reorder.Item
                        key = '4'
                        value="Back-home"
                        drag
                        className="glass rounded-xl px-6 py-5 mb-4 text-center shadow-lg border border-white/10 bg-gradient-to-br from-[#2d2d2d] to-[#1f1f1f] hover:scale-105 transition cursor-pointer"
                        onDoubleClick={() => window.location.href = '../'}
                        >
                        <h3 className="text-2xl font-bold">Back to Home</h3>
                        <p className="text-gray-300 mt-2">Go back to main portfolio</p>
                    </Reorder.Item>
                </Reorder.Group>
              </motion.div>
            )}

            {activeTab === "resume.psd" && (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#1f1f1f] p-10 rounded-2xl text-left w-[70%] h-[75%] overflow-y-auto"
              >
                <h2 className="text-4xl font-bold mb-6 gradient-text">James Patrick Paloyo</h2>
                <p className="text-lg mb-4 text-gray-300">Full-Stack Developer | AI Integrator | CTO</p>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Experience</h3>
                <ul className="mb-6 list-disc pl-5 space-y-2">
                  <li>CTO at JD Telecommunication – Managed AI systems & scaling.</li>
                  <li>AI NPC Development – Unity GPT integration for game AI.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Skills</h3>
                <p>JavaScript, TypeScript, Flutter, Unity, Next.js, Docker, AI Integration</p>
                <a className="text-l mb-2 text-blue-500" href="../">Back to Home..</a>
              </motion.div>
            )}

            {activeTab === "about.psd" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#1f1f1f] p-10 rounded-2xl text-left w-[60%]"
              >
                <h2 className="text-4xl font-bold mb-4 gradient-text">About Me</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Passionate Full-Stack Developer & AI Enthusiast with experience in
                  building scalable apps, integrating AI systems, and developing interactive
                  user experiences. Based in Pangasinan, PH.
                </p>
                
                <a className="text-l mt-5 mb-2 text-blue-500" href="../">Back to Home</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="h-10 bg-[#2b2b2b] text-gray-400 flex items-center justify-between px-6 text-xs border-t border-[#3a3a3a]">
          <span>{activeTab} | Zoom: {zoom}%</span>
          <div className="flex gap-2">
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))}>-</button>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))}>+</button>
          </div>
        </div>
      </div>

      {/* Layers Panel */}
      <div className="w-72 bg-[#262626] border-l border-[#3a3a3a] flex flex-col">
        <div className="p-4 text-sm border-b border-[#3a3a3a] font-bold flex items-center gap-2">
          <FiLayers /> Layers
        </div>
        <div className="flex-1 p-4 space-y-3">
          {layers.map((layer) => (
            <motion.div
              key={layer.id}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-[#333] px-4 py-3 rounded-lg hover:bg-[#3a3a3a] shadow"
            >
              <span>{layer.name}</span>
              <input
                type="checkbox"
                checked={layer.visible !== false}
                onChange={() =>
                  setLayers((prev) =>
                    prev.map((l) =>
                      l.id === layer.id ? { ...l, visible: !l.visible } : l
                    )
                  )
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
