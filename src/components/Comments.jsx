import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getComments } from '../utils/api';


export const Comments = () => {
    const [articleComments, setComments] = useState([])
    const { article_id } = useParams();

    useEffect(() => {
        getComments(article_id)
            .then((comments) => {
                setComments(comments)
            })
    }, [article_id])


    return (
        <>
            <section className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Comments ({articleComments.length})
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {articleComments.map((comment) => {
                                return (<>
                                    <article>{comment.author}</article>
                                    <article>{comment.body}</article>
                                </>)
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
