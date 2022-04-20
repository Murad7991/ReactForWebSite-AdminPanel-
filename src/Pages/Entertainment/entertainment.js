//Library
import React, {useState, useRef} from "react";
import axios from 'axios'
// Components
import {Alert} from "react-bootstrap";
import Button from "../../Components/Button/button";
// Style
import './entertainment.scss'
import '../../Assets/main.scss'


export default function Entertainment() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const imageRef = useRef()
    const [show, setShow] = useState(false)
    const [imageResult, setImageResult] = useState(null)
    const [entertainmentData, setEntertainmentData] = useState({
        entertainment: '',
        name: '',
        description: '',
    })

    function inputHandleChanges(event) {
        setEntertainmentData({...entertainmentData, [event.target.name] : event.target.value })
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
        if (entertainmentData.entertainment.trim().length <= 3 || entertainmentData.name.trim().length <= 2 || entertainmentData.description.trim().length <= 3 || buttonDisabled  || imageResult === null) {
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
        axios.post('https://murad-mentor-default-rtdb.firebaseio.com/entertainment2.json', {entertainmentData, img: imageResult})
            .then(() => {
                setEntertainmentData({
                    entertainment: '',
                    name: '',
                    description: '',
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
                <h2>Welcome to Entertainment Section</h2>
                <h4>Entertainment</h4>
                <input name="entertainment" type="text" value={entertainmentData.entertainment} placeholder="Entertainment..." onChange={inputHandleChanges}/>
                <h4>Name</h4>
                <input name="name" type="text" value={entertainmentData.name} placeholder="Name..." onChange={inputHandleChanges}/>
                <h4>Description</h4>
                <input name="description" type="text" value={entertainmentData.description} placeholder="Description..." onChange={inputHandleChanges}/>
                <input ref={imageRef} name="file" type="file"  onChange={(e) => sendImage(e)}/>
                <Button disabled={notValid()} click = {sendData}/>
                <Alert show={show} className={alert} >Ugurla gonderildi</Alert>
            </div>
        </div>
    </>

}
