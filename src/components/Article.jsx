import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { LoadingSpinner } from './LoadingSpinner';
import { getArticle } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';

export const Article = () => {
    const [articleObj, setArticleBody] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { article_id } = useParams();

    useEffect(() => {
        getArticle(article_id)
            .then((article) => {
                setArticleBody(article)
                setIsLoading(false)
            })
    }, [article_id])

    return (
        <>
            {isLoading ?  <LoadingSpinner /> :
            <div className='col-md-8'>
                <h3 className='ms-3'>From <Link to={`/topics/${articleObj.topic}`} className='pb-4 mb-4 fst-italic border-bottom'>{toTitleCase(articleObj.topic)}</Link></h3>
                <article className='blog-post'>
                    <h2 className='h2'>
                        {articleObj.title}
                    </h2>
                    <p className='blog-post-meta mx-3'>{extractDate(articleObj.created_at)} by {toTitleCase(articleObj.author)}</p>
                    <hr />
                    <p className='ms-3'>{articleObj.body}</p>

                </article>
            </div>}

        </>

    )
}
