import axios from "./axios";

export const getServiceByCategory = async (
    category: string,
    minPrice: number,
    maxPrice: number,
    type: stringdsfsdaf
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/service/filterService/", {
        params: {
          categoryId: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
          type: type,
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const getServiceById = async (
    serviceID: string
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/service/getById/" + serviceID);
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getBlogsList = async (
    pageNo: number,
    pageSize: number,
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/blog/getAllActiveBlogPosts/", {
        params: {
          pageNo: pageNo,
          pageSize: pageSize
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getAllRatingsByServiceId = async (
    pageNo: number,
    pageSize: number,
    serviceId: string
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/rating/getAllRating", {
        params: {
          pageNo: pageNo,
          pageSize: pageSize,
          serviceId: serviceId
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const createRating = async (
    ratingValue: number,
    description: string,
    serviceId: string
  ): Promise<any[]> => {
  
    try {
      const response = await axios.post("/rating/create" ,{
        coupleId: "",
        dateCreated: "",
        description: description,
        ratingValue: ratingValue,
        serviceId: serviceId,
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
export const createQuotation = async (
    evenDate: string,
    message: string,
    suplierId: string,
    serviceId: string
  ): Promise<any[]> => {
  
    try {
      const response = await axios.post("/quote-request/create" ,{
        coupleId: "",
        eventDate: "",
        message: message,
        suplierId: suplierId,
        serviceId: serviceId,
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getListQuotation = async (
    pageNo: number,
    pageSize: number,
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/quote-request/getQuoteRequestByCouple", {
        params: {
          coupleId: "",
          pageNo: pageNo,
          pageSize: pageSize
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getListCombo = async (
    pageNo: number,
    pageSize: number,
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/combo/getAllCombo", {
        params: {
          pageNo: pageNo,
          pageSize: pageSize
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const getListBooking = async (
    pageNo: number,
    pageSize: number,
  ): Promise<any[]> => {
  
    try {
      const response = await axios.get("/booking/getByCouple", {
        params: {
          coupleId: "",
          pageNo: pageNo,
          pageSize: pageSize
        },
      });
  
      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      } else {
        throw new Error('API call was not successful');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


