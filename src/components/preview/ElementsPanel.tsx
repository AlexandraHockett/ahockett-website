// src/components/preview/ElementsPanel.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { availableElements } from "@/data/website-builder-data";
import { ElementType } from "@/types/website-builder";

interface ElementsPanelProps {
  onAddElement: (type: ElementType) => void;
}

const ElementsPanel: React.FC<ElementsPanelProps> = ({ onAddElement }) => {
  const [activeCategory, setActiveCategory] = useState<string>("sections");

  // Group elements by category
  const sectionElements = availableElements.filter(
    (el) => el.category === "sections"
  );
  const basicElements = availableElements.filter(
    (el) => el.category === "basic"
  );
  const interactiveElements = availableElements.filter(
    (el) => el.category === "interactive"
  );
  const layoutElements = availableElements.filter(
    (el) => el.category === "layout"
  );

  // Category tabs for smaller screens
  const categories = [
    { id: "sections", label: "Sections" },
    { id: "basic", label: "Basic" },
    { id: "interactive", label: "Interactive" },
    { id: "layout", label: "Layout" },
  ];

  // Render element card that's draggable
  const renderElementCard = (element: (typeof availableElements)[0]) => (
    <motion.div
      key={element.type}
      className="element-item bg-gray-800/70 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:bg-indigo-800/30 border border-transparent hover:border-indigo-500/30 transition-all duration-300"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(124, 58, 237, 0.3)",
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAddElement(element.type as ElementType)}
      data-element-type={element.type}
    >
      <div className="text-center">
        <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/70 w-full h-12 rounded-md mb-2 flex items-center justify-center">
          <span className="text-purple-400 font-medium text-xl">
            {getElementIcon(element.type)}
          </span>
        </div>
        <span className="text-white text-sm font-medium">{element.label}</span>
      </div>
    </motion.div>
  );

  // Get appropriate icon for element type
  const getElementIcon = (type: ElementType) => {
    switch (type) {
      case "hero":
        return (
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
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <text
              x="12"
              y="14"
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
            >
              H
            </text>
          </svg>
        );
      case "feature":
        return (
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
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        );
      case "testimonial":
        return (
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
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case "gallery":
        return (
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
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
      case "parallax":
        return (
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
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        );
      case "heading":
        return (
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
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
          </svg>
        );
      case "paragraph":
        return (
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
          >
            <line x1="17" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
          </svg>
        );
      case "image":
        return (
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
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
      case "button":
        return (
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
          >
            <rect x="3" y="8" width="18" height="8" rx="2" ry="2"></rect>
          </svg>
        );
      case "counter":
        return (
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
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case "video":
        return (
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
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="10" y1="8" x2="10" y2="16"></line>
            <line x1="14" y1="8" x2="14" y2="16"></line>
          </svg>
        );
      case "form":
        return (
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
          >
            <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case "divider":
        return (
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
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
          </svg>
        );
      case "spacer":
        return (
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
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        );
      default:
        return "•";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Elements</h3>

      {/* Category Tabs for Mobile View */}
      <div className="flex overflow-x-auto space-x-2 pb-2 md:hidden">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap ${
              activeCategory === category.id
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Desktop View - All Categories */}
      <div className="hidden md:block space-y-4">
        <div className="mb-4">
          <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
            Sections
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {sectionElements.map(renderElementCard)}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
            Basic Elements
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {basicElements.map(renderElementCard)}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
            Interactive
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {interactiveElements.map(renderElementCard)}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
            Layout
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {layoutElements.map(renderElementCard)}
          </div>
        </div>
      </div>

      {/* Mobile View - Active Category Only */}
      <div className="md:hidden">
        {activeCategory === "sections" && (
          <div>
            <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
              Sections
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {sectionElements.map(renderElementCard)}
            </div>
          </div>
        )}

        {activeCategory === "basic" && (
          <div>
            <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
              Basic Elements
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {basicElements.map(renderElementCard)}
            </div>
          </div>
        )}

        {activeCategory === "interactive" && (
          <div>
            <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
              Interactive
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {interactiveElements.map(renderElementCard)}
            </div>
          </div>
        )}

        {activeCategory === "layout" && (
          <div>
            <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
              Layout
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {layoutElements.map(renderElementCard)}
            </div>
          </div>
        )}
      </div>

      {/* Drag & Drop Tips */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <h4 className="text-white text-sm font-medium mb-2 flex items-center">
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
              className="text-purple-400 mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Drag & Drop Tips
          </h4>
          <ul className="text-gray-300 text-xs space-y-1">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Drag elements from here to the canvas</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Click an element to add it directly</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Select elements on canvas to edit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;
