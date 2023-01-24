import React from "react";
import ReactDOM from "react-dom/client";
import Pick from "./pages/Pick";
import Info from "./pages/Info";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Pick />}></Route>
            <Route path="/info" element={<Info />}></Route>
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
