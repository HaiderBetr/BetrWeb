import { useEffect, useState } from "react";

import LoadingScreen from "./pages/LoadingScreen";
import MainPage from "./pages/MainPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const LOADING_TIME = 8100; // ⏱️ ajusta a tu animación real

    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <LoadingScreen /> : <MainPage />;
}

export default App;