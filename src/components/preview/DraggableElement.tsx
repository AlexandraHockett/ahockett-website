// src/components/preview/DraggableElement.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ElementType, ElementData } from "@/types/website-builder";

// Register GSAP plugins on client side only
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
  onPositionUpdate: (x: number, y: number) => void;
  onZIndexUpdate: (newZIndex: number) => void;
  zIndex: number;
  canvasRef: React.RefObject<HTMLDivElement | null>; // Allow null
  elements: ElementData[];
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  showGridLines,
  onPositionUpdate,
  onZIndexUpdate,
  zIndex,
  canvasRef,
  elements,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const [showResizeHandles, setShowResizeHandles] = useState(false);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [resizing, setResizing] = useState(false);
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  // Initialize draggable instance
  useEffect(() => {
    if (!elementRef.current || !canvasRef.current) return;

    const elementNode = elementRef.current;
    const parentNode = canvasRef.current;

    // Kill previous draggable instance if it exists
    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    // Create a new draggable instance
    draggableRef.current = Draggable.create(elementNode, {
      type: "x,y",
      bounds: parentNode,
      edgeResistance: 0.65,
      inertia: true,
      snap: showGridLines
        ? {
            x: (value) => Math.round(value / 20) * 20,
            y: (value) => Math.round(value / 20) * 20,
          }
        : undefined,
      onDragStart: function () {
        onSelect();
        gsap.to(elementNode, {
          zIndex: 100, // Temporarily elevate during drag
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          scale: 1.02,
          duration: 0.2,
        });

        // Hide guides on drag start
        document.querySelectorAll(".alignment-guide").forEach((guide) => {
          (guide as HTMLElement).style.display = "none";
        });
      },
      onDrag: function () {
        if (elementRef.current && canvasRef.current) {
          showAlignmentGuides(elementRef.current, canvasRef.current, elements);
        }
      },
      onDragEnd: function () {
        const x = this.x;
        const y = this.y;
        onPositionUpdate(x, y);

        // Reset z-index to the assigned value
        gsap.to(elementNode, {
          zIndex: zIndex,
          boxShadow: isSelected ? "0 0 0 2px rgba(124, 58, 237, 0.5)" : "none",
          scale: 1,
          duration: 0.2,
        });

        // Hide guides on drag end
        document.querySelectorAll(".alignment-guide").forEach((guide) => {
          (guide as HTMLElement).style.display = "none";
        });
      },
    })[0];

    // Set initial position
    if (element.position) {
      gsap.set(elementNode, {
        x: element.position.x,
        y: element.position.y,
        position: "absolute",
        zIndex: zIndex,
      });
    }

    // Disable dragging when element is selected for editing
    if (isSelected && draggableRef.current) {
      draggableRef.current.disable();
    } else if (!isSelected && draggableRef.current) {
      draggableRef.current.enable();
    }

    // Store element dimensions
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setElementSize({ width, height });
    }

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
    };
  }, [
    element.position,
    isSelected,
    onSelect,
    showGridLines,
    onPositionUpdate,
    zIndex,
    canvasRef,
    elements,
  ]);

  // Update visual state when selection state changes
  useEffect(() => {
    if (!elementRef.current) return;

    if (isSelected) {
      gsap.to(elementRef.current, {
        boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)",
        zIndex: zIndex,
        duration: 0.2,
      });
      setShowResizeHandles(true);
    } else {
      gsap.to(elementRef.current, {
        boxShadow: "none",
        zIndex: zIndex,
        duration: 0.2,
      });
      setShowResizeHandles(false);
      setShowStyleOptions(false);
    }
  }, [isSelected, zIndex]);

  // Initial animation
  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.5)",
        delay: 0.1,
      }
    );
  }, []);

  // Show alignment guides during drag
  const showAlignmentGuides = (
    element: HTMLElement,
    canvas: HTMLElement,
    otherElements: ElementData[]
  ) => {
    // Get current element's position and dimensions
    const elementRect = element.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate relative position to canvas
    const elementLeft = elementRect.left - canvasRect.left;
    const elementTop = elementRect.top - canvasRect.top;
    const elementRight = elementLeft + elementRect.width;
    const elementBottom = elementTop + elementRect.height;
    const elementCenterX = elementLeft + elementRect.width / 2;
    const elementCenterY = elementTop + elementRect.height / 2;

    // Create or get horizontal center guide
    let centerXGuide = document.getElementById("guide-center-x");
    if (!centerXGuide) {
      centerXGuide = document.createElement("div");
      centerXGuide.id = "guide-center-x";
      centerXGuide.className = "alignment-guide horizontal-guide";
      canvas.appendChild(centerXGuide);
    }

    // Create or get vertical center guide
    let centerYGuide = document.getElementById("guide-center-y");
    if (!centerYGuide) {
      centerYGuide = document.createElement("div");
      centerYGuide.id = "guide-center-y";
      centerYGuide.className = "alignment-guide vertical-guide";
      canvas.appendChild(centerYGuide);
    }

    // Check if element is at canvas center
    const canvasCenterX = canvas.offsetWidth / 2;
    const canvasCenterY = canvas.offsetHeight / 2;
    const tolerance = 10; // pixels

    if (Math.abs(elementCenterX - canvasCenterX) < tolerance) {
      // Show center X guide
      centerXGuide.style.display = "block";
      centerXGuide.style.left = `${canvasCenterX}px`;
      centerXGuide.style.top = "0";
      centerXGuide.style.height = `${canvas.offsetHeight}px`;
    } else {
      centerXGuide.style.display = "none";
    }

    if (Math.abs(elementCenterY - canvasCenterY) < tolerance) {
      // Show center Y guide
      centerYGuide.style.display = "block";
      centerYGuide.style.top = `${canvasCenterY}px`;
      centerYGuide.style.left = "0";
      centerYGuide.style.width = `${canvas.offsetWidth}px`;
    } else {
      centerYGuide.style.display = "none";
    }

    // Find closest elements for edge alignment
    let closestTop = Infinity;
    let closestBottom = Infinity;
    let closestLeft = Infinity;
    let closestRight = Infinity;

    otherElements.forEach((otherElem) => {
      // Skip the current element
      if (otherElem.id === element.id) return;

      const otherElement = document.getElementById(`element-${otherElem.id}`);
      if (!otherElement) return;

      const otherRect = otherElement.getBoundingClientRect();
      const otherLeft = otherRect.left - canvasRect.left;
      const otherTop = otherRect.top - canvasRect.top;
      const otherRight = otherLeft + otherRect.width;
      const otherBottom = otherTop + otherRect.height;

      // Check horizontal alignments
      if (
        Math.abs(elementLeft - otherLeft) < tolerance &&
        Math.abs(elementLeft - otherLeft) < closestLeft
      ) {
        closestLeft = Math.abs(elementLeft - otherLeft);
        showVerticalGuide("left", otherLeft, canvas);
      }

      if (
        Math.abs(elementRight - otherRight) < tolerance &&
        Math.abs(elementRight - otherRight) < closestRight
      ) {
        closestRight = Math.abs(elementRight - otherRight);
        showVerticalGuide("right", otherRight, canvas);
      }

      // Check vertical alignments
      if (
        Math.abs(elementTop - otherTop) < tolerance &&
        Math.abs(elementTop - otherTop) < closestTop
      ) {
        closestTop = Math.abs(elementTop - otherTop);
        showHorizontalGuide("top", otherTop, canvas);
      }

      if (
        Math.abs(elementBottom - otherBottom) < tolerance &&
        Math.abs(elementBottom - otherBottom) < closestBottom
      ) {
        closestBottom = Math.abs(elementBottom - otherBottom);
        showHorizontalGuide("bottom", otherBottom, canvas);
      }
    });
  };

  // Helper function to show horizontal guide
  const showHorizontalGuide = (
    position: string,
    value: number,
    canvas: HTMLElement
  ) => {
    let guide = document.getElementById(`guide-${position}`);
    if (!guide) {
      guide = document.createElement("div");
      guide.id = `guide-${position}`;
      guide.className = "alignment-guide horizontal-guide";
      canvas.appendChild(guide);
    }

    guide.style.display = "block";
    guide.style.top = `${value}px`;
    guide.style.left = "0";
    guide.style.width = `${canvas.offsetWidth}px`;
  };

  // Helper function to show vertical guide
  const showVerticalGuide = (
    position: string,
    value: number,
    canvas: HTMLElement
  ) => {
    let guide = document.getElementById(`guide-${position}`);
    if (!guide) {
      guide = document.createElement("div");
      guide.id = `guide-${position}`;
      guide.className = "alignment-guide vertical-guide";
      canvas.appendChild(guide);
    }

    guide.style.display = "block";
    guide.style.left = `${value}px`;
    guide.style.top = "0";
    guide.style.height = `${canvas.offsetHeight}px`;
  };

  // Handle resize
  const handleResize = (direction: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!elementRef.current || !canvasRef.current) return;

    setResizing(true);

    const elementNode = elementRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = elementSize.width;
    const startHeight = elementSize.height;
    const startLeft = element.position?.x || 0;
    const startTop = element.position?.y || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      // Calculate new dimensions based on resize direction
      if (direction.includes("e")) {
        // right
        newWidth = startWidth + (moveEvent.clientX - startX);
      }
      if (direction.includes("w")) {
        // left
        const deltaX = moveEvent.clientX - startX;
        newWidth = startWidth - deltaX;
        newLeft = startLeft + deltaX;
      }
      if (direction.includes("s")) {
        // bottom
        newHeight = startHeight + (moveEvent.clientY - startY);
      }
      if (direction.includes("n")) {
        // top
        const deltaY = moveEvent.clientY - startY;
        newHeight = startHeight - deltaY;
        newTop = startTop + deltaY;
      }

      // Apply minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(30, newHeight);

      // Apply size and position changes
      gsap.set(elementNode, {
        width: `${newWidth}px`,
        height: `${newHeight}px`,
        x: newLeft,
        y: newTop,
      });

      setElementSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      // Update element position
      if (element.position) {
        onPositionUpdate(
          direction.includes("w")
            ? startLeft + (startWidth - elementSize.width)
            : element.position.x,
          direction.includes("n")
            ? startTop + (startHeight - elementSize.height)
            : element.position.y
        );
      }

      setResizing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Move element up in layer stack (increase z-index)
  const moveElementUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZIndexUpdate(zIndex + 1);
  };

  // Move element down in layer stack (decrease z-index)
  const moveElementDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onZIndexUpdate(Math.max(1, zIndex - 1));
  };

  // Toggle style options panel
  const toggleStyleOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStyleOptions(!showStyleOptions);
  };

  // Render element content based on type
  const renderElementContent = () => {
    const elementStyles = {
      ...element.styles,
      minWidth: elementSize.width > 0 ? `${elementSize.width}px` : "auto",
      minHeight: elementSize.height > 0 ? `${elementSize.height}px` : "auto",
    };

    switch (element.type) {
      case "heading":
        return (
          <h2
            className="text-2xl font-bold text-gray-800"
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
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
            style={elementStyles}
          >
            {element.content}
          </button>
        );
      case "hero":
        return (
          <div
            className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-8 rounded-lg text-center"
            style={elementStyles}
          >
            <h1
              className="text-3xl font-bold mb-4"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            >
              {element.content}
            </h1>
            <p className="text-lg">Your compelling subtitle here</p>
            <button className="mt-4 bg-white text-purple-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        );
      case "feature":
        return (
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            style={elementStyles}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">✨</span>
            </div>
            <h3
              className="text-xl font-semibold mb-2 text-gray-800"
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            >
              {element.content}
            </h3>
            <p className="text-gray-600">
              Describe the feature here. Edit this text when selected.
            </p>
          </div>
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  // Render resize handles
  const renderResizeHandles = () => {
    if (!showResizeHandles) return null;

    const directions = ["n", "e", "s", "w", "ne", "se", "sw", "nw"];

    return directions.map((dir) => (
      <div
        key={dir}
        className={`resize-handle resize-${dir}`}
        onMouseDown={(e) => handleResize(dir, e)}
        style={{
          position: "absolute",
          width: dir === "n" || dir === "s" ? "100%" : "10px",
          height: dir === "e" || dir === "w" ? "100%" : "10px",
          top: dir.includes("n")
            ? "-5px"
            : dir.includes("s")
              ? "calc(100% - 5px)"
              : "0",
          left: dir.includes("w")
            ? "-5px"
            : dir.includes("e")
              ? "calc(100% - 5px)"
              : "0",
          cursor: `${dir}-resize`,
          zIndex: 20,
        }}
      />
    ));
  };

  // Element controls (shown when selected)
  const renderElementControls = () => {
    if (!isSelected) return null;

    return (
      <>
        {/* Top controls */}
        <div className="absolute -top-10 left-0 flex gap-1 bg-white p-1 rounded-md shadow-md border border-gray-200">
          {/* Delete button */}
          <button
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center border border-gray-300 hover:bg-red-50 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete element"
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
              className="text-red-500"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>

          {/* Style button */}
          <button
            className={`w-8 h-8 rounded-md flex items-center justify-center border border-gray-300 hover:bg-blue-50 transition-colors duration-200 ${
              showStyleOptions ? "bg-blue-50" : "bg-white"
            }`}
            onClick={toggleStyleOptions}
            aria-label="Style element"
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
              className="text-blue-500"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
            </svg>
          </button>

          {/* Move up in layers */}
          <button
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center border border-gray-300 hover:bg-purple-50 transition-colors duration-200"
            onClick={moveElementUp}
            aria-label="Move up in layers"
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
              className="text-purple-500"
            >
              <path d="M12 19V5"></path>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>

          {/* Move down in layers */}
          <button
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center border border-gray-300 hover:bg-purple-50 transition-colors duration-200"
            onClick={moveElementDown}
            aria-label="Move down in layers"
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
              className="text-purple-500"
            >
              <path d="M12 5v14"></path>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>

        {/* Element info */}
        <div
          className="absolute -bottom-8 left-0 text-xs bg-gray-800 text-white px-2 py-1 rounded-sm shadow-md z-30"
          onClick={(e) => e.stopPropagation()}
        >
          {element.type} • Z-index: {zIndex}
        </div>
      </>
    );
  };

  // Style options panel
  const renderStyleOptions = () => {
    if (!showStyleOptions || !isSelected) return null;

    // Function to update element styles and trigger parent update
    const updateElementStyles = (newStyles: Partial<ElementData["styles"]>) => {
      const updatedStyles = { ...element.styles, ...newStyles };
      onUpdate(JSON.stringify({ ...element, styles: updatedStyles }));
    };

    return (
      <div className="absolute -right-64 top-0 w-60 bg-white rounded-md shadow-lg border border-gray-200 p-3 z-40">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Style Options
        </h4>

        {/* Color options */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Text Color</label>
          <div className="flex gap-1 flex-wrap">
            {[
              "#000000",
              "#4B5563",
              "#EF4444",
              "#3B82F6",
              "#10B981",
              "#8B5CF6",
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border border-gray-300 hover:ring-2 ring-purple-300 transition-all"
                style={{
                  backgroundColor: color,
                  ...(element.styles?.color === color && {
                    ring: "2px solid #7C3AED",
                  }),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({ color });
                }}
                title={`Set text color to ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Background options */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Background</label>
          <div className="flex gap-1 flex-wrap">
            {[
              "transparent",
              "#FFFFFF",
              "#F3F4F6",
              "#FEE2E2",
              "#DBEAFE",
              "#D1FAE5",
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border border-gray-300 hover:ring-2 ring-purple-300 transition-all"
                style={{
                  backgroundColor: color,
                  ...(element.styles?.backgroundColor === color && {
                    ring: "2px solid #7C3AED",
                  }),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({
                    backgroundColor:
                      color === "transparent" ? undefined : color,
                  });
                }}
                title={`Set background to ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Font Size</label>
          <div className="flex gap-1 flex-wrap">
            {[
              { label: "xs", value: "0.75rem" },
              { label: "sm", value: "0.875rem" },
              { label: "base", value: "1rem" },
              { label: "lg", value: "1.125rem" },
              { label: "xl", value: "1.25rem" },
              { label: "2xl", value: "1.5rem" },
            ].map((size) => (
              <button
                key={size.label}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  element.styles?.fontSize === size.value
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({ fontSize: size.value });
                }}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text alignment */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Alignment</label>
          <div className="flex gap-1">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  element.styles?.textAlign === align
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({ textAlign: align }); // Explicitly typed as "left" | "center" | "right"
                }}
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
                >
                  {align === "left" && (
                    <>
                      <line x1="17" y1="10" x2="3" y2="10"></line>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="17" y1="18" x2="3" y2="18"></line>
                    </>
                  )}
                  {align === "center" && (
                    <>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="18" y1="10" x2="6" y2="10"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="18" y1="18" x2="6" y2="18"></line>
                    </>
                  )}
                  {align === "right" && (
                    <>
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="10" x2="7" y2="10"></line>
                      <line x1="21" y1="14" x2="3" y2="14"></line>
                      <line x1="21" y1="18" x2="7" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Padding */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Padding</label>
          <div className="flex gap-1 flex-wrap">
            {[
              { label: "none", value: "0" },
              { label: "sm", value: "0.5rem" },
              { label: "md", value: "1rem" },
              { label: "lg", value: "1.5rem" },
            ].map((padding) => (
              <button
                key={padding.label}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  element.styles?.padding === padding.value
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({ padding: padding.value });
                }}
              >
                {padding.label}
              </button>
            ))}
          </div>
        </div>

        {/* Border */}
        <div className="mb-3">
          <label className="text-xs text-gray-600 block mb-1">Border</label>
          <div className="flex gap-1 flex-wrap">
            {[
              { label: "none", value: "none" },
              { label: "thin", value: "1px solid #D1D5DB" },
              { label: "medium", value: "2px solid #D1D5DB" },
              {
                label: "rounded",
                value: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
              },
            ].map((border) => (
              <button
                key={border.label}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  element.styles?.border === border.value
                    ? "bg-purple-100 text-purple-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  updateElementStyles({
                    border: border.value,
                    ...(border.borderRadius && {
                      borderRadius: border.borderRadius,
                    }),
                  });
                }}
              >
                {border.label}
              </button>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          className="text-xs text-gray-500 hover:text-gray-700 mt-2 w-full text-left"
          onClick={(e) => {
            e.stopPropagation();
            setShowStyleOptions(false);
          }}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <motion.div
      ref={elementRef}
      id={`element-${element.id}`}
      className={`element cursor-move ${isSelected ? "outline-none" : ""} ${resizing ? "resizing" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        position: "absolute",
        zIndex,
        ...(element.position && {
          left: element.position.x,
          top: element.position.y,
        }),
      }}
    >
      {renderElementContent()}
      {renderResizeHandles()}
      {renderElementControls()}
      {renderStyleOptions()}
    </motion.div>
  );
};

export default DraggableElement;
