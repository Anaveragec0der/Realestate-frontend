import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from './Components/nav/Main';
import AccountActivate from './pages/auth/AccountActivate.js';
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/auth/ForgotPassword.js';
import AccessAccount from './pages/auth/AccessAccount';
import Dashboard from './pages/user/Dashboard';
import AdCreate from './pages/user/ad/AdCreate';
import PrivateRoute from './Components/nav/routes/PrivateRoute';
import SellHouse from './pages/user/ad/SellHouse.js';
import SellLand from './pages/user/ad/SellLand.js';
import RentHouse from './pages/user/ad/RentHouse.js';
import RentLand from './pages/user/ad/RentLand.js';
import AdView from './pages/AdView';
import Footer from './Components/nav/Footer';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import AdEdit from './pages/user/ad/AdEdit';
import Wishlist from './pages/user/ad/Wishlist';
import Enquiries from './pages/user/ad/Enquiries';
import Agents from './pages/Agents'
import Agent from './pages/Agent'
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import { SearchProvider } from './context/search';
import Search from './pages/Search';

const PageNotFound=()=>(
    <div className="text-center p-5">404 PAGE NOT FOUND!</div>
)

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Main />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/auth/account-activate/:token"
                element={<AccountActivate />}
              />
              <Route
                path="/auth/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/auth/access-account/:token"
                element={<AccessAccount />}
              />
              <Route path='/' element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='ad/create' element={<AdCreate />} />
                <Route path='ad/create/sell/house' element={<SellHouse />} />
                <Route path='ad/create/sell/land' element={<SellLand />} />
                <Route path='ad/create/rent/house' element={<RentHouse />} />
                <Route path='ad/create/rent/land' element={<RentLand />} />
                <Route path='user/profile' element={<Profile />} />
                <Route path='user/setting' element={<Settings />} />
                <Route path='user/ad/:slug' element={<AdEdit />} />
                <Route path='user/wishlist' element={<Wishlist />} />
                <Route path='user/enquiries' element={<Enquiries />} />
                <Route path='user/ad/:slug' element={<AdEdit />} />
              </Route>
              <Route path='/ad/:slug' element={<AdView />} />
              <Route path='/agents' element={<Agents />} />
              <Route path='/agent/:username' element={<Agent />} />
              <Route path='/buy' element={<Buy />} />
              <Route path='/rent' element={<Rent />} />
              <Route path='/search' element={<Search />} />
              <Route path='*' element={<PageNotFound />} /> 
            </Routes>
            <Footer />
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}


export default App