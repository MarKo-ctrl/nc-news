import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../utils/api';
import { extractDate } from '../utils/helpers';


export const Comments = () => {
    const [articleComments, setComments] = useState([])
    const [err, setErr] = useState(null)
    const { article_id } = useParams();

    useEffect(() => {
        getComments(article_id)
            .then((comments) => {
                setComments(comments)
            })
            .catch((error) => {
                setErr(error)
            })
    }, [article_id])


    if (err) return <p className='error'>No comments yet!</p>
    return (
        <>
            <section className='container mt-5'>
                <div className="accordion" id="accordionExample">
                    <div className="row  d-flex justify-content-center">
                        <section className="accordion-item">
                            <h2 className="accordion-header mt-4 me-4" id="headingOne">
                                <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Comments ({articleComments.length})
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {articleComments.map((comment) => {
                                        return (<>
                                            <article className='d-flex card p-3 mt-3'>
                                                <h5>{comment.author}</h5>
                                                <p>{extractDate(comment.created_at)}</p>
                                                <p>{comment.body}</p>
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
