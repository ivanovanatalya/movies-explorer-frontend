import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="project">
      <div className="project__header">
        О проекте
      </div>
      <div className="project__title">Дипломный проект включал 5 этапов</div>
      <div className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
      <div className="project__title">На выполнение диплома ушло 5 недель</div>
      <div className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
      <div className="project__bars-wrapper">
        <div className="project__bar-group">
          <div className="project__status-bar project__status-bar_sm">1 неделя</div>
          <div className="project__subtitle">Back-end</div>
        </div>
        <div className="project__bar-group">
          <div className="project__status-bar project__status-bar_lg">4 недели</div>
          <div className="project__subtitle">Front-end</div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;