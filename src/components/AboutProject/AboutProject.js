import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about-project">
      <div className="about-project__header">
        О проекте
      </div>
      <div className="about-project__text-wrapper">
        <div className="about-project__title">Дипломный проект включал 5 этапов</div>
        <div className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
      </div>
      <div className="about-project__text-wrapper">
        <div className="about-project__title">На выполнение диплома ушло 5 недель</div>
        <div className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
      </div>
      <div className="about-project__bars-wrapper">
        <div className="about-project__bar-group">
          <div className="about-project__status-bar about-project__status-bar_sm">1 неделя</div>
          <div className="about-project__subtitle">Back-end</div>
        </div>
        <div className="about-project__bar-group about-project__bar-group_lg">
          <div className="about-project__status-bar about-project__status-bar_lg">4 недели</div>
          <div className="about-project__subtitle">Front-end</div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;