import { useState } from 'react'

import "./index.css"

import Grid from "../../component/grid"
import FieldForm from "../../component/field-form"

export default function Container({ onCreate, placeholder, button, id = null}) {
    // const [status, setStatus] = useState(null)
    const [message, setMessage] = useState("")
    
    const handleSubmit = (value) => {
        return sendData({ value })
    }

    const sendData = async (dataToSend) => {
        try {
            const res = await fetch("http://localhost:4000/post-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: converData(dataToSend)
            })

            const data = await res.json();

            if (res.ok)  {
                if (onCreate) onCreate();
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage(error.message)
            console.log(message)
        }
    }
    
    const converData = ({ value }) => JSON.stringify({
        text: value,
        username: 'user',
        postId: id,
    })

    return (
        <Grid>
            <FieldForm 
                placeholder={placeholder}
                button={button}
                onSubmit={handleSubmit}
            />
        </Grid>
    )
}