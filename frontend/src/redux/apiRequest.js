import axios from "../api/axios";
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_GOOGLE,
  ACCOUNT_REGISTER_COUPLE,
  ACCOUNT_REGISTER_STAFF,
  ACCOUNT_REGISTER_SUPPLIER,
  GET_ACTIVE_BLOGS,
  GET_ALL_BLOGS,
  GET_PENDING_BLOGS,
  GET_REJECTED_BLOGS,
  GET_SUPPLIERS_BLOGS,
} from "../constants/API_URLS";
import { PROCESS_STATUS, ROLE, STATUS } from "../constants/consts";
import { LOGIN_SUCCESS } from "../message/authen/Login";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "./authSlice";

//Authentication
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    if (res.data.message != LOGIN_SUCCESS) {
      return res.message;
    } else {
      if (res.data) {
        if (res.data.data.roleName === ROLE.admin) {
          dispatch(loginSuccess(res.data.data));
          navigate("/");
          return res.data.status;
        }
        if (res.data.data.roleName === ROLE.staff) {
          dispatch(loginSuccess(res.data.data));
          navigate("/staff/suppliers");
          return res.data.status;
        }
        if (res.data.data.roleName === ROLE.supplier) {
          dispatch(loginSuccess(res.data.data));
          navigate("/service-suppliers-dashboard");
          return res.data.status;
        } else {
          if (res.data.data.status == STATUS.active) {
            dispatch(loginSuccess(res.data.data));
            navigate("/");
            return res.data.status;
          } else {
            return res.data.message;
          }
        }
      } else {
        return res.message;
      }
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const loginUserByGoogle = async (
  result,
  dispatch,
  navigate,
  isRegister
) => {
  dispatch(logoutStart());
  console.log(result.user.accessToken);
  try {
    const res = await axios.post(ACCOUNT_LOGIN_GOOGLE, {
      token: result.user.accessToken,
    });
    await console.log(res);
    await dispatch(loginSuccess(res.data.data));
    if (isRegister) {
      navigate("/update-candidate");
    } else {
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess(null));
    navigate("/");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

// Couple

export const registerCouple = async (newUser, navigate, dispatch) => {
  try {
    console.log(newUser);
    const res = await axios.post(ACCOUNT_REGISTER_COUPLE, newUser);
    console.log(res);
    // loginUser(newUser, dispatch, navigate, true);
  } catch (error) {
    return error;
  }
};

export const registerSupplier = async (newUser, navigate, dispatch) => {
  try {
    const res = await axios.post(ACCOUNT_REGISTER_SUPPLIER, newUser);
    console.log(res);
    // loginUser(newUser, dispatch, navigate, true);
  } catch (error) {
    return error;
  }
};

// Staff

export const registerStaff = async (
  newUser,
  token,
  navigate,
  dispatch
): Promise<string> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(ACCOUNT_REGISTER_STAFF, newUser, {
      headers: headers,
    });
    return res.data.status;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getListBlogs = async (page, size, status, supplier_id) => {
  try {
    let url = `${GET_ALL_BLOGS}?pageNo=${page}&pageSize=${size}`;

    if (supplier_id) {
      url = `${GET_SUPPLIERS_BLOGS}?pageNo=${page}&pageSize=${size}&serviceSupplierId=${supplier_id}`;
    } else if (status === PROCESS_STATUS.pending) {
      url = `${GET_PENDING_BLOGS}?pageNo=${page}&pageSize=${size}`;
    } else if (status === PROCESS_STATUS.active) {
      url = `${GET_ACTIVE_BLOGS}?pageNo=${page}&pageSize=${size}`;
    } else if (status === PROCESS_STATUS.rejected) {
      url = `${GET_REJECTED_BLOGS}?pageNo=${page}&pageSize=${size}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
