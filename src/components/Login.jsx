import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
            <div
              className='d-flex flex-column mx-auto position-relative bg-light border login-form-container'>
              <h2
                className='mx-auto '>
                Login
              </h2>
              <form
                id='login_form'>
                <div
                  className='mb-3 mx-5'>
                  <label
                    htmlFor='username'
                    className='form-label'>
                    Username:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    name='username'
                    placeholder='Your Username'
                    onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}
                    required
                  />
                </div>
                <div
                  className='mb-3 mx-5'>
                  <label
                    htmlFor='password'
                    className='form-label'>
                    Password:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='password'
                    name='password'
                    placeholder='Your Password'
                    onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}
                    required
                  />
                </div>
                <div
                  className='d-grid gap-1 w-50 mx-auto'>
                  <button
                    type='submit'
                    className='btn btn-primary mb-3 w-60'
                    onClick={handleSubmit}>&lt; Login &gt;
                  </button>
                  <div
                    className='text-center small'>
                    Need an account?
                    <Link
                      to='/register'
                      className='nav-link'>
                      Sign up here
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </>
        :
        isSubmitted && Object.keys(user).length !== 0 ?
          <main>
            <p
              className='success-msg'>
              You have successfuly logged in
              <strong>{user.username}
              </strong>
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
    </>)
}