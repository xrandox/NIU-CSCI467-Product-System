
import authorization from "../components/Auth";
import { Link } from "react-router-dom";



const AdminTools = () => {
  return (
    <div>  
    <center>
    <hgroup>
      <h1><b style={{color:"Red"}}>Admin</b> Tools</h1>
      <p> <b>Please Select Desired Admin Tool</b> </p>
      
      
      <Link to="/orders/">
      <button>
         Orders 
      </button>
      </Link>
      

      <br></br>

      <Link to="/shbrackets/">
      <button> 
        Shipping and Handling 
      </button>
      </Link>

    </hgroup>
    </center>    
    </div>
 );
}



export default authorization(AdminTools, ["admin"]);