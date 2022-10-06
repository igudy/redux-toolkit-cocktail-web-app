// import logo from './logo.svg';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SingleCocktail from "./pages/SingleCocktail";
import Home from "./pages";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktail/:id" element={<SingleCocktail />} />
      </Routes>
    </div>
  );
}

export default App;