// src/components/preview/ThemePanel.tsx
import React from "react";
import { motion } from "framer-motion";
import { colorThemes } from "@/data/website-builder-data";

interface ThemePanelProps {
  activeColorTheme: string;
  onSelectTheme: (themeId: string) => void;
  onToggleGridLines: () => void;
  showGridLines: boolean;
}

const ThemePanel: React.FC<ThemePanelProps> = ({
  activeColorTheme,
  onSelectTheme,
  onToggleGridLines,
  showGridLines,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>

      <div className="mb-4">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
          Color Themes
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {colorThemes.map((theme) => (
            <motion.div
              key={theme.id}
              className={`p-2 rounded-lg cursor-pointer border transition-all duration-300 ${
                activeColorTheme === theme.id
                  ? "border-white"
                  : "border-transparent hover:border-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTheme(theme.id)}
            >
              <div className="text-center">
                {/* Color Preview */}
                <div className="w-full h-12 rounded-md mb-1 overflow-hidden">
                  <div
                    className="h-full w-1/3 inline-block"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="h-full w-1/3 inline-block"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div
                    className="h-full w-1/3 inline-block"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>
                <span className="text-white text-sm">{theme.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
          Layout Settings
        </h4>
        <div>
          <div
            className="bg-gray-800/70 hover:bg-gray-700/70 rounded-lg p-2 cursor-pointer transition-all duration-300"
            onClick={onToggleGridLines}
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Show Grid Lines</span>
              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${showGridLines ? "bg-purple-600" : "bg-gray-700"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${showGridLines ? "translate-x-4" : ""}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
          Typography
        </h4>
        <div className="space-y-2">
          <div className="bg-gray-800/70 rounded-lg p-2">
            <div className="flex flex-col">
              <span className="text-white text-xs mb-1">Headings Font</span>
              <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500">
                <option value="sans">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-800/70 rounded-lg p-2">
            <div className="flex flex-col">
              <span className="text-white text-xs mb-1">Body Font</span>
              <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500">
                <option value="sans">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-2">
          Advanced Options
        </h4>
        <div className="bg-gray-800/70 rounded-lg p-2">
          <div className="flex flex-col">
            <span className="text-white text-xs mb-1">Background Style</span>
            <select className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500">
              <option value="solid">Solid Color</option>
              <option value="gradient">Gradient</option>
              <option value="pattern">Pattern</option>
              <option value="image">Image</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePanel;
