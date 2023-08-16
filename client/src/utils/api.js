import server from './server';

const api = async (val) => {
    try{
    const {data} = await server.get(`/auth/${val}`);
    console.log(data);
    if(data.verify) {
        console.log(data.decode);
        return data.decode;
    }
    return "verification failed";
    }
    catch (e){
        return e.message;
    }
}

export default api;