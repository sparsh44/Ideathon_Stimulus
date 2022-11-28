import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUser,useSupabaseClient,useSession } from '@supabase/auth-helpers-react'
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { useRouter } from "next/router";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    community:string;
};

export default function Modal({ show, setShow,community }: Props) {
    const user=useUser();
    const session=useSession();
    const supabase=useSupabaseClient();
    const router=useRouter();
    useEffect(()=>{
        if(!router.isReady) return
        links()

    },[community,router.isReady])
    const[res,setRes]=useState([]);
    console.log(community);
    const links=async()=>{
        let{data,error}=await supabase.from('resources').select("*").eq("clubName",community);
        if(error){
            throw error
        }
        setRes(data);
        console.log(data);


    }
    const arr=res||[]
    const rows=[];
    arr.forEach(link=>{
        rows.push(
            <a href={link.document_url}>{link.document_name}</a>
        )
    })
    return (
        <>
            {show && (
                <div className="fixed top-0 flex items-center justify-center p-10 left-0 right-0 bottom-0 bg-opacity-25 bg-black z-50 overflow-x-hidden overflow-y-auto">
                    <div className="bg-white p-10 rounded-lg w-1/2 z-50 relative overflow-y-scroll h-full">
                        <div
                            className="absolute top-5 right-5 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-all cursor-pointer"
                            onClick={() => setShow(false)}
                        >
                            <img
                                src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                                className="h-3 w-3"
                            />
                        </div>
                        <div className="font-bold text-2xl">Guys, this is the resource modal!</div>
                        <div className="mt-5 font-medium ">
                            <ul>
                            {rows}
                            </ul>

                        </div>
                        <div className="mt-5 space-x-3">
                            <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">
                                Download {/*This will be a download button for that particular resorce */}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
