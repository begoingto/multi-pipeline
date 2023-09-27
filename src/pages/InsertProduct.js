import React, { useState, useEffect } from "react";
import { GET_ALL_CATEGORIES } from "../service/CategoryService";
import { CREATE_PRODUCT } from "../service/ProductService";
import { UPLOAD_FILE } from "../service/FileService";
import { toast, ToastContainer } from "react-toastify";
import { ProgressBar } from "react-loader-spinner";

// {
//   "title": "New Product",
//   "price": 10,
//   "description": "A description",
//   "categoryId": 1,
//   "images": [
//       "https://placeimg.com/640/480/any"
//   ]
// }

const InsertProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let newProduct = {
    title,
    price,
    images,
    description,
    categoryId,
  };
  console.log("New Product : ", newProduct);
  useEffect(() => {
    GET_ALL_CATEGORIES()
      .then((response) => setCategories(response))
      .catch((error) => console.log(error));
  }, []);

  const handleClearInput = () => {
    setTitle("");
    setPrice(0);
    setDescription("");
    setCategoryId(1);
    setImages([]);
    setImageUrl(
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    );
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (selectedFile) {
      let file = new FormData();
      file.append("file", selectedFile);

      UPLOAD_FILE(file)
        .then((response) => {
          images.push(response.location);
          CREATE_PRODUCT(newProduct)
            .then((response) => {
              toast("Create product successfully!");
              setIsLoading(false);
              handleClearInput(); // clear input
            })
            .catch((error) => {
              console.log("Create error : ", error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      // create proudct without image
      images.push(
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
      CREATE_PRODUCT(newProduct)
        .then((response) => {
          toast("Create product successfully!");
          // clear input
          setIsLoading(false);
          handleClearInput();
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Create error : ", error);
        });
    }
  };

  const handleImageChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
    setSelectedFile(e.target.files[0]);
  };
  return (
    <>
      <div className="container d-flex justify-content-center bg-light mt-5 pt-5 pb-5 rounded-4  ">
        <div className="row g-5 ">
          <div className="productimage  col ">
            <img
              width="500px"
              className=" object-fit-contain"
              src={
                imageUrl
                  ? imageUrl
                  : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              }
              alt=""
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>

          <div className="productInformation col  ">
            <h1> Product Information</h1>
            <form>
              <label htmlFor="inputName"> Product Name </label>
              <input
                value={title}
                type="text"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="container    px-0 d-flex justify-content-between">
                <div className="px-0">
                  <label htmlFor="inputPrice"> Product Price </label>
                  <input
                    type="number"
                    value={price}
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="px-0">
                  <label htmlFor=""> Choose Category </label>
                  <select
                    className="form-control"
                    name=""
                    id=""
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    {categories.map((cate) => (
                      <option value={cate.id}>{cate.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="inputDescription">Product Description </label>
              <textarea
                type="text"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />

              <ToastContainer />
              <div className="container mt-4 d-flex justify-content-between align-items-start">
                {/* */}
                <button
                  className="btn btn-warning "
                  onClick={handleCreateProduct}
                >
                  {" "}
                  Create Product{" "}
                </button>

                {isLoading == true ? (
                  <div style={{ marginTop: "-20px" }}>
                    <ProgressBar
                      height="80"
                      width="80"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#F4442E"
                      barColor="orange"
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div>
                  <button className="btn btn-danger"> Clear </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsertProduct;
