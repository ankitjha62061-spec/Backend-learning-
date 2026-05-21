import {  BrowserRouter, Routes, Route,} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

function App() {

  return (

    <BrowserRouter>
      <Routes>
<Route
          path="/"
          element={<Login />}
        />

        <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
         <Route index element={<Dashboard />}/>
            <Route  path="products"  element={<Products />}
          /> </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;