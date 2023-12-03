import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import LoadingBar from "react-top-loading-bar";
import useTopLoading from "./contexts/topLoadingContext";
import useAuth from "./contexts/authContext";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBanner from "./components/admin/AdminBanner";
import AllProducts from "./components/admin/AllProducts";
import AddProduct from "./components/admin/AddProduct";
import AdminOrders from "./components/admin/AdminOrders";
import BackDrop from "./components/states/BackDrop";
import EditProduct from "./components/admin/EditProduct";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import CustomSnackBar from "./components/states/CustomSnackBar";
import Product from "./components/Product";




function App() {

  const { topLoadingProgress, setTopLoadingProgress } = useTopLoading();
  const { currentUser, hasRole } = useAuth();
  const isSuperAdmin = currentUser.roles && hasRole(currentUser.roles, 'superAdmin');
  return (
    <>

      {topLoadingProgress > 0 && <BackDrop />}
      <LoadingBar
        color='#0a77fa'
        className="z-[1000]"
        progress={topLoadingProgress}
        onLoaderFinished={() => setTopLoadingProgress(0)}
      />

      <CustomSnackBar />

      <Routes>

        {/* Admin Only */}
        {isSuperAdmin &&
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/banner" element={<AdminBanner />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
          </>
        }

        {/* All Users  */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 | Not Found  */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />

      </Routes>

    </>
  )
}

export default App
