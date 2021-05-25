import axios from 'axios';

const api = axios.create({
    baseURL:`${window._env_.REACT_APP_HOSTAPI}`,
})

export default api;