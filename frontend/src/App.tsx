import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/modules/Header/Header';
import Landing from './components/pages/Landing/Landing';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Photographer from './components/pages/Photographer/Photographer';
import MessageBox from './components/pages/Popup/MessageBox/MessageBox';
import Register from './components/pages/Authentication/Register';
import Login from './components/pages/Authentication/Login';
import StaffManageSuppliers from './components/pages/StaffManager/StaffManageSuppliers';
import StaffManageServices from './components/pages/StaffManager/StaffManageServices';
import StaffLayout from './components/modules/StaffLayout/StaffLayout';
import { useSelector } from 'react-redux';
import Dashboard from './components/pages/ServiceSupplier/Dashboard';
import { UserProvider } from './constants/UserContex';
import ProtectedRoute from './constants/ProtectedRole';
import StaffList from './components/pages/Admin/StaffList';
import MessageBoxContainer from './components/pages/Popup/MessageBox/MessageContainer';
import { ROLE } from './constants/consts';
import './constants/styles/Filter.css';
import StaffManageBlogs from './components/pages/StaffManager/StaffManageBlogs';
import StaffManageCategories from './components/pages/StaffManager/StaffManageCategories';
import Services from './components/pages/ServiceSupplier/Services';
import ServiceDetail from './components/pages/ServiceSupplier/ServiceDetail';
import ProductPriceReporter from './components/pages/ServiceSupplier/ProductPriceReport';
import BlogDetail from './components/pages/ServiceSupplier/BlogDetail';
import Blogs from './components/pages/ServiceSupplier/Blog';
import SupplierBookingList from './components/pages/ServiceSupplier/BookingList';
import Promotions from './components/pages/ServiceSupplier/Promotions';
import HomePage from './components/pages/HomePage/HomePage';
import UpdateProfile from './components/pages/CoupleProfile/UpdateProfile';
import StepByStep from './components/pages/StepByStep/StepByStep';
import CoupleQuotation from './components/pages/CoupleQuotation/CoupleQuotation';
import BookingDetails from './components/pages/BookingDetails/BookingDetails';
import BookingHistory from './components/pages/BookingHistory/BookingHistory';
import BlogDetails from './components/pages/CoupleBlogs/BlogDetail';
import BlogList from './components/pages/CoupleBlogs/BlogList';
import CoupleServiceListImage from './components/pages/CoupleServiceDetail/CoupleServiceListImage';
import CoupleServiceDetail from './components/pages/CoupleServiceDetail/CoupleServiceDetail';
import CoupleService from './components/pages/CoupleService/CoupleService';
import ComboServiceDetail from './components/pages/ComboService/ComboServiceDetail';
// import { listStaffRoute, listSupplierRoute } from "./constants/route";

function App() {
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const [isDisplayHeader, setIsDisplayHeader] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('');
  const [roleLogin, setRoleLogin] = useState<string>(ROLE.couple);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      (user && user.roleName === ROLE.staff)
    ) {
      setIsDisplayHeader(false);
    } else {
      setIsDisplayHeader(true);
    }
  }, [location.pathname, user]);
  return (
    <div className="App">
      <UserProvider>
        {isDisplayHeader && (
          <Header
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
          />
        )}
        <Routes>
          {/* <Route path="/*" element={<MessageBoxContainer />} /> */}
          {/* Staff */}
          {/* Will be refactored after completion of Dashboard */}
          {user && user?.roleName === ROLE.staff ? (
            <Route path="/" element={<StaffLayout />}>
              <Route
                path="/staff/suppliers"
                element={<StaffManageSuppliers />}
              />
              <Route path="/staff/services" element={<StaffManageServices />} />
              <Route path="/staff/blogs" element={<StaffManageBlogs />} />{' '}
              <Route
                path="/staff/categories"
                element={<StaffManageCategories />}
              />
              <Route
                path="/service-suppliers-dashboard"
                element={<Dashboard />}
              />
            </Route>
          ) : (
            <Route path="/" element={<HomePage />} />
          )}

          {/* Authenticate */}
          <Route
            path="/login"
            element={<Login setRoleLogin={setRoleLogin} />}
          />
          <Route
            path="/register"
            element={
              <Register
                roleLogin={roleLogin}
                setMessageStatus={setMessageStatus}
                setMessage={setMessage}
              />
            }
          />

          {/* Admin */}
          <Route element={<ProtectedRoute requiredRole={ROLE.admin} />}>
            <Route
              path="/staff"
              element={
                <StaffList
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
          </Route>

          {/* Supplier */}
          <Route element={<ProtectedRoute requiredRole={ROLE.supplier} />}>
            <Route
              path="/services"
              element={
                <Services
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/service-detail/:id"
              element={
                <ServiceDetail
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/product-price-reporter"
              element={
                <ProductPriceReporter
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <Blogs
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/blog-detail/:id"
              element={
                <BlogDetail
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/booking-list"
              element={
                <SupplierBookingList
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
            <Route
              path="/promotions"
              element={
                <Promotions
                  setMessage={setMessage}
                  setMessageStatus={setMessageStatus}
                />
              }
            />
          </Route>

          {/* Test View */}
          <Route path="/profile" element={<UpdateProfile />} />

          {/* Guest */}
          <Route path="/photographer" element={<Photographer />} />
          <Route path="/step-by-step" element={<StepByStep />} />
          <Route path="/quotation" element={<CoupleQuotation />} />
          <Route path="/booking-details/:id" element={<BookingDetails />} />
          <Route path="/booking-history" element={<BookingHistory />} />

          <Route
            path="/combo-service/details/:id"
            element={<ComboServiceDetail />}
          />
          <Route path="/blogs/details/:id" element={<BlogDetails />} />
          <Route path="/blogs-couple" element={<BlogList />} />

          <Route
            path="/services/details/:id/img"
            element={<CoupleServiceListImage />}
          />
          <Route
            path="/services/details/:id"
            element={<CoupleServiceDetail />}
          />

          <Route path="/services/*" element={<CoupleService />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserProvider>
      {/* <Routes>
        {user == null || user?.roleName === ROLE.couple ? (
          <Route
            element={
              <Header
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
              />
            }
          >
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <Login
                  setRoleLogin={setRoleLogin}
                  setMessageStatus={setMessageStatus}
                  setMessage={setMessage}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  roleLogin={roleLogin}
                  setMessageStatus={setMessageStatus}
                  setMessage={setMessage}
                />
              }
            />
            <Route path="/photographer" element={<Photographer />} />
          </Route>
        ) : (
          <Route element={<StaffLayout />}>
            <Route path="/suppliers" element={<StaffManageSuppliers />} />
            <Route path="/services" element={<StaffManageServices />} />
             Service Supplier 
            <Route
              path="/service-suppliers-dashboard"
              element={<Dashboard />}
            />
          </Route>
        )}
        <Route
          path="*"
          element={
            <Navigate
              to={isProtectedRoute(location.pathname) ? "/login" : "/"}
            />
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;
