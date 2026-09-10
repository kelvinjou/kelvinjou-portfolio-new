import React, { useState, useEffect } from "react";
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
    <div className={`${className || ""} social-links`} aria-label="Social links">
      {yourData.socials.map((social, index) => (
        <a key={index} href={social.link} target={social.link.startsWith("http") ? "_blank" : undefined} rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined} className="social-link" aria-label={social.title}>
          <Image src={mounted && theme === "dark" ? social["icon-dark"] : social["icon-light"]} alt={social.title}
          width={25}
          height={25}
          ></Image>
        </a>
      ))}
    </div>
  );
};

export default Socials;
