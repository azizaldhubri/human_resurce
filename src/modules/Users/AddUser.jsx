import { Form, Col, Row } from "react-bootstrap";
import Select from "react-select";
import HistoryDate from "../../Component/Dashboard/History";
import { useContext, useEffect, useReducer, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { typeFile } from "../../Helpers/Files";
import { Axios } from "../../Api/axios";
import { USERS } from "../../Api/Api";
import { Menu } from "../../Component/Context/MenuContext";
import customSelectStyles from "../../Component/Dashboard/customStylesSelect";

////////////////////////////////////////////////////////////
// INITIAL STATE
////////////////////////////////////////////////////////////

const initialState = {
  form: {
    name: "",
    email: "",
    telegram_chat_id: "",
    salary: "",
    phone_number: "",
    national_id: "",
    job_title: "",
    gender: "ذكر",
    nationality: null,
    department_id: null,
    role: null,
    employment_type: "دوام كامل",
    password: "",
    status: "نشط",
  },
  confirmPassword: "",
  message: "",
  files: [],
  departments: [],
  roles: [],
  birth_date: new Date(),
  hire_date: new Date(),
};

////////////////////////////////////////////////////////////
// REDUCER
////////////////////////////////////////////////////////////

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        form: { ...state.form, [action.name]: action.value },
      };

    case "SET_SELECT":
      return {
        ...state,
        form: { ...state.form, [action.name]: action.value },
      };

    case "SET_FILE":
      return { ...state, files: action.payload };

    case "SET_MESSAGE":
      return { ...state, message: action.payload };

    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload };

    case "SET_ROLES":
      return { ...state, roles: action.payload };

    case "SET_BIRTH":
      return { ...state, birth_date: action.payload };

    case "SET_HIRE":
      return { ...state, hire_date: action.payload };

    case "SET_CONFIRM":
      return { ...state, confirmPassword: action.payload };

    default:
      return state;
  }
}

////////////////////////////////////////////////////////////
// COMPONENT
////////////////////////////////////////////////////////////

export default function AddUser() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, files, message, departments, roles, birth_date, hire_date, confirmPassword } = state;

  const navigate = useNavigate();
  const menu = useContext(Menu);
  const openImage = useRef(null);

  //////////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////////

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
  }, []);

  async function fetchDepartments() {
    const res = await Axios.get("departments");
    dispatch({ type: "SET_DEPARTMENTS", payload: res.data });
  }

  async function fetchRoles() {
    const res = await Axios.get("roles");
    dispatch({ type: "SET_ROLES", payload: res.data });
  }

  //////////////////////////////////////////////////////////
  // HANDLERS
  //////////////////////////////////////////////////////////

  const handleChange = (e) =>
    dispatch({
      type: "SET_INPUT",
      name: e.target.name,
      value: e.target.value,
    });

  const handleSelect = (name, value) =>
    dispatch({
      type: "SET_SELECT",
      name,
      value,
    });

  const handleFile = (e) =>
    dispatch({
      type: "SET_FILE",
      payload: [...e.target.files],
    });

  //////////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////////

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "كلمة المرور غير متطابقة",
      });
      return;
    }

    const formData = new FormData();

    const data = {
      ...form,
      birth_date,
      hire_date,
      nationality: form.nationality?.value,
      department_id: form.department_id?.value,
      role: form.role?.label,
      role_id: form.role?.value,
      admin: "1",
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined)
        formData.append(key, value);
    });

    if (files.length > 0) {
      formData.append("files[]", files[0]);
    }

    try {
      await Axios.post(`${USERS}/add`, formData);
      menu.setIsupdateNotifaction((prev) => !prev);
      navigate("/dashboard/users");
    } catch (err) {
      dispatch({
        type: "SET_MESSAGE",
        payload: err.response?.data?.message || "حدث خطأ",
      });
    }
  }

  //////////////////////////////////////////////////////////
  // OPTIONS
  //////////////////////////////////////////////////////////

  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.department_name,
  }));

  const roleOptions = roles.map((r) => ({
    value: r.id,
    label: r.name,
  }));

  const countryOptions = [
    "اليمن",
    "السعودية",
    "مصر",
    "عمان",
    "الامارات",
    "قطر",
  ].map((c) => ({ value: c, label: c }));

  //////////////////////////////////////////////////////////
  // JSX
  //////////////////////////////////////////////////////////

  return (
<div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <Link to="/dashboard">رجوع</Link>
        <Link to="/dashboard/users">عرض كل الموظفين</Link>
      </div>

      {message && <p className="text-danger text-center">{message}</p>}

   <div className="w-100 d-flex  col-12 col-lg-12 col-md-12 col-sm-12   flex-column border-0 border-top    ">

      <Form onSubmit={handleSubmit}>
        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
              <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الاسم</Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
                 <Form.Control  className="p-2"  name="name" value={form.name} onChange={handleChange} />
             </Col>
        </Form.Group>

        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center">
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > البريد الالكتروني</Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" type="email" name="email" value={form.email} onChange={handleChange} />
         </Col>
        </Form.Group>
       </div>  
           <div className="    w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap">                                     
              <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center " >
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >telegram id</Form.Label>
                <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" type="number" name="telegram_chat_id" value={form.telegram_chat_id} onChange={handleChange} />
       
       </Col>
        </Form.Group>
        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >رقم الهاتف</Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" type="number" name="phone_number" value={form.phone_number} onChange={handleChange} />
         </Col>
        </Form.Group>
          </div>
        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center justify-content-center  flex-wrap"> 
        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
                        <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8  "   >رقم الهوية الوطنية </Form.Label>
                        <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" type="number" name="national_id" value={form.national_id} onChange={handleChange} />
         </Col>
        </Form.Group>

        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                        <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   >المسمى الوظيفي</Form.Label>
                        <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" name="job_title" value={form.job_title} onChange={handleChange} />
          </Col>
        </Form.Group>
          </div>
        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center  flex-wrap"> 
          
            <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ الميلاد</Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
        <HistoryDate  date={birth_date} setSelectDate={(v)=>dispatch({type:"SET_BIRTH",payload:v})}/>
                 </Col>
              </Form.Group>

        <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12  p-2 flex-wrap align-items-center justify-content-center" >
                      <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-8"   > تاريخ التوظيف</Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
        <HistoryDate date={hire_date} setSelectDate={(v)=>dispatch({type:"SET_HIRE",payload:v})}/>
                      </Col>
           </Form.Group> 
        
          
         </div>
        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-wrap gap-lg-4 "> 
          <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
            <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   >الجنسية</Form.Label>
           <Col lg={9} sm={8} xs={12} md={12} >
         
          <Select options={countryOptions} value={form.nationality} onChange={(e)=>handleSelect("nationality",e)} styles={customSelectStyles}/>
           </Col>
        </Form.Group>

          <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center" >
           <Form.Label  className="  col-6 col-lg-3 col-md-4 col-sm-4 m-0 col-md-3"   > القسم </Form.Label>
                      <Col lg={9} sm={8} xs={12} md={12} >
          <Select options={departmentOptions} value={form.department_id} onChange={(e)=>handleSelect("department_id",e)} styles={customSelectStyles}/>
          </Col>
        </Form.Group>
        </div>


        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12  gap-3 col-md-12 col-sm-12 d-flex   gap-lg-4 align-items-center justify-content-center  flex-wrap   "> 
         <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2 flex-wrap align-items-center justify-content-center  " >
            <Form.Label  className="  col-6 col-lg-3   col-sm-4 m-0 col-md-8 "   > صلاحية المستخدم </Form.Label>
              <Col lg={9} sm={8} xs={12} md={12} >
          <Select options={roleOptions} value={form.role} onChange={(e)=>handleSelect("role",e)} styles={customSelectStyles}/>
        </Col>
        </Form.Group>

         <Form.Group   className="d-flex  col-lg-5 col-md-5 col-sm-11  col-12   p-2  align-items-center justify-content-center flex-wrap" >
                        <Form.Label  className="  col-6 col-lg-3   col-sm-4 m-0 col-md-4   "   >المرتب</Form.Label>
                                    <Col lg={9} sm={8} xs={12} md={12} >
          <Form.Control className="p-2" type="number" name="salary" value={form.salary} onChange={handleChange}/>
        </Col>
          
        </Form.Group>
         </div>

         {/* الجنس + نوع العمل */}
<div className="w-100 d-flex justify-content-center gap-4 flex-wrap fs-4">

  {/* الجنس */}
  <Form.Group className="col-lg-5 col-md-5 col-sm-11 col-12 p-2 ">
    <Form.Label >الجنس</Form.Label>

    <div className="d-flex gap-3 mt-2">

      <Form.Check
        type="radio"
        name="gender"
        value="ذكر"
        label="ذكر"
        checked={form.gender === "ذكر"}
        onChange={handleChange}
      />

      <Form.Check
        type="radio"
        name="gender"
        value="انثى"
        label="انثى"
        checked={form.gender === "انثى"}
        onChange={handleChange}
      />

    </div>
  </Form.Group>


  {/* نوع العمل */}
  <Form.Group className="col-lg-5 col-md-5 col-sm-11 col-12 p-2">
    <Form.Label>نوع العمل</Form.Label>

    <div className="d-flex gap-3 mt-2">

      <Form.Check
        type="radio"
        name="employment_type"
        value="دوام كامل"
        label="كامل"
        checked={form.employment_type === "دوام كامل"}
        onChange={handleChange}
      />

      <Form.Check
        type="radio"
        name="employment_type"
        value="دوام جزئي"
        label="جزئي"
        checked={form.employment_type === "دوام جزئي"}
        onChange={handleChange}
      />

      <Form.Check
        type="radio"
        name="employment_type"
        value="تعاقد"
        label="تعاقد"
        checked={form.employment_type === "تعاقد"}
        onChange={handleChange}
      />

    </div>
  </Form.Group>

</div>
        <div className="  mt-3  w-100    fs-5 col-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center gap-lg-4 align-items-center  flex-wrap">
        <Form.Group className="mb-3">
          <Form.Label>كلمة المرور</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>تأكيد كلمة المرور</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e)=>dispatch({type:"SET_CONFIRM",payload:e.target.value})}/>
        </Form.Group>

        </div>
        

        <Form.Control type="file" hidden ref={openImage} onChange={handleFile}/>
        <div className="border p-3 text-center mb-3 fs-5" style={{cursor:"pointer"}} onClick={()=>openImage.current.click()}>
          {files[0] ? <img src={URL.createObjectURL(files[0])} width="150" alt="" /> : "اختر صورة"}
        </div>

        <button className="btn btn-primary w-100 mb-3">حفظ</button>

      </Form>
   </div>
</div>
  );
}