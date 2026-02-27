import {useState } from "react"
import { Form } from "react-bootstrap"
 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,   } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
import { Description } from "@mui/icons-material";
 import form from'./form.css'
 

export default function Task_forms(props){

 

    const style_cell={        
        fontSize: '18px',  // تغيير حجم الخط
        fontWeight: 'bold', // جعل الخط عريضًا
        borderRight: '2px solid black', // إضافة border للخلايا
        backgroundColor: '#d3d9db', // لون خلفية لتوضيح الحدود
        borderColor:'#c2c5c5',
        borderBottom:'3px solid gray'
    
}
//---------------------------------------------add task  type عام and select مقارنة عروض اسعار
const [rows, setRows] = useState([]); // حالة لتخزين الصفوف
const [selectedValues, setSelectedValues] = useState({}); // حالة لتخزين القيم المحددة

  props.setCompare_quotes(selectedValues); 


const addRow = () => {
    const newRow = { id: rows.length + 1,
     value1: selectedValues[`value1-${rows.length}`],
     value2: selectedValues[`value2-${rows.length}`], 
     value3: selectedValues[`value3-${rows.length}`],
     value4: selectedValues[`value4-${rows.length}`] ,
     value5: selectedValues[`value5-${rows.length}`]}; // إنشاء صف جديد
    setRows([...rows, newRow]); // إضافة الصف الجديد إلى الحالة
    setSelectedValues({ ...selectedValues,
         [`value1-${rows.length}`]: '',
          [`value2-${rows.length}`]: '',
          [`value3-${rows.length}`]: '',
          [`value4-${rows.length}`]: '',
          [`value5-${rows.length}`]: ''  }); // إعادة تعيين القيم المحددة
};

const handleSelectChange2 = (event, index, selectNumber) => {
    setSelectedValues({ ...selectedValues, [`value${selectNumber}-${index}`]: event.target.value }); // تحديث القيمة المحددة
};
const deleteRow = (id) => {
// setRows(rows.filter(row => row.id !== id)); 
const updatedRows = rows.filter((_, rowIndex) => rowIndex !== (id-1)); 
  setRows(updatedRows);
  // حذف القيم المرتبطة بالصف في selectedValues
  const updatedSelectedValues = Object.keys(selectedValues).reduce((acc, key) => {
    const [field, rowIndex] = key.split('-'); // استخراج اسم الحقل ورقم الصف
    if (parseInt(rowIndex, 10) !== (id-1)) {
      acc[key] = selectedValues[key];
    }
    return acc;
  }, {});

  setSelectedValues(updatedSelectedValues);
}
  
const Request_vacate_unit=[
    'جازان','دلمون1',
    'دلمون2','دلمون3'
]

const prepareData = () => {
    const preparedData = Object.keys(selectedValues).reduce((acc, key) => {
      const [field, index] = key.split('-'); // تقسيم المفتاح مثل value1-0 إلى ['value1', '0']
      const idx = parseInt(index, 10);
  
      if (!acc[idx]) {
        acc[idx] = { id: idx + 1 }; // إعداد كائن جديد لكل صف
      }
      acc[idx][field] = selectedValues[key];
      return acc;
    }, []);
  
    return preparedData.filter(row => row.value1 || row.value2); // التخلص من الصفوف الفارغة
  };


const sendDataToServer = async () => {
  const dataToSend = prepareData();

  try {
    
   await console.log('Data saved successfully:', dataToSend);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};
  

const FormWithTable = () => {
  const [formData, setFormData] = useState({
    project: "",
    workNature: "",
    contractorName: "",
    requestedPayment: "",
  });

  const [rows, setRows] = useState([
    { contractItem: "", totalQty: "", executedQty: "", progress: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleFormFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddRow = () => {
    setRows([...rows, { contractItem: "", totalQty: "", executedQty: "", progress: "" }]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        formData,
        rows,
      };
      // console.log(dataToSend)
      // إرسال البيانات إلى السيرفر
      // const response = await axios.post("http://your-server-endpoint/api/save-data", dataToSend);
      
      // عرض رسالة نجاح
      alert("تم إرسال البيانات بنجاح!");
      // console.log(response.data);
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال البيانات:", error);
      alert("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <div className="form-container mt-2">
      <div className="form-fields">
        <label>المشروع:</label>
        <input
          type="text"
          value={formData.project}
          onChange={(e) => handleFormFieldChange("project", e.target.value)}
        />
        <label>طبيعة العمل:</label>
        <input
          type="text"
          value={formData.workNature}
          onChange={(e) => handleFormFieldChange("workNature", e.target.value)}
        />
        <label>اسم المقاول:</label>
        <input
          type="text"
          value={formData.contractorName}
          onChange={(e) => handleFormFieldChange("contractorName", e.target.value)}
        />
        <label>الدفعة المطلوبة:</label>
        <input
          type="text"
          value={formData.requestedPayment}
          onChange={(e) => handleFormFieldChange("requestedPayment", e.target.value)}
        />
      </div>

      <h4>مهندس الموقع</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>البند حسب التعاقد</th>
            <th>إجمالي الكميات</th>
            <th>إجمالي الكميات المنفذة</th>
            <th>نسبة الإنجاز</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.contractItem}
                  onChange={(e) => handleInputChange(index, "contractItem", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.totalQty}
                  onChange={(e) => handleInputChange(index, "totalQty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.executedQty}
                  onChange={(e) => handleInputChange(index, "executedQty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.progress}
                  onChange={(e) => handleInputChange(index, "progress", e.target.value)}
                />
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteRow(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAddRow}>
        Add Another
      </button>
      <button className="submit-btn" onClick={handleSubmit}>
        إرسال
      </button>
    </div>
  );
};
 
//---------------------------------------------------------- 
    return(
        <div className="w-100">
         {  props.type =='مقارنة عروض اسعار' && 
            <div className="w-100">                     
            <TableContainer component={Paper}
            sx={{ 
                // maxHeight: 200,  // تحديد الحد الأقصى للارتفاع
                overflow: 'auto',
                // minWidth:1500  // تمكين التمرير عند الحاجة
                }}
            >
            <Table aria-label="simple table">
            <TableHead>
                <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px',                     
                }}> 
                <TableCell style={style_cell}>إسم المورد</TableCell>
                <TableCell style={style_cell}> نوع المواد او الخدمات</TableCell>
                <TableCell style={style_cell}>المواصفات</TableCell>
                <TableCell style={style_cell}>مميزات/ضمان</TableCell>
                <TableCell style={style_cell}>إجمالي المبلغ</TableCell>
                <TableCell style={style_cell}>حذف</TableCell>                      
                </TableRow>
            </TableHead>
            
            <TableBody  >
        {rows.map((row, index) => (
            <TableRow key={row.id}>
                <TableCell>
                    <Form.Control  
                    type="text"
                    name="Supplier_name"
                    // value={form.Supplier_name}
                    
                    // labelId={`select-label1-${index}`}
                    // value={form.Supplier_name[`value1-${index}`] || ''}
                    // onChange={handleChange} 
                    //  onChange={(event) => handleSelectChange2(event, index, 1)}  
                     value={selectedValues[`value1-${index}`] || ''}
                     onChange={(e) => handleSelectChange2(e, index, 1)}                 
                    
                    > 
                    </Form.Control>
                </TableCell>
                <TableCell style={{ padding: '10px' }}>
                    <Form.Control  
                    type="text"
                    name="Material_type"
                    // value={form.Material_type}
                    value={selectedValues[`value2-${index}`] || ''}
                    onChange={(e) => handleSelectChange2(e, index, 2)}
                    >                                
                    </Form.Control>
                </TableCell>
                <TableCell style={{  paddingRight:'3%'}}>
                    <Form.Control   
                    type="text"
                    name="Description"
                    value={selectedValues[`value3-${index}`] || ''}
                    onChange={(e) => handleSelectChange2(e, index, 3)} 
                    >                                    
                    </Form.Control>
                </TableCell>
                <TableCell style={{ padding: '10px' }} className='flex_center'>
                <Form.Control 
                type='text'
                name="Features_Warranty"
                value={selectedValues[`value4-${index}`] || ''}
                onChange={(e) => handleSelectChange2(e, index, 4)} 
                ></Form.Control>
                </TableCell>
                <TableCell style={{  paddingRight:'3%'}}>
                    <Form.Control   
                        type="number"
                        name="Total_amount"
                        value={selectedValues[`value5-${index}`] || ''}
                        onChange={(e) => handleSelectChange2(e, index, 5)} 
                    >                    
                    
                        
                    </Form.Control>
                </TableCell>                           
                <TableCell style={{ padding: '10px' }} >
                <button className='back_btn col-8 rounded '  onClick={()=>deleteRow(row.id)}
                    style={{background:'#FDD017'}}
                    >
                
                <FontAwesomeIcon icon={faTrash}  style={{fontSize:'20px',color:'red'}}/>
                </button>
                </TableCell>
            </TableRow>
        ))}
        
    
    </TableBody>
            </Table>
        </TableContainer> 
            <button  className='back_btn col-4 col-lg-2 col-md-2 p-0 mt-2 rounded fs-6 text-white'
                onClick={addRow}              
                 >                            
                إضافة مورد
            </button>
            <button onClick={sendDataToServer}>print</button>
            </div>                     
         } 

       {props.type=='طلب اخلاء وحدة- بيانات الوحدة' && 
                      <div className="w-100  mt-2   " style={{textAlign:'start',
                        border:'1px solid gray'
                      }}>
                        <p className="fs-3 mb-0 pb-0">طلب اخلاء وحدة اثناء سريان العقد</p>
                            <TableContainer component={Paper}
                        sx={{                           
                            overflow: 'auto',                       
                          }}
                       >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px'}}> 
                            <TableCell style={style_cell}>المشروع </TableCell>
                            <TableCell style={style_cell}>بيانات الوحدة</TableCell>                                              
                          </TableRow>
                        </TableHead>
                       
                        <TableBody>
                        <TableRow sx={{ backgroundColor: '#d3d9db',fontSize:'20px'}}> 
                            <TableCell style={style_cell}>
                                <Form.Select>                              
                                {Request_vacate_unit.map((item,index)=>
                                <option key={index} value={item}>{item}</option>)}
                                </Form.Select>

                                </TableCell>
                            <TableCell style={style_cell}>
                                <Form.Control 
                                type="text">

                                </Form.Control>
                            </TableCell>                                              
                          </TableRow>                 
                       </TableBody>
                      </Table>
                    </TableContainer> 
                    <Form.Group className="fs-5 mt-2" style={{textAlign:'start'}}>
                        <Form.Label >السبب</Form.Label>
                        <Form.Control as="textarea" aria-label="With textarea"
                         >
                            
                        </Form.Control>
                    </Form.Group>
                        
                      </div>                     
                     }

        {props.type=='طلب دفعات'&&
        <div>
          <FormWithTable/>
          </div>}

        </div>
    )
}