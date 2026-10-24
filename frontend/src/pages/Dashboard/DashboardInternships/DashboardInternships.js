import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataComponent from "../../../data/user";
import useHttpsAxios from "../../../hooks/use-httpsAxios";
import { url } from "../../../constants";
import { CircularProgress } from "@material-ui/core";
import style from "./DashboardInternships.module.css";

const DashboardInternships = () => {
  const { userData, isLoading: isUserLoading } = UserDataComponent();
  const { sendRequest, responseData, isLoading: isAppsLoading } = useHttpsAxios();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.user?.email) {
      sendRequest({
        url: `${url.backendBaseUrl}/api/vrpi-user/applied-internships/${userData.user.email}`,
      });
    }
  }, [userData?.user?.email, sendRequest]);

  useEffect(() => {
    if (responseData && responseData.status === "success") {
      setApplications(responseData.applications || []);
    }
  }, [responseData]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const isLoading = isUserLoading || isAppsLoading;

  return (
    <div className={style.container}>
      <div className={style.headerSection}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Applied Internships</h1>
          <p className={style.subtitle}>Track the status of your internship applications</p>
        </div>
        <button className={style.exploreBtn} onClick={() => navigate("/internships")}>
          Explore Internships
        </button>
      </div>

      {isLoading ? (
        <div className={style.loaderContainer}>
          <CircularProgress style={{ color: "var(--primary, #e28743)" }} />
          <p>Fetching your applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className={style.emptyState}>
          <div className={style.emptyIcon}>📂</div>
          <h3>No Applications Found</h3>
          <p>You haven't applied to any internships yet. Start building your career by applying to our open positions.</p>
          <button className={style.actionBtn} onClick={() => navigate("/internships")}>
            Browse Open Internships
          </button>
        </div>
      ) : (
        <div className={style.applicationsList}>
          <div className={style.tableHeader}>
            <span>Role</span>
            <span>Date Applied</span>
            <span>Resume Link</span>
            <span>Status</span>
          </div>
          {applications.map((app) => (
            <div key={app.id} className={style.applicationCard}>
              <div className={style.roleColumn}>
                <div className={style.iconBadge}>💼</div>
                <div className={style.roleInfo}>
                  <span className={style.roleName}>{app.internshipRole}</span>
                  <span className={style.candidateName}>{app.name}</span>
                </div>
              </div>
              
              <div className={style.dateColumn}>
                <span className={style.date}>{formatDate(app.appliedAt)}</span>
                <span className={style.time}>{formatTime(app.appliedAt)}</span>
              </div>

              <div className={style.resumeColumn}>
                <a 
                  href={app.resumeLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={style.resumeLink}
                >
                  View Resume 🔗
                </a>
              </div>

              <div className={style.statusColumn}>
                <span className={`${style.statusBadge} ${style.pending}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardInternships;
