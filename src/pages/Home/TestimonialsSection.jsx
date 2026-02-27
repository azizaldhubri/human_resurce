import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'احمد عبدالرحيم',
      position: 'مدير الموارد البشرية - شركة المجد',
      comment: 'نظام سهل الاستخدام ووفّر علينا وقت كبير في متابعة الموظفين والرواتب.',
    },
    {
      name: 'ساره  خالد',
      position: 'محاسبة - مؤسسة النجاح',
      comment: 'التقارير رائعة والدعم الفني سريع ومتجاوب. أنصح به بشدة!',
    },
    {
      name: 'سمير الموشكي  ',
      position: 'مدير إداري - مجموعة النخبة',
      comment: 'من أفضل الأنظمة التي تعاملت معها، مرن وسريع ومتكامل.',
    },
    {
      name: 'ياسين مياس',
      position: 'مدير   - مجموعة اجيال المستقبل',
      comment: 'من الانظمة الممتازة  وانصح مدراء الموارد البشرية للعمل به',
    },
  ];

  return (
    <section className="testimonials-section w-100  p-2">
      <h2>آراء العملاء</h2>
      <div className="testimonials-container">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <p className="comment">"{t.comment}"</p>
            <h4 className="name">{t.name}</h4>
            <p className="position">{t.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
