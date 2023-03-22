import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs" id="#techs">
      <div className="techs__title">
        Технологии
      </div>
      <div className="techs__header">
        7 технологий
      </div>
      <div className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </div>
      <div className="techs__block-wrapper">
        <div className="techs__block">HTML</div>
        <div className="techs__block">CSS</div>
        <div className="techs__block">JS</div>
        <div className="techs__block">React</div>
        <div className="techs__block">Git</div>
        <div className="techs__block">Express.js</div>
        <div className="techs__block">mongoDB</div>
      </div>
    </section>
  );
};

export default Techs;