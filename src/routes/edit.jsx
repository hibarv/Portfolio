import React, { useState } from "react";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import Header from "../components/Header";

import yourData from "../data/portfolio.json";

const Edit = () => {
  const [data, setData] = useState(yourData);
  const [currentTabs, setCurrentTabs] = useState("HEADER");
  const { theme } = useTheme();

  // In a static site (GitHub Pages) saving to disk isn't possible.
  // Edit the portfolio.json file directly and redeploy.
  const saveData = () => {
    alert(
      "Direct saving is not available in a static deployment.\nEdit src/data/portfolio.json directly and redeploy."
    );
  };

  const editProjects = (projectIndex, editProject) => {
    const copyProjects = [...data.projects];
    copyProjects[projectIndex] = { ...editProject };
    setData({ ...data, projects: copyProjects });
  };

  const deleteProject = (id) => {
    setData({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  const editServices = (serviceIndex, editService) => {
    const copyServices = [...(data.services || [])];
    copyServices[serviceIndex] = { ...editService };
    setData({ ...data, services: copyServices });
  };

  const addService = () => {
    setData({
      ...data,
      services: [
        ...(data.services || []),
        {
          id: uuidv4(),
          title: "New Service",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    });
  };

  const deleteService = (id) => {
    setData({
      ...data,
      services: (data.services || []).filter((service) => service.id !== id),
    });
  };

  const editSocials = (socialIndex, editSocial) => {
    const copySocials = [...data.socials];
    copySocials[socialIndex] = { ...editSocial };
    setData({ ...data, socials: copySocials });
  };

  const deleteSocials = (id) => {
    setData({
      ...data,
      socials: data.socials.filter((social) => social.id !== id),
    });
  };

  const handleAddExperiences = () => {
    setData({
      ...data,
      resume: {
        ...data.resume,
        experiences: [
          ...data.resume.experiences,
          {
            id: uuidv4(),
            dates: "Enter Dates",
            type: "Full Time",
            position: "Frontend Engineer at X",
            bullets: "Worked on the frontend of a React application",
          },
        ],
      },
    });
  };

  const handleEditExperiences = (index, editExperience) => {
    const copyExperiences = [...data.resume.experiences];
    copyExperiences[index] = { ...editExperience };
    setData({
      ...data,
      resume: { ...data.resume, experiences: copyExperiences },
    });
  };

  return (
    <div className="container mx-auto">
      <Header isBlog />
      <div className="mt-10">
        <div className={`${theme === "dark" ? "bg-transparent" : "bg-white"}`}>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Dashboard</h1>
            <Button onClick={saveData} type="primary">
              Save
            </Button>
          </div>

          <div className="flex items-center flex-wrap">
            {["HEADER", "PROJECTS", "SERVICES", "ABOUT", "SOCIAL", "RESUME"].map(
              (tab) => (
                <Button
                  key={tab}
                  onClick={() => setCurrentTabs(tab)}
                  type={currentTabs === tab ? "primary" : undefined}
                >
                  {tab.charAt(0) + tab.slice(1).toLowerCase()}
                </Button>
              )
            )}
          </div>
        </div>

        {/* HEADER */}
        {currentTabs === "HEADER" && (
          <div className="mt-10">
            {[
              { label: "Name", key: "name" },
              { label: "Header Tagline One", key: "headerTaglineOne" },
              { label: "Header Tagline Two", key: "headerTaglineTwo" },
              { label: "Header Tagline Three", key: "headerTaglineThree" },
              { label: "Header Tagline Four", key: "headerTaglineFour" },
            ].map(({ label, key }) => (
              <div key={key} className="mt-5 flex items-center">
                <label className="w-1/5 text-lg opacity-50">{label}</label>
                <input
                  value={data[key]}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                  type="text"
                />
              </div>
            ))}
            {[
              { label: "Blog", key: "showBlog" },
              { label: "Dark Mode", key: "darkMode" },
              { label: "Show Resume", key: "showResume" },
            ].map(({ label, key }) => (
              <div key={key} className="mt-5 flex items-center">
                <label className="w-1/5 text-lg opacity-50">{label}</label>
                <div className="w-4/5 ml-10 flex items-center">
                  <Button
                    onClick={() => setData({ ...data, [key]: true })}
                    type={data[key] ? "primary" : undefined}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => setData({ ...data, [key]: false })}
                    classes={
                      !data[key] ? "bg-red-500 text-white hover:bg-red-600" : ""
                    }
                  >
                    No
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {currentTabs === "PROJECTS" && (
          <>
            <div className="mt-10">
              {data.projects.map((project, index) => (
                <div className="mt-10" key={project.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{project.title}</h1>
                    <Button onClick={() => deleteProject(project.id)} type="primary">
                      Delete
                    </Button>
                  </div>
                  {[
                    { label: "Title", field: "title" },
                    { label: "Description", field: "description" },
                    { label: "Image Source", field: "imageSrc" },
                    { label: "URL", field: "url" },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex items-center mt-2">
                      <label className="w-1/5 text-lg opacity-50">{label}</label>
                      <input
                        value={project[field]}
                        onChange={(e) =>
                          editProjects(index, { ...project, [field]: e.target.value })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>
                  ))}
                  <hr className="my-10" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* SERVICES */}
        {currentTabs === "SERVICES" && (
          <>
            <div className="mt-10">
              {(data.services || []).map((service, index) => (
                <div key={service.id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl">{service.title}</h1>
                    <Button onClick={() => deleteService(service.id)} type="primary">
                      Delete
                    </Button>
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Title</label>
                    <input
                      value={service.title}
                      onChange={(e) =>
                        editServices(index, { ...service, title: e.target.value })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    />
                  </div>
                  <div className="flex items-center mt-5">
                    <label className="w-1/5 text-lg opacity-50">Description</label>
                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        editServices(index, { ...service, description: e.target.value })
                      }
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                    />
                  </div>
                  <hr className="my-10" />
                </div>
              ))}
            </div>
            <div className="my-10">
              <Button onClick={addService} type="primary">
                Add Service +
              </Button>
            </div>
          </>
        )}

        {/* ABOUT */}
        {currentTabs === "ABOUT" && (
          <div className="mt-10">
            <h1 className="text-2xl">About</h1>
            <textarea
              className="w-full h-96 mt-10 p-2 rounded-md shadow-md border"
              value={data.aboutpara}
              onChange={(e) => setData({ ...data, aboutpara: e.target.value })}
            />
          </div>
        )}

        {/* SOCIAL */}
        {currentTabs === "SOCIAL" && (
          <div className="mt-10">
            {data.socials.map((social, index) => (
              <div key={social.id}>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl">{social.title}</h1>
                  <Button onClick={() => deleteSocials(social.id)} type="primary">
                    Delete
                  </Button>
                </div>
                <div className="flex items-center mt-5">
                  <label className="w-1/5 text-lg opacity-50">Title</label>
                  <input
                    value={social.title}
                    onChange={(e) =>
                      editSocials(index, { ...social, title: e.target.value })
                    }
                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                    type="text"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="w-1/5 text-lg opacity-50">Link</label>
                  <input
                    value={social.link}
                    onChange={(e) =>
                      editSocials(index, { ...social, link: e.target.value })
                    }
                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                    type="text"
                  />
                </div>
                <hr className="my-10" />
              </div>
            ))}
          </div>
        )}

        {/* RESUME */}
        {currentTabs === "RESUME" && (
          <div className="mt-10">
            <h1>Main</h1>
            <div className="mt-5 flex items-center">
              <label className="w-1/5 text-sx opacity-50">Tagline</label>
              <input
                value={data.resume.tagline}
                onChange={(e) =>
                  setData({ ...data, resume: { ...data.resume, tagline: e.target.value } })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="w-1/5 text-lg opacity-50">Description</label>
              <textarea
                value={data.resume.description}
                onChange={(e) =>
                  setData({ ...data, resume: { ...data.resume, description: e.target.value } })
                }
                className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
              />
            </div>
            <hr className="my-10" />

            <h1>Experiences</h1>
            <div className="mt-10">
              {data.resume.experiences.map((experience, index) => (
                <div className="mt-5" key={experience.id}>
                  <h1 className="text-2xl">{experience.position}</h1>
                  {[
                    { label: "Dates", field: "dates" },
                    { label: "Type", field: "type" },
                    { label: "Position", field: "position" },
                  ].map(({ label, field }) => (
                    <div key={field} className="flex items-center mt-2">
                      <label className="w-1/5 text-lg opacity-50">{label}</label>
                      <input
                        value={experience[field]}
                        onChange={(e) =>
                          handleEditExperiences(index, { ...experience, [field]: e.target.value })
                        }
                        className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                        type="text"
                      />
                    </div>
                  ))}
                  <div className="mt-2 flex">
                    <label className="w-1/5 text-lg opacity-50">Bullets</label>
                    <input
                      value={experience.bullets}
                      onChange={(e) =>
                        handleEditExperiences(index, { ...experience, bullets: e.target.value })
                      }
                      placeholder="Bullet One, Bullet Two"
                      className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                      type="text"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="my-10">
              <Button onClick={handleAddExperiences} type="primary">
                Add Experience +
              </Button>
            </div>
            <hr className="my-10" />

            <div className="mt-10">
              <h1>Education</h1>
              {[
                { label: "Name", field: "universityName" },
                { label: "Dates", field: "universityDate" },
                { label: "Detail", field: "universityPara" },
              ].map(({ label, field }) => (
                <div key={field} className="flex items-center mt-5">
                  <label className="w-1/5 text-lg opacity-50">{label}</label>
                  <input
                    value={data.resume.education[field]}
                    onChange={(e) =>
                      setData({
                        ...data,
                        resume: {
                          ...data.resume,
                          education: { ...data.resume.education, [field]: e.target.value },
                        },
                      })
                    }
                    className="w-4/5 ml-10 p-2 rounded-md shadow-lg border-2"
                    type="text"
                  />
                </div>
              ))}
            </div>
            <hr className="my-10" />

            {[
              { label: "Languages", key: "languages" },
              { label: "Frameworks", key: "frameworks" },
              { label: "Others", key: "others" },
            ].map(({ label, key }) => (
              <div key={key}>
                <div className="flex mt-10">
                  <label className="w-1/5 text-lg opacity-50">{label}</label>
                  <div className="w-4/5 ml-10 flex flex-col">
                    {data.resume[key].map((item, index) => (
                      <div key={index} className="flex">
                        <input
                          value={item}
                          onChange={(e) => {
                            const copy = [...data.resume[key]];
                            copy[index] = e.target.value;
                            setData({ ...data, resume: { ...data.resume, [key]: copy } });
                          }}
                          className="w-full p-2 rounded-md shadow-lg border-2"
                          type="text"
                        />
                        <Button
                          onClick={() =>
                            setData({
                              ...data,
                              resume: {
                                ...data.resume,
                                [key]: data.resume[key].filter((_, i) => i !== index),
                              },
                            })
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="primary"
                      classes="hover:scale-100"
                      onClick={() =>
                        setData({
                          ...data,
                          resume: {
                            ...data.resume,
                            [key]: [...data.resume[key], "Added"],
                          },
                        })
                      }
                    >
                      Add +
                    </Button>
                  </div>
                </div>
                <hr className="my-10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
