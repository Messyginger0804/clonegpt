const PORT = 8000
// const express = require('express')
import express from 'express'
// const cors = require('cors')
import cors from 'cors'
import fetch from "node-fetch"
import * as dotenv from 'dotenv'


dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/answers', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                //     content: 'how are you?'
                // }],
                content: req.body.message
            }],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)

        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => console.log('THE SERVER IS RUNNNING ON PORT ' + PORT))