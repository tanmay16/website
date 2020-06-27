
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import {logout} from '../actions/userActions'


function ProductScreen(props){
    const [qty,setQty]= useState(1);    
  const productDetails=useSelector(state=>state.productDetails);
  const {product , loading , error }=productDetails;
  const dispatch=useDispatch();

  useEffect(()=>    {
        dispatch(detailsProduct(props.match.params.id));
        return ()=> {   
                //
        };  
  },[]);

  const handleAddToCart=() =>{
      props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
    return <div>
        <div className="back-to-result">
            <Link to="/">Return to homepage</Link>
            <div >
              <button type="button" class="button-set" onClick={handleLogout} >Logout</button>
              </div>
        </div>
        {loading? <div>loading...</div>:
        error? <div>{error}</div> : 
        
        (
            <div className="details">
            <div className="details-image">
                <img src={product.image}  alt="product"></img>
            </div>
            <div className="details-info">
                    <ul>
                        <li>
                            <h3>{product.name}</h3>
                        </li>
                        <li>
                                <b>{product.price}/-</b>
                        </li>
                        <li>
                            Description:
                            <div>{product.description}</div>
                        </li>
                    </ul>
            </div>
       

        <div className="details-action">
            <ul>
                <li>
                    Price:{product.price}
                </li>
                <li>
                    status:{product.countInStock>0? "In stock":""}
                </li>
                <li>
                        Qty:<select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                           {[...Array(product.countInStock).keys()].map(x=>
                            <option key={x+1} value={x+1}>{x+1}</option>
                            )}
                            </select>
                </li>
                <li>
                    {product.countInStock>0 && <button onClick={handleAddToCart} className="button">Add to Cart</button> 
                }
    
                </li>
              
            </ul>
        </div>
      </div>

        )
    }

    </div>
}

export default ProductScreen;