import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../service/UserService";
import MyCard from "../components/MyCard";
import PlaceholderCard from "../components/PlaceholderCard";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    GET_ALL_USERS()
      .then((response) => {
        setUsers(response);
        setIsLoading(false);
      })
      .catch((err) => console.errror(err));
  }, []);

  // sort users by id
  users.sort((a, b) => b.id - a.id);

  return (
    <div className="container">
      <h2 className=" mt-3"> All Users : </h2>

      {isLoading ? (
        <div className="row ">
          <div className="col-4 d-flex justify-content-center">
            {" "}
            <PlaceholderCard />
          </div>
          <div className="col-4 d-flex justify-content-center">
            {" "}
            <PlaceholderCard />
          </div>
          <div className="col-4 d-flex justify-content-center">
            {" "}
            <PlaceholderCard />
          </div>
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div className="col-4 d-flex justify-content-center">
              <MyCard userdata={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
