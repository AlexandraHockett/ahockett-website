"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import type { ElementType } from "./WebsiteBuilder";

// Register GSAP Draggable
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface DraggableElementProps {
  element: {
    id: string;
    type: ElementType;
    content?: string;
    position?: { x: number; y: number };
  };
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
}

export default function DraggableElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
}: DraggableElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Initialize draggable functionality
  useEffect(() => {
    if (!elementRef.current) return;

    const draggable = Draggable.create(elementRef.current, {
      type: "x,y",
      bounds: elementRef.current.parentElement,
      edgeResistance: 0.65,
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
    if (element.position) {
      gsap.set(elementRef.current, {
        x: element.position.x,
        y: element.position.y,
      });
    }

    return () => {
      draggable.kill();
    };
  }, [element.position, isSelected, onSelect]);

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
    switch (element.type) {
      case "heading":
        return (
          <h2
            className="text-2xl font-bold text-gray-800"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
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
          >
            {element.content}
          </button>
        );
      case "image":
        return (
          <div className="w-full h-52 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
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
        return <hr className="my-4 border-gray-300" />;
      case "spacer":
        return <div className={`h-8 ${isSelected ? "bg-gray-100" : ""}`}></div>;
      case "hero":
        return (
          <div className="w-full py-12 px-6 bg-gradient-to-r from-purple-600/90 to-indigo-600/90 rounded-lg text-white text-center">
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
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
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
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
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
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
            >
              {element.content}
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
          element.type === "button"
            ? "text"
            : ""}
        </div>
      )}
    </motion.div>
  );
}
