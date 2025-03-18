"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import types and utilities
import {
  ElementType,
  ElementData,
  SidebarPanel,
  PreviewDevice,
} from "@/types/website-builder";
import {
  templates,
  colorThemes,
  getDefaultContent,
} from "@/data/website-builder-data";
import {
  initializeAnimations,
  resetAnimations as resetAnimationsUtil,
} from "@/utils/animation-utils";

// Import components
import ElementsPanel from "@/components/preview/ElementsPanel";
import AnimationsPanel from "@/components/preview/AnimationsPanel";
import ThemePanel from "@/components/preview/ThemePanel";
import DevicePanel from "@/components/preview/DevicePanel";
import TimelineEditor from "@/components/preview/TimelineEditor";
import DraggableElement from "@/components/preview/DraggableElement";
import TemplateSelector from "@/components/preview/TemplateSelector";

gsap.registerPlugin(ScrollTrigger);

const WebsiteBuilder: React.FC = () => {
  // State management
  const [activeTemplate, setActiveTemplate] = useState<string>("business");
  const [activeColorTheme, setActiveColorTheme] = useState<string>("purple");
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [activeSidebar, setActiveSidebar] = useState<SidebarPanel>("elements");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [showTimelineEditor, setShowTimelineEditor] = useState<boolean>(false);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);

  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Template initialization
  useEffect(() => {
    const template = templates.find((t) => t.id === activeTemplate);
    if (template) {
      setElements(
        template.elements.map((el) => ({
          ...el,
          id: el.id || `${el.type}-${Date.now()}`,
          content: el.content || getDefaultContent(el.type as ElementType),
        })) as ElementData[]
      );
      setSelectedElement(null);
    }
  }, [activeTemplate]);

  // Theme application
  useEffect(() => {
    const theme = colorThemes.find((t) => t.id === activeColorTheme);
    if (theme && canvasRef.current) {
      const root = document.documentElement;
      root.style.setProperty("--theme-primary", theme.primary);
      root.style.setProperty("--theme-secondary", theme.secondary);
      root.style.setProperty("--theme-accent", theme.accent);
      root.style.setProperty("--theme-text", theme.text);
    }
  }, [activeColorTheme]);

  // Animation setup
  useEffect(() => {
    if (!canvasRef.current || !elements.length) return;

    timelineRef.current?.kill();
    timelineRef.current = gsap.timeline();
    initializeAnimations(elements, timelineRef.current);

    return () => {
      timelineRef.current?.kill();
    };
  }, [elements, showTimelineEditor]);

  // Handlers
  const addElement = (type: ElementType) => {
    const newElement: ElementData = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      animation: "fadeIn",
      animationDelay: 0,
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<ElementData>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    gsap.to(`#element-${id}`, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        setElements((prev) => prev.filter((el) => el.id !== id));
        setSelectedElement(null);
      },
    });
  };

  const toggleWatermarkHandler = () => {
    setShowWatermark((prev) => !prev);
    if (!showWatermark) {
      gsap.fromTo(
        ".upgrade-message",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(".upgrade-message", {
              opacity: 0,
              y: 20,
              duration: 0.5,
              delay: 2,
            });
          },
        }
      );
    }
  };

  const resetAnimations = () => {
    if (timelineRef.current) {
      timelineRef.current = resetAnimationsUtil(elements, timelineRef.current);
      timelineRef.current.play(0); // Restart animation for preview
    }
  };

  return (
    <div className="space-y-8">
      {/* Template Selector */}
      <motion.section
        {...fadeIn}
        className="bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl p-6 border border-indigo-500/20"
      >
        <h3 className="text-xl font-semibold text-white mb-6">
          Select Your Template
        </h3>
        <TemplateSelector
          templates={templates}
          activeTemplate={activeTemplate}
          onSelectTemplate={setActiveTemplate}
        />
      </motion.section>

      {/* Main Editor */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.aside
          {...fadeIn}
          className="lg:w-72 bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl border border-indigo-500/20 p-4"
        >
          <nav className="flex justify-around border-b border-indigo-700/50 mb-4">
            {["elements", "animations", "theme", "device"].map((tab) => (
              <button
                key={tab}
                className={`p-3 text-sm font-medium ${activeSidebar === tab ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-gray-300"}`}
                onClick={() => setActiveSidebar(tab as SidebarPanel)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          <div className="h-[650px] overflow-y-auto">
            {activeSidebar === "elements" && (
              <ElementsPanel onAddElement={addElement} />
            )}
            {activeSidebar === "animations" && (
              <AnimationsPanel
                selectedElement={selectedElement}
                elements={elements}
                onApplyAnimation={(id, animation) =>
                  updateElement(id, { animation })
                }
                onResetAnimations={resetAnimations}
                onToggleTimelineEditor={() =>
                  setShowTimelineEditor((prev) => !prev)
                }
                showTimelineEditor={showTimelineEditor}
              />
            )}
            {activeSidebar === "theme" && (
              <ThemePanel
                activeColorTheme={activeColorTheme}
                onSelectTheme={setActiveColorTheme}
                onToggleGridLines={() => setShowGridLines((prev) => !prev)}
                showGridLines={showGridLines}
              />
            )}
            {activeSidebar === "device" && (
              <DevicePanel
                activeDevice={previewDevice}
                onSelectDevice={setPreviewDevice}
              />
            )}
          </div>
        </motion.aside>

        {/* Canvas */}
        <motion.div {...fadeIn} className="flex-1">
          <div className="bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl border border-indigo-500/20 p-4">
            <div className="bg-gray-800 rounded-t-lg p-2 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-gray-400 text-sm">
                {previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)}{" "}
                Preview
              </span>
            </div>
            <div
              ref={canvasRef}
              className={`bg-white rounded-b-lg overflow-hidden transition-all duration-300 ${previewDevice === "desktop" ? "w-full" : previewDevice === "tablet" ? "w-[768px]" : "w-[375px]"} mx-auto`}
            >
              <div
                className="min-h-[600px] p-6 relative"
                style={{
                  background: showGridLines
                    ? "linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)"
                    : "white",
                  backgroundSize: "20px 20px",
                }}
                onClick={() => setSelectedElement(null)}
              >
                {elements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
                    <div className="text-center p-6 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-400 mx-auto mb-4"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Add Elements to Get Started
                      </h3>
                      <p className="text-gray-600">
                        Click on an element from the sidebar to add it to your
                        canvas
                      </p>
                    </div>
                  </div>
                )}
                {elements.map((element) => (
                  <DraggableElement
                    key={element.id}
                    element={element}
                    isSelected={selectedElement === element.id}
                    onSelect={() => setSelectedElement(element.id)}
                    onUpdate={(content) =>
                      updateElement(element.id, { content })
                    }
                    onDelete={() => deleteElement(element.id)}
                    showGridLines={showGridLines}
                  />
                ))}
                {showWatermark && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 text-center">
                    Preview Mode - Contact me for a custom solution!
                  </div>
                )}
                <div className="upgrade-message absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-white py-2 px-4 rounded-lg opacity-0">
                  Upgrade for the full experience!
                </div>
              </div>
            </div>
            <AnimatePresence>
              {showTimelineEditor && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <TimelineEditor
                    elements={elements}
                    onUpdateAnimationDelay={(id, delay) =>
                      updateElement(id, { animationDelay: delay })
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-4 flex justify-between">
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                  onClick={() => setElements([])}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                  onClick={toggleWatermarkHandler}
                >
                  {showWatermark ? "Hide" : "Show"} Watermark
                </button>
              </div>
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
                onClick={() => (window.location.href = "/quote")}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.section
        {...fadeIn}
        className="bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl p-6 border border-indigo-500/20"
      >
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Pick a Template",
              desc: "Choose a starting point that fits your needs.",
            },
            {
              step: "02",
              title: "Customize",
              desc: "Drag, drop, and edit to make it yours.",
            },
            {
              step: "03",
              title: "Animate",
              desc: "Add life with professional animations.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-gray-800/50 rounded-lg p-4">
              <span className="text-purple-400 text-2xl font-bold">
                {item.step}
              </span>
              <h4 className="text-white font-semibold mt-2 mb-1">
                {item.title}
              </h4>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default WebsiteBuilder;
