import React, { useState } from 'react'
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
export default function Form({ handleSubmit, inputFields, handleOnChange }) {
    console.log(inputFields, "inputFields")
    return (
        <div>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{ marginY: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Title"
                        name='title'
                        onChange={(e) => { handleOnChange('title', e) }}
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
                        onChange={(e) => { handleOnChange('author', e) }}
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
                    onChange={(e) => { handleOnChange('description', e) }}
                    value={inputFields.description}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Topic"
                    name='topic'
                    onChange={(e) => { handleOnChange('topic', e) }}
                    value={inputFields.topic}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="url"
                    variant='outlined'
                    color='primary'
                    label="URL"
                    name='url'
                    onChange={(e) => { handleOnChange('url', e) }}
                    value={inputFields.url}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="primary" type="submit">Register</Button>
            </form>
        </div>
    )
}
