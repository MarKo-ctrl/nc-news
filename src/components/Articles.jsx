import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Container, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';


export const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const { slug } = useParams()
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllArticles(slug)
      .then((articles) => {
        setIsLoading(false)
        if (articles.statusText === 'OK') {
          setArticlesList(articles.data)
        } else {
          throw Error()
        }
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.msg)
      })
  }, [slug])

  const handleSorting = (event) => {
    event.preventDefault()
  }

  if (isLoading) return <LoadingSpinner />
  return (
    <>
      {!slug ?
        <main>
          <h2
            className='subtitle mb-3'>
            All Articles
          </h2>

          <DropdownButton
            drop='end'
            variant='secondary'
            title='Sort By'
            onClick={handleSorting}>
            {['Title (A to Z)',
              'Title (Z to A)',
              'Author',
              'Author',
              'Date',
              'Date',
              'Comment Number (HIGH to LOW)',
              'Comment Number (LOW to HIGH)',
              'Votes (HIGH to LOW)',
              'Votes (LOW to HIGH)'
            ].map((sortKey) => {
              return (
                <Dropdown.Item
                  key={`${sortKey}`}>
                  {`${sortKey}`}
                </Dropdown.Item>
              )
            })
            }
          </DropdownButton>

          <Container
            className='c-2 mt-3'>
            {articlesList.map((article) => {
              return (
                <Card
                  key={`${article.article_id}_${article.author}`}
                  className='article-card mb-2 bg-light'>
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
                      className='card-link mx-auto text-decoration-none text-warning'>
                      Read More
                    </Link>
                    <Link
                      to={`/topics/${article.topic}`}
                      className='card-link text-decoration-none text-warning'>
                      {toTitleCase(article.topic)}
                    </Link>
                    <div
                      className='d-block text-secondary position-absolute bottom-0 end-0 me-2 mb-2 border border-warning rounded p-1'>
                      <b>Votes:</b> {article.votes}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Container>
        </main>
        : error !== null ?
          <ErrorPage value={error} />
          : <>
            <main>
              <Container
                className='c-2 mt-3'>
                <h2
                  className='subtitle mb-3'>
                  {toTitleCase(slug)} Articles
                </h2>
                {articlesList.map((article) => {
                  return (
                    <Card
                      key={`${article.article_id}_${article.author}`}
                      className='article-card mb-2 bg-light'>
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
            </main>
          </>
      }
    </>
  )
}
