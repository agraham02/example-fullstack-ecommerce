import React from "react";
import "./styles/CustomButton.css";

export default function CustomButton({
    text,
    handleFunction,
    type = "PRIMARY",
    bgColor,
    fgColor,
    disabled,
    fitContent,
}) {
    const styles = {
        container_PRIMARY: {
            backgroundColor: "#3B71F3",
        },
        container_SECONDARY: {
            border: "solid #3B71F3",
        },
        container_TERTIARY: {
            borderBottom: "solid #3B71F3",
            borderRadius: 0,
            padding: 0,
            width: "fit-content",
            margin: "0 auto"
        },
        text_PRIMARY: {},
        text_SECONDARY: {
            color: "#3B71F3",
        },
        text_TERTIARY: {
            color: "#3B71F3",
        },
    };
    const chosenStyle = styles[`container_${type}`];
    if (fitContent) {
        chosenStyle["width"] = "fit-content";
        chosenStyle["margin"] = "10px auto";
    }

    return (
        <div
            onClick={handleFunction}
            className="custom-btn"
            // style={styles[`container_${type}`]}
            style={chosenStyle}
        >
            <p className="text" style={styles[`text_${type}`]}>
                {text}
            </p>
        </div>
    );
}
