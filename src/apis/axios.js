import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerapp-531d2.firebaseio.com/'
});

export default instance;