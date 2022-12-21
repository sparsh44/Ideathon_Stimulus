import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Home from "./Home";
import ProfilePage from "../components/ProfilePage";
import Navbar from "../components/Navbar";
// import Preloader from "../components/Preloader";
import PreLoader2 from "../components/Preloader";
const customTheme = {
  default: {
    colors: {
      brand: "rgb(96 165 250)",
      brandAccent: "rgb(96 165 250)",
      brandButtonText: "white",
      inputBorder: "lightgray",
      inputPlaceholder: "rgb(107 114 128)",
      defaultButtonBorder: "white",
      // ..
    },
    fontSizes: {
      baseBodySize: "18px",
      baseInputSize: "18px",
      baseLabelSize: "18px",
      baseButtonSize: "22px",
    },
    space: {
      buttonPadding: "12px 10px",
      inputPadding: "16px 15px",
      labelBottomMargin: "4px",
      labelLeftMargin: "8px",
    },
    radii: {
      borderRadiusButton: "12px",
      buttonBorderRadius: "12px",
      inputBorderRadius: "12px",
    },
    fontWeights: {
      baseButtonWeight: "bold",
    },
  },
};
const Main = () => {
  var [pagechanger, setpage] = useState("account");
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <div>
          {/* <Preloader /> */}
          <div className="flex h-screen w-full bg-gray-50">
            <div className="flex w-full h-screen items-center justify-center  lg:w-1/2">
              <div className=" bg-white px-10 py-20 rounded-3xl border-2 border-grey-200">
                <div className="flex justify-center items-center">
                  <h1 className="text-5xl font-semibold text-slate-800">
                    {" "}
                    UNITE{" "}
                  </h1>
                </div>
                <p className="font-medium text-lg text-gray-500 mt-4">
                  Welcome Back! Please enter your details.
                </p>
                <div className="mt-8 ">
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: customTheme }}
                    theme="default"
                  />
                </div>
              </div>
            </div>
            <div className="hidden lg:flex bg-gray-200 items-center justify-center w-1/2 relative">
              <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
              <div className="w-full h-1/2 bg-white/10 backdrop-blur-lg absolute bottom-0"></div>
            </div>
          </div>
        </div>
      ) : (
         <Home />
        // <ProfilePage session={session} />
      )}
    </div>
  );
};

export default Main;
