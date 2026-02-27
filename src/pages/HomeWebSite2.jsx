import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { UserContext } from '../Component/Context/UserProvider';
import { Axios } from '../Api/axios';
import { Link } from 'react-router-dom';
import { WindowSize } from '../Component/Context/WindowContext';
import EmployeeChart from '../modules/Users/EmployeeChart ';
 
 

const Home = () => {
     const user=useContext(UserContext)

      const window_Size=useContext(WindowSize);
         const windowsize=window_Size.windowSize ;  

        const user_data=user.user ;
        // console.log(user_data) 
        const[count,setCount]=useState([])       

        useEffect(()=>{     
           GetCount() ;
          //  GetCount_leave_requests() ;
          //  GetCount_leave_approved();

       },[])

async  function GetCount(){
  try{
    await  Axios.get('/employees/counts')
      .then(data=>{setCount(data.data)})
  }
  catch(err){console.log(err)}
}

 
 
  return (
    <div className="  d-flex flex-column "style={{  }}>
           
      {/* Welcome Section */}
      <Container className=" py-2 text-center">
        <h2>مرحباً بالمهندس:{user_data.name}</h2>
        <p className="text-muted">ماذا ترغب بالقيام به اليوم؟</p>
      </Container>

      {/* Info Cards */}
      <Container className="mb-4 mt-0   col-12 col-lg-12 col-md-12 ">
      <Col md={12} lg={12} xs={12} className="    d-flex align-items-center justify-content-center gap-4 flex-wrap" >
        {/* <Row className="g-4 col-12 col-lg-12 col-md-12 border d-flex align-items-center justify-content-center" > */}
          <Col  xs={12} md={2} lg={2} >
            <Card className=" shadow-sm h-100">
              <Link to='users'   >
                <Card.Body className=" text-center bg-danger1 ">
                  <div className="fs-1  ">👨‍💼</div>       
                  <Card.Title className='  w-100'>عدد الموظفين </Card.Title>
                  <Card.Text className=' w-100'>{count.employees ? count.employees:0}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Card className="h-100 shadow-sm">              
              <Link to='departments'>
                <Card.Body className="text-center">
                  <div className="fs-1">🏢</div>  
                  <Card.Title>عدد الأقسام  </Card.Title>
                  <Card.Text>{count.departments ? count.departments:0}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Card className="h-100 shadow-sm">
              <Link to='Leaves/LeavesRequestsManegment'>
                <Card.Body className="text-center">
                  <div className="fs-1">🛫</div>
                  <Card.Title>طلبات الإجازة</Card.Title>
                  <Card.Text>{count.pendingLeaves ? count.pendingLeaves:0}</Card.Text>                
                </Card.Body>
              </Link>
              
            </Card>
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Card className="h-100 shadow-sm">
              <Link to='Leaves'>
                <Card.Body className="text-center">
                  <div className="fs-1">🛫</div>
                  <Card.Title>الإجازات </Card.Title>
                  <Card.Text>{count.approvedLeaves ? count.approvedLeaves:0}</Card.Text>
                </Card.Body>
              </Link>
             
            </Card>
          </Col>
        {/* </Row> */}
      </Col>
      </Container>
 

      {windowsize>525 &&
          <div className="w-100 m-3 mb-4   "style={{height:'50vh'}}>
          <EmployeeChart/>
          </div>
       } 

          

      {/* Footer */}
      {/* <footer className="bg-primary text-white text-center py-3 mt-auto mb-0">
        © 2025 HR System
      </footer> */}
       
    </div>
  );
}

export default Home;
