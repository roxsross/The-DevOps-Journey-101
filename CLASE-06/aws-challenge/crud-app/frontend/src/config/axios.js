import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'http://$PUBLIC_IP/v1'
});

export default clienteAxios;
