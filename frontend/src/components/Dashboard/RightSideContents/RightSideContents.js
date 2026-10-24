import EdutechBenefits from "./EdutechBenefits/EdutechBenefits";
import MandatoryCertificates from "../ProfileComponents/ProfileDetailsSection/MandatoryCertificates/MandatoryCertificates";
const RightSideContents = ({ userData }) => {
  return (
    <>
      {!userData.allDocAreUploaded && <MandatoryCertificates user={userData} />}
      <EdutechBenefits />
    </>
  );
};

export default RightSideContents;
