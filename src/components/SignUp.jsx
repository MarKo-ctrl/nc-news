import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { LoadingSpinner } from './LoadingSpinner';
import { UserContext } from '../context/User';
import { signup } from '../utils/api';

export const SignUp = () => {
  const [input, setInput] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true)

    signup(input)
      .then((newUser) => {
        setIsLoading(false);
        setUser(newUser);
      })
      .catch((err) => {
        setError(err);
      })
  }

  if (error) return <ErrorPage value={error} />;
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <main>
        <p
          className='fs-2 text-center'>
          Register
        </p>
        <Form
          className=' bg-light border mx-5'
          onSubmit={handleSubmit}>
          <Form.Group
            className='mx-2'
            controlId='formName'>
            <Form.Label
              className='text-secondary mt-2'>
              Name:
            </Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Your Name'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
          </Form.Group>
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
              &lt; Register &gt;
            </Button>
          </div>
        </Form>
      </main>
    </>
  )
}