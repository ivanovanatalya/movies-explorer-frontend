import "./NavTab.css";

const NavTab = () => {
  return (
    <ul className="landing-navigation">
      <li className="landing-navigation__item">
        <a href="#project" className="landing-navigation__link">
          О проекте
        </a>
      </li>
      <li className="landing-navigation__item">
        <a href="#techs" className="landing-navigation__link">
          Технологии
        </a>
      </li>
      <li className="landing-navigation__item">
        <a href="#aboutme" className="landing-navigation__link">
          Студент
        </a>
      </li>
    </ul>
  );
};

export default NavTab;
