import {   useEffect, useState } from "react";
 import 'moment/locale/ar';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // استيراد أنماط التقويم
 import React from 'react';  
import TranFormDate from '../../Helpers/TranFormDate';
import DateStorage from '../../Helpers/DateSorage';
 
 
export default function HistoryDate( props){    
 
    const [startDate, setStartDate] = useState(props.date);      
//    props.setSelectDate(DateStorage(startDate))    
    const startDate_Document =TranFormDate(startDate) 
 
    const [isOpenCalenderStart, setOpenCalenderStart] = useState(false); 
    useEffect(() => {
        if (props.date) {
            props.setSelectDate(DateStorage(startDate))          
            
        }
    }, [ startDate]);
     

//    
  
     
    return (      
        <div className="d-flex align-items-center justify-content-between   flex-wrap w-100  "
                style={{position: 'relative',zIndex:'3'}}>            
                    <div className="w-100 d-flex align-items-center justify-content-between border bg-white bg-danger rounded"                                          
                        style={{width:'100%',height:'50px',zIndex:'9'}}
                        >
                            <p className="m-0 me-2 ">{startDate_Document !='undefined,NaN-undefined-NaN' && startDate_Document}</p>
                            {/* <p className="m-0 me-2 ">{startDate_Document  && startDate_Document}</p> */}
                         
                                <div style={{ position: 'absolute',reight:0,left:0,top:'20% '}}>
                                <button className="bg-white border-0 me-0 ms-2 p-0"
                                    onClick={() =>setOpenCalenderStart((prev) => !prev) } 
                                    style={{ cursor: 'pointer', fontSize: '20px',hidden:  isOpenCalenderStart }}
                                >
                                    📅  
                                </button>
                                { isOpenCalenderStart && (
                                    <DatePicker                                                        
                                    onChange={(date) => {
                                        setStartDate(date)                                        
                                        ;setOpenCalenderStart(false)
                                      }}  
                                       minDate={props.minDate}                                                                                           
                                    inline 
                                    />
                                )}
                              </div>                                                   
                              
                    </div>  

                </div>   

     
    )
}

