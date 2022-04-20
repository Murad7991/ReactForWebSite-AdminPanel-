//Library
import React, {useRef, useState} from "react";
import axios from 'axios'
// Components
import {Alert} from "react-bootstrap";
import Button from "../../Components/Button/button";
// Style
import './rooms.scss'
import '../../Assets/main.scss'


export default function Rooms() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const imageRef = useRef()
    const [show, setShow] = useState(false)
    const [imageResult, setImageResult] = useState(null)
    const [roomsData, setRoomsData] = useState({
        name: '',
        price: '',
        size: '',
        capacity: '',
        bed: '',
        services: '',
        description: ''
    })

    function inputHandleChanges(event) {
        setRoomsData({...roomsData, [event.target.name] : event.target.value })
    }

    const sendImage = (event) => {
        let files = event.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (event) => {
            setImageResult(event.target.result)
        }
    }

    function notValid () {
        if (roomsData.name.trim().length <= 3 || roomsData.price.trim().length <= 2 || roomsData.size.trim().length <= 1 || roomsData.capacity.trim().length <= 2 || roomsData.bed.trim().length < 2 || roomsData.services.trim().length < 2 || roomsData.description.trim().length < 5 || buttonDisabled || imageResult === null) {
            return true
        }
    }

    function showAlert() {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        },2000)
    }

    const sendData = () => {
        setButtonDisabled(true)
        axios.post('https://murad-mentor-default-rtdb.firebaseio.com/room.json', {roomsData, img: imageResult, id: Date.now()})
            .then(() => {
                setRoomsData({
                    name: '',
                    price: '',
                    size: '',
                    capacity: '',
                    bed: '',
                    services: '',
                    description: ''
                })
                imageRef.current.value = ""
                showAlert()
            }).catch(err =>  {
                console.log(err)
            }
        )
    }


    return <>
        <div className="input-section">
            <div className="input-box">
                <h2>Welcome to Rooms Section</h2>
                <h4>Room Name</h4>
                <input name="name" type="text" value={roomsData.name} placeholder="Room Name..." onChange={inputHandleChanges}/>
                <h4>Price</h4>
                <input name="price" type="number" value={roomsData.price} placeholder="Price..." onChange={inputHandleChanges}/>
                <h4>Size</h4>
                <input name="size" type="number" value={roomsData.size} placeholder="Size..." onChange={inputHandleChanges}/>
                <h4>Capacity</h4>
                <input name="capacity" type="text" value={roomsData.capacity} placeholder="Capacity..." onChange={inputHandleChanges}/>
                <h4>Bed</h4>
                <input name="bed" type="text" value={roomsData.bed} placeholder="Bed..." onChange={inputHandleChanges}/>
                <h4>Services</h4>
                <input name="services" type="text" value={roomsData.services} placeholder="Services..." onChange={inputHandleChanges}/>
                <h4>Description</h4>
                <input name="description" type="text" value={roomsData.description} placeholder="Description..." onChange={inputHandleChanges}/>
                <input ref={imageRef} name="file" type="file"  onChange={(e) => sendImage(e)}/>
                <Button disabled={notValid()} click = {sendData}/>
                <Alert show={show} className={alert} >Ugurla gonderildi</Alert>
            </div>
        </div>
    </>

}
