import React from "react";
import LoadingGif from "../img/loading.gif";

function Loading() {
    return (
        <div className="loading-div">
            <img src={LoadingGif} alt="Loading" />
        </div>
    );
}

export default Loading;
