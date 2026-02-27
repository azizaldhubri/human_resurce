 import Select from 'react-select';
export default function FormSelect(props){
   
 

    return(

       <div>
           <Select className='w-100  '                                                 
                        //   onChange={(e)=> setSection(e.target)}
                        onChange={props.setForm }
                              options={props.options}                                                           
                              placeholder={props.placeholder}
                           styles={props.styles}
                            
                          >
                            
                          </Select> 
       </div>
    )
}