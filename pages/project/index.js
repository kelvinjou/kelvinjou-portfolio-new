import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import Image from 'next/image'
import { useTheme } from "next-themes";

import { SegmentedControl } from '@mantine/core';


const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();

  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [value, setValue] = useState('all');
  const filteredProjects = data.projects.filter((project) => {
    if (value === 'all') {
      return true; // Return all projects if 'all' is selected
    }
    return project.type === value;
  });



  const backgroundColor = mounted && theme === 'dark' ? 'rgba(28, 34, 41, 0.7)' : '#edebeb'; // dark background (slate-800) and light background (slate-50) with lowered opacity
  const hoverColor = mounted && theme === 'dark' ? 'rgba(100, 116, 139, 0.7)' : 'rgba(148, 163, 184, 1)'; // muted hover effect
  const textColor = mounted && theme === 'dark' ? '#4d4b4b' : '#475569'; // slate-300 for unselected text in dark mode, slate-600 for light mode
  const selectedTextColor = mounted && theme === 'dark' ? '#a1a1aa' : '#334155'; // slate-400 for dark mode, slate-700 for light mode



  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);


  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Projects</title>
        </Head>
        <div
          className={`container mx-auto mb-10 ${
            data.showCursor && "cursor-none"
          }`}
        >
          <Header isBlog={true}></Header>
          <div className="mt-10">
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Projects.
            </h1>

            <SegmentedControl
              withItemsBorders={false}
              radius="md"
              value={value}
              onChange={setValue}
              data={[
                { label: 'Show All', value: 'all' },
                { label: 'iOS', value: 'iOS' },
                { label: 'MacOS', value: 'MacOS' },
                { label: 'Web', value: 'Web' },
              ]}
              styles={{
                root: {
                  backgroundColor: backgroundColor,
                  transition: 'background-color 0.3s ease',
                },
                label: {
                  color: textColor,
                  '&[data-active]': {
                    color: selectedTextColor,
                  },
                  '&:hover': {
                    backgroundColor: hoverColor,
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                  },
                },
              }}
            />


            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                {filteredProjects.slice().reverse().map((project) => (
                  <div className="justify-center cursor-pointer relative"
                  key={project.title}
                  onClick={() => Router.push(`/project/${project.title}`)
                  }
                  >
                  {/* flex and justify-end here makes sure the image is anchored to bottom */}
                  <div className={`flex flex-col items-start justify-end h-full mob:p-4 rounded-lg transition-all ease-out duration-300 ${
                    mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"} hover:scale-105 link`}
                  >
                    <Image
                      src={project.imageSrc}
                      width={project.width}
                      height={project.height}
                      alt={project.id}
                      className="rounded-3xl object-contain self-center"
                    />
                    <h2 className="mt-5 text-4xl">{project.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{project.description}</p>
                  </div>
                    {/* <span className="text-sm mt-5 opacity-25">
                      {ISOToDate(post.date)}
                    </span> */}
                  </div>
                ))
                }
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Blog;
