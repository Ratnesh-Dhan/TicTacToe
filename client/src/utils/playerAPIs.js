import server from './server';

const player = async (user) => {

      try {
        const { data } = await server.get(`/rival/${user}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
          return data;
      }
      catch(e) {
        return e.message;
      }
  
}

const getName = async () => {
  try {
        const response =await server.get('/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
        return response;
  }
  catch(e) {
        return e.message;
  }
}

export { player, getName }