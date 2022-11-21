import React from 'react'
import Account from "./Account";

function ProfilePage(props) {
    return (
        <div className="flex h-screen w-full bg-gray-50">
            <div className="flex w-full h-screen items-center justify-center  lg:w-1/2">
                <div className=" bg-white px-20 py-10 rounded-3xl border-2 border-grey-200">
                    <div className="flex justify-center items-center">
                        <h1 className="text-5xl font-semibold text-slate-800">
                            {" "}
                            PROFILE{" "}
                        </h1>
                    </div>
                    <p className="font-medium text-lg text-gray-500 mt-4">
                        Welcome! Please Update your Details.
                    </p>
                    <div className="mt-8 ">
                        <Account session={props.session} />
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex bg-gray-200 items-center justify-center w-1/2 relative">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
                <div className="w-full h-1/2 bg-white/10 backdrop-blur-lg absolute bottom-0"></div>
            </div>
        </div>
    )
}

export default ProfilePage