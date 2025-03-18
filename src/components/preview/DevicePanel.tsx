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
    icon: React.ReactNode;
    width: string;
  }[] = [
    {
      id: "desktop",
      name: "Desktop",
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
      width: "1920px",
    },
    {
      id: "tablet",
      name: "Tablet",
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
      width: "768px",
    },
    {
      id: "mobile",
      name: "Mobile",
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
      width: "375px",
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
    </div>
  );
};

export default DevicePanel;
