import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const MyCard = ({ userdata }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={userdata.avatar}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346796_TSg5VcYjsFxZtIDK6Qdctg3yqAapG7Xa.jpg";
          }}
        />
        <Card.Body>
          <Card.Title>
            {" "}
            {userdata.name} <span className="text-warning"> {userdata.role} </span>{" "}
          </Card.Title>
          <Card.Text>
            <p> {userdata.email}</p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Link to={`/user/${userdata.id}`}>
              <Button variant="primary">View</Button>
            </Link>
            <Button variant="warning">Update</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyCard;
