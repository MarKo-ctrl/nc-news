import React, { useEffect, useState, useContext } from 'react';
// import ReactDOM from 'react-dom'
// import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { getUsers } from '../utils/api';
import { LoadingSpinner } from './LoadingSpinner';

export const Login = () => {
    const [input, setInput] = useState('')
    const [usersList, setUsersList] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUsersList(users)
                setIsLoading(false)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsSubmitted(true)
        const validUser = usersList.find((user) => user.username === input) ? usersList.find((user) => user.username === input) : {};

        if (Object.keys(validUser).length !== 0) {
            setUser(validUser);
        } else {
            setError({ username: "invalid username" })
        }
    }
    

    if (isLoading) return <LoadingSpinner />;
    return (<>
        {!isSubmitted ? <>
            <main>
                <h2 className='ms-5'>User Login</h2>
                <form id='login_form'>
                    <div className="mb-3 mx-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">Please Enter your username:</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(event) => setInput(event.target.value)} />

                    </div>
                    <button type="submit" className="btn btn-primary ms-5" onClick={handleSubmit}>&lt; Login &gt;</button>
                </form>
            </main>
        </> : isSubmitted && Object.keys(user).length !== 0 ?
            <main>
                <p className='success-msg'>You have successfuly logged in <strong>{user.username}</strong></p>
            </main> :
            <main>
                <p className='error-msg'>{error.username}</p>
            </main>


        }
    </>)
}