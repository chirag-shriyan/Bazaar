import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBanner from "./components/admin/AdminBanner";
import AllProducts from "./components/admin/AllProducts";
import AddProduct from "./components/admin/AddProduct";
import AdminSettings from "./components/admin/AdminSettings";



function App() {

  const user = true;
  return (
    <>
      <Routes>




        {user &&
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/banner" element={<AdminBanner />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </>

        }

        <Route path="/:id*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
