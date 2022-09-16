import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { UserContext } from '../context/User';
import { signin } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

export const Login = () => {
  const [input, setInput] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    signin(input)
      .then((res) => {
        setIsLoading(false);

        if (res.statusText === 'OK') {
          setUser(res.data[0]);
        } else {
          throw Error()
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.msg)
      })
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <main
      className='mw-100'>
      <main>
        <p
          className='fs-2 text-center'>
          Login
        </p>
        <Form
          className='login-form-container bg-light border mx-5'
          onSubmit={handleSubmit}>
          <Form.Group
            className='mx-2'
            controlId='formUsername'
            required>
            <Form.Label
              className='text-secondary mt-2'>
              Username:
            </Form.Label>
            <Form.Control
              type='text'
              name='username'
              placeholder='Your Username'
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
              onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}
              required>
            </Form.Control>
          </Form.Group>
          <div className='d-flex flex-column'>
            {!input.password ?
              <Button
              type='submit'
              className='btn btn-secondary my-3 mx-auto text-warning'
              disabled>
              &lt; Login &gt;
            </Button>
            :
            <Button
              type='submit'
              className='btn btn-secondary my-3 mx-auto text-warning'
              onClick={handleSubmit}>
              &lt; Login &gt;
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
            <p
              className='mx-auto mb-0'>
              Need and account?</p>
            <Link
              to={'/register'}
              className='mx-auto text-decoration-none text-warning pb-2'>
              Sign up here
            </Link>
          </div>
        </Form>
      </main>
    </main >

  )
}