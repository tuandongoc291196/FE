import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/modules/Header/Header";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import Landing from "./components/pages/Landing/Landing";
import { useLocation } from "react-router-dom";
import Photographer from "./components/pages/Photographer/Photographer";
import MessageBox from "./components/pages/Popup/MessageBox/MessageBox";
import Register from "./components/pages/Authentication/Register";
import Login from "./components/pages/Authentication/Login";
import { ROLE } from "./constants/consts";
import StaffManageSuppliers from "./components/pages/StaffManager/StaffManageSuppliers";
import StaffManageServices from "./components/pages/StaffManager/StaffManageServices";
import StaffLayout from "./components/modules/StaffLayout/StaffLayout";
import { useSelector } from "react-redux";
import Dashboard from "./components/pages/ServiceSupplier/Dashboard";
import { listStaffRoute, listSupplierRoute } from "./constants/route";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.login.currentUser);
  const location = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageStatus, setMessageStatus] = useState("");
  const [roleLogin, setRoleLogin] = useState<string>(ROLE.couple);

  const isProtectedRoute = (pathname: string) => {
    const protectedStaffRoutes = listStaffRoute.map((item) => item.path);
    const protectedSupplierRoutes = listSupplierRoute.map((item) => item.path);

    return (
      protectedStaffRoutes.includes(pathname) ||
      protectedSupplierRoutes.includes(pathname)
    );
  };

  useEffect(() => {
    if (user !== null) {
      if (user.roleName === ROLE.staff) navigate("/suppliers");
      if (user.roleName === ROLE.supplier)
        navigate("/service-suppliers-dashboard");
    }
  }, []);
  return (
    <div className="App">
      {message !== "" && (
        <MessageBox
          status={messageStatus}
          message={message}
          setMessage={setMessage}
          title="inasd"
        />
      )}

      <Routes>
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
            {/* Service Supplier */}
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
      </Routes>
    </div>
  );
}

export default App;
