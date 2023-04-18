import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import NavMenu from "./components/NavMenu";
import Home from "./components/Home";
import Articles from "./components/Articles";
import { useState } from "react";

function App() {
  const [click, setClick] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <Nav click={click} setClick={setClick} />
      {click ? "" : <NavMenu />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Articles/:article_id"
          element={
            isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <Articles setIsLoading={setIsLoading} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
