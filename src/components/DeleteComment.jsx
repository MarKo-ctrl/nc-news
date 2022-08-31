import React, { useState, useContext } from 'react'
import { deleteComment } from '../utils/api'

export const DeleteComment = (props) => {
    const [isDeleted, setDeleted] = useState(false)

    const handleDelete = (event) => {
        event.preventDefault()
        deleteComment(props.comment_id)
            .then(() => setDeleted(true))
            .catch((error) => {
                console.dir(error);
            })
    }

    return (<>{!isDeleted ?
        <button type="submit" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        :
        <p>Comment deleted...</p>
    }
    </>
    )
}
// disabled={Object.keys(user).length === 0 ? true : null}