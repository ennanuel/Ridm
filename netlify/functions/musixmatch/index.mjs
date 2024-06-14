import axios from "axios";

async function musixMatchHandler(req) {
    try {
        const endpoint = req.params;
        const params = { ...req.query, apikey: process.env.MUSIXMATCH_API_KEY };

        const URL = `${process.env.MUSIXMATCH_URL}/${endpoint}`;

        const response = await axios.get(URL, { params });

        console.log("API call successful!");
        
        return {
            body: response.data,
            statusCode: 200
        }
    } catch (error) {
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
};

export default musixMatchHandler;

export const config = {
    path: "/lyrics"
};