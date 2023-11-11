import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBanner from "./components/admin/AdminBanner";
import AllProducts from "./components/admin/AllProducts";
import AddProduct from "./components/admin/AddProduct";
import AdminSettings from "./components/admin/AdminSettings";
import LoadingBar from "react-top-loading-bar";
import useTopLoading from "./contexts/topLoadingContext";
import BackDrop from "./components/states/BackDrop";
import EditProduct from "./components/admin/EditProduct";


function App() {

  const { topLoadingProgress, setTopLoadingProgress } = useTopLoading();
  const user = true;
  return (
    <>

      {topLoadingProgress > 0 && <BackDrop />}
      <LoadingBar
        color='#0a77fa'
        className="z-[1000]"
        progress={topLoadingProgress}
        onLoaderFinished={() => setTopLoadingProgress(0)}
      />

      <Routes>

        {user &&
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/banner" element={<AdminBanner />} />
            <Route path="/admin/products" element={<AllProducts />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
          </>

        }

        <Route path="/:path/*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
