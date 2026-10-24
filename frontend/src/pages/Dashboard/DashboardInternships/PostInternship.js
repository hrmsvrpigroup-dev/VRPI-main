import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";
import LoadingButton from "../../../UI/LoadingButton/LoadingButton";
import style from "./PostInternship.module.css";

const PostInternship = () => {
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useHttpsAxios();

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !companyName || !location || !stipend || !duration) {
      setMsg({ text: "Please fill out all mandatory fields.", type: "error" });
      return;
    }

    const token = localStorage.getItem("token");

    sendRequest({
      url: `${url.backendBaseUrl}/client/post-internship`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        title,
        companyName,
        location,
        stipend,
        duration,
        description,
        requirements,
      },
    }).then((res) => {
      // The hook updates state, but we can check if it succeeded
      setMsg({ text: "Internship posted successfully!", type: "success" });
      setTimeout(() => {
        navigate("/dashboard/internships");
      }, 2000);
    }).catch((err) => {
      setMsg({ text: err.message || "Failed to post internship", type: "error" });
    });
  };

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Post a New Internship</h2>
      <p className={style.subheading}>Fill in the details to publish an internship opportunity.</p>

      {msg.text && (
        <div className={`${style.alert} ${msg.type === "success" ? style.success : style.error}`}>
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.formGroup}>
          <label className={style.label}>Internship Title *</label>
          <input
            type="text"
            className={style.input}
            placeholder="e.g. Frontend React Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Company Name *</label>
          <input
            type="text"
            className={style.input}
            placeholder="e.g. VR PI Tech"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className={style.row}>
          <div className={style.formGroup}>
            <label className={style.label}>Location *</label>
            <input
              type="text"
              className={style.input}
              placeholder="e.g. Remote / Hyderabad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.label}>Duration *</label>
            <input
              type="text"
              className={style.input}
              placeholder="e.g. 3 Months"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Stipend *</label>
          <input
            type="text"
            className={style.input}
            placeholder="e.g. ₹10,000/month or Unpaid"
            value={stipend}
            onChange={(e) => setStipend(e.target.value)}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Job Description</label>
          <textarea
            className={style.textarea}
            rows="4"
            placeholder="Describe the role, day-to-day responsibilities, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={style.formGroup}>
          <label className={style.label}>Requirements</label>
          <textarea
            className={style.textarea}
            rows="4"
            placeholder="Skills required (e.g. HTML, CSS, React, REST APIs)"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>

        <div className={style.buttonContainer}>
          <LoadingButton
            onClick={handleSubmit}
            className={style.submitBtn}
            text="Publish Internship"
            loaderColor="white"
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default PostInternship;
