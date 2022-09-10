import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { LoadingSpinner } from './LoadingSpinner';
import { Comments } from './Comments';
import { getArticle, patchVote } from '../utils/api';
import { toTitleCase, extractDate } from '../utils/helpers';

export const Article = () => {
  const [articleObj, setArticleBody] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currVotes, setVotes] = useState(0);
  const { article_id } = useParams();
  const [voteErr, setVoteError] = useState(null);

  useEffect(() => {
    getArticle(article_id)
      .then((article) => {
        setArticleBody(article)
        setIsLoading(false)
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

  if (voteErr) return <p className='error'>{voteErr}</p>
  return (
    <>
      {isLoading ?
        <LoadingSpinner
          key={articleObj.article_id}
        />
        :
        <main
          className='col-md-12'>
          <h4
            className='ms-3'>
            From
            <Link
              to={`/topics/${articleObj.topic}`}
              className='pb-4 mb-4 fst-italic border-bottom'>
              {toTitleCase(articleObj.topic)}
            </Link>
          </h4>
          <article
            className='blog-post'>
            <h2
              className='h2'>
              {articleObj.title}
            </h2>
            <p
              className='blog-post-meta mx-3'>
              {extractDate(articleObj.created_at)} by {toTitleCase(articleObj.author)}
            </p>
            <div
              className='blog-post-meta mx-3 text-end'>
              Was interesting for : {currVotes + articleObj.votes}
            </div>
            <hr />
            <p
              className='ms-3'>
              {articleObj.body}
            </p>
          </article>
          <hr />
          <p
            className='ms-2'>Found it interesting? Vote!</p>
          <button
            type="button"
            className="btn btn-info btn-sm ms-3"
            onClick={handleUpVotes}>
            Love it!
          </button>
          <button
            type="button"
            className="btn btn-outline-info btn-sm ms-3"
            onClick={handleDownVotes}>
            Waste of time!</button>
          <Comments
            key={articleObj.article_id}
          />
        </main>
      }
    </>
  )
}
