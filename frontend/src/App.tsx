import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProductProvider } from "./context/ProductHistoryContext";
import History from "./pages/History";
function App() {
  return (
    <Router>
      <ProductProvider>
        <main className="p-4">
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </ProductProvider>
    </Router>
  );
}

export default App;
