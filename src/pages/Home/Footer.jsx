import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} نظام الموارد البشرية. جميع الحقوق محفوظة.</p>
        <div className="footer-links">
          <a href="#about">عن النظام</a>
          <a href="#contact">تواصل معنا</a>
          <a href="#privacy">سياسة الخصوصية</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
