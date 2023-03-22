import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__line footer__line_centered footer__line_bordered">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </div>
      <div className="footer__wrapper">

      <div className="footer__line footer__line_row">
          <a href='https://practicum.yandex.ru/' className='footer__link' target='_blank'>Яндекс.Практикум</a>
          <a href='https://github.com/ivanovanatalya/' className='footer__link' target='_blank'>Github</a>
      </div>
      <div className="footer__line footer__line_centered">
          <div className='footer__copyright'>&copy;2020</div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;