"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ElementData } from "@/types/website-builder";

interface LayersPanelProps {
  elements: ElementData[];
  selectedElement: string | null;
  elementZIndexes: Record<string, number>;
  onSelectElement: (id: string) => void;
  onUpdateZIndex: (id: string, newZIndex: number) => void;
  onDeleteElement: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onToggleLock?: (id: string) => void;
  onRenameElement?: (id: string, newName: string) => void;
  onCreateGroup?: (elementIds: string[]) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  elements,
  selectedElement,
  elementZIndexes,
  onSelectElement,
  onUpdateZIndex,
  onDeleteElement,
  onToggleVisibility,
  onToggleLock,
  onRenameElement,
  onCreateGroup,
}) => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [isReordering, setIsReordering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const draggedLayer = useRef<string | null>(null);
  const dragOverLayer = useRef<string | null>(null);

  // Sort elements by z-index (highest to lowest)
  const sortedElements = [...elements].sort(
    (a, b) => elementZIndexes[b.id] - elementZIndexes[a.id]
  );

  // Filter elements by search term
  const filteredElements = searchTerm
    ? sortedElements.filter(
        (el) =>
          el.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (el.content &&
            el.content.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : sortedElements;

  // Handle multi-select with Shift key
  const handleSelectWithShift = (
    id: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.shiftKey) {
      // Toggle selection
      if (selectedLayers.includes(id)) {
        setSelectedLayers(selectedLayers.filter((layerId) => layerId !== id));
      } else {
        setSelectedLayers([...selectedLayers, id]);
      }
    } else {
      // Single selection
      onSelectElement(id);
      setSelectedLayers([id]);
    }
  };

  // Handle layer drag start
  const handleDragStart = (id: string) => {
    draggedLayer.current = id;
    setIsReordering(true);
  };

  // Handle layer drag over
  const handleDragOver = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedLayer.current && draggedLayer.current !== id) {
      dragOverLayer.current = id;
    }
  };

  // Handle layer drop
  const handleDrop = (id: string) => {
    if (draggedLayer.current && dragOverLayer.current) {
      const draggedZIndex = elementZIndexes[draggedLayer.current];
      const dropZIndex = elementZIndexes[dragOverLayer.current];

      // Update z-index to place dragged element after the drop target
      onUpdateZIndex(draggedLayer.current, dropZIndex);

      // Update other elements' z-indexes to maintain order
      elements.forEach((el) => {
        if (el.id !== draggedLayer.current) {
          const currentZ = elementZIndexes[el.id];

          // If between the drag source and drop target, shift z-index
          if (
            (draggedZIndex > dropZIndex &&
              currentZ >= dropZIndex &&
              currentZ < draggedZIndex) ||
            (draggedZIndex < dropZIndex &&
              currentZ <= dropZIndex &&
              currentZ > draggedZIndex)
          ) {
            onUpdateZIndex(
              el.id,
              draggedZIndex > dropZIndex ? currentZ + 1 : currentZ - 1
            );
          }
        }
      });
    }

    // Reset drag state
    draggedLayer.current = null;
    dragOverLayer.current = null;
    setIsReordering(false);
  };

  // Handle drag end (cleanup)
  const handleDragEnd = () => {
    draggedLayer.current = null;
    dragOverLayer.current = null;
    setIsReordering(false);
  };

  // Handle renaming an element
  const startRenaming = (id: string, currentName: string) => {
    setEditingName(id);
    setNewName(currentName);
  };

  const completeRenaming = () => {
    if (editingName && onRenameElement) {
      onRenameElement(editingName, newName);
    }
    setEditingName(null);
    setNewName("");
  };

  // Create a group from selected elements
  const handleCreateGroup = () => {
    if (selectedLayers.length > 1 && onCreateGroup) {
      onCreateGroup(selectedLayers);
      setSelectedLayers([]);
    }
  };

  // Move an element to top/bottom of stack
  const moveToTop = (id: string) => {
    const highestZ = Math.max(...Object.values(elementZIndexes)) + 1;
    onUpdateZIndex(id, highestZ);
  };

  const moveToBottom = (id: string) => {
    const lowestZ = Math.min(...Object.values(elementZIndexes)) - 1;
    onUpdateZIndex(id, lowestZ);
  };

  // Get element type icon
  const getElementTypeIcon = (type: string) => {
    switch (type) {
      case "heading":
        return "H";
      case "paragraph":
        return "P";
      case "button":
        return "B";
      case "image":
        return "I";
      case "hero":
        return "He";
      case "feature":
        return "F";
      case "testimonial":
        return "T";
      case "gallery":
        return "G";
      default:
        return type.charAt(0).toUpperCase();
    }
  };

  // Format content preview
  const formatContentPreview = (content: string | undefined) => {
    if (!content) return "No content";
    return content.length > 20 ? `${content.substring(0, 20)}...` : content;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Layers</h3>

      {/* Search and controls */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search layers..."
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

        {selectedLayers.length > 1 && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg text-sm flex items-center justify-center"
            onClick={handleCreateGroup}
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
              className="mr-1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
            Group {selectedLayers.length} Elements
          </button>
        )}
      </div>

      {/* Layers list */}
      <div className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar">
        {filteredElements.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            {searchTerm
              ? `No layers matching "${searchTerm}"`
              : "No elements added yet"}
          </div>
        ) : (
          filteredElements.map((element) => (
            <motion.div
              key={element.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                element.id === selectedElement
                  ? "bg-purple-600/30 border border-purple-500/50"
                  : selectedLayers.includes(element.id)
                    ? "bg-indigo-600/20 border border-indigo-500/50"
                    : "bg-gray-800/70 hover:bg-gray-700/70 border border-transparent"
              }`}
              onMouseEnter={() => setHoveredLayer(element.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              onClick={(e) => handleSelectWithShift(element.id, e)}
              draggable={!isReordering}
              onDragStart={() => handleDragStart(element.id)}
              onDragOver={(e) => handleDragOver(element.id, e)}
              onDrop={() => handleDrop(element.id)}
              onDragEnd={handleDragEnd}
              animate={{
                backgroundColor:
                  dragOverLayer.current === element.id
                    ? "rgba(147, 51, 234, 0.2)"
                    : undefined,
                borderColor:
                  dragOverLayer.current === element.id
                    ? "rgba(147, 51, 234, 0.5)"
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  {/* Type icon */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-md mr-3 element-type-${element.type}`}
                  >
                    {getElementTypeIcon(element.type)}
                  </div>

                  {/* Element info */}
                  <div className="flex-1 min-w-0">
                    {editingName === element.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={completeRenaming}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") completeRenaming();
                          if (e.key === "Escape") {
                            setEditingName(null);
                            setNewName("");
                          }
                        }}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-purple-500"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <div className="text-white text-sm font-medium truncate">
                          {element.type}{" "}
                          <span className="text-gray-400 text-xs">
                            (z:{elementZIndexes[element.id]})
                          </span>
                        </div>
                        <div className="text-gray-400 text-xs truncate">
                          {formatContentPreview(element.content)}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Controls */}
                {(hoveredLayer === element.id ||
                  element.id === selectedElement) && (
                  <div className="flex items-center space-x-1 ml-2">
                    {/* Visibility toggle */}
                    {onToggleVisibility && (
                      <button
                        className="p-1 text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVisibility(element.id);
                        }}
                        title="Toggle visibility"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    )}

                    {/* Lock toggle */}
                    {onToggleLock && (
                      <button
                        className="p-1 text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLock(element.id);
                        }}
                        title="Toggle lock"
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
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </button>
                    )}

                    {/* Move to top */}
                    <button
                      className="p-1 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveToTop(element.id);
                      }}
                      title="Move to top"
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
                        <polyline points="17 11 12 6 7 11"></polyline>
                        <polyline points="17 18 12 13 7 18"></polyline>
                      </svg>
                    </button>

                    {/* Move to bottom */}
                    <button
                      className="p-1 text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveToBottom(element.id);
                      }}
                      title="Move to bottom"
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
                        <polyline points="7 13 12 18 17 13"></polyline>
                        <polyline points="7 6 12 11 17 6"></polyline>
                      </svg>
                    </button>

                    {/* Rename */}
                    {onRenameElement && (
                      <button
                        className="p-1 text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          startRenaming(
                            element.id,
                            element.content || element.type
                          );
                        }}
                        title="Rename"
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      className="p-1 text-red-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteElement(element.id);
                      }}
                      title="Delete"
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Layers info */}
      <div className="mt-4 bg-gray-800/70 rounded-lg p-4">
        <div className="flex items-center justify-between text-gray-300 text-sm mb-2">
          <span>Total Elements: {elements.length}</span>
          {selectedLayers.length > 0 && (
            <span>Selected: {selectedLayers.length}</span>
          )}
        </div>
        <p className="text-gray-400 text-xs">
          Pro Tip: Hold Shift to select multiple layers. Drag layers to reorder.
        </p>
      </div>
    </div>
  );
};

export default LayersPanel;
