import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': 'fbf7e1db32msh10ab5b44f35376cp1e18b1jsn55f7ec2305ff'
        }
    });

    return data;
}