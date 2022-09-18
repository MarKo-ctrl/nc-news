import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Container, Card, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { getAllArticles } from '../utils/api';
import { toTitleCase, extractDate, extractTime } from '../utils/helpers';


export const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const { slug } = useParams()
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllArticles(slug, undefined, undefined, page)
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
  }, [slug, page])

  console.log(articlesList.length)
  const handleSorting = (event) => {
    event.preventDefault()
    let sort_by, order = '';
    switch (event.target.text) {
      case 'Title (A to Z)':
        sort_by = 'title';
        order = 'asc'
        break;
      case 'Title (Z to A)':
        sort_by = 'title';
        order = 'desc'
        break;
      case 'Author (A to Z)':
        sort_by = 'author';
        order = 'asc'
        break;
      case 'Author (Z to A)':
        sort_by = 'author';
        order = 'desc'
        break;
      case 'Date (A to Z)':
        sort_by = 'created_at';
        order = 'asc'
        break;
      case 'Date (Z to A)':
        sort_by = 'created_at';
        order = 'desc'
        break;
      case 'Comment Number (LOW to HIGH)':
        sort_by = 'comment_count';
        order = 'asc'
        break;
      case 'Comment Number (HIGH to LOW)':
        sort_by = 'comment_count';
        order = 'desc'
        break;
      case 'Votes (LOW to HIGH)':
        sort_by = 'votes';
        order = 'asc'
        break;
      case 'Votes (HIGH to LOW)':
        sort_by = 'votes';
        order = 'desc'
        break;
      default:
        sort_by = 'title';
        order = 'asc'
    }

    getAllArticles(undefined, sort_by, order)
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

          <div className="d-flex justify-content-around">
            {page === 1 ? <Button
              size='sm'
              variant='secondary'
              disabled>
              &lt; Previous
            </Button>
              :
              <Button
                size='sm'
                variant='secondary'
                onClick={() => {setPage(page - 1)}}>
                &lt; Previous
              </Button>}
            <DropdownButton
              drop='end'
              variant='secondary'
              title='Sort By'>
              {['Title (A to Z)',
                'Title (Z to A)',
                'Author (A to Z)',
                'Author (Z to A)',
                'Date (A to Z)',
                'Date (Z to A)',
                'Comment Number (LOW to HIGH)',
                'Comment Number (HIGH to LOW)',
                'Votes (LOW to HIGH)',
                'Votes (HIGH to LOW)'
              ].map((sortKey) => {
                return (
                  <Dropdown.Item
                    key={`${sortKey}`}
                    onClick={handleSorting}>
                    {`${sortKey}`}
                  </Dropdown.Item>
                )
              })
              }
            </DropdownButton>
            {articlesList.length < 9 ?
            <Button
              variant='secondary'
              size='sm'
              disabled>
              Next &gt;
            </Button> 
            :
            <Button
              variant='secondary'
              size='sm'
              onClick={() => {setPage(page + 1)}}>
              Next &gt;
            </Button>}
          </div>

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
                      className='d-flex flex-column text-muted my-3'>
                      <p
                        className='mb-0 py-1'>
                        <b>From:</b> {article.author}
                      </p>
                      <p
                        className='mb-0'>
                        {extractDate(article.created_at)} <b>At</b> {extractTime(article.created_at)}
                      </p>
                      <p
                        className='mb-0'>
                        Comments: {article.comment_count}</p>
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
