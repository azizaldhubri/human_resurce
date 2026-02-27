import React from 'react';
import './CallToActionSection.css';

const CallToActionSection = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>هل أنت مستعد لتطوير إدارة شركتك؟</h2>
        <p>ابدأ باستخدام نظام الموارد البشرية الآن وسهّل على نفسك العمل اليومي.</p>
        <a href="#contact" className="cta-button">ابدأ الآن</a>
      </div>
    </section>
  );
};

export default CallToActionSection;
