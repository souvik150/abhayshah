import { AuthContext } from "@/store/AuthContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const Publications = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const username = auth?.username;

  const getPublications = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://abhayasha.onrender.com/getAllPublications"
      );
      console.log(res.data);
      setResources(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <section className="h-[100vh] w-[90%] mx-auto">
      <div className="w-[90%] mx-auto flex flex-col gap-10 mt-5">
        <span className="text-4xl">Publications</span>
        <div className="flex flex-col gap-10 h-[85vh] overflow-y-auto">
          <div className="flex flex-wrap">
            {resources?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="card border-2 py-4 px-3 flex flex-col gap-5 rounded-xl w-[30%] mb-5 mr-10"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-lg font-semibold">
                      {data?.docname}
                    </span>
                    <p className="text-gray-700">{data?.docDesc}</p>
                  </div>
                  <span className="text-xs">
                    <i>- by {data?.docOwner}</i>
                  </span>
                  <a
                    href={data?.docLink}
                    target="_blank"
                    className="text-center bg-[#0E66C91A] text-[#0E66C9] hover:bg-[#0e65c957] transition-all py-2 px-4 rounded font-semibold mt-auto"
                  >
                    Open File
                  </a>
                </div>
              );
            })}
          </div>
          {isLoading && (
            <div className="flex justify-center item-center">Loading...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
