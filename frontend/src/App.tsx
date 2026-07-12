import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrainDetails from "./pages/TrainDetails";
import PnrDetails from "./pages/PnrDetails";
import RouteResults from "./pages/RouteResults";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/train/:trainNumber"
        element={<TrainDetails />}
      />

      <Route
        path="/pnr/:pnrNumber"
        element={<PnrDetails />}
      />

      <Route
        path="/routes"
        element={<RouteResults />}
      />

    </Routes>
  );
}

export default App;