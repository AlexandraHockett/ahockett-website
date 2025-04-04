module.exports = {
  content: [
    // Your content paths
  ],
  theme: {
    extend: {
      // Ensure gradients are enabled
      backgroundImage: {
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
