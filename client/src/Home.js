
import About from "./Components/AboutComp/About";
import MainContent from "./Components/MainComp/MainContent"
import { Route,Routes, useLocation } from "react-router-dom";
import Loader from "./Components/Loader";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./PageNotFound";
import NavBar from "./Components/Nav/Navbar"
import Footer from "./Components/Footer";
import CartPage from "./Components/Cart/CartPage";
import ProductPage from "./Components/Product_Components/ProductPage";

const Home =() =>
{
    console.log("THIS IS HOME PAGE")
   
    const location = useLocation();

    return (
        <>
        <NavBar/>
                    <Routes>
                        <Route path="" element={<MainContent/>}/>
                        <Route path="/about" element={<About />} />
                        <Route path="/loader" element={<Loader />} />
                        <Route path="/products/:menu" element={<ProductPage/>}/>
                        <Route path="/mycart" element ={<CartPage/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
        </>


    )
}

export default Home;