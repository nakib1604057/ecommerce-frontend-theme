import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import { IntlReducer as Intl, IntlProvider } from "react-redux-multilingual";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import "./index.scss";

// Import custom components
import store from "./store";
import translations from "./constants/translations";
import {
  filterCategory,
  getAllProducts,
  getCategories,
  getInfo,
} from "./actions";
import Landing from "./components/landing";

// Layouts
import Fashion from "./components/layouts/fashion/main";
import Vegetables from "./components/layouts/vegetables/main";
import Kids from "./components/layouts/kids/main";
import Pets from "./components/layouts/pets/main";
import Furniture from "./components/layouts/furniture/main";
import Watch from "./components/layouts/watch/main";
import Beauty from "./components/layouts/beauty/main";
import Electronic from "./components/layouts/electronic/main";

//Collection Pages
import CollectionLeftSidebar from "./components/collection/collection-left-sidebar";
import CollectionNoSidebar from "./components/collection/collection-no-sidebar";
import CollectionRightSidebar from "./components/collection/collection-right-sidebar";
import CollectionFullWidth from "./components/collection/collection-full-width";
import CollectionMetro from "./components/collection/collection-metro";

// Product Pages
import LeftSideBar from "./components/products/left-sidebar";
import RightSideBar from "./components/products/right-sidebar";
import NoSideBar from "./components/products/no-sidebar";
import LeftImage from "./components/products/left-image";
import RightImage from "./components/products/right-image";
import Accordian from "./components/products/accordian";
import ColumnLeft from "./components/products/column-left";
import ColumnRight from "./components/products/column-right";
import Column from "./components/products/column";
import Vertical from "./components/products/vertical";

// Features
import Layout from "./components/app";
import Cart from "./components/cart";
import Compare from "./components/compare/index";
import wishList from "./components/wishlist";
import checkOut from "./components/checkout";
import orderSuccess from "./components/checkout/success-page";

// Extra Pages
import aboutUs from "./components/pages/about-us";
import PageNotFound from "./components/pages/404";
import lookbook from "./components/pages/lookbook";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Search from "./components/pages/search";
import Collection from "./components/pages/collection";
import ForgetPassword from "./components/pages/forget-password";
import Contact from "./components/pages/contact";
import Dashboard from "./components/pages/dashboard";
import Faq from "./components/pages/faq";
import Routes from './routes'
import { consoleLog } from "./console";
import { ToastContainer } from "react-toastify";
import { isUserLoggedIn } from "./constants/utils";
import PrivateRoute from "./routes/PrivateRoute";

const Root = () => {
  useEffect(() => {
    store.dispatch(getAllProducts());
    store.dispatch(filterCategory("-1"));
    store.dispatch(getInfo());
    store.dispatch(getCategories());
    consoleLog(isUserLoggedIn());
  }, []);


  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <IntlProvider translations={translations} locale="en">
            <BrowserRouter basename={"/"}>
              <ScrollContext>
              <Routes/>
               </ScrollContext>
            </BrowserRouter>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
