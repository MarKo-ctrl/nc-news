import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorPage } from './ErrorPage';
import { Comments } from './Comments';
import { getArticle, patchVote } from '../utils/api';
import { toTitleCase, extractDate } from '../utils/helpers';
import { Container, Row, Col } from 'react-bootstrap';

export const Article = () => {
  const [articleObj, setArticleBody] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currVotes, setVotes] = useState(0);
  const { article_id } = useParams();
  const [voteErr, setVoteError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticle(article_id)
      .then((article) => {
        setArticleBody(article)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.msg)
      })
  }, [article_id])

  const handleUpVotes = () => {
    setVotes((currVotes) => currVotes + 1)
    setVoteError(null)
    patchVote(articleObj.article_id, { 'inc_votes': 1 })
      .catch((err) => {
        setVotes((currVotes) => currVotes - 1)
        setVoteError('Oops! Your vote didn\'t go through. Please try again')
      })
  }

  const handleDownVotes = () => {
    setVotes((currVotes) => currVotes - 1)
    setVoteError(null)
    patchVote(articleObj.article_id, { 'inc_votes': -1 })
      .catch((err) => {
        setVotes((currVotes) => currVotes + 1)
        setVoteError('Oops! Your vote didn\'t go through. Please try again')
      })
  }

  if (voteErr) return <ErrorPage value={voteErr} />;
  if (error) return <ErrorPage value={error} />;
  return (
    <>
      {isLoading ?
        <LoadingSpinner
          key={articleObj.article_id}
        />
        :
        <main>
          <Container>
            <Col
              className='fs-1'>
              {articleObj.title}
            </Col>
            <Row
            className=''>
              <Col
              className='align-self-center'>
                <span
                  className='text-secondary'>
                  From </span>
                <Link
                  to={`/topics/${articleObj.topic}`}
                  className='fst-italic text-warning text-decoration-none'>
                  {toTitleCase(articleObj.topic)}
                </Link>
              </Col>
              <Col xs={4}
                className='text-secondary align-self-center'>
                {extractDate(articleObj.created_at)} by  <span
                  className="text-warning">
                  {toTitleCase(articleObj.author)}
                </span>
              </Col>
              <Col>
                Was interesting for :
                <span
                  className='text-warning align-self-center'>
                  {currVotes + articleObj.votes}
                </span>
              </Col>
            </Row>
            <Row
              className='my-5'>
              <Col>
              {articleObj.body}
              </Col>
            </Row>
            <Row>
              <Col
                className='text-secondary fs-6 fst-italic'>
                Found it interesting? Vote!
              </Col>
              <Col>
                <button
                  type='button'
                  className='btn btn-secondary btn-sm mb-1 me-1 text-warning'
                  onClick={handleUpVotes}>
                  Love it!
                </button>
                <button
                  type='button'
                  className='btn btn-outline-secondary btn-sm text-danger mb-1'
                  onClick={handleDownVotes}>
                  Waste of time!
                </button>
              </Col>
            </Row>
            <Comments
              key={articleObj.article_id}
            />
          </Container>
        </main>
      }
    </>
  )
}
