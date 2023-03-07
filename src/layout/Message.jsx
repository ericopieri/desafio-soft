import React, { useEffect } from "react";

function Message({ type, text, handleTimeOut, className }) {
    useEffect(() => {
        setTimeout(() => handleTimeOut(false), 3000);
    }, []);

    return <div className={"message " + type + " " + className}>{text}</div>;
}

export default Message;
