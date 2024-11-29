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


const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();


  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };
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
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {/* {posts &&
                posts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    //aha
                    onClick={() => Router.push(`/project/${post.slug}`)}
                  >
                    <img
                      className="w-full h-60 rounded-lg shadow-lg object-cover"
                      src={post.image}
                      alt={post.title}
                    ></img>
                    <h2 className="mt-5 text-4xl">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25">
                      {ISOToDate(post.date)}
                    </span>
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-0 right-0">
                        <Button
                          onClick={(e) => {
                            deleteBlog(post.slug);
                            e.stopPropagation();
                          }}
                          type={"primary"}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))} */}
                {data.projects.slice().reverse().map((project) => (
                  <div className="justify-center cursor-pointer relative"
                  key={project.id}
                  onClick={() => Router.push({
                    pathname: `/project/${project.id}`,
                    query: {
                      title: project.title,
                      description: project.description,
                      imgageSrc: project.imageSrc,
                      url: project.url,
                      techStack: project.techstack
                    }
                  })
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
        {/* {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={"primary"}>
              Add New Post +{" "}
            </Button>
          </div>
        )} */}
      </>
    )
  );
};

// export async function getStaticProps() {
//   const posts = getAllPosts([
//     "slug",
//     "title",
//     "image",
//     "preview",
//     "author",
//     "date",
//   ]);

//   return {
//     props: {
//       posts: [...posts],
//     },
//   };
// }

export default Blog;
