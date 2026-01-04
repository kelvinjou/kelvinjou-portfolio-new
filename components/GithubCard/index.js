import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const GithubCard = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`m-5 w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 link`} // h${ mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50" } over:scale-150
    >
      <div className="laptop:mt-30 p-2 laptop:p-0">
        <div className={`flex justify-center ${theme === "dark" ? "opacity-60" : "opacity-100"}`}>
          <img src="http://ghchart.rshah.org/7734b7/kelvinjou" alt="2016rshah's Github chart" />
        </div>
      </div>
    </div>
  );
};

export default GithubCard;