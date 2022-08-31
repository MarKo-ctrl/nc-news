import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CommentSpinner } from './CommentLoading';
import { getComments, postComment } from '../utils/api';
import { extractDate } from '../utils/helpers';
import { UserContext } from '../context/User';



export const Comments = () => {
    const [articleComments, setComments] = useState([])
    const [err, setErr] = useState(null)
    const { article_id } = useParams();
    const { user } = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('')
    const [isPosted, setPosted] = useState(false)
    const newComment = {}

    useEffect(() => {
        getComments(article_id)
            .then((comments) => {
                setComments(comments)
            })
            .catch((error) => {
                setErr(error)
            })
    }, [article_id])


    const handlePostComment = (event) => {
        event.preventDefault()
        newComment.username = user.username;
        newComment.body = commentBody;
        setPosted(true)
        setCommentBody('')
        postComment(article_id, newComment)
            .then((postedComment) => {
                setPosted(false)
                setComments([...articleComments, postedComment])
            })
            .catch((error) => {
                console.dir(error);
            })
    }


    if (err) return <p className='error'>No comments yet!</p>
    return (
        <>
            <section className='container mt-5'>
                <div className="accordion">
                    <div className="row  d-flex justify-content-center">
                        <section className="accordion-item">
                            <h2 className="accordion-header mt-4 me-4" id="headingOne">
                                <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Comments ({articleComments.length})
                                </button>
                            </h2>
                            <section>
                                <form onSubmit={handlePostComment}>
                                    {Object.keys(user).length !== 0 ?
                                        <fieldset >
                                            <legend>Write your comment</legend>
                                            <div className="mb-2">
                                                <label htmlFor="disabledTextInput" className="form-label">{user.username}</label>
                                                <input type="text" id="disabledTextInput" className="form-control" placeholder="What are your thoughts?" value={commentBody} onChange={(event) => setCommentBody(event.target.value)} />
                                            </div>
                                            {!isPosted ?
                                                <button type="submit" className="btn btn-primary" >Submit</button>
                                                :
                                                <CommentSpinner />
                                            }
                                        </fieldset>
                                        :
                                        <fieldset disabled>
                                            <legend>Write your comment</legend>
                                            <div className="mb-3">
                                                <label htmlFor="disabledTextInput" className="form-label"></label>
                                                <input type="text" id="disabledTextInput" className="form-control" placeholder="You have to login before posting a comment" />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </fieldset>}
                                </form>
                            </section>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {articleComments.map((comment) => {
                                        return (<>
                                            <article key={comment.article_id} className='d-flex card p-3 mt-3'>
                                                <h5 key={comment.author}>{comment.author}</h5>
                                                <p key={comment.created_at}>{extractDate(comment.created_at)}</p>
                                                <p key={comment.comment_id}>{comment.body}</p>
                                            </article>
                                        </>)
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}
