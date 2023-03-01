import React from "react";

function ButtonPrimary({ text, handleClick }) {
    return (
        <button className="button-pr" onClick={handleClick}>
            {text}
        </button>
    );
}

export default ButtonPrimary;
