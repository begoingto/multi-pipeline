import React from "react";

const PlaceholderCard = () => {
  return (
    <div style={{ width: "18rem" }} className="card" aria-hidden="true">
      <img src="https://t4.ftcdn.net/jpg/02/17/34/67/360_F_217346796_TSg5VcYjsFxZtIDK6Qdctg3yqAapG7Xa.jpg" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-primary disabled placeholder col-6"
        ></a>
      </div>
    </div>
  );
};

export default PlaceholderCard;
