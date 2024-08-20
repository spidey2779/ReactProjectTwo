import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";
const App = () => {
  return (
    <Router>
      {/* <Routes>
        <Route element={<Sidebar />} path="/" />
      </Routes> */}
      <div className="flex h-screen overflow-x-hidden">
        <Sidebar />
        <div className="rounded w-full flex justify-center flex-wrap">
          <Routes>
            <Route element={<MainContent />} path="/" />
            <Route element={<ProductPage />} path="/product/:id" />
          </Routes>
        </div>
          <div>
            <TopSellers/>
            <PopularBlogs/>
          </div>
      </div>
    </Router>
  );
};

export default App;
