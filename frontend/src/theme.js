// theme.js
export const colors = {
  light: {
    background: "#f5f5f5",
    text: "#000",
    primary: "#007bff",
    primaryHover: "#0056b3",
    success: "#28a745",
    successHover: "#1e7e34",
    muted: "#6c757d",
    dark: "#333"
  },
  dark: {
    background: "#121212",
    text: "#e0e0e0",
    primary: "#007bff",
    primaryHover: "#3399ff",
    success: "#28a745",
    successHover: "#3ddc84",
    muted: "#6c757d",
    dark: "#e0e0e0"
  }
};

export const spacing = {
  section: "2rem",
  containerMaxWidth: "1200px",
  inputPadding: "10px",
  buttonPadding: "10px 20px",
  gap: "1rem"
};

export const fontSizes = {
  heading: "2.8rem",
  subheading: "1.4rem",
  body: "1.1rem",
  small: "0.9rem"
};

// Consistent animation speeds
export const animation = {
  fast: "0.2s",
  medium: "0.3s",
  slow: "0.5s"
};

export const buttonStyle = (bgColor, hoverColor) => ({
  display: "inline-block",
  padding: spacing.buttonPadding,
  backgroundColor: bgColor,
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
  transition: `transform ${animation.fast} ease, background-color ${animation.medium} ease`,
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  cursor: "pointer",
  ':hover': {
    backgroundColor: hoverColor || bgColor,
    transform: "translateY(-2px)"
  }
});
