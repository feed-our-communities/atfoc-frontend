import React from 'react';
import '../App.css';
import Card from "react-bootstrap/Card";

export default function getErrCard(errVisible, errMessage, boldErr) {

    if (errVisible) {
        return (
            <Card className="errorCard"> 
                <p><span className="bold">{boldErr}</span>{errMessage} </p>
            </Card>
        );
    }

    return (<></>);
}