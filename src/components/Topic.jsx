import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';

export const Topic = () => {
    const [topicArticles, setTopicArticles] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        getAllArticles(slug)
            .then((articles) => {
                setTopicArticles(articles)
            })
    }, [slug])

    return (
        <>
        <h2>{toTitleCase(slug)} Articles</h2>
            <ul>
                <div className='card'>
                    {topicArticles.map((article) => {
                        return <li key={article.article_id} className='card-body'>
                            <h4 className='card-title'>{article.title}</h4>
                            <h5 className='card-subtitle mb-2 text-muted'>From: {article.author}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>{extractDate(article.created_at)} At {extractTime(article.created_at)}</h6>
                            <Link to="#" className="card-link">Read More</Link>
                        </li>
                    })}
                </div>
            </ul>
        </>
    )
}
