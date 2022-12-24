import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatNavbar from "../../components/ChatNavbar";
import ChatBox from "../../components/ChatBox";
import ChatInput from "../../components/ChatInput";

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  useSupabaseClient,
  useUser,
  useSession,
} from "@supabase/auth-helpers-react";

function Room() {
  const user = useUser();
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessage] = useState([]);
  const [content, usecont] = useState("");
  const [username, setUsername] = useState(null);
  const [full_name, setfullname] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (!router.isReady) return;

    message();
    getProfile();

    // console.log(router.query);
    // console.log(user);
  }, [router.isReady]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id, username, avatar_url,full_name`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setfullname(data.full_name);
        setUserId(data.id);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const message = async () => {
    let { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_name", String(router.query.Room));
    if (error) {
      throw error;
    }

    console.log("Why");
    console.log(data);
    var arr = data || [];

    setMessage(arr);
  };

  const InsertMessage = async () => {
    var message = {
      profile_id: user.id,
      content: content,
      room_name: router.query.Room,
      avatar_url: avatar_url,
      username: username,
    };
    let { error } = await supabase.from("messages").insert([message]);
    if (error) {
      throw error;
    }
  };
  supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        console.log(payload);

        console.log("YES");
        setMessage((messages) => [].concat(messages, [payload.new]));
      }
    )
    .subscribe();
  console.log(messages);

  const conditionalInsertMessage = () => {
    if (content == "") {
      alert("Message can't be empty!")
    } else {
      InsertMessage();
    }
  }

  return (
    <div className="flex w-fit bg-slate-900">
      <div className="w-screen">
        <ChatNavbar room={router.query.Room} />
        <div className="flex w-screen">
          <div className="lg:px-40 md:mx-10 mx-19 mt-20 mb-10 pb-10 flex justify-cente w-screen">
            <ChatBox messages={messages} user={userId} />
          </div>
        </div>
        <div className="flex justify-center sticky absolute mb-5 bottom-5 mx-4 lg:mx-32 ">
          <input
            type="text"
            value={content || ""}
            onChange={(e) => {
              usecont(e.target.value);
            }}
            className="px-5 rounded-l-full w-full"
            placeholder="Enter message here..."
            onKeyDown={(e) => { if (e.key === "Enter") { InsertMessage(), usecont(""); } }}
          />
          <div className=" bg-blue-500 rounded-r-full hover:bg-blue-600 cursor-pointer ">
            <PaperAirplaneIcon
              className="w-6 h-6 text-white mx-6 my-4 rounded-full"
              onClick={() => {
                conditionalInsertMessage(), usecont("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
