import React, { useState } from "react";
import { CREATE_USER } from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { UPLOAD_FILE } from "../service/FileService";

const InsertUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectFile, setSelectFile] = useState(null);

  let newUser = {
    name,
    email,
    password,
    avatar,
  };

  console.log("This is new user", newUser);

  const clearInputFields = () => {
    setName("");
    setAvatar("");
    setPassword("");
    setEmail("");
  };
  const handleCreateUser = (e) => {
    setIsLoading(true);
    e.preventDefault();

    // check if there is a file selected 
    // file -> upload file -> create user next 
    // no file -> create user -> default image for user 

    if (selectFile) {
       let formData = new FormData(); 
       formData.append("file", selectFile);

       UPLOAD_FILE(formData).then((response) => {
        // file upload success then we have to create user 
        newUser.avatar = response.location; 
        CREATE_USER(newUser)
        .then((response) => {
          toast("User created successfully !");
          setIsLoading(false);
          clearInputFields();
        })
        .catch((error) => {
          for (var i = 0; i < error.response.data.message.length; i++) {
            toast(error.response.data.message[i]);
          }
          setIsLoading(false);
        });

       }).catch((error) => {
          console.log(error);
        setIsLoading(false);
        }
       )

    }
    else {

      newUser.avatar="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png";
      CREATE_USER(newUser)
      .then((response) => {
        toast("User created successfully !");
        setIsLoading(false);
        clearInputFields();
      })
      .catch((error) => {
        for (var i = 0; i < error.response.data.message.length; i++) {
          toast(error.response.data.message[i]);
        }
        setIsLoading(false);
      });
    }

   
  };

  let buttonStatus = name && email && password ? false : true;

  const handleImageChange = (e) => {
    e.preventDefault();
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
    setSelectFile(e.target.files[0]);
  }


  return (
    <>
      <div className="container ">
        <div className="d-flex mt-5 rounded-5  bg-light  justify-content-center align-items-center gap-4">
          <div className="image w-50 d-flex flex-column align-items-center">
            <img
              className="object-fit-contain  w-50"
              alt=""
              src={imageUrl? imageUrl : "https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"}
            />
            <input className="form-control" onChange={handleImageChange} type="file" />
          </div>
          <div className="form-side  ">
            <div className="   mt-4 rounded-5 pt-5 px-3 pb-2">
              <h1> Create New Users </h1>

              <div className="my-5  ">
                <form action="">
                  <label htmlFor="inputName"> Username </label>
                  <input
                    id="inputName"
                    type="text"
                    name="inputName"
                    placeholder="Enter username "
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="inputEmail"> Email</label>
                  <input
                    id="inputEmail"
                    name="inputEmail"
                    type="text"
                    placeholder="Enter email "
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="inputPassword"> Password </label>
                  <input
                    type="password"
                    id="inputPassword"
                    name="inputPassword"
                    placeholder="Enter password "
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <label htmlFor="inputAvatar"> Avatar </label>
                  <input
                    type="text"
                    id="inputAvatar"
                    name="inputAvatar"
                    placeholder="Enter Avatar Links "
                    className="form-control"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  /> */}

                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="orange"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <button
                    disabled={buttonStatus}
                    className="
                btn
                 btn-warning 
                 my-2"
                    onClick={handleCreateUser}
                  >
                    Create Users
                  </button>

                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsertUser;
