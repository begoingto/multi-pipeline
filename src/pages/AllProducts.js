import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS } from "../service/ProductService";
import ProductCard from "../components/ProductCard";
const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GET_ALL_PRODUCTS()
      .then((response) => setProducts(response))
      .catch((err) => console.error(err));
  }, []);
  console.log("Here are all products :", products);
  // sort product by id 
  products.sort((a, b) => b.id - a.id);
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className="col-4 d-flex justify-content-center">
            <ProductCard productdata={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
