import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ElementType, ElementData } from "@/types/website-builder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface DraggableElementProps {
  element: ElementData & { position?: { x: number; y: number } };
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
  showGridLines: boolean;
  onPositionUpdate: (x: number, y: number) => void;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  showGridLines,
  onPositionUpdate,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const elementNode = elementRef.current;
    const parentNode = elementNode.parentElement;

    if (!parentNode) return;

    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    draggableRef.current = Draggable.create(elementNode, {
      type: "x,y",
      bounds: parentNode,
      edgeResistance: 0.65,
      snap: showGridLines
        ? {
            x: (value) => Math.round(value / 20) * 20,
            y: (value) => Math.round(value / 20) * 20,
          }
        : undefined,
      onDragStart: function () {
        onSelect();
        gsap.to(elementNode, {
          zIndex: 10,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          scale: 1.02,
          duration: 0.2,
        });
      },
      onDragEnd: function () {
        const x = this.x;
        const y = this.y;
        onPositionUpdate(x, y);
        gsap.to(elementNode, {
          zIndex: isSelected ? 5 : 1,
          boxShadow: isSelected ? "0 0 0 2px rgba(124, 58, 237, 0.5)" : "none",
          scale: 1,
          duration: 0.2,
        });
      },
    })[0];

    if (element.position) {
      gsap.set(elementNode, {
        x: element.position.x,
        y: element.position.y,
        position: "absolute",
      });
    }

    // Desativar arrastar quando selecionado para permitir edição
    if (isSelected && draggableRef.current) {
      draggableRef.current.disable();
    } else if (!isSelected && draggableRef.current) {
      draggableRef.current.enable();
    }

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
    };
  }, [element.position, isSelected, onSelect, showGridLines, onPositionUpdate]);

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

  const renderElement = () => {
    const elementStyles = element.styles || {};

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
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <motion.div
      ref={elementRef}
      id={`element-${element.id}`}
      className={`element cursor-move ${isSelected ? "outline-none" : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {renderElement()}

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
          {/* Botão de centralização removido */}
        </div>
      )}

      {isSelected && (
        <div className="absolute -bottom-3 left-0 text-xs bg-purple-600 text-white px-2 py-1 rounded-sm shadow-md">
          {element.type} • Clique para editar
        </div>
      )}
    </motion.div>
  );
};

export default DraggableElement;
