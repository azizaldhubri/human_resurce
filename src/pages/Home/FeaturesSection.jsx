import React from 'react';
import './FeaturesSection.css';
// import { FaUserShield, FaChartBar, FaClock, FaCogs } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="features-section  d-flex align-items-center justify-content-center  flex-column "
    style={{background:'rgb(159, 199, 216)'
       
    }}>
      <>
        <h2 className=''>مميزات نظام الموارد البشرية</h2>
        <div className="features-grid w-100 ">
          <div className="feature-card">
            {/* <FaUserShield className="feature-icon" /> */}
            <h3>أمان عالي</h3>
            <p>حماية بيانات الموظفين وسرية المعاملات.</p>
          </div>
          <div className="feature-card">
            {/* <FaUserShield className="feature-icon" /> */}
            <h3>يدعم الأتمتة</h3>
            <p>رسائل فورية تصل الى التجلرام عند تسجيل غياب او موافقة على إجازة ... الخ </p>
          </div>
          <div className="feature-card">
            {/* <FaChartBar className="feature-icon" /> */}
            <h3>تقارير تفصيلية</h3>
            <p>عرض وتحليل شامل لأداء الموظفين والرواتب.</p>
          </div>
          <div className="feature-card">
            {/* <FaClock className="feature-icon" /> */}
            <h3>تتبع الحضور</h3>
            <p>سجل دقيق للحضور والانصراف والتأخيرات.</p>
          </div>
          <div className="feature-card">
            {/* <FaCogs className="feature-icon" /> */}
            <h3>إدارة مرنة</h3>
            <p>إمكانية تخصيص النظام حسب احتياجات الشركة.</p>
          </div>
          <div className="feature-card">
            {/* <FaCogs className="feature-icon" /> */}
            <h3>إدارة الإجازات</h3>
            <p> امكانية تقديم طلب اجازة والاشعار عندالموافقه عليها</p>
            <p>وصول اشعار للمدير بطلب اجازه </p>
          </div>
          <div className="feature-card">
            {/* <FaCogs className="feature-icon" /> */}
            <h3>إدارة المرتبات</h3>
            <p> سهولة إدارة المرتبات من خلال حساب الحوافز والخصومات بشكل تلقائي </p>             
          </div>
          <div className="feature-card">            
            <h3>إدارة المهام</h3>
            <p> سهولة إدارة المهام وتتبعها </p>             
          </div>
          <div className="feature-card">            
            <h3>  إدارة الصلاحيات </h3>
            <p> التحكم بصلاحية المستخدمين </p>             
          </div>
        </div>
      </>
    </section>
  );
};

export default FeaturesSection;
