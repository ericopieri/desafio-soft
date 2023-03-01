import React, { useEffect, useState } from "react";

function Message({ type, text, handleTimeOut }) {
    useEffect(() => {
        setTimeout(() => handleTimeOut(false), 3000);
    }, []);

    return <div className={"message " + type}>{text}</div>;
}

export default Message;
