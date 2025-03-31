import './Footer.css';

const Footer = () => {
  return (
    <section className="footer">
      <p className="footer__name">Developed by: awesome creator</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </section>
  );
};

export default Footer;