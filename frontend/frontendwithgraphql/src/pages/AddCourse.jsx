import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from '../component/Form';
const CourseRegistation = () => {
    const navigate = useNavigate()
    const [inputFields, setInputFields] = useState({
        title: '',
        author: '',
        description: '',
        topic: '',
        url: ''
    })
    const handleOnChange = (key, e) => {
        setInputFields((pre) => ({
            ...pre,
            [key]: e.target.value
        }))
    }
    function handleSubmit(event) {
        event.preventDefault();
        const requestBody = {
            query: `
          mutation {
            insertCourse(title: "${inputFields.title}", author: "${inputFields.author}",description:"${inputFields.description}",topic:"${inputFields.topic}",url:"${inputFields.url}") {
              title
              author
              description
              topic
              url
            }
          }
        `
        }
        try {
            const response = axios.post('http://localhost:3977/graphql', requestBody);
            if (response) {
                Swal.fire(
                    'Good job!',
                    'Course has been inserted successfully',
                    'success'
                )
                navigate('/');
            } else {
                Swal.fire(
                    'Error',
                    'Course has not been inserted',
                    'error'
                )
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Container maxWidth='lg' sx={{ marginY: 5 }}>
            <Typography component="h1" variant="h5">
                Registration Form
            </Typography>
            <Form
                handleSubmit={handleSubmit}
                inputFields={inputFields}
                handleOnChange={handleOnChange}
            />
        </Container>
    )
}

export default CourseRegistation;