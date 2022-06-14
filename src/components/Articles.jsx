import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';


export const Articles = () => {
    const [articlesList, setArticlesList] = useState([])

    useEffect(() => {
        getAllArticles()
            .then((articles) => {
                setArticlesList(articles)
            })
    }, [])

    return (
        <>
            <ul>
                <div className='card'>
                    {articlesList.map((article) => {
                        return <li key={article.article_id} className='card-body'>
                            <h4 className='card-title'>{article.title}</h4>
                            <h5 className='card-subtitle mb-2 text-muted'>From: {article.author}</h5>
                            <h6 className='card-subtitle mb-2 text-muted'>{extractDate(article.created_at)} At {extractTime(article.created_at)}</h6>
                            <Link to="#" className="card-link">Read More</Link>
                            <Link to="#" className="card-link">{toTitleCase(article.topic)}</Link>
                        </li>
                    })}
                </div>
            </ul>
        </>
    )
}
