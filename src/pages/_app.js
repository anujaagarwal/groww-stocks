import "@/styles/globals.css";
require("dotenv").config(); // Load environment variables from .env

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
