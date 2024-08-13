import axios from '../api/axios';
import {
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_GOOGLE,
  ACCOUNT_REGISTER_COUPLE,
  ACCOUNT_REGISTER_STAFF,
  ACCOUNT_REGISTER_SUPPLIER,
  CANCEL_BOOKING,
  CREATE_CATEGORY,
  CREATE_PROMOTION,
  CREATE_SERVICE,
  CREATE_SERVICE_SUPPLIER,
  GET_ACTIVE_BLOGS,
  GET_ALL_BLOGS,
  GET_ALL_CATEGORIES,
  GET_BALANCE_WALLET,
  GET_BOOKING_BY_COUPLE,
  GET_BOOKING_BY_ID,
  GET_BOOKING_BY_SUPPLIER,
  GET_PENDING_BLOGS,
  GET_PROMOTION_BY_SUPPLIER,
  GET_REJECTED_BLOGS,
  GET_SERVICE_BY_CATEGORY_ID,
  GET_SERVICE_SUPPLIER_BY_ID,
  GET_SERVICE_SUPPLIER_BY_SUPPLIER_ID,
  GET_SERVICE_SUPPLIER_FILTER,
  GET_SUPPLIERS_BLOGS,
  POST_BOOKING,
  REQUEST_PAYMENT,
  UPDATE_CONFIRM_BOOKING_STATUS,
  UPDATE_REJECT_BOOKING_STATUS,
} from '../constants/API_URLS';
import { PROCESS_STATUS, ROLE, STATUS } from '../constants/consts';
import { LOGIN_SUCCESS } from '../message/authen/Login';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from './authSlice';

//Authentication
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('/auth/login', user);
    if (res.data.message != LOGIN_SUCCESS) {
      return res.message;
    } else {
      if (res.data) {
        if (res.data.data.roleName === ROLE.admin) {
          dispatch(loginSuccess(res.data.data));
          navigate('/');
          return res.data.status;
        }
        if (res.data.data.roleName === ROLE.staff) {
          dispatch(loginSuccess(res.data.data));
          navigate('/staff/suppliers');
          return res.data.status;
        }
        if (res.data.data.roleName === ROLE.supplier) {
          dispatch(loginSuccess(res.data.data));
          navigate('/service-suppliers-dashboard');
          return res.data.status;
        } else {
          if (res.data.data.status == STATUS.active) {
            dispatch(loginSuccess(res.data.data));
            navigate('/');
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
      navigate('/update-candidate');
    } else {
      navigate('/');
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess(null));
    navigate('/');
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
    'Content-Type': 'application/json',
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
  } catch (error) {
    return error.response.data.message;
  }
};

export const getListCategories = async (page, size) => {
  try {
    let url = `${GET_ALL_CATEGORIES}?pageNo=${page}&pageSize=${size}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const createCategory = async (name, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    let url = `${CREATE_CATEGORY}`;

    const response = await axios.post(
      url,
      {
        categoryName: name,
      },
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

// Service Supplier
export const createServiceSupplier = async (
  newService,
  token,
  navigate,
  dispatch
): Promise<string> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(CREATE_SERVICE_SUPPLIER, newService, {
      headers: headers,
    });
    return res.data.status;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getServicesSupplierFilter = async (
  supplierId = '',
  categoryId = '',
  serviceId = '',
  segmentId = ''
) => {
  try {
    const res = await axios.get(
      GET_SERVICE_SUPPLIER_FILTER +
        `?categoryId=${categoryId}&maxPrice=0&minPrice=0&serviceId=${serviceId}&supplierId=${supplierId}&type=${segmentId}`
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const getServiceSupplierById = async (supplierId) => {
  try {
    const res = await axios.get(
      GET_SERVICE_SUPPLIER_BY_ID + `?id=${supplierId}`
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

// Service

export const getServicesByCategoryId = async (categoryId) => {
  try {
    const res = await axios.get(
      GET_SERVICE_BY_CATEGORY_ID + `?categoryId=${categoryId}`
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const createService = async (
  newService,
  token,
  navigate,
  dispatch
): Promise<string> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(CREATE_SERVICE, newService, {
      headers: headers,
    });
    return res.data.status;
  } catch (error) {
    return error.response.data.message;
  }
};

// Promotion

export const createPromotion = async (promotion, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(CREATE_PROMOTION, promotion, {
      headers: headers,
    });
    return res.data.status;
  } catch (error) {
    return error;
  }
};

export const getPromotionBySupplier = async (supplierId) => {
  try {
    const res = await axios.get(
      GET_PROMOTION_BY_SUPPLIER + `?supplierId=${supplierId}`
    );

    return res.data.data;
  } catch (error) {
    return error;
  }
};

// Booking

export const getBookingBySupplierId = async (id, token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.get(GET_BOOKING_BY_SUPPLIER + `?supplierId=${id}`, {
      headers: headers,
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const createBooking = async (createBookingArgs, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(POST_BOOKING, createBookingArgs, {
      headers: headers,
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const getBookingById = async (id, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(GET_BOOKING_BY_ID + `?id=${id}`, {
      headers: headers,
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const requestPayment = async (data, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(REQUEST_PAYMENT, data, {
      headers: headers,
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const getBookingHistoryByCoupleId = async (id, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(GET_BOOKING_BY_COUPLE + `?coupleId=${id}`, {
      headers: headers,
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const cancelBooking = async (id, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    const res = await axios.put(
      CANCEL_BOOKING + `?id=${id}`,
      {},
      {
        headers: headers,
      }
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

// Booking Detail

export const confirmBookingDetail = async (id, token) => {
  const data = {
    key: 'value',
  };
  fetch(
    'https://the-day-eqh7h5gwadbga9fe.eastus-01.azurewebsites.net' +
      UPDATE_CONFIRM_BOOKING_STATUS +
      `?id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  return data.status;
};

export const rejectBookingDetail = async (id, token) => {
  const data = {
    key: 'value',
  };
  fetch(
    'https://the-day-eqh7h5gwadbga9fe.eastus-01.azurewebsites.net' +
      UPDATE_REJECT_BOOKING_STATUS +
      `?id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  return data.status;
};

// Wallet
export const getBalanceWallet = async (id, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(GET_BALANCE_WALLET + `/${id}`, {
      headers: headers,
    });
    return res.data.data.balance;
  } catch (error) {
    return error;
  }
};
