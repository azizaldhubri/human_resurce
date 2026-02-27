import React from 'react';
import './ScreenshotsSection.css';

const ScreenshotsSection = () => {
  const images = [      
      { src: '/images/1.PNG', alt: 'عرض بياني لمسير  مرتب كل موظف ' },
      { src: '/images/2.PNG', alt: 'الواجهة الرئيسية داخل النظام ' },
      { src: '/images/3.PNG', alt: 'طلبات الإجازة والموافقة عليها' },
      { src: '/images/4.PNG', alt: 'ارصدة الإجازات' },
      { src: '/images/5.PNG', alt: 'مرتبات الموظفين' },
      { src: '/images/6.PNG', alt: 'عرض الخصومات لموظف ' },
      { src: '/images/7.PNG', alt: 'جدول الموظفين' },
      { src: '/images/8.PNG', alt: 'جدول  الصلاحيات' },
     
];

 
 

  return (
    <section className="screenshots-section   mt-4 pt-3 w-100 ">
      <h2>نماذج من النظام</h2>
      <p className="subtitle">استعرض بعض الصور الحقيقية من داخل النظام</p>
      <div className="screenshots-grid">
     
        {images.map((img, i) => (
            <div className="screenshot-card" key={i}>

            <img src={img.src} alt={img.alt} />            
            <p className='m-0'>{img.alt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScreenshotsSection;
