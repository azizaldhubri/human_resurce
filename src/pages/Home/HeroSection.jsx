import React from 'react';
import './HeroSection.css';
// import video_v4 from "../../Assets/image_home/v4.mp4";
import video_v4 from "/images/v4.mp4";
const HeroSection = () => {
  return (     
       <div className="home-container ">
                <video autoPlay muted loop playsInline className="bg-video"
                // src={require('../../Assets/image_home/v4.mp4')}
                src={video_v4}
                >              
                المتصفح لا يدعم الفيديو.
                </video>
                <div className="overlay-content w-100">
              <h1 className=' text-danger border border-3 bg-black'  > تم ايقاف الإستضافة الخاصة بقواعد البيانات  </h1>
              <h1>مرحبًا بك في نظام الموارد البشرية</h1>
              <p>إدارة احترافية للموظفين والمهام</p>
            </div>
               </div> 
     
  );
};

export default HeroSection;
