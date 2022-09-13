import React, { useState, useContext } from 'react';
import { UserContext } from '../context/User';
import { signup } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

export const SignUp = () => {
  const [input, setInput] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true)

    signup(input)
      .then((newUser) => {
        setIsLoading(false)
        console.log(newUser)

        if (newUser) {
          setUser(newUser);
        } else {
          setError({ errMsg: 'something went wrong' })
        }
      })
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {!isSubmitted ?
        <>
          <main>
            <div
              className='d-flex flex-column mx-auto position-relative bg-light border reg-form-container'>
              <h2
                className='mx-auto'>
                Register
              </h2>
              <form
                id='registration_form'>
                <div
                  className='mb-3 mx-5'>
                  <label
                    htmlFor='name'
                    className='form-label'>
                    Name:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    placeholder='Your Name'
                    onChange={(event) => setInput({ ...input, [event.target.name]: event.target.value })}
                    required
                  />
                </div>
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
                    Password:
                  </label>
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
                  className='mb-3 mx-5'>
                  <label
                    htmlFor='password'
                    className='form-label'>
                    Confirm Password:
                  </label>
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
                  className='d-grid gap-2 w-50 mx-auto'>
                  <button
                    type='submit'
                    className='btn btn-primary mb-3'
                    onClick={handleSubmit}>&lt; Register &gt;
                  </button>
                </div>
              </form>
            </div>
          </main>
        </>
        : isSubmitted && Object.keys(user).length !== 0 ?
          <main>
            <p
              className='success-msg'>
              You have successfuly registered
              <strong>
                {user.username}
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
    </>
  )
}