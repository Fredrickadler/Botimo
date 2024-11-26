import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";
import { useLoginForUserMutation } from "../../redux-store/api/auth/UserInfoApi";
import { useEffect, useState } from "react";

const Loading = () => {
    // the loading screen is appire until come the response from server
    // in the time try to retrive user info from server 
    // and if user exists then go on home page and if user is new go on rewards page
    const [TriggerInstance, { data, status }] = useLoginForUserMutation();
    const [loading, setLoading] = useState(false);
    const [rejected, setRejected] = useState(false);
    const navigate = useNavigate();

    const user = {
        "Name": WebApp.initDataUnsafe.user?.first_name as string + WebApp.initDataUnsafe.user?.last_name ? WebApp.initDataUnsafe.user?.last_name : '',
        "Username": WebApp.initDataUnsafe.user?.username,
        "TgId": WebApp.initDataUnsafe.user?.id,
        "referBy": WebApp.initDataUnsafe.start_param,
        "init": WebApp.initData
    };
    useEffect(() => {
        const unSubscibe = () => {
            TriggerInstance(user);
        }
        unSubscibe();
    }, []);

    useEffect(() => {
        if (status === 'pending') {
            setLoading(true)
        } else if (status === 'fulfilled') {
            WebApp.CloudStorage.setItem('token', data?.data);
            navigate('/new-comer', {
                replace: true,
            })
        } else if (status === 'rejected') {
            setLoading(false);
            setRejected(true)
        }
    }, [status])

    return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <span hidden={loading} className="loading loading-bars loading-lg text-white"></span>
            <div hidden={rejected} role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! Something went wrong...</span>
            </div>
        </div>
    );
};

export default Loading;