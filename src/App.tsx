import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import MatchDetail from "./components/detail/MatchDetail";
import BetsBasket from "./components/basket/BetsBasket";
import useAuthListener from "./hooks/useAuthListener";
import { useEffect } from "react";
import { signInAsGuest } from "./middleware/authService";

function App() {
  const { user, error } = useAuthListener();

  useEffect(() => {
    if (!user) {
      signInAsGuest();
    }
  }, [user]);

  if (error) {
    console.error("Auth error:", error);
  }

  return (
    <div className="h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<MatchDetail />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-200 shadow-sm">
        <BetsBasket />
      </footer>
    </div>
  );
}

export default App;
