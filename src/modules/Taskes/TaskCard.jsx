//  export  default function TaskCard ({ task, onClick  ,onClickForm ,index ,selectIndex ,task_activ}){
 export  default function TaskCard (props){
    
    
    return(
  <div className="card  "
   onClick={() => {
    props.onClick(props.task);   
    props.selectIndex(props.index);
    props.onClickForm(true);       
    }}>
    <div className="card-body" style={{
      borderRight:props.task_activ===props.task.id? '3px solid green':''
    }}>
      <h5>{props.task.title} ({props.task.id})</h5>
      <p>{props.task.description}</p>
      <p><small>📁 {props.task.task_type} – 🏢 {props.task.description}</small></p>
      <div className="progress ">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${props.task.progress}%` }}
        >
          {props.task.progress}%
        </div>
      </div>
      <span className="badge bg-info">{props.task.status}</span>
    </div>
  </div>
    )
 };
