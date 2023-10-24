import react, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function CourseList(props) {
  const navigate = useNavigate()
  const [courseList, setCourseList] = useState(null);
  const getCourses = async () => {
    const endpoint = "http://localhost:3977/graphql";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFiMmJlM2ExMDFjMDIyMTIwYWY5MWQiLCJlbWFpbCI6Im5hamFmQGdtYWlsLmNvbSIsImlhdCI6MTY5Njk1ODY0MiwiZXhwIjoxNjk2OTYyMjQyfQ.TXlppVUf98n4NYwXS33uMdTqoh7H8M3XVnfy4BaktQo"
    };
    const graphqlQuery = {
      "operationName": "getCourses",
      "query": `
        query getCourses {
          getCourses {
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
      console.log(response.data, "Response");
      setCourseList(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = (event) => {
    console.log(event, "Id")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const requestBody = {
          query: `
        mutation {
          deleteCourse(id:"${event.id}")
        }
      `
        }
        try {
          const response = axios.post('http://localhost:3977/graphql', requestBody);
          console.log(response, "response")
          if (response) {
            getCourses()
            Swal.fire(
              'Good job!',
              'Course has been deleted successfully',
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
        catch (err) {
          console.log(err)
        }
      }
    })
  }
  useEffect(() => {
    getCourses();
  }, []);
  const data = courseList?.data?.getCourses;
  return (
    <Container maxWidth='lg'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>topic</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell>{item.author}
                </TableCell>
                <TableCell>{item.description}
                </TableCell>
                <TableCell>{item.topic}
                </TableCell>
                <TableCell>
                  <span><EditIcon onClick={() => navigate(`/editcourse/${item.id}`)} /></span>
                  <span><DeleteIcon onClick={(e) => handleDelete(item)} /></span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}