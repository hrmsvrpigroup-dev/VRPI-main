import React from "react";
import styles from "./PurchaseHistoryComponent.module.css";
import CustomImage from "../../../UI/Image/Image";
import UserDataComponent from "../../../data/user";
import { CircularProgress } from "@material-ui/core";

// Purchase item component
const PurchaseItem = ({ purchase }) => {
  return (
    <div className={`${styles.purchaseItem} ${styles.data1}`}>
      <span>
        Course: <span className={styles.span1}>{purchase.course}</span>
      </span>
      <span>
        Joined on: <span className={styles.span1}>{purchase.joinedOn}</span>
      </span>
      <span>
        Duration: <span className={styles.span1}>{purchase.duration}</span>
      </span>
      <span>
        Amount paid: <span className={styles.span1}>{purchase.amountPaid}</span>
      </span>
    </div>
  );
};

function PurchaseHistoryComponent() {
  const FetchUserData = UserDataComponent();

  const PurchasesData = FetchUserData.userData?.courseList
    ? FetchUserData.userData?.courseList.map((course) => {
        return {
          course: course.courseName || "No data",
          courseId: course.id || "No data",
          joinedOn: course.enrollmentDate || "No data",
          duration: course.duration || "No data",
          amountPaid: course.amount || "No data",
        };
      })
    : [];

  if (FetchUserData.isLoading) {
    return (
      <div className={styles.loadingState}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        {PurchasesData.length !== 0 ? (
          <div>
            <h1 className={styles.heading}>My Purchases</h1>
            <div className={styles.data}>
              {PurchasesData.map((purchase, index) => (
                <PurchaseItem key={index} purchase={purchase} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            <CustomImage
              src={require("../../../assets/dashboard/NoDataImage.png")}
              alt=""
            />
            <p>No Payments history</p>
          </div>
        )}
      </div>
    );
  }
}

export default PurchaseHistoryComponent;
