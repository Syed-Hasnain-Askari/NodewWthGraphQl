import React, {useEffect, useState} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
const EditCourse = () => {
    const {id} = useParams()
    console.log(id,"idadsdaddsdasd")
    const navigate = useNavigate()
    const [inputFields,setInputFields] = useState({
        title:'',
        author:'',
        description:'',
        topic:'',
        url:''
    })
    console.log(inputFields?.data?.course,"dsdsd")
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
            updateCourse(id:"${id}",title: "${inputFields.title}", author: "${inputFields.author}",description:"${inputFields.description}",topic:"${inputFields.topic}",url:"${inputFields.url}") {
              id
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
            axios.post('http://localhost:3977/graphql',requestBody).then((response)=>{
                if (response
                    ) {
                    Swal.fire(
                        'Good job!',
                        'Course has been updated successfully',
                        'success'
                      )
                    navigate('/');
                  }
            }).catch()
            {
                Swal.fire(
                    'Error',
                    'Something went wrong',
                    'error'
                  )
            };            
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        const getCourses = async () => {
            const endpoint = "http://localhost:3977/graphql";
            const headers = {
              "Content-Type": "application/json",
              "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFiMmJlM2ExMDFjMDIyMTIwYWY5MWQiLCJlbWFpbCI6Im5hamFmQGdtYWlsLmNvbSIsImlhdCI6MTY5Njk1ODY0MiwiZXhwIjoxNjk2OTYyMjQyfQ.TXlppVUf98n4NYwXS33uMdTqoh7H8M3XVnfy4BaktQo"
            };
            const graphqlQuery = {
              "operationName": "course",
              "query": `
                query course {
                    course(id: "${id}") {
                    id
                    title
                    author
                    description
                    topic
                    url
                  }
                }
              `,
              "variables": {}
            };
            try {
              const response = await axios.post(endpoint, graphqlQuery, { headers });
              const {title,author,description,topic,url} = response?.data?.data?.course
              console.log(author,"author=======>")
              setInputFields({
                title:title,
                author:author,
                description:description,
                topic:topic,
                url:url
              });
            } catch (err) {
              console.error(err);
            }
          };
          getCourses()
    },[])
    console.log(inputFields)
    return (
        <Container maxWidth='lg' sx={{marginY:5}}>
            <Typography component="h1" variant="h5">
            Edit Form
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
                        value={inputFields.author}
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
                <Button variant="outlined" color="primary" type="submit">Edit</Button>
            </form>
        </Container>
    )
}
 
export default EditCourse;