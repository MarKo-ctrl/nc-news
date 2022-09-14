import React, { useState } from 'react'
import { deleteComment } from '../utils/api'
import { ErrorPage } from './ErrorPage';

export const DeleteComment = (props) => {
  const [isDeleted, setDeleted] = useState(false)
  const [error, setError] = useState(null);

  const handleDelete = (event) => {
    event.preventDefault()
    deleteComment(props.comment_id)
      .then(() => setDeleted(true))
      .catch((err) => {
        setError(err);
      })
  }

  if (error) return <ErrorPage value={error} />;
  return (
    <>
      {!isDeleted ?
        <button
          type='submit'
          className='btn btn-danger'
          onClick={handleDelete}>
          Delete
        </button>
        :
        <p>
          Comment deleted...
        </p>
      }
    </>)
}