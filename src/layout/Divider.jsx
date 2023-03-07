import React from "react";

function Divider({ className }) {
    return <div className={"divider " + className ?? ""}></div>;
}

export default Divider;
