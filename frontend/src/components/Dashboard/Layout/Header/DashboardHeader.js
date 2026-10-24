import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../Logo/Logo";
import style from "./DashboardHeader.module.css";

const DashboardHeader = ({ showMenuBar, toggleMenuBar, DashboardLinks }) => {
  return (
    <>
      {
        <>
          {showMenuBar && (
            <div className={style.overlay} onClick={toggleMenuBar}></div>
          )}

          <Header
            showMenuBar={showMenuBar}
            toggleMenuBar={showMenuBar ? toggleMenuBar : () => {}}
            DashboardLinks={DashboardLinks}
          />
        </>
      }
    </>
  );
};

export default DashboardHeader;

const Header = ({ showMenuBar, toggleMenuBar, DashboardLinks }) => {
  const { pathname } = useLocation();
  return (
    <header className={`${style.Header} ${showMenuBar && style.show}`}>
      <Logo className={style.logo} />
      <nav className={style.navbar}>
        <ul className={style.nav}>
          {DashboardLinks.map((link) => (
            <li key={link.title} className={style.link}>
              {link.link ? (
                <NavLink
                  onClick={() => {
                    toggleMenuBar();
                  }}
                  to={link.link}
                  className={
                    pathname === link.link
                      ? `${style.active} ${style.navLink}`
                      : style.navLink
                  }
                >
                  <LinksContents link={link} pathname={pathname} />
                </NavLink>
              ) : (
                <button
                  onClick={link.action}
                  className={`${style.navLink} ${style.logoutBtn}`}
                >
                  <LinksContents link={link} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const LinksContents = ({ link, pathname }) => {
  return (
    <>
      {pathname === link.link ? (
        <img
          src={require(`../../../../assets/dashboard/${link.iconActive}`)}
          alt=""
        />
      ) : (
        <img
          src={require(`../../../../assets/dashboard/${link.iconInActive}`)}
          alt=""
        />
      )}
      <span className={style.linkTitle}>{link.title}</span>
    </>
  );
};
