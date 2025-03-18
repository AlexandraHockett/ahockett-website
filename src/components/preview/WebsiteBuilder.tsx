"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import DraggableElement from "@/components/preview/DraggableElement";
import TemplateSelector from "@/components/preview/TemplateSelector";

// Register GSAP Draggable
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

// Element types for drag-and-drop
export type ElementType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "spacer"
  | "divider"
  | "hero"
  | "feature"
  | "testimonial";

// Available elements for drag and drop
const availableElements = [
  { type: "hero", label: "Hero Section" },
  { type: "heading", label: "Heading" },
  { type: "paragraph", label: "Text Block" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "feature", label: "Feature Box" },
  { type: "testimonial", label: "Testimonial" },
  { type: "divider", label: "Divider" },
  { type: "spacer", label: "Spacer" },
];

// Available templates
const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, modern design with minimal elements",
    image: "/images/templates/minimal.jpg",
  },
  {
    id: "business",
    name: "Business",
    description: "Professional layout for business websites",
    image: "/images/templates/business.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
    image: "/images/templates/creative.jpg",
  },
];

// Element data interface
interface ElementData {
  id: string;
  type: ElementType;
  content?: string;
  position?: { x: number; y: number };
}

export default function WebsiteBuilder() {
  const [activeTemplate, setActiveTemplate] = useState<string>("minimal");
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  const canvasRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  // Initialize with basic elements when template changes
  useEffect(() => {
    // Reset elements when template changes
    let initialElements: ElementData[] = [];

    // Add default elements based on template
    if (activeTemplate === "minimal") {
      initialElements = [
        { id: "hero-1", type: "hero", content: "Welcome to your website" },
        { id: "heading-1", type: "heading", content: "About Us" },
        {
          id: "paragraph-1",
          type: "paragraph",
          content:
            "This is where you can tell your story. Click to edit this text and make it your own.",
        },
      ];
    } else if (activeTemplate === "business") {
      initialElements = [
        { id: "hero-1", type: "hero", content: "Growing Your Business" },
        { id: "feature-1", type: "feature", content: "Our Services" },
        { id: "heading-1", type: "heading", content: "Why Choose Us" },
        {
          id: "paragraph-1",
          type: "paragraph",
          content: "We provide exceptional solutions for your business needs.",
        },
      ];
    } else if (activeTemplate === "creative") {
      initialElements = [
        { id: "hero-1", type: "hero", content: "Creative Solutions" },
        { id: "image-1", type: "image" },
        { id: "heading-1", type: "heading", content: "Portfolio" },
        { id: "button-1", type: "button", content: "Get in Touch" },
      ];
    }

    setElements(initialElements);
    setSelectedElement(null);
  }, [activeTemplate]);

  // Add a new element to the canvas
  const handleAddElement = (type: ElementType) => {
    const newElement: ElementData = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
    };

    setElements((prev) => [...prev, newElement]);

    // Animate the new element
    setTimeout(() => {
      const elementId = `element-${newElement.id}`;
      const element = document.getElementById(elementId);

      if (element) {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    }, 10);
  };

  // Get default content for new elements
  const getDefaultContent = (type: ElementType): string => {
    switch (type) {
      case "heading":
        return "New Heading";
      case "paragraph":
        return "Click to edit this text block and add your own content.";
      case "button":
        return "Click Me";
      case "hero":
        return "Your Hero Title";
      case "feature":
        return "Feature Title";
      case "testimonial":
        return "Client testimonial goes here";
      default:
        return "";
    }
  };

  // Handle element selection
  const handleSelectElement = (id: string) => {
    setSelectedElement(id === selectedElement ? null : id);
  };

  // Handle element content update
  const handleUpdateElement = (id: string, content: string) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content } : el))
    );
  };

  // Handle element deletion
  const handleDeleteElement = (id: string) => {
    const elementId = `element-${id}`;
    const element = document.getElementById(elementId);

    if (element) {
      gsap.to(element, {
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

  // Toggle watermark for demo purposes
  const toggleWatermark = () => {
    setShowWatermark((prev) => !prev);

    if (!showWatermark) {
      // Show upgrade message
      gsap.fromTo(
        ".upgrade-message",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      // Hide it after 3 seconds
      setTimeout(() => {
        gsap.to(".upgrade-message", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.in",
        });
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar - Elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-64 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl p-4 h-auto lg:h-[600px] overflow-y-auto"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Elements</h3>

        <div className="space-y-2" ref={elementsRef}>
          {availableElements.map((element, index) => (
            <motion.div
              key={element.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="element-item bg-gray-800 rounded-lg p-3 cursor-grab active:cursor-grabbing"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(124, 58, 237, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddElement(element.type as ElementType)}
            >
              <div className="flex items-center">
                <span className="text-purple-400 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <span className="text-white">{element.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center - Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1"
      >
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl p-4 overflow-hidden">
          <div className="bg-white rounded-lg h-[600px] overflow-y-auto relative">
            {/* Preview Canvas */}
            <div
              ref={canvasRef}
              className="min-h-full w-full p-6 bg-white relative"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {/* Elements */}
              {elements.map((element) => (
                <DraggableElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElement === element.id}
                  onSelect={() => handleSelectElement(element.id)}
                  onUpdate={(content) =>
                    handleUpdateElement(element.id, content)
                  }
                  onDelete={() => handleDeleteElement(element.id)}
                />
              ))}

              {/* Watermark */}
              {showWatermark && (
                <div className="fixed bottom-0 right-0 left-0 bg-purple-600/90 text-white py-2 px-4 text-center font-medium">
                  Preview Mode - Contact me to create your custom website
                  without this banner
                </div>
              )}

              {/* Upgrade Message (Hidden initially) */}
              <div className="upgrade-message fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-900/90 text-white py-3 px-6 rounded-lg shadow-xl opacity-0">
                <span className="font-medium">
                  This is a preview – get the full experience by hiring me!
                </span>
              </div>

              {/* Empty State */}
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
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                onClick={() => setElements([])}
              >
                Clear Canvas
              </button>
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                onClick={toggleWatermark}
              >
                {showWatermark ? "Hide" : "Show"} Watermark
              </button>
            </div>

            <button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
              onClick={() => {
                toggleWatermark();
                if (showWatermark) {
                  window.location.href = "/quote";
                }
              }}
            >
              Get Full Version
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Sidebar - Templates & Properties */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:w-72 space-y-6"
      >
        {/* Template Selector */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Templates</h3>

          <div className="space-y-3">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTemplate === template.id
                    ? "bg-purple-600/20 border border-purple-500/50"
                    : "bg-gray-800 hover:bg-gray-700 border border-transparent"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTemplate(template.id)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-700 rounded-md mr-3 flex items-center justify-center overflow-hidden">
                    {template.image ? (
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
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
                        className="text-gray-400"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <p className="text-gray-400 text-xs">
                      {template.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Properties Panel (only when element is selected) */}
        {selectedElement && (
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Properties
            </h3>

            <div className="space-y-4">
              {/* Element Type */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Element Type
                </label>
                <div className="px-3 py-2 bg-gray-800 rounded-lg text-white">
                  {elements.find((el) => el.id === selectedElement)?.type}
                </div>
              </div>

              {/* Content (for editable elements) */}
              {[
                "heading",
                "paragraph",
                "button",
                "hero",
                "feature",
                "testimonial",
              ].includes(
                elements.find((el) => el.id === selectedElement)?.type || ""
              ) && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1">
                    Content
                  </label>
                  <textarea
                    value={
                      elements.find((el) => el.id === selectedElement)
                        ?.content || ""
                    }
                    onChange={(e) => {
                      if (selectedElement) {
                        handleUpdateElement(selectedElement, e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    rows={3}
                  />
                </div>
              )}

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (selectedElement) {
                    handleDeleteElement(selectedElement);
                  }
                }}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 mt-4"
              >
                Delete Element
              </button>
            </div>
          </div>
        )}

        {/* 'Wow' Factor */}
        <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-300"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Wow Meter</h3>
          </div>

          <div className="mb-3">
            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
                style={{ width: `${Math.min(elements.length * 10, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Basic</span>
              <span>Impressive</span>
              <span>Wow!</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm">
            Add more elements to increase the wow factor! For the full
            experience with animations and interactivity, get in touch for a
            custom quote.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
