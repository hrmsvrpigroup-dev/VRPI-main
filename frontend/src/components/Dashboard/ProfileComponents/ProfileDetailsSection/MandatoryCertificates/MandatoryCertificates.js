import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./MandatoryCertificates.module.css";
import Button from "../../../../../UI/Button/Button";
import CustomImage from "../../../../../UI/Image/Image";

const MandatoryCertificates = ({ user }) => {
  // const MandatoryCertificatesData = [
  //   {
  //     title: "Income Certificate",
  //     note: "Note: Upload Income Certificate which is valid for a period of 1 year from the date of issue.",
  //     uploadedAreNot: user.incomeCertificate,
  //   },
  //   {
  //     title: "Aadhaar Card (Front)",
  //     note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
  //     uploadedAreNot: user.aadharCardFront,
  //   },
  //   {
  //     title: "Aadhaar Card (Back)",
  //     note: "Note: Make sure address of yours should be visible clearly, and can be of png.,jpeg., pdf of size 5MB. ",
  //     uploadedAreNot: user.aadharCardBack,
  //   },
  //   {
  //     title: "Passport Size photo",
  //     note: "Note: Upload your Passport size Photo of size 5MB and can be of png.,jpeg., pdf.",
  //     uploadedAreNot: user.ProfilePic,
  //   },
  // ];

  const navigate = useNavigate();

  // // Calculate number of uploaded certificates
  // const uploadedCertificates = MandatoryCertificatesData.filter(
  //   (certificate) => certificate.uploadedAreNot
  // ).length;

  // // Calculate number of certificates needed to upload
  // const certificatesToUpload =
  //   MandatoryCertificatesData.length - uploadedCertificates;

  return (
    <div className={style.container}>
      <div className={style.cardHead}>
        <h2 className={style.containerTitle}>Upload Documents</h2>
        <div>
          <span>{user.uploadedCertificates}</span>
          <span>
            /{user.MandatoryCertificatesData.length} documents uploaded
          </span>
        </div>
      </div>
      <p className={style.containerDescription}>
        Thank you for submitting your documents
      </p>
      <div className={style.certificateCards}>
        {user.MandatoryCertificatesData.map((x, i) => (
          <div className={style.card} key={i}>
            <div>
              <h3 className={style.cardTitle}>{x.title}</h3>
              {/* <p className={style.cardDescription}>{x.note}</p> */}
              <p
                className={style.cardDescription}
                style={{ color: x.uploadedAreNot ? "#25bb00" : "red" }}
              >
                {x.uploadedAreNot ? "Submitted" : "Please Upload"}
              </p>
            </div>
            <div>
              <CustomImage
                src={require(`../../../../../assets/dashboard/${
                  x.uploadedAreNot ? "correct.png" : "wrong.png"
                }`)}
                alt=""
              />
            </div>
          </div>
        ))}
        {user.certificatesToUpload > 0 && (
          <Button
            onClick={() => {
              navigate("/mandatoryCertificates");
            }}
            className={style.uploadBtn}
            disabled={user.certificatesToUpload === 0}
          >
            Upload Certificates ({user.certificatesToUpload} remaining)
          </Button>
        )}
      </div>
    </div>
  );
};

export default MandatoryCertificates;
