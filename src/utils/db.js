
import { Client, Databases, ID } from "appwrite";

const THREE_DAYS_IN_MILLISECONDS = 259200000;

export const getIpAddress = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_IP_URL);
        const data = await response.json();

        return data.ip;
    } catch (error) {
        return "Unable to retrieve IP address.";
    }
}

export const saveToDB = (payload, collectionId) => new Promise(async (resolve, reject) => {
    try {
        const client = new Client();
        client
            .setEndpoint(import.meta.env.VITE_ENDPOINT_URL)
            .setProject(import.meta.env.VITE_PROJECT_ID);

        const database = new Databases(client);

        await database.createDocument(
            import.meta.env.VITE_DB_ID, 
            collectionId, 
            ID.unique(), 
            payload
        );
        resolve();
    } catch (error) {
        reject(error);
    }
});

export const answerQuestion = (answer) => new Promise(async function (resolve, reject) {
    try {
        const location = await getIpAddress();
        const payload = {
            answer,
            platform: "Ridm",
            userAgent: navigator.userAgent,
            userLocation: location
        };
        
        saveToDB(payload, import.meta.env.VITE_COLLECTION_ID);
    } catch (error) {
        reject(error)
    }
});

export const recordVisitor = async (searchParams) => {
    try {
        const avoidVisitor = Number(localStorage.getItem('omit')) >= Date.now() || searchParams.get('omit') === 'true';

        if(avoidVisitor) {
            const nextThreeDays = Date.now() + THREE_DAYS_IN_MILLISECONDS;
            localStorage.setItem('omit', String(nextThreeDays));
        } else {
            const location = await getIpAddress();
            const payload = {
                location,
                userAgent: navigator.userAgent,
                url: window.location.href
            };

            await saveToDB(payload, import.meta.env.VITE_COLLECTION_ID2);
        }
    } catch (error) {
        console.error(error.message);
    }
}