import axios from 'axios';

const instance = axios.create({
    baseURL: 'Your project url'
});

export default instance;
