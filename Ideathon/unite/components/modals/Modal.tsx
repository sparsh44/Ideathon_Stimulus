import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { useRouter } from "next/router";
import ModalTile from './ModalTile';
import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import moment from "moment";

type Props = {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    community: string;
};

export default function Modal({ show, setShow, community }: Props) {
    const user = useUser();
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return
        links()

    }, [community, router.isReady])
    const [res, setRes] = useState([]);
    console.log(community);
    const links = async () => {
        let { data, error } = await supabase.from('resources').select("*").eq("clubName", community);
        if (error) {
            throw error
        }
        if(data)
        {
        setRes(data);
        console.log(data);
        }

    }
    const arr = res || []
    const rows = [];
    arr.forEach(link => {
        rows.push(
            // <a href={link.document_url}>{link.document_name}</a>
            <ModalTile title={link.document_name} link={link.document_url} timeCreated={moment(new Date(link.created_at)).fromNow()} />
        )
    })

    const handleSearch = () => {
        alert("Clicked Search")
    }

    return (
        <>
            {show && (
                <div className="fixed top-0 flex items-center justify-center p-10 left-0 right-0 bottom-0 bg-opacity-25 bg-black z-50 overflow-x-hidden overflow-y-auto">
                    <div className="bg-white p-10 rounded-lg w-1/2 z-50 relative overflow-y-scroll h-full">
                        <div className="flex">
                            <div className=" bg-slate-100 w-full">
                                <input placeholder="Search for resources..." className=" outline-none self-center bg-transparent m-2 mx-3 w-full" />
                            </div>
                            <div
                                className="bg-slate-100 p-3  hover:bg-slate-200 transition-all cursor-pointer"
                                onClick={() => handleSearch(false)}
                            >
                                <SearchIcon className="h-4 w-4 text-slate-500" />
                            </div>
                            <div
                                className="bg-slate-100 p-3 hover:bg-slate-200 transition-all cursor-pointer"
                                onClick={() => setShow(false)}
                            >
                                <XIcon className="h-4 w-4 text-slate-500" />
                            </div>
                        </div>
                        <div className="mt-5 font-medium ">
                           {rows}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
