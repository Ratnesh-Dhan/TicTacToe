import server from './server';

const testAPI = async () => {
    const {data} = await server.get('/');
    return data.ok;
}

export default testAPI;