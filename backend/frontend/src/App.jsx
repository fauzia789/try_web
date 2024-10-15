import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBooksDetails from './components/NewBookDetails/ViewBooksDetails';
import { authActions } from './store/auth';
import Favourites from './components/profile/Favourites';
import UserOrderHistore from './components/profile/UserOrderHistore';
import Settings from './components/profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook'; 
import UpdateBook from './pages/UpdateBook';
import IPAddressPopup from './components/IPAddressPopup/IPAddressPopup'; // Import the component

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {/* Add the IPAddressPopup here so it's available site-wide */}
      <IPAddressPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} >
          {role === "user" ? <Route index element={<Favourites />} />
            : <Route index element={<AllOrders />} />}
          {role === "admin" && <Route path='/profile/add-book' element={<AddBook />} />}
          <Route path='/profile/orderHistory' element={<UserOrderHistore />} />
          <Route path='/profile/settings' element={<Settings />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/UpdateBook/:id" element={<UpdateBook />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="view-book-details/:id" element={<ViewBooksDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
