import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
const CourseRegistation = () => {
    const [inputFields,setInputFields] = useState({
        title:'',
        author:'',
        description:'',
        topic:'',
        url:''
    })
    const handleOnChange = (key,e) => {
        setInputFields((pre)=>({
            ...pre,
            [key]:e.target.value
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
        try{
            const response = axios.post('http://localhost:3977/graphql',requestBody);
            if (response) {
                Swal.fire(
                    'Good job!',
                    'Course has been inserted successfully',
                    'success'
                  )
              } else {
                Swal.fire(
                    'Error',
                    'Course has not been inserted',
                    'error'
                  )
              }
              
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <Container maxWidth='lg' sx={{marginY:5}}>
            <Typography component="h1" variant="h5">
            Registration Form
          </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginY: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Title"
                        name='title'
                        onChange={(e)=>{handleOnChange('title',e)}}
                        value={inputFields.title}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Author"
                        name='author'
                        onChange={(e)=>{handleOnChange('author',e)}}
                        value={inputFields.authour}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Description"
                    name='description'
                    onChange={(e)=>{handleOnChange('description',e)}}
                    value={inputFields.description}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Topic"
                    name='topic'
                        onChange={(e)=>{handleOnChange('topic',e)}}
                        value={inputFields.topic}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <TextField
                    type="url"
                    variant='outlined'
                    color='primary'
                    label="URL"
                    name='url'
                        onChange={(e)=>{handleOnChange('url',e)}}
                        value={inputFields.url}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />       
                <Button variant="outlined" color="primary" type="submit">Register</Button>
            </form>
        </Container>
    )
}
 
export default CourseRegistation;