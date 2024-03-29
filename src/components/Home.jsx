import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { ErrorPage } from './ErrorPage';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        setIsLoading(false)
        // make a copy of the data array
        if (articles.statusText === 'OK') {
          const articlesCopy = [...articles.data];

          // find the 3 most recent articles
          let recentArticles = [];
          for (let i = 0; i < 3; i++) {
            // find the latest article date
            let latestArticleDate = new Date(Math.max(...articlesCopy.map(a => new Date(a.created_at))));
            // retrieve the most recent article by comparing to the latest date
            recentArticles = [...recentArticles, articlesCopy.filter(a => (new Date(a.created_at)).toString() === latestArticleDate.toString())[0]];
            // delete the most recent article, ..and repeat to find the next most recent article
            articlesCopy.splice(articlesCopy.findIndex(a => (new Date(a.created_at)).toString() === latestArticleDate.toString()), 1);
          }
          setLatestArticles(recentArticles);
          setArticlesList(articles.data.filter(a => a.votes > 1));
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.message === 'Network Error') {
          setError(err.message)
        } else {
          setError(err.response.data.msg);
        }
      })
  }, [])

  if (error) return <ErrorPage value={error} />;
  if (isLoading) return <LoadingSpinner />
  return (
    <main
      className='mx-1'>
      <Container className='c-1 rounded bg-secondary'>
        <p
          className='ms-2 fs-5 mb-0 fst-italic text-light'>
          Most recent entries:
        </p>
        <Carousel
          slide={false}
          activeIndex={index}
          onSelect={handleSelect}>
          {latestArticles.map((article) => {
            return (
              <Carousel.Item
                key={`${article.article_id}_${article.author}`}
                className='border-top border-warning mb-1'>
                <div
                  className='d-flex flex-column justify-center pt-2'>
                  <p
                    className='w-75 mx-auto text-center text-light fs-4'>
                    {article.title}
                  </p>
                  <Card.Subtitle
                    className='p-0 m-0'>
                    <p
                      className='fs-6 fst-italic text-warning text-center m-0 p-0'>
                      {extractDate(article.created_at)}
                    </p>
                  </Card.Subtitle>
                  <Link
                    to={`/article/${article.article_id}`}
                    className='link-warning mx-auto pb-5 fs-6'>
                    Read More
                  </Link>
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </Container>
      <Container
        className='c-2 mt-3'>
        <p
          className='subtitle ms-2 fs-3 mb-2 fst-italic'>
          Most liked entries:
        </p>
        {articlesList.map((article) => {
          return (
            <Card
              key={`${article.article_id}_${article.author}`}
              className='article-card bg-light mb-2'>
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
                  className='card-link mx-auto pb-5 text-decoration-none text-warning'>
                  Read More
                </Link>
                <Link
                  to={`/topics/${article.topic}`}
                  className='card-link text-decoration-none text-warning'>
                  {toTitleCase(article.topic)}
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </main >
  )
}
