import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/modules/Header/Header";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import Landing from "./components/pages/Landing/Landing";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Photographer from "./components/pages/Photographer/Photographer";
import MessageBox from "./components/pages/Popup/MessageBox/MessageBox";
import Register from "./components/pages/Authentication/Register";
import Login from "./components/pages/Authentication/Login";
import StaffManageSuppliers from "./components/pages/StaffManager/StaffManageSuppliers";
import StaffManageServices from "./components/pages/StaffManager/StaffManageServices";
import StaffLayout from "./components/modules/StaffLayout/StaffLayout";
import { useSelector } from "react-redux";
import Dashboard from "./components/pages/ServiceSupplier/Dashboard";
import { UserProvider } from "./constants/UserContex";
import ProtectedRoute from "./constants/ProtectedRole";
import StaffList from "./components/pages/Admin/StaffList";
import MessageBoxContainer from "./components/pages/Popup/MessageBox/MessageContainer";
import { ROLE } from "./constants/consts";
import "./constants/styles/Filter.css";
// import { listStaffRoute, listSupplierRoute } from "./constants/route";

function App() {
  const user = useSelector((state: any) => state.auth.login.currentUser);

  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageStatus, setMessageStatus] = useState("");
  const [roleLogin, setRoleLogin] = useState<string>(ROLE.couple);

  // const isProtectedRoute = (pathname: string) => {
  //   const protectedStaffRoutes = listStaffRoute.map((item) => item.path);
  //   const protectedSupplierRoutes = listSupplierRoute.map((item) => item.path);

  //   return (
  //     protectedStaffRoutes.includes(pathname) ||
  //     protectedSupplierRoutes.includes(pathname)
  //   );
  // };

  useEffect(() => {
    // if (user !== null) {
    //   if (user.roleName === ROLE.staff) navigate("/suppliers");
    //   if (user.roleName === ROLE.supplier)
    //     navigate("/service-suppliers-dashboard");
    // }
  }, []);
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
          <Routes>
            {/* <Route path="/*" element={<MessageBoxContainer />} /> */}
            {/* Staff */}
            {/* Will be refactored after completion of Dashboard */}
            {(user && user?.roleName === ROLE.staff) ? (
              <Route path="/" element={<StaffLayout />}>
                <Route path="/suppliers" element={<StaffManageSuppliers />} />
                <Route path="/services" element={<StaffManageServices />} />
                <Route path="/service-suppliers-dashboard" element={<Dashboard />} />
              </Route>
            ) : <Route path="/" element={<Landing />} />}


            {/* Authenticate */}
            <Route
              path="/login"
              element={
                <Login
                  setRoleLogin={setRoleLogin}
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

            {/* Admin */}
            <Route element={<ProtectedRoute requiredRole={ROLE.admin} />}>
              <Route path="/staff" element={<StaffList setMessage={setMessage} setMessageStatus={setMessageStatus} />} />
            </Route>


            {/* Guest */}
            <Route path="/photographer" element={<Photographer />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
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
