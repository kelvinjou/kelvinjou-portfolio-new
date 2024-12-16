import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";
import Image from 'next/image'
import { useTheme } from "next-themes";



const ProjectDetails = () => {
  const router = useRouter();
  // has to be the same name as the file (in this case it's slug)
  const { slug } = router.query;
  if (!slug) {
    return <div>Loading...</div>;
  }
  // Find the project data dynamically based on slug
  const project = data.projects.find((project) => project.title === slug);
  if (!project) {
    return <div>Project not found</div>; // Handle invalid slug
  }

  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current, textThree.current], { y: 50 }, { y: 30 }, {y: 0});
  }, []);

  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{"Project - " + project.title}</title>
        <meta name="description" content={project.description} />
      </Head>
      {data.showCursor && <Cursor />}

      <div
        className={`container mx-auto mt-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog={true} />
        <div className="mt-10 flex flex-col">

          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {project.title}
          </h1>
          <div ref={textTwo}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center items-center mt-20 w-auto px-6 py-2 ${mounted && theme === "dark" ? "text-white bg-slate-600" : "bg-slate-200"} hover:bg-[#7d5578] text-lg rounded-lg shadow-md transition duration-300`}
            >
              Link to product
            </a>
          </div>

          <h2
            ref={textThree}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            Libraries/frameworks used:
          </h2>

        </div>
        {/* taking out overflow-x-auto prevents scrollbar from appearing */}
        <div className="mt-16 flex flex-wrap justify-center scrollbar-hide space-x-16 px-4">
        {
          project.techstack?.map((item) => (
            <div className="flex-shrink-0 columns-1 text-center">
            <Image
              src={item.logo}
              alt={item.name}
              width={65}
              height={65}
              className="rounded-lg"
            />
            <div>{item.name}</div>
          </div>
          )) || <p>No techstack listed</p>
        }
        </div>

        <ContentSection content={project.description}></ContentSection>
        <Footer />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type={"primary"}>
            Edit this blog
          </Button>
        </div>
      )}

      {showEditor && (
        <BlogEditor
          post={post}
          close={() => setShowEditor(false)}
          refresh={() => router.reload(window.location.pathname)}
        />
      )}
    </>
  );
}

export default ProjectDetails;