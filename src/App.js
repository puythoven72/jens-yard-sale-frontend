import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListItemsComponent from "./components/ListItemsComponent";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateItemComponent from "./components/CreateItemComponent";
import AddImagesComponent from "./components/ImageComponents/AddImagesComponent";

function App() {
  return (
    <div>
      <HeaderComponent />

      <div className="container">
        <Router>
          <Routes>     
              <Route path="/" element={<ListItemsComponent />} />
              <Route path="/add-item" element={<CreateItemComponent />} />
              <Route path="/edit-item/:id" element={<CreateItemComponent />} />
              <Route path="/add-images/:id" element={<AddImagesComponent />} />
          </Routes>
        </Router>
      </div>
      {/* <FooterComponent /> */}
    </div>
   
  );
}

export default App;
