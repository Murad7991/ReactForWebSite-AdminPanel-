//Library
import React, {useRef, useState} from "react";
import axios from 'axios'
// Components
import Button from "../../Components/Button/button";
import {Alert} from "react-bootstrap";
// Style
import './testimonials.scss'
import '../../Assets/main.scss'


export default function Testimonials() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const imageRef = useRef()
    const [show, setShow] = useState(false)
    const [imageResult, setImageResult] = useState(null)
    const [testimonialsData, setTestimonialsData] = useState({
        description: '',
        author: '',
        job: '',
    })

    function inputHandleChanges(event) {
        setTestimonialsData({...testimonialsData, [event.target.name] : event.target.value })
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
        if (testimonialsData.description.trim().length <= 3 || testimonialsData.author.trim().length <= 2 || testimonialsData.job.trim().length <= 3 || buttonDisabled  || imageResult === null) {
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
        axios.post('https://murad-mentor-default-rtdb.firebaseio.com/testimonials.json', {testimonialsData, img: imageResult})
            .then(() => {
                setTestimonialsData({
                    description: '',
                    author: '',
                    job: '',
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
                <h2>Welcome to Testimonials Section</h2>
                <h4>Author</h4>
                <input name="author" type="text" value={testimonialsData.author} placeholder="Author Name..." onChange={inputHandleChanges}/>
                <h4>Job</h4>
                <input name="job" type="text" value={testimonialsData.job} placeholder="Job..." onChange={inputHandleChanges}/>
                <h4>Description</h4>
                <input name="description" type="text" value={testimonialsData.description} placeholder="Description..." onChange={inputHandleChanges}/>
                <input ref={imageRef} name="file" type="file"  onChange={(e) => sendImage(e)}/>
                <Button disabled={notValid()} click = {sendData}/>
                <Alert show={show} className={alert} >Ugurla gonderildi</Alert>
            </div>
        </div>
    </>

}
