import axios from "axios";

export default axios.create({
    // baseURL: 'https://weddingapp.whiteflower-8a918537.australiaeast.azurecontainerapps.io'
    baseURL: 'http://localhost:8080/'
});