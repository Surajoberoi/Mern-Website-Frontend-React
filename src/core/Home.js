import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";    // loading all the content from the Base.js
import Card from "./card";
import { getAllProducts } from "../admin/helper/adminapicall";


export default function Home() {
  
  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)


  const loadAllProducts = () =>{
    getAllProducts().then(data =>{
      if(data?.error){
        setError(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(()=>{
    loadAllProducts()
  },[])


  return (
    <Base title="Home Page" description="Welcome to the Tshirt store">
      <div className="row text-center">
        <h1 className="text-white">All Of Tshirts</h1>
        <div className="row">
          {products.map((product,index)=>{
            return(
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
}
