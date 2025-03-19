// src/components/preview/AnimationsPanel.tsx
import React from "react";
import { motion } from "framer-motion";
import { animationPresets } from "@/data/website-builder-data";
import { AnimationPreset, ElementData } from "@/types/website-builder";

interface AnimationsPanelProps {
  selectedElement: string | null;
  elements: ElementData[];
  onApplyAnimation: (id: string, animation: AnimationPreset) => void;
  onResetAnimations: () => void;
  onToggleTimelineEditor: () => void;
  showTimelineEditor: boolean;
}

const AnimationsPanel: React.FC<AnimationsPanelProps> = ({
  selectedElement,
  elements,
  onApplyAnimation,
  onResetAnimations,
  onToggleTimelineEditor,
  showTimelineEditor,
}) => {
  // Get the selected element data
  const selectedElementData = selectedElement
    ? elements.find((el) => el.id === selectedElement)
    : null;

  // If no element is selected, show guidance
  if (!selectedElement) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Animations</h3>
        <div className="bg-gray-800/70 rounded-lg p-6 text-center">
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
            className="text-purple-400 mx-auto mb-3"
          >
            <polyline points="16 12 12 8 8 12"></polyline>
            <line x1="12" y1="16" x2="12" y2="8"></line>
          </svg>
          <h4 className="text-white font-medium mb-2">Select an Element</h4>
          <p className="text-gray-400 text-sm">
            Click on any element in the canvas to apply animations to it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Animations</h3>

      {selectedElementData && (
        <div className="mb-4 bg-gray-800/70 rounded-lg p-4">
          <h4 className="text-purple-300 font-medium mb-2">Selected Element</h4>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div
                className={`element-type-indicator element-type-${selectedElementData.type}`}
              >
                {selectedElementData.type.charAt(0).toUpperCase()}
              </div>
              <span>
                {selectedElementData.type.charAt(0).toUpperCase() +
                  selectedElementData.type.slice(1)}
              </span>
            </div>
            <div className="text-xs text-gray-400">
              ID: {selectedElementData.id.substring(0, 8)}...
            </div>
          </div>
          {selectedElementData.animation && (
            <div className="mt-2 text-sm text-gray-300">
              Current animation:{" "}
              <span className="text-purple-300 font-medium">
                {selectedElementData.animation}
              </span>
            </div>
          )}
        </div>
      )}

      <p className="text-gray-300 text-sm mb-4">
        Apply animations to the selected element to create engaging effects when
        visitors view your page.
      </p>

      <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
        {animationPresets.map((animation) => {
          const isActive =
            elements.find((el) => el.id === selectedElement)?.animation ===
            animation.id;

          return (
            <motion.div
              key={animation.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-purple-600/30 border border-purple-500/50"
                  : "bg-gray-800/70 hover:bg-gray-700/70 border border-transparent"
              }`}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(147, 51, 234, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (selectedElement) {
                  onApplyAnimation(
                    selectedElement,
                    animation.id as AnimationPreset
                  );
                }
              }}
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium mb-1">
                    {animation.name}
                  </h4>
                  {isActive && (
                    <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-2">
                  {animation.description}
                </p>
                <div className="bg-gray-900/50 rounded-md p-2 text-purple-300 text-xs font-mono">
                  {animation.preview}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-gray-700/50">
        <motion.button
          onClick={onResetAnimations}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Preview Animation
          </span>
        </motion.button>
      </div>

      <div className="pt-2">
        <button
          onClick={onToggleTimelineEditor}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <span>{showTimelineEditor ? "Hide" : "Show"} Timeline Editor</span>
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
            className={`ml-2 transition-transform duration-300 ${showTimelineEditor ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {/* Quick Help Section */}
      <div className="pt-4 border-t border-gray-700/50 mt-4">
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
            Animation Tips
          </h4>
          <ul className="text-gray-300 text-xs space-y-1">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Use subtle animations for text elements</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Add delays to create sequence effects</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Don't animate everything at once</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnimationsPanel;
