
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";

import { MdClose } from "react-icons/md";
import { FiInstagram, FiMail, FiTwitter } from "react-icons/fi";

import { logo } from "../assets/images";
import { createToken } from "../utils/token";

const getIpAddress = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_IP_URL);
        const data = await response.json();

        return data.ip;
    } catch (error) {
        return "Unable to retrieve IP address.";
    }
}

const saveToDB = (payload, collectionId) => new Promise(async (resolve, reject) => {
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
})

const IconAndCloseButton = ({ closeModal }) => {
    return (
        <div className="flex justify-between items-center">
            <img src={logo} className="w-10 aspect-square object-contain" />
            <button onClick={closeModal} className="focus:outline-none flex items-center justify-center w-10 aspect-square rounded-full text-white hover:text-red-300 hover:bg-red-400/10">
                <MdClose size={20} />
            </button>
        </div>
    )
}

const Survey = ({ selectAnswer, closeModal }) => {
    return (
        <div className="animate-fadein p-6 max-w-[400px] w-full min-h-[400px] bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">Help Ridm Stay Online!</h1>
                <p className="text-sm text-gray-400">Due to high traffic, I've temporarily disabled some features. Please confirm you're not a robot so I can gather essential usage data. Thank you for your understanding!</p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <button onClick={() => selectAnswer('human')} className="h-10 rounded-lg bg-white border border-white hover:bg-white/90 text-black px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">Yes, I&apos;m human</span>
                </button>
                <button onClick={() => selectAnswer('fuck you, no one gives a shit')} className="h-10 rounded-lg border hover:border-transparent border-white/20 hover:bg-white/5 text-white px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">I don&apos;t care</span>
                </button>
            </div>
        </div>
    )
};

const Success = ({ closeModal }) => {
    return (
        <div className="p-6 max-w-[400px] w-full min-h-[400px] bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">You're Awesome, Thanks!</h1>
                <p className="text-sm text-gray-400">Thank you so much! Your response will help a solo developer like me keep this project going (and show off my work!). Ridm will return for those who enjoyed it. Check out my other stuff below or reach out!</p>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-xs text-gray-400">Socials</span>
                <div className="flex flex-wrap gap-2">
                    {
                        [{ link: 'https://x.com/nnanna-ezema', Icon: FiTwitter }, { link: 'https://instagram.com/by.ezema', Icon: FiInstagram }, { link: 'mailto:emmanuelezema21@gmail.com', Icon: FiMail }].map(({ link, Icon }, index) => (
                            <a href={link} target="_blank" className="flex items-center justify-center w-10 aspect-square rounded-full bg-white/5 hover:bg-white/10 text-white">
                                <Icon size={16} />
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-xs text-gray-400">Other projects</span>
                <div className="flex flex-wrap gap-2">
                    {
                        [{ link: 'https://scoreplug.vercel.app', title: "Scoreplug" }, { link: 'https://tekst-live.netlify.app/spaces', title: "Tekst" }, { link: 'https://robertorji.vercel.app', title: "Robert Orji" }].map(({ link, title }, index) => (
                            <a href={link} target="_blank" className="flex items-center justify-center h-8 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white">
                                <span className="text-sm">{title}</span>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const Loading = ({ closeModal }) => {
    return (
        <div className="p-6 max-w-[400px] w-full aspect-square bg-black/80 rounded-3xl border border-white/10 flex flex-col shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex flex-col items-center justify-center gap-4 flex-1">
                <span className="block w-12 aspect-square rounded-full border-[3px] border-t-white border-gray-600 animate-infiniterotate"></span>
                <p className="text-sm text-gray-200">Just a sec...</p>
            </div>
        </div>
    )
}

const ErrorComponent = ({ closeModal, retry }) => {
    return (
        <div className="p-6 max-w-[400px] w-full aspect-square bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">Damn!</h1>
                <p className="text-sm text-gray-400">It seems like your response couldn't be sent, sorry about that.</p>
            </div>
            <div className="flex justify-start items-center gap-4">
                <button onClick={retry} className="h-10 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-200 px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">Try again</span>
                </button>
            </div>
        </div>
    )
};

export default function PleaseHelpMessage({ setUserIsValidated }) {
    const [searchParams] = useSearchParams();
    const dialogRef = useRef(null);

    const [{ loading, error, success }, setFetchState] = useState({ loading: false, error: false, success: false });

    const displayDialog = () => {
        dialogRef?.current?.show();
    }

    const reset = () => {
        setFetchState({ loading: false, error: false, success: false });
    };
    const selectAnswer = async (answer) => {
        setFetchState(prev => ({ ...prev, loading: true }));

        try {
            const location = await getIpAddress();
            const payload = {
                answer,
                platform: "Ridm",
                userAgent: navigator.userAgent,
                userLocation: location
            };

            saveToDB(payload, import.meta.env.VITE_COLLECTION_ID);

            setFetchState(prev => ({ ...prev, success: true }));
        } catch (error) {
            setFetchState(prev => ({ ...prev, error: true }));
        } finally {
            setFetchState(prev => ({ ...prev, loading: false }));
        }
    };
    const validateUser = () => {
        createToken();
        setUserIsValidated(true);
    }

    const closeModal = () => dialogRef?.current?.close();
    const closeModalAndValidateUser = () => {
        closeModal();
        validateUser();
    }
    const closeModalSendRequestAndValidateUser = () => {
        selectAnswer('User closed without a response');
        closeModal();
        validateUser();
    };

    useEffect(() => {
        displayDialog();
        const avoidVisitor = localStorage.getItem('omit') <= Number(Date.now()) || searchParams.get('omit') === 'true';

        if(avoidVisitor) {
            const nextThreeDays = Date.now() + 259200000;
            localStorage.setItem('omit', String(nextThreeDays));
        } else {
            getIpAddress()
                .then((location) => {
                    const payload = {
                        location,
                        userAgent: navigator.userAgent,
                        url: window.location.href
                    };

                    saveToDB(payload, import.meta.env.VITE_COLLECTION_ID2);
                })
                .catch((error) => {
                    console.error(error);
            });
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="p-4 sm:p-6 md:p-10 w-screen h-[100dvh] fixed top-0 left-0 bg-black/50 backdrop-blur hidden open:flex items-center justify-center">
            {
                success ?
                    <Success closeModal={closeModalAndValidateUser} /> :
                    loading ?
                        <Loading closeModal={closeModalAndValidateUser} /> :
                        error ?
                            <ErrorComponent retry={reset} closeModal={closeModalAndValidateUser} /> :
                            <Survey selectAnswer={selectAnswer} closeModal={closeModalSendRequestAndValidateUser} />
            }
        </dialog>
    )
}