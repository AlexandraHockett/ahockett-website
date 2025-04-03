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
export type SidebarPanel =
  | "elements"
  | "animations"
  | "theme"
  | "device"
  | "layers";

// Element sizing and positioning
export interface ElementPosition {
  x: number;
  y: number;
}

export interface ElementSize {
  width?: number;
  height?: number;
}

export interface ElementStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: string;
  transform?: string;
}

// Main element data interface
export interface ElementData {
  id: string;
  type: ElementType;
  content?: string;
  animation?: AnimationPreset;
  animationDelay?: number;
  animationDuration?: number;
  position?: ElementPosition;
  size?: ElementSize;
  styles?: Record<string, string>;
  children?: ElementData[];
  props?: Record<string, any>;
  locked?: boolean;
  hidden?: boolean;
  groupId?: string;
}

// Group of elements
export interface ElementGroup {
  id: string;
  name: string;
  elementIds: string[];
  collapsed?: boolean;
}

// Available element in the sidebar
export interface AvailableElement {
  type: ElementType;
  label: string;
  category: "sections" | "basic" | "interactive" | "layout";
  description?: string;
  icon?: string;
}

// Animation preset data
export interface AnimationPresetData {
  id: AnimationPreset;
  name: string;
  description: string;
  preview: string;
  duration?: number;
}

// Theme color configuration
export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background?: string;
  surface?: string;
}

// Typography configuration
export interface TypographyTheme {
  fontFamily: {
    heading: string;
    body: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
}

// Complete theme configuration
export interface ThemeConfig {
  colors: ColorTheme;
  typography: TypographyTheme;
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
}

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  elements: Partial<ElementData>[];
  theme?: Partial<ThemeConfig>;
  tags?: string[];
  category?: string;
}

// Snap configuration for alignment
export interface SnapConfig {
  enabled: boolean;
  gridSize: number;
  toElements: boolean;
  toGrid: boolean;
  toCenter: boolean;
  toEdges: boolean;
}

// History state for undo/redo
export interface HistoryEntry {
  elements: ElementData[];
  selectedElement: string | null;
  elementZIndexes: Record<string, number>;
  groups?: ElementGroup[];
}

// Builder configuration
export interface BuilderConfig {
  showGridLines: boolean;
  snapConfig: SnapConfig;
  showWatermark: boolean;
  previewMode: boolean;
  autosave: boolean;
  autosaveInterval: number;
  maxHistoryStates: number;
}

// Website metadata
export interface WebsiteMetadata {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  slug?: string;
  seo?: {
    keywords: string[];
    ogImage?: string;
    twitterCard?: string;
  };
}

// Complete website project
export interface WebsiteProject {
  id: string;
  metadata: WebsiteMetadata;
  pages: {
    id: string;
    name: string;
    slug: string;
    elements: ElementData[];
    isHomepage?: boolean;
  }[];
  theme: ThemeConfig;
  assets: {
    id: string;
    name: string;
    url: string;
    type: "image" | "video" | "font" | "other";
    size?: number;
  }[];
}

// Export context menu position type
export interface ContextMenuPosition {
  x: number;
  y: number;
  elementId?: string;
}
