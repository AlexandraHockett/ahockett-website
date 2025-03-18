// src/components/preview/TimelineEditor.tsx
import React from "react";
import { motion } from "framer-motion";
import { ElementData } from "@/types/website-builder";

interface TimelineEditorProps {
  elements: ElementData[];
  onUpdateAnimationDelay: (id: string, delay: number) => void;
}

const TimelineEditor: React.FC<TimelineEditorProps> = ({
  elements,
  onUpdateAnimationDelay,
}) => {
  // Filter only elements with animations
  const animatedElements = elements.filter((el) => el.animation);

  if (animatedElements.length === 0) {
    return (
      <div className="bg-gray-800/70 rounded-lg p-4 text-center">
        <p className="text-gray-300 text-sm">
          No animated elements found. Add animations to elements to see them in
          the timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/70 rounded-lg p-4">
      <h4 className="text-white font-medium mb-4">Animation Timeline</h4>

      <div className="space-y-4">
        {/* Timeline ruler */}
        <div className="flex border-b border-gray-700/50 pb-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-1 text-xs text-gray-400 text-center">
              {i * 0.5}s
            </div>
          ))}
        </div>

        {/* Element timelines */}
        {animatedElements.map((element) => (
          <div key={element.id} className="flex items-center space-x-2">
            <div className="w-24 truncate text-gray-300 text-sm">
              {getElementLabel(element)}
            </div>

            <div className="flex-1 relative h-8 bg-gray-700/50 rounded-md">
              {/* Draggable marker for animation start time */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-4 bg-purple-500 rounded-md cursor-move"
                style={{
                  left: `${Math.min((element.animationDelay || 0) * 100, 95)}%`,
                  height: "100%",
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 190 }}
                dragElastic={0}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const newDelay = Math.max(
                    0,
                    Math.round((info.point.x / 200) * 10) / 10
                  );
                  onUpdateAnimationDelay(element.id, newDelay);
                }}
              >
                <div className="absolute -top-6 left-0 text-xs whitespace-nowrap text-white bg-purple-600 rounded px-1">
                  {element.animationDelay || 0}s
                </div>
              </motion.div>

              {/* Animation duration visualization */}
              <div
                className="absolute h-4 top-2 rounded-r-md bg-purple-500/30"
                style={{
                  left: `${Math.min((element.animationDelay || 0) * 100, 95)}%`,
                  width: `${getAnimationDuration(element.animation) * 40}%`,
                }}
              />
            </div>

            <div className="w-20">
              <select
                value={element.animation}
                disabled
                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-xs"
              >
                <option value={element.animation}>{element.animation}</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <p className="text-gray-400 text-xs">
          Drag the purple markers to adjust animation start times. The colored
          bars represent animation duration.
        </p>
      </div>
    </div>
  );
};

// Helper function to get element label
const getElementLabel = (element: ElementData): string => {
  if (element.content && typeof element.content === "string") {
    const shortContent = element.content.substring(0, 15);
    return `${element.type}: ${shortContent}${element.content.length > 15 ? "..." : ""}`;
  }
  return element.type;
};

// Helper function to estimate animation duration based on type
const getAnimationDuration = (animation?: string): number => {
  switch (animation) {
    case "fadeIn":
      return 0.8;
    case "slideIn":
      return 0.8;
    case "bounce":
      return 1.2;
    case "pulse":
      return 0.8;
    case "flip":
      return 1.0;
    case "zoom":
      return 0.8;
    case "reveal":
      return 1.0;
    case "typing":
      return 1.5;
    default:
      return 1.0;
  }
};

export default TimelineEditor;
