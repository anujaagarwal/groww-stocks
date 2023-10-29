import "@/styles/globals.css";
require("dotenv").config(); // Load environment variables from .env
import { ThemeProvider } from "../components/Context/ThemeContext";
function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
