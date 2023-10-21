import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as icons from "./icon";
import Homepage from "./pages/homepage";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(...Object.values(icons));

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
