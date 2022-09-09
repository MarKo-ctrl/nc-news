import React, { useState, useContext } from 'react';
// import ReactDOM from 'react-dom'
// import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { signin } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

export const Login = () => {
  const [input, setInput] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true)

    signin(input)
      .then((validUser) => {
        setIsLoading(false)

        if (validUser) {
          setUser(validUser);
        } else {
          setError({ errMsg: 'invalid username or password' })
        }
      })
  }

  if (isLoading) return <LoadingSpinner />;
  return (<>
    {!isSubmitted ? <>
      <main>
        <h2 className='ms-5'>User Login</h2>
        <form id='login_form'>
          <div className='mb-3 mx-5'>
            <label htmlFor='username' className='form-label'>Username:</label>
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
          <div className='mb-3 mx-5'>
            <label htmlFor='password' className='form-label'>Password:</label>
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
          <button
            type='submit'
            className='btn btn-primary ms-5'
            onClick={handleSubmit}>&lt; Login &gt;
          </button>
        </form>
      </main>
    </> : isSubmitted && Object.keys(user).length !== 0 ?
      <main>
        <p className='success-msg'>You have successfuly logged in <strong>{user.username}</strong></p>
      </main> :
      <main>
        <p className='error-msg'>{error.errMsg}</p>
      </main>
    }
  </>)
}