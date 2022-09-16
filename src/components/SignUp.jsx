import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { LoadingSpinner } from './LoadingSpinner';
import { UserContext } from '../context/User';
import { signup } from '../utils/api';

export const SignUp = () => {
  const [input, setInput] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)

    signup(input)
      .then((res) => {
        setIsLoading(false);
        if (res.statusText === 'OK'){
          setUser(res.data[0]);
        } else {
          throw Error()
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.msg);
      })
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <main>
        <p
          className='fs-2 text-center'>
          Register
        </p>
        <Form
          className='reg-form-container bg-light border mx-5'
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
              placeholder='Your full name'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
              placeholder='Choose username'
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
              placeholder='Your password'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
          </Form.Group>
          <Form.Group
            className='mx-2'
            controlId='registration_form'>
            <Form.Label
              className='text-secondary mt-2'>
              Confirm Password:
            </Form.Label>
            <Form.Control
              type='password'
              name='confPassword'
              placeholder='Re-type your password'
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}>
            </Form.Control>
          </Form.Group>
          <div className="d-flex flex-column">
            {!input.name &&
              !input.username &&
              !input.password &&
              input.password === input.confPassword ?
              <Button
                type='submit'
                className='btn btn-secondary my-3 mx-auto text-warning'
                disabled>
                &lt; Register &gt;
              </Button>
              :
              <Button
                type='submit'
                className='btn btn-secondary my-3 mx-auto text-warning'
                onClick={handleSubmit}>
                &lt; Register &gt;
              </Button>}
              {Object.keys(user).length !== 0 ?
              <p
                className='mx-auto bg-success text-warning rounded p-2'>
                You have successfuly logged in <strong>{user.username}</strong>
              </p>
              : error !== null ?
                <ErrorPage
                  value={error} />
                : null
            }
          </div>
        </Form>
      </main>
    </>
  )
}