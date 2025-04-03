"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { availableElements } from "@/data/website-builder-data";
import { ElementType } from "@/types/website-builder";

interface ElementsPanelProps {
  onAddElement: (type: ElementType) => void;
}

const ElementsPanel: React.FC<ElementsPanelProps> = ({ onAddElement }) => {
  const [activeCategory, setActiveCategory] = useState<string>("sections");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentlyUsed, setRecentlyUsed] = useState<ElementType[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Load recently used elements from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRecent = localStorage.getItem("recentlyUsedElements");
      if (storedRecent) {
        try {
          const parsed = JSON.parse(storedRecent) as ElementType[];
          setRecentlyUsed(parsed);
        } catch (error) {
          console.error("Failed to parse recently used elements:", error);
        }
      }
    }
  }, []);

  // Update recently used elements when an element is added
  const handleAddElement = (type: ElementType) => {
    onAddElement(type);

    // Update recently used elements
    const updatedRecent = [type, ...recentlyUsed.filter((item) => item !== type)].slice(0, 5);
    setRecentlyUsed(updatedRecent);

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("recentlyUsedElements", JSON.stringify(updatedRecent));
    }
  };

  // Group elements by category
  const sectionElements = availableElements.filter((el) => el.category === "sections");
  const basicElements = availableElements.filter((el) => el.category === "basic");
  const interactiveElements = availableElements.filter((el) => el.category === "interactive");
  const layoutElements = availableElements.filter((el) => el.category === "layout");

  // Filter elements based on search term
  const filteredElements = searchTerm
    ? availableElements.filter((el) =>
        el.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        el.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Category tabs for navigation
  const categories = [
    {
      id: "recent",
      label: "Recent",
      elements: recentlyUsed
        .map((type) => availableElements.find((el) => el.type === type))
        .filter(Boolean),
    },
    { id: "sections", label: "Sections", elements: sectionElements },
    { id: "basic", label: "Basic", elements: basicElements },
    { id: "interactive", label: "Interactive", elements: interactiveElements },
    { id: "layout", label: "Layout", elements: layoutElements },
  ];

  // Toggle expanded category description
  const toggleExpandCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Get element icon based on type
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
            <text x="12" y="14" textAnchor="middle" fontSize="10" fill="currentColor">
              H
            </text>
          </svg>
        );
      // Add other cases for different element types...
      default:
        return "•";
    }
  };

  // Render individual element card
  const renderElementCard = (element: any) => (
    <motion.div
      key={element.type}
      className="element-item bg-gray-800/70 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:bg-indigo-800/30 border border-transparent hover:border-indigo-500/30 transition-all duration-300"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(124, 58, 237, 0.3)",
        boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleAddElement(element.type as ElementType)}
      onDoubleClick={() => handleAddElement(element.type as ElementType)}
      data-element-type={element.type}
      title={`${element.label}: Click or drag to add to canvas`}
    >
      <div className="text-center">
        <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/70 w-full h-12 rounded-md mb-2 flex items-center justify-center">
          <span className="text-purple-400 font-medium text-xl">
            {getElementIcon(element.type as ElementType)}
          </span>
        </div>
        <span className="text-white text-sm font-medium">{element.label}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Elements</h3>

      {/* Search box */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800/70 border border-gray-700 focus:border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            onClick={() => setSearchTerm("")}
          >
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Search results */}
      {searchTerm && (
        <div className="mb-4">
          <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
            Search Results
          </h4>
          {filteredElements.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredElements.map(renderElementCard)}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">
              No elements found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}

      {/* Category Tabs for Mobile View */}
      {!searchTerm && (
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
      )}

      {/* Desktop View - All Categories */}
      {!searchTerm && (
        <div className="hidden md:block space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <div
                className="flex justify-between items-center mb-2 cursor-pointer"
                onClick={() => toggleExpandCategory(category.id)}
              >
                <h4 className="text-sm text-purple-300 font-medium uppercase">
                  {category.label}
                </h4>
                <button className="text-gray-400 hover:text-gray-300">
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
                    className={`transition-transform duration-300 ${
                      expandedCategory === category.id ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              {expandedCategory === category.id && (
                <p className="text-gray-400 text-xs mb-3">
                  {category.id === "sections" &&
                    "Complete sections to build your page structure quickly."}
                  {category.id === "basic" &&
                    "Fundamental elements for content and layout."}
                  {category.id === "interactive" &&
                    "Elements that engage users with dynamic functionality."}
                  {category.id === "layout" &&
                    "Structural elements to arrange your content."}
                  {category.id === "recent" &&
                    "Elements you've used recently for quick access."}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {category.elements.map((element) =>
                  element ? renderElementCard(element) : null
                )}

                {category.elements.length === 0 && (
                  <div className="col-span-2 text-center py-4 text-gray-400 text-sm">
                    {category.id === "recent"
                      ? "No recently used elements"
                      : "No elements in this category"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile View - Active Category Only */}
      {!searchTerm && (
        <div className="md:hidden">
          {categories.map(
            (category) =>
              category.id === activeCategory && (
                <div key={category.id}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-purple-300 font-medium uppercase">
                      {category.label}
                    </h4>
                    <button
                      className="text-gray-400 hover:text-gray-300"
                      onClick={() => toggleExpandCategory(category.id)}
                    >
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
                        className={`transition-transform duration-300 ${
                          expandedCategory === category.id ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  {expandedCategory === category.id && (
                    <p className="text-gray-400 text-xs mb-3">
                      {category.id === "sections" &&
                        "Complete sections to build your page structure quickly."}
                      {category.id === "basic" &&
                        "Fundamental elements for content and layout."}
                      {category.id === "interactive" &&
                        "Elements that engage users with dynamic functionality."}
                      {category.id === "layout" &&
                        "Structural elements to arrange your content."}
                      {category.id === "recent" &&
                        "Elements you've used recently for quick access."}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {category.elements.map((element) =>
                      element ? renderElementCard(element) : null
                    )}

                    {category.elements.length === 0 && (
                      <div className="col-span-2 text-center py-4 text-gray-400 text-sm">
                        {category.id === "recent"
                          ? "No recently used elements"
                          : "No elements in this category"}
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Element Info Box */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-lg p-4">
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
            Pro Tips
          </h4>
          <ul className="text-gray-300 text-xs space-y-2">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                <strong>Click</strong> to add an element directly to the canvas
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                <strong>Drag</strong> elements for precise positioning
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Use <strong>sections</strong> for pre-designed components
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>
                Find elements quickly with the <strong>search</strong> box
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Element Shortcuts */}
      <div className="mt-4">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
          Quick Add Shortcuts
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { type: "heading", label: "H" },
            { type: "paragraph", label: "P" },
            { type: "button", label: "B" },
            { type: "image", label: "I" },
          ].map((item) => (
            <motion.button
              key={item.type}
              className="bg-gray-800 hover:bg-purple-900/30 rounded-lg p-3 flex items-center justify-center border border-gray-700 hover:border-purple-500/30 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddElement(item.type as ElementType)}
            >
              <span className="text-purple-400 text-xl font-bold">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;
