import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListItemsComponent from "./components/AdminComponents/ListItemsComponent";
import CreateItemComponent from "./components/AdminComponents/CreateItemComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddImagesComponent from "./components/ImageComponents/AddImagesComponent";
import LoginComponent from "./components/UserComponents/LoginComponent";
import RegisterComponent from "./components/UserComponents/RegisterComponent";
import PrivateRoutes from "./protectedroutes/ProtectedRoutes";
import HomeComponent from "./components/HomeComponent";
import DisplayItemsComponent from "./components/DisplayItemsComponent";
import { Container } from "react-bootstrap";
import DisplayItemDetailsComponent from "./components/DisplayItemDetailsComponent";



function App() {
  return (
    <div > 
      <HeaderComponent />
      <HomeComponent />
      <Container style={{ backgroundColor: '#6b5e51' }}>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<ListItemsComponent />} />
              <Route path="/admin/add-item" element={<CreateItemComponent />} />
              <Route path="/admin/edit-item/:id" element={<CreateItemComponent />} />
              <Route path="/admin/add-images/:id" element={<AddImagesComponent />} />

            </Route>
            {/* <Route path="/admin" element={<ListItemsComponent />} />
            <Route path="/admin/add-item" element={<CreateItemComponent />} />
            <Route path="/admin/edit-item/:id" element={<CreateItemComponent />} />
            <Route path="/admin/add-images/:id" element={<AddImagesComponent />} /> */}

            <Route path="/" element={<DisplayItemsComponent />} />
            <Route path="/displayItem" element={<DisplayItemDetailsComponent />} />
            <Route path="/user/login" element={<LoginComponent />} />
            <Route path="/user/register" element={<RegisterComponent />} />

          </Routes>
        </Router>
      </Container>
    
    </div>

  );
}

export default App;
