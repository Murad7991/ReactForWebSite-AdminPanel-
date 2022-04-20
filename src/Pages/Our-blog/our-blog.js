//Library
import React, {useRef, useState} from "react";
import axios from 'axios'
// Components
import {Alert} from "react-bootstrap";
import Button from "../../Components/Button/button";
// Style
import './our-blog.scss'
import '../../Assets/main.scss'


export default function OurBlog() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const imageRef = useRef()
    const [show, setShow] = useState(false)
    const [imageResult, setImageResult] = useState(null)
    const [blogsData, setBlogsData] = useState({
        event: '',
        title: '',
        description: '',
        tags: '',
    })


    let date = new Date();
    let nowDate = date.toISOString().split('T')[0]

    function inputHandleChanges(event) {
        setBlogsData({...blogsData, [event.target.name]: event.target.value})
    }

    const sendImage = (event) => {
        let files = event.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (event) => {
            setImageResult(event.target.result)
        }
    }

    function notValid() {
        if (blogsData.event.trim().length <= 3 || blogsData.title.trim().length <= 2 || blogsData.description.trim().length <= 2 || blogsData.tags.trim().length < 2 || buttonDisabled || imageResult === null) {
            return true
        }
    }

    function showAlert() {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }

    const sendData = () => {
        setButtonDisabled(true)
        axios.post('https://murad-mentor-default-rtdb.firebaseio.com/news.json', {
            blogsData,
            img: imageResult,
            id: Date.now(),
            nowDate
        })
            .then(() => {
                setBlogsData({
                    event: '',
                    title: '',
                    description: '',
                    tags: '',
                })
                imageRef.current.value = ""
                showAlert()
            }).catch(err => {
                console.log(err)
            }
        )
    }


    return <>
        <div className="input-section">
            <div className="input-box">
                <h2>Welcome to Blogs Section</h2>
                <h4>Blog Event</h4>
                <input name="event" type="text" value={blogsData.event} placeholder="Event Name..."
                       onChange={inputHandleChanges}/>
                <h4>Title</h4>
                <input name="title" type="text" value={blogsData.title} placeholder="Title..."
                       onChange={inputHandleChanges}/>
                <h4>Description</h4>
                <input name="description" type="text" value={blogsData.description} placeholder="Description..."
                       onChange={inputHandleChanges}/>
                <h4>Tags</h4>
                <input name="tags" type="text" value={blogsData.tags} placeholder="Tags..."
                       onChange={inputHandleChanges}/>
                <input ref={imageRef} name="file" type="file" onChange={(e) => sendImage(e)}/>
                <Button disabled={notValid()} click={sendData}/>
                <Alert show={show} className={alert}>Ugurla gonderildi</Alert>
            </div>
        </div>
    </>

}
