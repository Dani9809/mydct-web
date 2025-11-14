import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes"; // + Import the provider
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // + Wrap your App component
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <App />
  </ThemeProvider>
);