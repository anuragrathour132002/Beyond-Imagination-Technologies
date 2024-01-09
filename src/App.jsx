import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import LoginPage from "./components/login";
import Chart from "./components/chart";
import UserContexProvider from "./context/userContextProvider";

function App() {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <UserContexProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <div className="flex">
                  <Sidebar />
                  <Routes>
                    <Route path="/chart" element={<Chart />} />
                    <Route path="/" element={<Chart />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </UserContexProvider>
  );
}

export default App;
