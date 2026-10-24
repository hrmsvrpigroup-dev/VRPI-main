import { Link } from "react-router-dom";
import style from "./Title.module.css";

const Title = ({ title, highlightWord, viewAll, styles }) => {
  // Split the title string into parts based on the highlight word
  const parts = title.split(highlightWord);

  return (
    <div className={style.titleContainer}>
      <h2 className={style.title} style={styles}>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index !== parts.length - 1 && (
              <span className={style.highlight}>{highlightWord}</span>
            )}
          </span>
        ))}
      </h2>
      {viewAll && <Link to="">View all</Link>}
    </div>
  );
};

export default Title;
