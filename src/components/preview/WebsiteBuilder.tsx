"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// Import React Icons
import { FaCube, FaPlay, FaPalette, FaMobileAlt } from "react-icons/fa";

// Import custom hooks
import useWindowSize from "@/hooks/useWindowSize";

// Import types and utilities
import {
  ElementType,
  ElementData,
  SidebarPanel,
  PreviewDevice,
  AnimationPreset,
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

// Register GSAP plugins on client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

const WebsiteBuilder: React.FC = () => {
  const { isDesktop } = useWindowSize();

  // State management
  const [activeTemplate, setActiveTemplate] = useState<string>("minimal");
  const [activeColorTheme, setActiveColorTheme] = useState<string>("purple");
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [activeSidebar, setActiveSidebar] = useState<SidebarPanel>("elements");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [showTimelineEditor, setShowTimelineEditor] = useState<boolean>(false);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const dragSourceRef = useRef<string | null>(null);
  const draggableInstancesRef = useRef<Draggable[]>([]); // Store Draggable instances

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

    if (typeof window !== "undefined") {
      timelineRef.current?.kill();
      timelineRef.current = gsap.timeline();
      initializeAnimations(elements, timelineRef.current);
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [elements, showTimelineEditor]);

  // Initialize drag and drop functionality for sidebar elements
  useEffect(() => {
    const elementItems = document.querySelectorAll(".element-item");
    const canvas = canvasRef.current;

    if (!canvas || !elementItems.length) return;

    // Clean up previous instances
    draggableInstancesRef.current.forEach((d) => d.kill());
    draggableInstancesRef.current = [];

    // Setup draggable elements in the sidebar
    elementItems.forEach((item) => {
      const draggableInstance = Draggable.create(item, {
        type: "x,y",
        bounds: document.body,
        onDragStart: function () {
          setIsDragging(true);
          const targetElement = this.target as HTMLElement;
          const elementType = targetElement.getAttribute(
            "data-element-type"
          ) as ElementType;
          if (elementType) {
            dragSourceRef.current = elementType;
          }

          // Visual feedback
          gsap.to(this.target, {
            scale: 0.8,
            opacity: 0.8,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
          });
        },
        onDrag: function (e) {
          // Check if we're over the canvas
          const bounds = canvas.getBoundingClientRect();
          const isOverCanvas =
            e.clientX >= bounds.left &&
            e.clientX <= bounds.right &&
            e.clientY >= bounds.top &&
            e.clientY <= bounds.bottom;

          // Visual feedback when over dropzone
          if (isOverCanvas) {
            canvas.classList.add("canvas-highlight");
          } else {
            canvas.classList.remove("canvas-highlight");
          }
        },
        onDragEnd: function (e) {
          setIsDragging(false);

          // Reset visual state
          gsap.to(this.target, {
            scale: 1,
            opacity: 1,
            boxShadow: "none",
            duration: 0.3,
            clearProps: "all",
          });

          // Check if dropped over the canvas
          const bounds = canvas.getBoundingClientRect();
          const isOverCanvas =
            e.clientX >= bounds.left &&
            e.clientX <= bounds.right &&
            e.clientY >= bounds.top &&
            e.clientY <= bounds.bottom;

          canvas.classList.remove("canvas-highlight");

          if (isOverCanvas && dragSourceRef.current) {
            // Calculate relative position within canvas
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            // Calculate grid position if grid is enabled
            const gridCol = showGridLines ? Math.floor(x / 20) : Math.floor(x);
            const gridRow = showGridLines ? Math.floor(y / 20) : Math.floor(y);

            // Add new element
            addElement(dragSourceRef.current as ElementType, {
              row: gridRow,
              col: gridCol,
            });
          }

          dragSourceRef.current = null;
        },
      })[0]; // Get the first instance from the array returned by Draggable.create

      draggableInstancesRef.current.push(draggableInstance);
    });

    return () => {
      // Clean up draggables
      draggableInstancesRef.current.forEach((d) => d.kill());
      draggableInstancesRef.current = [];
    };
  }, [activeSidebar, elements, showGridLines]);

  // Handlers
  const addElement = (
    type: ElementType,
    position?: { row: number; col: number } // Ainda recebido como row/col do drag-and-drop
  ) => {
    const newElement: ElementData = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      animation: undefined,
      animationDelay: 0,
      position: position
        ? { x: position.col * 20, y: position.row * 20 } // Converter para x/y
        : { x: 0, y: 0 },
    };

    setElements((prev) => [...prev, newElement]);
    setSelectedElement(newElement.id);

    if (!isDesktop) {
      setIsMobileMenuOpen(false);
    }
  };

  const updateElement = (id: string, updates: Partial<ElementData>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    if (typeof window !== "undefined") {
      gsap.to(`#element-${id}`, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          setElements((prev) => prev.filter((el) => el.id !== id));
          setSelectedElement(null);
        },
      });
    } else {
      setElements((prev) => prev.filter((el) => el.id !== id));
      setSelectedElement(null);
    }
  };

  const toggleWatermarkHandler = () => {
    setShowWatermark((prev) => !prev);
    if (!showWatermark && typeof window !== "undefined") {
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
    if (timelineRef.current && typeof window !== "undefined") {
      timelineRef.current = resetAnimationsUtil(elements, timelineRef.current);
      timelineRef.current.play(0);
    }
  };

  const handleSidebarChange = (panel: SidebarPanel) => {
    setActiveSidebar(panel);
    if (!isDesktop) {
      setIsMobileMenuOpen(true);
    }
  };

  const applyAnimation = (id: string, animation: AnimationPreset) => {
    updateElement(id, { animation });

    const elementNode = document.getElementById(`element-${id}`);
    if (elementNode && typeof window !== "undefined") {
      const tl = gsap.timeline();

      switch (animation) {
        case "fadeIn":
          tl.fromTo(
            elementNode,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" }
          );
          break;
        case "slideIn":
          tl.fromTo(
            elementNode,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
          break;
        case "bounce":
          tl.fromTo(
            elementNode,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
          );
          break;
        default:
          tl.to(elementNode, {
            boxShadow: "0 0 0 2px rgba(147, 51, 234, 0.8)",
            duration: 0.3,
          }).to(elementNode, { boxShadow: "none", duration: 0.3 });
      }
    }
  };

  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case "elements":
        return <ElementsPanel onAddElement={addElement} />;
      case "animations":
        return (
          <AnimationsPanel
            selectedElement={selectedElement}
            elements={elements}
            onApplyAnimation={applyAnimation}
            onResetAnimations={resetAnimations}
            onToggleTimelineEditor={() =>
              setShowTimelineEditor((prev) => !prev)
            }
            showTimelineEditor={showTimelineEditor}
          />
        );
      case "theme":
        return (
          <ThemePanel
            activeColorTheme={activeColorTheme}
            onSelectTheme={setActiveColorTheme}
            onToggleGridLines={() => setShowGridLines((prev) => !prev)}
            showGridLines={showGridLines}
          />
        );
      case "device":
        return (
          <DevicePanel
            activeDevice={previewDevice}
            onSelectDevice={setPreviewDevice}
          />
        );
      default:
        return <ElementsPanel onAddElement={addElement} />;
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
      <div className="relative flex flex-col lg:flex-row gap-6 max-w-[1440px] mx-auto">
        {/* Mobile Sidebar Toggle Button */}
        <div className="lg:hidden flex justify-center mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white flex items-center"
          >
            {isMobileMenuOpen ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Close Panel
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                Open Editor Panel
              </>
            )}
          </button>
        </div>

        {/* Navigation Tabs for Mobile */}
        <div className="lg:hidden bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl border border-indigo-500/20 p-2 mb-4">
          <nav className="flex justify-between space-x-2">
            {[
              { id: "elements", icon: <FaCube />, label: "Elements" },
              { id: "animations", icon: <FaPlay />, label: "Animations" },
              { id: "theme", icon: <FaPalette />, label: "Theme" },
              { id: "device", icon: <FaMobileAlt />, label: "Device" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 p-2 text-sm font-medium flex flex-col items-center ${
                  activeSidebar === tab.id
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => handleSidebarChange(tab.id as SidebarPanel)}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {(isMobileMenuOpen || isDesktop) && (
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="z-20 bg-gradient-to-br from-gray-900/90 to-indigo-950/90 rounded-2xl border border-indigo-500/20 p-4 w-full lg:w-80 max-w-[320px]"
            >
              <nav className="hidden lg:flex justify-between space-x-2 border-b border-indigo-700/50 mb-4">
                {[
                  { id: "elements", icon: <FaCube />, label: "Elements" },
                  { id: "animations", icon: <FaPlay />, label: "Animations" },
                  { id: "theme", icon: <FaPalette />, label: "Theme" },
                  { id: "device", icon: <FaMobileAlt />, label: "Device" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 p-3 text-sm font-medium flex flex-col items-center ${
                      activeSidebar === tab.id
                        ? "text-purple-400 border-b-2 border-purple-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveSidebar(tab.id as SidebarPanel)}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-xs mt-1">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="lg:hidden flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {activeSidebar.charAt(0).toUpperCase() +
                    activeSidebar.slice(1)}{" "}
                  Panel
                </h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="h-[650px] overflow-y-auto custom-scrollbar">
                {renderSidebarContent()}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Canvas */}
        <motion.div {...fadeIn} className="flex-1 w-full">
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
              className={`bg-white rounded-b-lg overflow-hidden transition-all duration-300 mx-auto ${
                previewDevice === "desktop"
                  ? "w-full max-w-[1200px]"
                  : previewDevice === "tablet"
                    ? "w-full max-w-[768px]"
                    : "w-full max-w-[375px]"
              }`}
            >
              <div
                className="min-h-[600px] p-6 relative canvas-area"
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
                        {isDragging ? (
                          <span className="text-purple-600 font-medium">
                            Drop here to add to canvas!
                          </span>
                        ) : (
                          <span>
                            Drag an element from the sidebar or click to add to
                            your canvas
                          </span>
                        )}
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
                    onPositionUpdate={(x: number, y: number) =>
                      updateElement(element.id, { position: { x, y } })
                    } // Adicionado
                  />
                ))}
                {showWatermark && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 text-center font-medium shadow-lg">
                    Preview Mode - Contact me for a custom solution!
                  </div>
                )}
                <div className="upgrade-message absolute top-4 left-1/2 -translate-x-1/2 bg-indigo-900/90 text-white py-2 px-4 rounded-lg opacity-0 shadow-lg">
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
            <div className="mt-4 flex flex-wrap gap-2 justify-between">
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors duration-200"
                  onClick={() => setElements([])}
                >
                  Clear Canvas
                </button>
                <button
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200"
                  onClick={toggleWatermarkHandler}
                >
                  {showWatermark ? "Hide" : "Show"} Watermark
                </button>
              </div>
              <button
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={() => (window.location.href = "/quote")}
              >
                Get a Custom Quote
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
            <div
              key={item.step}
              className="bg-gray-800/50 rounded-lg p-4 transition-transform duration-300 hover:-translate-y-2"
            >
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
