import React from "react";

export default function Error({ error }) {    //alert boxes to display specific errors 
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );
}
