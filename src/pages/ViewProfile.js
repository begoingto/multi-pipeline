import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_USER_BY_ID, UPDATE_USER } from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import { UPLOAD_FILE } from "../service/FileService";
import { ProgressBar } from "react-loader-spinner";

const ViewProfile = () => {
  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  let updateUser = {
    name,
    email,
    password,
    role,
  };
  console.log("Update user is : ", updateUser);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GET_USER_BY_ID(id)
      .then((response) => {
        setUser(response);
        setName(response.name);
        setEmail(response.email);
        setPassword(response.password);
        setImageUrl(response.avatar);
        setRole(response.role);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (selectedFile) {
      const file = new FormData();
      file.append("file", selectedFile);

      UPLOAD_FILE(file)
        .then((response) => {
          // update user information
          updateUser.avatar = response.location;
          UPDATE_USER(id, updateUser)
            .then((res) => {
              toast("Successfully update user");
              setIsLoading(false);
              navigate("/allusers");
            })
            .catch((error) => {
              console.error(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      UPDATE_USER(id, updateUser)
        .then((res) => {
          toast("Successfully update user");
          setIsLoading(false);
          navigate("/allusers");
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
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
      <div className="container d-flex bg-light gap-5 mt-5 py-5 rounded-5 justify-content-center ">
        <div className="profile w-25 ">
          <img
            className="object-fit-contain w-100"
            src={
              imageUrl
                ? imageUrl
                : "https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346796_TSg5VcYjsFxZtIDK6Qdctg3yqAapG7Xa.jpg"
            }
            alt="user profile image"
          />
          <input
            className="form-control"
            onChange={handleImageChange}
            type="file"
          />
        </div>
        <div className=" ">
          <div>
            <h1>Profile Information</h1>
            <div className="d-flex mt-5 justify-content-center align-items-center gap-3">
              <label htmlFor=""> Name </label>
              <input
                type="text"
                className="form-control w-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="roleSelector"> Role</label>

              <select
                className="form-control"
                name="roleSelector"
                id="roleSelector"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin"> Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
              <label htmlFor=""> Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control w-100"
              />
            </div>
            <div className="d-flex  align-items-center mt-3 gap-3">
              <label htmlFor=""> Password</label>
              <input
                type="text"
                value={password}
                className="form-control  "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <ToastContainer />
            <div className="d-flex mt-4 justify-content-between align-items-start ">
              <button className="btn btn-success" onClick={handleUpdate}>
                Update
              </button>

              {/* <NavLink className="nav-link" to="/users">
               
              </NavLink> */}

              {isLoading ? (
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#F4442E"
                  barColor="orange"
                />
              ) : (
                <></>
              )}

              <button className="btn btn-danger"> Cancel </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
