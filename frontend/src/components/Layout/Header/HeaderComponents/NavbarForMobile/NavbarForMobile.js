import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./NavbarForMobile.module.css";
import { useDispatch } from "react-redux";
import { setComingSoon } from "../../../../../store/ComingSoonSlice";
import ProfilePic from "../../../../Dashboard/ProfilePic/ProfilePic";

function NavbarForMobile({ navElements, dashboard }) {
  const { pathname } = useLocation();

  // Initialize state to track dropdown states
  const [dropdownStates, setDropdownStates] = useState({});
  const [menuIconClicked, setMenuIconClicked] = useState(false);

  // Function to toggle dropdown state
  const toggleDropdown = (navItemName) => {
    // Close all other dropdowns
    const updatedDropdownStates = Object.fromEntries(
      Object.keys(dropdownStates).map((name) => [name, false])
    );
    setDropdownStates({
      ...updatedDropdownStates,
      [navItemName]: !dropdownStates[navItemName],
    });
  };

  const toggleMenuIcon = () => {
    setMenuIconClicked(!menuIconClicked);
  };
  const dispatch = useDispatch();



  // const getHeightAfterDelay = (boolean) => {
  //   if (boolean !== undefined) {
  //     return "auto";
  //   } else {
  //     setTimeout(() => {
  //       return "0";
  //     }, 300);
  //   }
  // };

  const renderDropdownContent = (links, navItemName) => {
    return (
      <ul
        className={style.dropdown}
        // style={{ height: getHeightAfterDelay(dropdownStates[navItemName]) }}
      >
        {links &&
          links.map((link) => (
            <li key={Math.random()}>
              {link.active ? (
                <NavLink
                  to={link.link}
                  className={({ isActive }) => (isActive ? "active" : null)}
                  onClick={toggleMenuIcon}
                >
                  {link.name}
                </NavLink>
              ) : (
                <button
                  onClick={() => dispatch(setComingSoon(true))}
                  className={({ isActive }) => (isActive ? "active" : null)}
                >
                  {link.name}
                </button>
              )}
            </li>
          ))}
      </ul>
    );
  };

  const navigate = useNavigate();

  return (
    <nav className={style.navbar}>
      <div className={style.navHead}>
        <div
          className={`${style.menuIcon} ${
            menuIconClicked && style.menuIconChange
          }`}
          onClick={toggleMenuIcon}
        >
          <div className={style.bar1}></div>
          <div className={style.bar2}></div>
          <div className={style.bar3}></div>
        </div>
        {dashboard.active && (
          <div className={style.dashboardIconContainer}>
            <ProfilePic
              onClick={() => navigate(dashboard.link)}
              title={dashboard.name}
              className={style.dashboardIcon}
            />
          </div>
        )}
      </div>

      <ul
        className={`${style.navBarForMobile} ${
          menuIconClicked ? style.active : ""
        }`}
      >
        {navElements.map((navItem) => {
          return (
            <li key={navItem.name}>
              {navItem.dropdownElement ? (
                <>
                  <button
                    className={style.linksForMobile}
                    onClick={() => toggleDropdown(navItem.name)}
                  >
                    {navItem.name}
                    {dropdownStates[navItem.name] ? (
                      <img
                        src={require(`../../../../../assets/navBarForMobile/arrowUp.png`)}
                        alt="arrow up icon"
                      />
                    ) : (
                      <img
                        src={require(`../../../../../assets/navBarForMobile/arrowDown.png`)}
                        alt="arrow down icon"
                      />
                    )}
                  </button>
                  <div
                    className={`${style.dropdownHide} ${
                      dropdownStates[navItem.name] ? style.showDropdown : ""
                    } `}
                  >
                    {renderDropdownContent(navItem.links, navItem.name)}
                  </div>
                </>
              ) : (
                <>
                  {navItem.active ? (
                    <NavLink
                      to={navItem.link}
                      className={style.linksForMobile}
                      onClick={toggleMenuIcon}
                    >
                      {navItem.name}
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => dispatch(setComingSoon(true))}
                      className={style.linksForMobile}
                    >
                      {navItem.name}
                    </button>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavbarForMobile;
