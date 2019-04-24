import axios from 'axios';

export const getTime = () => axios.get(`http://worldclockapi.com/api/json/utc/now`);

export const api = async (body, token = null) => {
    return await axios.post(`${GRAPH_API_URL}`, body, {
        headers: {
            ...(token
                ?
                { Authorization: `Bearer ${token}` }
                :
                {})
        }
    })
}