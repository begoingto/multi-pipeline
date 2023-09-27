import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { DELETE_PRODUCT_BY_ID } from "../service/ProductService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ productdata }) => {
  let navigate = useNavigate();

  const handleDeleteProduct = (event, id) => {
    event.preventDefault();
    DELETE_PRODUCT_BY_ID(id)
      .then((response) => {
        toast("Successfully Delete the product !");
        // refresh the same page
        // navigate("/allproducts", { replace: true });
        // not a good practice
        window.location.reload();
        // better practice is 
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data.message);
      });
  };
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Carousel className="w-100">
          {productdata.images.map((image) => (
            <Carousel.Item interval={500}>
              <img className="d-block w-100" src={image} alt="Second slide" />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>{productdata.title}</Card.Title>
            <strong className="text-warning h2"> {productdata.price}$</strong>
          </div>

          <p>
            Category :
            <strong className="text-warning">
              {" "}
              {productdata.category.name}{" "}
            </strong>
          </p>
          <Card.Text>{productdata.description}</Card.Text>
          <ToastContainer />
          <div className="d-flex justify-content-center">
            <Link to={`/product/${productdata.id}`}>
              <Button variant="success">View </Button>
            </Link>

            <Button variant="warning">Edit </Button>

            <Button
              variant="danger"
              onClick={(e) => handleDeleteProduct(e, productdata.id)}
            >
              Delete{" "}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
