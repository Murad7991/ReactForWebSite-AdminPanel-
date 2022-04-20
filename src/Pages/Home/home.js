//Library
import React, {useState} from "react";
import axios from 'axios'
// Components
import {Alert} from "react-bootstrap";
import Button from "../../Components/Button/button";
// Style
import './home.scss'
import '../../Assets/main.scss'


export default function Home() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [show, setShow] = useState(false)
    const [welcome, setWelcome] = useState("")
    const [hotel, setHotel] = useState("")

    const sendData = () => {
        setButtonDisabled(true)
        axios.post("https://murad-mentor-default-rtdb.firebaseio.com/welcome.json", {welcome, hotel})
            .then(() => {
                setWelcome('')
                setHotel('')
                showAlert()
            }).catch(err => console.log(err))
    }


    function showAlert() {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        },2000)
    }

    return <>
        <h1>Welcome to Admin Panel Roberto Hotel</h1>
        <div className="input-section">
            <div className="input-box">
                <h2>Welcome Home Section</h2>
                <h4>Welcome Title</h4>
                <input value={welcome} placeholder="Welcome..." onChange={e => (setWelcome(e.target.value))} />
                <h4>Hotel & Resort</h4>
                <input value={hotel} placeholder="Hotel & Resort..." onChange={e => (setHotel(e.target.value))}/>
                <Button disabled={welcome.trim().length < 3 || hotel.trim().length < 3 || buttonDisabled} click = {sendData}/>
                <Alert show={show} className={alert} >Ugurla gonderildi</Alert>
            </div>
        </div>
    </>
}
