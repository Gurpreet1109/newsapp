import "./App.css";
import LoadingBar from "react-top-loading-bar";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 20;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  // Array of categories for cleaner routing
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <Router>
      <Navbar />
      <LoadingBar color="#f11946" progress={progress} />
      <Routes>
        {categories.map((category) => (
          <Route
            key={category}
            path={category === "general" ? "/" : `/${category}`}
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key={category}
                pageSize={pageSize}
                country="in"
                category={category}
              />
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
