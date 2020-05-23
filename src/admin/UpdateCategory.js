import React,{useState,useEffect} from 'react'
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { updateCategory, getCategory } from './helper/adminapicall';



const UpdateCategory = ({match}) => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();



    const handleChange = event => {
        setError(""); //empty error
        setName(event.target.value)
    };
  


    const preload = (categoryId) => {
        getCategory(categoryId).then(data => {
            if(data.error){
                setError(true);
            }else{
                setName(data.name);
            }
        });
    };

      
    
    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
            Admin Home
            </Link>
        </div>
    )

    

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);


    const onSubmit = (event) => {
        event.preventDefault();
        setError(""); //empty error
        setSuccess(false);
        //setName(name)
        //backend request fired 
        updateCategory(match.params.categoryId , user._id , token , { name } ).then(data => {
                // if(data.error) => causes error
                if(error){
                    setError(true);
                }else{
                    setError("");
                    setSuccess(true); 
                    setName(""); //this will clear whatever we typed in form after successfully inserting in db
                }
            });  
    };

  

    const successMessage = () => {
        if(success){
            return <h4 className="text-info"> Category updated successfully </h4>
        }
    };

    
    const warningMessage = () => {
        if(error){
            return <h4 className="text-info"> Failed to update category </h4>
        }
    };

    

    const myCategoryUpdateForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter to update category </p>
                <input type="text" 
                className="form-control my-3"
                onChange= {handleChange}
                value={name}  
                autoFocus
                required
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Update category</button>
            </div>
        </form>  
    );

    return (
        <Base title="Update a category here " 
        description="Update category"
        className="container bg-secondary p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        
                        {myCategoryUpdateForm()}
                        {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
