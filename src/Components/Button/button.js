import './button.scss';
import React from "react";



export default function Button(props) {

    return <>
        <div className="sendButton">
            <button disabled={props.disabled} onClick={props.click}>
                Send Data
            </button>
        </div>
    </>
}
