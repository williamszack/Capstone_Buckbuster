import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import { getSingleProduct, getProductReview } from '../api/singleProductView'

const Modal = (props) => {
const product_id = props.product_id
 const [product, setProduct] = useState({})
 const [reviews, setReviews] = useState([])

useEffect(()=> {
  if (product_id) {
    const fetchProduct = async () => { 
    const data = await getSingleProduct(product_id)
    const reviewdata = await getProductReview(product_id)
    setReviews(reviewdata)
    setProduct(data)
    }
    fetchProduct()
  }
},[product_id])




  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
        <img className='modal--image' src={product.image_url} alt="movie"></img>
          <div className="modal-title"><h3>Title</h3>{product.name}</div>
        </div>
        <div className="modal-body"><h3>Description</h3>{product.description}</div>
        <div className="modal-body"><h3>Reviews</h3>

        {
        reviews.length > 0 ? reviews.map(review => (
          <div className="modal--reviewer" key={review.review_id}>
          <h4>User: {review.username}</h4>
          <div>Rating out of 5 stars: {review.rating} stars</div>
          <h4>{review.title}</h4>
          <p>{review.description}</p>
          </div>
        )
        ) : <div>No reviews yet!</div>
        }
        
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
