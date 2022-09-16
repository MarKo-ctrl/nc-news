import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Form, Button } from 'react-bootstrap';
import { ErrorPage } from './ErrorPage';
import { CommentSpinner } from './CommentSpinner';
import { getComments, postComment } from '../utils/api';
import { extractDate } from '../utils/helpers';
import { UserContext } from '../context/User';
import { DeleteComment } from './DeleteComment';

export const Comments = () => {
  const [articleComments, setComments] = useState([])
  const [error, setError] = useState(null)
  const { article_id } = useParams();
  const { user } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState('')
  const [isPosted, setPosted] = useState(false)
  const newComment = {}

  useEffect(() => {
    getComments(article_id)
      .then((comments) => {
        setComments(comments)
      })
      .catch((err) => {
        setError(err)
      })
  }, [article_id])

  const handlePostComment = (event) => {
    event.preventDefault()
    newComment.username = user.username;
    newComment.body = commentBody;
    setPosted(true)
    setCommentBody('')
    postComment(article_id, newComment)
      .then((postedComment) => {
        setPosted(false)
        setComments([...articleComments, postedComment])
      })
      .catch((err) => {
        setError(err)
      })
  }


  if (error) return <ErrorPage value={error} />;
  return (<>
    <Form
      className='mt-4'
      onSubmit={handlePostComment}>
      <Form.Group
        controlId='commentForm'>
        <Form.Label
          className='text-secondary'>
          Write your comment
        </Form.Label>
        {Object.keys(user).length !== 0 ?
          <fieldset>
            <Form.Control
              type='text'
              placeholder='What are your thoughts?'
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}>
            </Form.Control>
            {
              !isPosted ?
                <Button
                  variant='secondary'
                  type='submit'
                  className='mt-2'>
                  <span
                    className='text-warning'>
                    Submit
                  </span>
                </Button>
                :
                <CommentSpinner />
            }
          </fieldset>
          :
          <>
            <Form.Control
              type='text'
              placeholder='You have to login before posting a comment'>
            </Form.Control>
            <Button
              variant='secondary'
              type='submit'
              className='mt-2 text-warning'
              disabled>
              Submit
            </Button>
          </>
        }

      </Form.Group>
    </Form>

    <Accordion
      defaultActiveKey={0}
      className='my-3'>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          <span
            className='text-secondary'>
            Comments ({articleComments.length})
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {articleComments.map((comment) => {
            return <article
              key={`${comment.article_id}_${comment.author}_${comment.created_at}`}
              className='d-flex card p-3 mt-3'>
              <h5>
                {comment.author}
              </h5>
              <p>
                {extractDate(comment.created_at)}
              </p>
              <p>
                {comment.body}
              </p>
              {
                user.username === comment.author ?
                  <DeleteComment
                    comment_id={comment.comment_id}
                  />
                  :
                  null
              }
            </article>
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>
  )
}
