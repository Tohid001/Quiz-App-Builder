import React from "react";
import { useParams } from "react-router-dom";

function Dummy() {
  const { formId } = useParams();
  console.log("asas", formId);
  return <div>Dummy</div>;
}

export default Dummy;
