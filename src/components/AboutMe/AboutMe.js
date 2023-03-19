import "./AboutMe.css";
import student from "../../images/student-pic.png";

const AboutMe = () => {
  return (
    <section className="about">
      <h2 className="about__header">
        Студент
      </h2>
      <div>
        <div className="about__image">
          <img src={student} alt="student image" />
        </div>
       </div>
      <div className="about__title">
        Виталий
      </div>
      <div className="about__text about__text_bold">
        Фронтенд-разработчик, 30 лет
      </div>
      <div className="about__text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
      </div>
      <div className="about__link">
        <a href="#" target="_blank">
          Github
        </a>
      </div>
    </section>
  );
};

export default AboutMe;