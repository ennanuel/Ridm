
import { useEffect, useRef, useState } from "react";

import Success from "./Success";
import Loading from "./Loading";
import ErrorComponent from "./Error";
import Survey from "./Survey";

import { createToken } from "../../utils/token";
import { answerQuestion } from "../../utils/db";


export default function PleaseHelpMessage({ setUserIsValidated }) {
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
            answerQuestion(answer);
            setFetchState(prev => ({ ...prev, success: true }));
        } catch (error) {
            setFetchState(prev => ({ ...prev, error: true }));
        } finally {
            setFetchState(prev => ({ ...prev, loading: false }));
        };
    };
    const validateUser = () => {
        createToken();
        setUserIsValidated(true);
    };

    const closeModal = () => dialogRef?.current?.close();
    const closeModalAndValidateUser = () => {
        closeModal();
        validateUser();
    };
    const closeModalSendRequestAndValidateUser = () => {
        selectAnswer('User closed without a response');
        closeModal();
        validateUser();
    };

    useEffect(() => {
        displayDialog();
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