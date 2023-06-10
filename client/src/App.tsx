import "destyle.css";

import "./App.css";
import { Markets } from "./components/Markets";
import { Routes, Route, Navigate, redirect } from "react-router-dom";
import { Cats } from "./components/Cats";

function App() {
  const PageNotFound = <section>Page Not Found</section>;
  return (
    <main className="container">
      <Routes>
        <Route path="/markets">
          <Route index element={<Markets />} />
          <Route path=":marketName" element={<Cats />} />
          <Route path="*" element={PageNotFound} />
        </Route>
        <Route path="/" element={<Navigate to="/markets" replace />} />
        <Route path="*" element={PageNotFound} />
      </Routes>
    </main>
  );
}

export default App;
