import style from "./JoinUs.module.css";

const JoinUs = () => {
  const emailInputHandle = (e) => {
    // console.log(e.target.value);
  };
  return (
    <div>
      <div className={style.joinUs}>
        <h2>Join our community</h2>
        <div className={style.searchContainer}>
          <div className={style.searchInput}>
            <input
              type="search"
              // className={style.searchInput}
              placeholder="Enter your mail address"
              onChange={emailInputHandle}
            />
          </div>
          <button className={style.searchButton}>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
