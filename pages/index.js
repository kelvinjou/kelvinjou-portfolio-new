/* eslint-disable react/jsx-key */
import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Image from 'next/image'
import { useTheme } from "next-themes";

// Local Data
import data from "../data/portfolio.json";
import { language } from "gray-matter";
import GithubCard from "../components/GithubCard";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop - 75,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop - 75,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleAboutScroll={handleAboutScroll}
          handleWorkScroll={handleWorkScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        {/* <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              // aha
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}

              />
            ))}
          </div>
        </div> */}
        <div className="laptop:mt-20 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>

        <div className="laptop:mt-40 p-2 laptop:p-0" ref={workRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">Languages.</h1>
          {/* flex wrap allows images to wrap onto a new row if no more space */}
          <div className="flex flex-wrap justify-center scrollbar-hide space-x-16 px-4">
            {data.languages.map((language, index) => (
              <div key={index} className="flex-shrink-0 columns-1 text-center">
                <Image
                  src={language.logo}
                  alt={language.name}
                  width={65}
                  height={65}
                  className="rounded-lg"
                />
                <div>{language.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="laptop:mt-40 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Storage Management.</h1>
          {/* flex wrap allows images to wrap onto a new row if no more space */}
          <div className="flex flex-wrap justify-center scrollbar-hide space-x-16 px-4">
            {data.data_storage.map((storage, index) => (
              <div key={index} className="flex-shrink-0 columns-1 text-center">
                <Image
                  src={storage.logo}
                  alt={storage.name}
                  width={65}
                  height={65}
                  className="rounded-lg"
                />
                <div>{storage.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Updates.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-16">
            {data.updates
            .slice()
            .reverse() // reverse the order so the newest is displayed first
            .map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
                date={service.date}
              />
            ))}
          </div>
        </div>
        
        <GithubCard />
        <Footer />
      </div>
    </div>
  );
}
