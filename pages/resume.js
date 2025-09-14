import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import { useTheme } from "next-themes";
import Button from "../components/Button";

// Data
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";
import { MdOutlineArrowOutward } from "react-icons/md";


const Resume = () => {
    const router = useRouter();
    const theme = useTheme();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
        if (!showResume) {
            router.push("/");
        }
    }, []);
    return (
        <>
            <div className="container mx-auto mb-10">
                <Header isBlog />
                {mount && (
                    <div className="mt-10 w-full flex flex-col items-center">
                        <Button
                            onClick={() => router.push("/images/resume_file.pdf")}>
                            <h1 className="text-2xl font-bold">View PDF Resume Version</h1>
                            <MdOutlineArrowOutward className="ml-2 mb-2 text-2xl font-bold" />
                        </Button>
                        <div
                            className={`w-full mt-10 ${mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
                                } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
                        >
                            <h1 className="text-3xl font-bold">{name}</h1>
                            <h2 className="text-xl mt-5">{resume.tagline}</h2>
                            {/* <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {resume.description}
              </h2> */}
                            <div className="mt-2">
                                <Socials />
                            </div>
                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Experience</h1>
                                <div className="flex items-center">
                                    <Button
                                        onClick={() => router.push("/images/resume_file.pdf")}>
                                        <div>Refer to PDF Resume</div>
                                        <MdOutlineArrowOutward className="ml-2 mb-2" />
                                    </Button>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold">Publications</h1>
                            <div className="flex flex-col items-start">
                                <Button
                                    // onClick={() => router.push("https://arxiv.org/pdf/2308.15502")}
                                    onClick={() => {
                                        // use this method to open in a new tab
                                        window.open('https://arxiv.org/pdf/2308.15502', '_blank');
                                    }}
                                    className="flex items-center"
                                >
                                    {/* Horizontal stacking of title and icon */}
                                    <div className="flex items-center">
                                        <div
                                            className="font-bold"
                                        >On the Steganographic Capacity of Selected Learning Models</div>
                                        <MdOutlineArrowOutward className="ml-2 mb-2" />
                                    </div>
                                </Button>

                                {/* Vertical stacking of date and authors */}
                                <div className="flex flex-col text-sm">
                                    <h3 className="opacity-75">2023</h3>
                                    <p className="mt-1 opacity-50">
                                        Rishit Agrawal, Kelvin Jou, Tanush Obili, Daksh Parikh, Samarth Prajapati, Yash Seth, Charan Sridhar, Nathan Zhang, Mark Stamp
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h1 className="text-2xl font-bold">Education</h1>
                                <div className="mt-2">
                                    <h2 className="text-lg">{resume.education.universityName}</h2>
                                    <h3 className="text-sm opacity-75">
                                        {resume.education.universityDate}
                                    </h3>
                                    <p className="text-sm mt-2 opacity-50">
                                        {resume.education.universityPara}
                                    </p>
                                </div>
                            </div>
                            {/* <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc">
                        {resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.cloud && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Cloud</h2>
                      <ul className="list-disc">
                        {resume.cloud.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Resume;
