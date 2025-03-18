// src/components/preview/ElementsPanel.tsx
import React from "react";
import { motion } from "framer-motion";
import { availableElements } from "@/data/website-builder-data";
import { ElementType } from "@/types/website-builder";

interface ElementsPanelProps {
  onAddElement: (type: ElementType) => void;
}

const ElementsPanel: React.FC<ElementsPanelProps> = ({ onAddElement }) => {
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

  // Render element card
  const renderElementCard = (element: (typeof availableElements)[0]) => (
    <motion.div
      key={element.type}
      className="element-item bg-gray-800/70 rounded-lg p-3 cursor-grab active:cursor-grabbing"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(124, 58, 237, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onAddElement(element.type as ElementType)}
    >
      <div className="text-center">
        <div className="bg-gray-700/50 w-full h-10 rounded-md mb-2 flex items-center justify-center">
          <span className="text-purple-400">
            {getElementIcon(element.type)}
          </span>
        </div>
        <span className="text-white text-sm">{element.label}</span>
      </div>
    </motion.div>
  );

  // Get appropriate icon for element type
  const getElementIcon = (type: ElementType) => {
    switch (type) {
      case "hero":
        return "H";
      case "feature":
        return "F";
      case "testimonial":
        return "T";
      case "gallery":
        return "G";
      case "parallax":
        return "P";
      case "heading":
        return "Aa";
      case "paragraph":
        return "¶";
      case "image":
        return "🖼️";
      case "button":
        return "BTN";
      case "counter":
        return "123";
      case "video":
        return "▶️";
      case "form":
        return "📝";
      case "divider":
        return "—";
      case "spacer":
        return "⋮";
      default:
        return "•";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Elements</h3>

      {/* Element categories */}
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
  );
};

export default ElementsPanel;
