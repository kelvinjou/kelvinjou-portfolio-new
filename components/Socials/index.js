import React, { useState, useEffect } from "react";
import Button from "../Button";
import Image from 'next/image';
import { useTheme } from "next-themes";


import yourData from "../../data/portfolio.json";

const Socials = ({ className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          {/* {social.title} */}
          <Image src={mounted && theme === "dark" ? social["icon-dark"] : social["icon-light"]} alt={social.title}
          width={25}
          height={25}
          ></Image>
        </Button>
      ))}
    </div>
  );
};

export default Socials;
