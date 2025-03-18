// src/components/preview/DraggableElement.tsx
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ElementType, ElementData } from "@/types/website-builder";

// Register GSAP Draggable
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface DraggableElementProps {
  element: ElementData;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  showGridLines: boolean;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  showGridLines,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  // Initialize draggable functionality
  useEffect(() => {
    if (!elementRef.current) return;

    // Create the draggable instance with snapping to a grid if grid lines are shown
    const draggable = Draggable.create(elementRef.current, {
      type: "x,y",
      bounds: elementRef.current.parentElement,
      edgeResistance: 0.65,
      snap: showGridLines
        ? {
            x: (value) => Math.round(value / 20) * 20,
            y: (value) => Math.round(value / 20) * 20,
          }
        : undefined,
      onDragStart: function () {
        onSelect();
        gsap.to(elementRef.current, {
          zIndex: 10,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          duration: 0.2,
        });
      },
      onDragEnd: function () {
        gsap.to(elementRef.current, {
          zIndex: isSelected ? 5 : 1,
          boxShadow: "none",
          duration: 0.2,
        });
      },
    })[0];

    // Position if available
    if (element.gridPosition) {
      gsap.set(elementRef.current, {
        x: element.gridPosition.col * 20,
        y: element.gridPosition.row * 20,
      });
    }

    return () => {
      draggable.kill();
    };
  }, [element.gridPosition, isSelected, onSelect, showGridLines]);

  // Set selection states
  useEffect(() => {
    if (!elementRef.current) return;

    if (isSelected) {
      gsap.to(elementRef.current, {
        boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)",
        zIndex: 5,
        duration: 0.2,
      });
    } else {
      gsap.to(elementRef.current, {
        boxShadow: "none",
        zIndex: 1,
        duration: 0.2,
      });
    }
  }, [isSelected]);

  // Render different elements based on type
  const renderElement = () => {
    // Apply custom element styles if available
    const elementStyles = element.styles || {};

    switch (element.type) {
      case "heading":
        return (
          <h2
            className="text-2xl font-bold text-gray-800"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            data-content
            style={elementStyles}
          >
            {element.content}
          </h2>
        );
      case "paragraph":
        return (
          <p
            className="text-gray-600"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            data-content
            style={elementStyles}
          >
            {element.content}
          </p>
        );
      case "button":
        return (
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            data-content
            style={elementStyles}
          >
            {element.content}
          </button>
        );
      case "image":
        return (
          <div
            className="w-full h-52 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden"
            style={elementStyles}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <span>Image placeholder (Upload disabled in preview)</span>
              </div>
            )}
          </div>
        );
      case "divider":
        return <hr className="my-4 border-gray-300" style={elementStyles} />;
      case "spacer":
        return (
          <div
            className={`h-8 ${isSelected ? "bg-gray-100" : ""}`}
            style={elementStyles}
          ></div>
        );
      case "hero":
        return (
          <div
            className="w-full py-12 px-6 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 rounded-lg text-white text-center"
            style={elementStyles}
          >
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
              data-content
            >
              {element.content}
            </h1>
            <p className="text-lg text-white/80">
              Your compelling subtitle goes here
            </p>
            <div className="mt-6">
              <button className="px-6 py-2 bg-white text-purple-600 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>
        );
      case "feature":
        return (
          <div
            className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
            style={elementStyles}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
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
                className="text-purple-600"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-gray-800 mb-2"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
              data-content
            >
              {element.content}
            </h3>
            <p className="text-gray-600">
              Description of this amazing feature that helps your customers.
            </p>
          </div>
        );
      case "testimonial":
        return (
          <div
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            style={elementStyles}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <h4 className="font-medium text-gray-800">Client Name</h4>
                <p className="text-sm text-gray-500">CEO, Company Name</p>
              </div>
            </div>
            <div
              className="text-gray-600 italic"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
              data-content
            >
              {element.content}
            </div>
          </div>
        );
      case "gallery":
        return (
          <div className="grid grid-cols-3 gap-2" style={elementStyles}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-md flex items-center justify-center"
              >
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
                  className="text-gray-400"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            ))}
          </div>
        );
      case "parallax":
        return (
          <div
            className="relative h-60 overflow-hidden rounded-lg"
            style={elementStyles}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/90 to-indigo-800/90">
              <div className="absolute inset-0 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${Math.random() * 10 + 2}px`,
                      height: `${Math.random() * 10 + 2}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 10 + 10}s`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center text-white">
              <h3
                className="text-2xl font-bold"
                contentEditable={isSelected}
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
                data-content
              >
                {element.content}
              </h3>
            </div>
          </div>
        );
      case "counter":
        return (
          <div
            className="p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg text-center"
            style={elementStyles}
          >
            <span
              className="text-4xl font-bold text-purple-700"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
              data-content
            >
              {element.content}
            </span>
            <p className="text-purple-800">Happy Customers</p>
          </div>
        );
      case "form":
        return (
          <div
            className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
            style={elementStyles}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                  placeholder="Your message"
                  rows={3}
                ></textarea>
              </div>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                disabled
              >
                Send Message
              </button>
            </div>
          </div>
        );
      case "video":
        return (
          <div
            className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center relative"
            style={elementStyles}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white ml-1"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div className="absolute bottom-4 left-4 text-white text-sm">
              Video Placeholder
            </div>
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      id={`element-${element.id}`}
      className={`element relative cursor-move mb-4 ${
        isSelected ? "outline-none" : ""
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {renderElement()}

      {/* Handle visible when selected */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 flex gap-1">
          <button
            className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300 hover:bg-red-100 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete element"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-500"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div
            className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-300 cursor-move"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M12 12h.01"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Add editing indicator */}
      {isSelected && (
        <div className="absolute -bottom-3 left-0 text-xs bg-purple-600 text-white px-2 py-1 rounded-sm">
          {element.type} • Click to edit{" "}
          {element.type === "paragraph" ||
          element.type === "heading" ||
          element.type === "button" ||
          element.type === "hero" ||
          element.type === "feature" ||
          element.type === "testimonial" ||
          element.type === "parallax"
            ? "text"
            : ""}
        </div>
      )}

      {/* Animation indicator */}
      {element.animation && !isSelected && (
        <div className="absolute -top-2 right-0 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-sm">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <polyline points="13 2 13 9 20 9"></polyline>
              <path d="M11 16.8V22l4-2.4l4 2.4v-5.2"></path>
              <path d="M21 11.5v-1a2.5 2.5 0 0 0-5 0v1"></path>
              <path d="M2 2l20 20"></path>
            </svg>
            {element.animation}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default DraggableElement;
