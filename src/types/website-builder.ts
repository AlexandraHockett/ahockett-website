// src/types/website-builder.ts

// Element types for drag-and-drop
export type ElementType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "spacer"
  | "divider"
  | "hero"
  | "feature"
  | "testimonial"
  | "gallery"
  | "parallax"
  | "counter"
  | "video"
  | "form";

// Animation presets
export type AnimationPreset =
  | "fadeIn"
  | "slideIn"
  | "bounce"
  | "pulse"
  | "flip"
  | "zoom"
  | "reveal"
  | "typing";

// Preview device options
export type PreviewDevice = "desktop" | "tablet" | "mobile";

// Sidebar panel options
export type SidebarPanel = "elements" | "animations" | "theme" | "device";

// Element data interface
export interface ElementData {
  id: string;
  type: ElementType;
  content?: string;
  animation?: AnimationPreset;
  animationDelay?: number;
  position?: { x: number; y: number };
  styles?: Record<string, string>;
}

// Available element interface
export interface AvailableElement {
  type: ElementType;
  label: string;
  category: "sections" | "basic" | "interactive" | "layout";
}

// Animation preset interface
export interface AnimationPresetData {
  id: AnimationPreset;
  name: string;
  description: string;
  preview: string;
}

// Color theme interface
export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  elements: Partial<ElementData>[];
}
