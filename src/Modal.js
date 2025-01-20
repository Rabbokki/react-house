import './Modal.css';

function Modal(props){
  return(
    <div>
      <img src={props.img} alt="" />
      <h2>{props.title}</h2>
      <h4>{props.content}</h4>
      <h4>{props.price}</h4>
    </div>
  )
}

  export default Modal;