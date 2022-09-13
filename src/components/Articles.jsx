import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';
import { LoadingSpinner } from './LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


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
          <Container
            className='c-2 mt-3'>
            {articlesList.map((article) => {
              return (
                <Card
                  key={`${article.article_id}_${article.author}`}
                  className='article-card mb-2'>
                  <Card.Body>
                    <Card.Title>
                      {article.title}
                    </Card.Title>
                    <Card.Subtitle
                      className='d-flex flex-column text-muted'>
                      <p
                        className='mb-1'>
                        <b>From:</b> {article.author}
                      </p>
                      <p>
                        {extractDate(article.created_at)} <b>At</b> {extractTime(article.created_at)}
                      </p>
                    </Card.Subtitle>
                    <Card.Text>
                      {`${article.body.split('.', 1)}.`}
                    </Card.Text>
                    <Link
                      to={`/article/${article.article_id}`}
                      className='card-link mx-auto pb-5'>
                      Read More
                    </Link>
                    <Link
                      to={`/topics/${article.topic}`}
                      className='card-link'>
                      {toTitleCase(article.topic)}
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
          </Container>
        </main> :
        <>
          <main>
            <Container
              className='c-2 mt-3'>
              <h2
              className='subtitle'>
                {toTitleCase(slug)} Articles
              </h2>
              {articlesList.map((article) => {
                return (
                  <Card
                    key={`${article.article_id}_${article.author}`}
                    className='article-card mb-2'>
                    <Card.Body>
                      <Card.Title>
                        {article.title}
                      </Card.Title>
                      <Card.Subtitle
                        className='d-flex flex-column text-muted'>
                        <p
                          className='mb-1'>
                          <b>From:</b> {article.author}
                        </p>
                        <p>
                          {extractDate(article.created_at)} <b>At</b> {extractTime(article.created_at)}
                        </p>
                      </Card.Subtitle>
                      <Card.Text>
                        {`${article.body.split('.', 1)}.`}
                      </Card.Text>
                      <Link
                        to={`/article/${article.article_id}`}
                        className='card-link mx-auto pb-5'>
                        Read More
                      </Link>
                      <Link
                        to={`/topics/${article.topic}`}
                        className='card-link'>
                        {toTitleCase(article.topic)}
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })}
            </Container>
          </main>
        </>
      }
    </>
  )
}
