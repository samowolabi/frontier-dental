import axios from 'axios';

// Create an Axios instance with default configuration
export const axiosInstance = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/68f5306eae596e708f1d5205',
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$iKim6l0jGkkOZ.XxYI96xOAxhm/.bXlSn65PI8QLheZ0qrvAMt/eS'
    },
});