import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Overview from "./pages/Overview";
import { Reports} from "./pages/Reports";
import Team from "./pages/Team";
function App() {
  const [count, setCount] = useState(0);

  return (
     <> <Sidebar />
    <Routes>
      <Route path="/overview" element={Overview} />
      <Route path="/reports" element={<Reports/>} />
      <Route path="/team" element={<Team/>} />
    </Routes>
    </>
  );
}

export default App;
