import Home from "./pages/Home";
import Header from "./components/Header";
import History from "./pages/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster />
      </div>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
