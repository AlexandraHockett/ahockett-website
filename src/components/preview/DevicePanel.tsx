// src/components/preview/DevicePanel.tsx
import React from "react";
import { motion } from "framer-motion";
import { PreviewDevice } from "@/types/website-builder";

interface DevicePanelProps {
  activeDevice: PreviewDevice;
  onSelectDevice: (device: PreviewDevice) => void;
}

const DevicePanel: React.FC<DevicePanelProps> = ({
  activeDevice,
  onSelectDevice,
}) => {
  // Device options with icons
  const devices: {
    id: PreviewDevice;
    name: string;
    width: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "desktop",
      name: "Desktop",
      width: "1920px",
      icon: (
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
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
    {
      id: "tablet",
      name: "Tablet",
      width: "768px",
      icon: (
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
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
    },
    {
      id: "mobile",
      name: "Mobile",
      width: "375px",
      icon: (
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
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Device Preview</h3>

      <p className="text-gray-300 text-sm mb-4">
        See how your website will look on different devices to ensure a
        responsive design.
      </p>

      <div className="space-y-3">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              activeDevice === device.id
                ? "bg-purple-600/30 border border-purple-500/50"
                : "bg-gray-800/70 hover:bg-gray-700/70 border border-transparent"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectDevice(device.id)}
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeDevice === device.id
                    ? "bg-purple-500/20"
                    : "bg-gray-700/50"
                }`}
              >
                <span
                  className={`${
                    activeDevice === device.id
                      ? "text-purple-300"
                      : "text-gray-400"
                  }`}
                >
                  {device.icon}
                </span>
              </div>
              <div className="ml-3">
                <h4 className="text-white font-medium">{device.name}</h4>
                <p className="text-gray-400 text-xs">{device.width}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-700/50 mt-6">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-3">
          Responsive Design Tips
        </h4>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <ul className="text-gray-300 text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Use flexible containers and avoid fixed widths</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Test text size across different screens</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Adjust spacing for smaller devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>Consider touch targets on mobile (min 44px)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Device-specific settings */}
      <div className="pt-4 border-t border-gray-700/50 mt-4">
        <h4 className="text-sm text-purple-300 font-medium uppercase mb-3">
          {activeDevice.charAt(0).toUpperCase() + activeDevice.slice(1)}{" "}
          Settings
        </h4>

        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex flex-col">
            <label htmlFor="font-size" className="text-white text-xs mb-1">
              Font Scaling
            </label>
            <select
              id="font-size"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="100">100% (Default)</option>
              <option value="125">125% (Large)</option>
              <option value="75">75% (Small)</option>
            </select>
          </div>
        </div>

        {activeDevice === "mobile" && (
          <div className="mt-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-3">
            <div className="flex items-start">
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
                className="text-yellow-400 mr-2 mt-0.5"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <p className="text-yellow-200 text-xs">
                Mobile view shows simplified layout. Some advanced features may
                be hidden on small screens.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4">
        <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center">
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Preview as Visitor
        </button>
      </div>
    </div>
  );
};

export default DevicePanel;
