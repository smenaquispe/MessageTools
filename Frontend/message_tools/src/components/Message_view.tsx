import { useState, useEffect } from "react";
import { message } from "../Interfaces/message.interface";
import * as API from '../API/API';
import { useParams } from "react-router-dom";
import { contact } from "../Interfaces/contact.interface";

export function Message_view(message : message){


    return (
        <>
            {
                <p>
                    From : {message.from} 
                    <br />
                    Date : {message.date}
                    <br />
                    Body : {message.body}
                    <br />
                    Type : {message.type}
                    <hr />
                </p>
            }
        </>
    )
}