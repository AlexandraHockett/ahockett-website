"use client";

import React from "react";
import { motion } from "framer-motion";

interface Template {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  activeTemplate: string;
  onSelectTemplate: (id: string) => void;
}

export default function TemplateSelector({
  templates,
  activeTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
            activeTemplate === template.id
              ? "bg-purple-600/20 border border-purple-500/50"
              : "bg-gray-800 hover:bg-gray-700 border border-transparent"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-md mr-3 flex items-center justify-center overflow-hidden">
              {template.image ? (
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              )}
            </div>
            <div>
              <h4 className="text-white font-medium">{template.name}</h4>
              <p className="text-gray-400 text-xs">{template.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
