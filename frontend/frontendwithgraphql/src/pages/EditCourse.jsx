import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from '../component/Form';
const EditCourse = () => {
  const { id } = useParams()
  console.log(id, "idadsdaddsdasd")
  const navigate = useNavigate()
  const [inputFields, setInputFields] = useState({
    title: '',
    author: '',
    description: '',
    topic: '',
    url: ''
  })
  console.log(inputFields?.data?.course, "dsdsd")
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
    try {
      axios.post('http://localhost:3977/graphql', requestBody).then((response) => {
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
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
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
        const { title, author, description, topic, url } = response?.data?.data?.course
        console.log(author, "author=======>")
        setInputFields({
          title: title,
          author: author,
          description: description,
          topic: topic,
          url: url
        });
      } catch (err) {
        console.error(err);
      }
    };
    getCourses()
  }, [])
  console.log(inputFields)
  return (
    <Container maxWidth='lg' sx={{ marginY: 5 }}>
      <Typography component="h1" variant="h5">
        Edit Form
      </Typography>
      <Form
        handleSubmit={handleSubmit}
        inputFields={inputFields}
        handleOnChange={handleOnChange}
      />
    </Container>
  )
}

export default EditCourse;