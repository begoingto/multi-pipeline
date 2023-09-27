import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../service/ProductService";
const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState({});

  //   to get the product by id before component mount
  useEffect(() => {
    //  we will get the product by id here
    GET_PRODUCT_BY_ID(id)
      .then((response) => {
        setProduct(response)
        setImages(response.images)
        setCategory(response.category)
    
    })
      .catch((err) => console.error(err));
  }, [id]);

  console.log("PRODUCT INFORMATION : ", product);

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div
          id="carouselExampleInterval"
          class="carousel slide w-50 d"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            {images.map((image) => (
              <div class="carousel-item active" data-bs-interval="10000">
                <img
                  src={image}
                  class="d-block w-100"
                  alt="..."
                />
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* div after carousel */}
      <div className="description-wrapper bg-light mt-3 pt-5 pb-5 ps-5 mb-5 rounded-3 ">
        <h3>
          {product.title} <span> Price : {product.price} </span>
        </h3>
        <p className="text-warning"> Category : {category.name} </p>
        <h4>Product Description </h4>
        <p> {product.description} </p>
      </div>
    </div>
  );
};

export default ViewProduct;
