import React from "react";

export default function Success({ success }) {    //display success message on completion of process
  return (
    <div>
      <div className="alert alert-success" role="alert">
        {success}
      </div>
    </div>
  );
}
