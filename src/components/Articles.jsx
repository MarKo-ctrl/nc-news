import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';
import { LoadingSpinner } from './LoadingSpinner';


export const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const { slug } = useParams()


  useEffect(() => {
    getAllArticles(slug)
      .then((articles) => {
        setArticlesList(articles)
        setIsLoading(false)
      })
  }, [slug])

  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {!slug ?
        <main>
          <ul className='list-group'>
            {articlesList.map((article) => {
              return <li key={article.article_id} className='list-group-item'>
                <div className='card'>
                  <a href="https://placeholder.com/"><img src="https://via.placeholder.com/150" alt="" /></a>
                  <div className="card-body">
                    <h4 className='card-title'>{article.title}</h4>
                    <h5 className='card-subtitle mb-2 text-muted'>From: {article.author}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>{extractDate(article.created_at)} At {extractTime(article.created_at)}</h6>
                    <Link to={`/article/${article.article_id}`} className="card-link">Read More</Link>
                    <Link to={`/topics/${article.topic}`} className="card-link">{toTitleCase(article.topic)}</Link>
                  </div>
                </div>
              </li>
            })}
          </ul>
        </main> :
        <>
          <main>
            <h2>{toTitleCase(slug)} Articles</h2>
            <ul className='list-group'>
              {articlesList.map((article) => {
                return <li key={article.article_id} className='list-group-item'>
                  <div className='card'>
                  <a href="https://placeholder.com/"><img src="https://via.placeholder.com/150" alt="" /></a>
                    <div className="card-body">
                      <h4 className='card-title'>{article.title}</h4>
                      <h5 className='card-subtitle mb-2 text-muted'>From: {article.author}</h5>
                      <h6 className='card-subtitle mb-2 text-muted'>{extractDate(article.created_at)} At {extractTime(article.created_at)}</h6>
                      <Link to={`/article/${article.article_id}`} className="card-link">Read More</Link>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          </main>
        </>
      }
    </>
  )
}
