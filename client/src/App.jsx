import { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const location = useLocation();

  const [landingTheme, setLandingTheme] = useState("dark");
  const [appTheme, setAppTheme] = useState(
    localStorage.getItem("appTheme") || "light"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Page loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Persist theme
  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.setItem("landingTheme", landingTheme);
    } else {
      localStorage.setItem("appTheme", appTheme);
    }
  }, [landingTheme, appTheme, location.pathname]);

  const currentTheme = location.pathname === "/" ? landingTheme : appTheme;

  const setCurrentTheme = (theme) => {
    if (location.pathname === "/") {
      setLandingTheme(theme);
    } else {
      setAppTheme(theme);
    }
  };

  const showNavbar = location.pathname !== "/";
  const showFooter = location.pathname !== "/";

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ${
        currentTheme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-900 to-black"
          : "bg-gradient-to-b from-gray-50 via-blue-50/30 to-white"
      }`}
    >
      {showNavbar && <Navbar theme={currentTheme} setTheme={setCurrentTheme} />}

      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner theme={currentTheme} />}>
          <AppRoutes
            landingTheme={landingTheme}
            setLandingTheme={setLandingTheme}
            appTheme={appTheme}
            setAppTheme={setAppTheme}
          />
        </Suspense>
      </main>

      {showFooter && <Footer theme={appTheme} />}

      {isLoading && <LoadingSpinner theme={currentTheme} />}
    </div>
  );
}

export default App;
