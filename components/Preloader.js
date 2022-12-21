import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

import * as location from "../styles/79794-world-locations.json";
import * as success from "../styles/1127-success.json";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function PreLoader2() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, []);

  return (
    <>
      {!completed ? (
        <>
          <div className="w-full h-screen justify-center align-middle">
            {!loading ? (
              <div className="mt-48">
                <Lottie options={defaultOptions1} height={400} width={400} />
              </div>
            ) : (
              <div className="mt-80">
                <Lottie options={defaultOptions2} height={150} width={150} />
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PreLoader2;
