import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {  Form, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { UserContext } from '../context/User';
import { signin } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

export const Login = () => {
  const [input, setInput] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true)

    signin(input)
      .then((validUser) => {
        setIsLoading(false)
        setUser(validUser);
      })
      .catch((err) => {
        setError(err)
      })
  }

  if (error) return <ErrorPage value={error} />;
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {!isSubmitted ?
        <>
          <main
            className='mw-100'>
            <main>
        <p
          className='fs-2 text-center'>
          Login
        </p>
        <Form
          className=' bg-light border mx-5'
          onSubmit={handleSubmit}>
          <Form.Group
            className='mx-2'
            controlId='foemUsername'>
            <Form.Label
              className='text-secondary mt-2'>
              Username:
            </Form.Label>
            <Form.Control
              type='text'
              name='username'
              placeholder='Choose Username'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className='mx-2'
            controlId='registration_form'>
            <Form.Label
              className='text-secondary mt-2'>
              Password:
            </Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Your Password'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
          </Form.Group>
          <div className="d-flex">
            <Button
              type='submit'
              className='btn btn-secondary my-3 mx-auto text-warning'
              onClick={handleSubmit}>
              &lt; Login &gt;
            </Button>
          </div>
        </Form>
      </main>
          </main>
        </>
        :
        isSubmitted && Object.keys(user).length !== 0 ?
          <main>
            <p
              className='success-msg'>
              You have successfuly logged in <strong>{user.username}</strong>
            </p>
          </main>
          :
          <main>
            <p
              className='error-msg'>
              {error.errMsg}
            </p>
          </main>
      }
    </>
  )
}