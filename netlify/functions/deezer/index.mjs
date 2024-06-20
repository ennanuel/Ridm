import axios from "axios";

async function deezerHandler(req) {
    try {
        const queryString = req.url.replace(/(https|http):\/\/(\w|.)+app\/api\/deezer(\/)*/, '').split(/(\?|\&)/).map(query => query.split('='));
        const queries = queryString.map(([key, entry]) => ({ [key]: entry })).reduce((entries, entry) => ({ ...entries, ...entry }), {});

        const { path, ...params } = queries;
        const URL = `${process.env.DEEZER_URL}/${path}`;

        const response = await axios.get(URL, { params });
        
        return Response.json(response.data, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default deezerHandler;

export const config = {
    path: "/api/deezer"
};