// src/data/website-builder-data.ts
import {
  AvailableElement,
  AnimationPresetData,
  ColorTheme,
  Template,
  ElementType,
  AnimationPreset,
} from "@/types/website-builder";

// Available elements for drag and drop
export const availableElements: AvailableElement[] = [
  { type: "hero", label: "Hero Section", category: "sections" },
  { type: "feature", label: "Feature Box", category: "sections" },
  { type: "testimonial", label: "Testimonial", category: "sections" },
  { type: "gallery", label: "Image Gallery", category: "sections" },
  { type: "parallax", label: "Parallax Section", category: "sections" },
  { type: "heading", label: "Heading", category: "basic" },
  { type: "paragraph", label: "Text Block", category: "basic" },
  { type: "image", label: "Image", category: "basic" },
  { type: "button", label: "Button", category: "basic" },
  { type: "counter", label: "Counter", category: "interactive" },
  { type: "video", label: "Video Placeholder", category: "interactive" },
  { type: "form", label: "Contact Form", category: "interactive" },
  { type: "divider", label: "Divider", category: "layout" },
  { type: "spacer", label: "Spacer", category: "layout" },
];

// Animation presets with preview data
export const animationPresets: AnimationPresetData[] = [
  {
    id: "fadeIn",
    name: "Fade In",
    description: "Gently appears on scroll",
    preview: "opacity: 0 → 1",
  },
  {
    id: "slideIn",
    name: "Slide In",
    description: "Slides in from the side",
    preview: "x: -50px → 0",
  },
  {
    id: "bounce",
    name: "Bounce",
    description: "Bouncy entrance animation",
    preview: "y: -20px → 0 → -10px → 0",
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Pulsating attention-grabber",
    preview: "scale: 1 → 1.1 → 1",
  },
  {
    id: "flip",
    name: "Flip",
    description: "Dramatic 3D flip effect",
    preview: "rotateY: 90deg → 0deg",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Zooms in from nothing",
    preview: "scale: 0 → 1.1 → 1",
  },
  {
    id: "reveal",
    name: "Reveal",
    description: "Reveals content with a wipe",
    preview: "clip-path: inset(0 100% 0 0) → inset(0)",
  },
  {
    id: "typing",
    name: "Typing",
    description: "Simulates typing text",
    preview: "width: 0% → 100%, letter by letter",
  },
];

// Available color themes
export const colorThemes: ColorTheme[] = [
  {
    id: "purple",
    name: "Purple Dream",
    primary: "#9333EA",
    secondary: "#6366F1",
    accent: "#EC4899",
    text: "#F3F4F6",
  },
  {
    id: "blue",
    name: "Ocean Blue",
    primary: "#3B82F6",
    secondary: "#06B6D4",
    accent: "#8B5CF6",
    text: "#F3F4F6",
  },
  {
    id: "green",
    name: "Emerald Forest",
    primary: "#10B981",
    secondary: "#34D399",
    accent: "#3B82F6",
    text: "#F3F4F6",
  },
  {
    id: "red",
    name: "Ruby Sunset",
    primary: "#EF4444",
    secondary: "#F59E0B",
    accent: "#EC4899",
    text: "#F3F4F6",
  },
  {
    id: "dark",
    name: "Dark Mode",
    primary: "#1F2937",
    secondary: "#4B5563",
    accent: "#6366F1",
    text: "#F9FAFB",
  },
];

// Available templates with more detailed data
export const templates: Template[] = [
  {
    id: "business",
    name: "Business Pro",
    description: "Professional layout for business websites",
    image: "/images/logocolor-no-background.svg",
    elements: [
      {
        id: "hero-1",
        type: "hero",
        content: "Growing Your Business",
        animation: "fadeIn",
      },
      {
        id: "feature-1",
        type: "feature",
        content: "Our Services",
        animation: "slideIn",
      },
      {
        id: "heading-1",
        type: "heading",
        content: "Why Choose Us",
        animation: "fadeIn",
      },
      {
        id: "paragraph-1",
        type: "paragraph",
        content: "We provide exceptional solutions for your business needs.",
        animation: "fadeIn",
      },
    ],
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold design for creative professionals",
    image: "/images/logocolor-no-background.svg",
    elements: [
      {
        id: "hero-1",
        type: "hero",
        content: "Creative Solutions",
        animation: "reveal",
      },
      { id: "gallery-1", type: "gallery", animation: "fadeIn" },
      {
        id: "heading-1",
        type: "heading",
        content: "My Work",
        animation: "typing",
      },
      {
        id: "button-1",
        type: "button",
        content: "Get in Touch",
        animation: "pulse",
      },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, modern design with minimal elements",
    image: "/images/logocolor-no-background.svg",
    elements: [
      {
        id: "hero-1",
        type: "hero",
        content: "Less is More",
        animation: "fadeIn",
      },
      {
        id: "heading-1",
        type: "heading",
        content: "About Us",
        animation: "slideIn",
      },
      {
        id: "paragraph-1",
        type: "paragraph",
        content:
          "This is where you can tell your story. Click to edit this text.",
        animation: "fadeIn",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "Online Store",
    description: "Perfect for showcasing products",
    image: "/images/logocolor-no-background.svg", // Replace with actual e-commerce template
    elements: [
      {
        id: "hero-1",
        type: "hero",
        content: "Shop the Collection",
        animation: "fadeIn",
      },
      { id: "gallery-1", type: "gallery", animation: "fadeIn" },
      {
        id: "feature-1",
        type: "feature",
        content: "Featured Products",
        animation: "slideIn",
      },
      {
        id: "button-1",
        type: "button",
        content: "View All Products",
        animation: "pulse",
      },
    ],
  },
];

// Get default content for new elements
export const getDefaultContent = (type: ElementType): string => {
  switch (type) {
    case "heading":
      return "New Heading";
    case "paragraph":
      return "Click to edit this text block and add your own content.";
    case "button":
      return "Click Me";
    case "hero":
      return "Your Hero Title";
    case "feature":
      return "Feature Title";
    case "testimonial":
      return "Client testimonial goes here";
    case "gallery":
      return "Image Gallery";
    case "counter":
      return "0";
    case "form":
      return "Contact Form";
    case "video":
      return "Video Placeholder";
    case "parallax":
      return "Parallax Section";
    default:
      return "";
  }
};
