import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__name">Developed by: Sabrina Florence</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;