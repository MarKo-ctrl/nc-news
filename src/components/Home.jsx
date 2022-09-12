import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { LoadingSpinner } from './LoadingSpinner';
import { getAllArticles } from '../utils/api';
// import { toTitleCase, extractDate, extractTime } from '../utils/helpers';
import { CCarousel, CCarouselItem } from '@coreui/react'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesList, setArticlesList] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((articles) => {
        const articlesCopy = [...articles];
        let recentArticles = [];

        for (let i = 0; i < 3; i++) {
          let latestArticleDate = new Date(Math.max(...articlesCopy.map(a => new Date(a.created_at))));
          recentArticles = [...recentArticles, articlesCopy.filter(a => (new Date(a.created_at)).toString() === latestArticleDate.toString())[0]];
          articlesCopy.splice(articlesCopy.findIndex(a => (new Date(a.created_at)).toString() === latestArticleDate.toString()), 1);
        }
        setLatestArticles(recentArticles)
        setArticlesList(articles.filter(a => a.votes > 1))
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <main>
        <section
          className="border border-primary mx-1">
          <p
            className='ms-2 fs-5 mb-0 fst-italic'>
            Most recent entries:
          </p>
          <CCarousel controls dark>
            {latestArticles.map((article) => {
              return <CCarouselItem key={article.article_id}>
                <div
                  className="card mx-2 border-end-0 border-bottom-0 border-start-0">
                  <div
                    className="card-body mx-auto text-center d-flex w-75 justify-content-center flex-column">
                    <h4
                      className='card-title'>
                      {article.title}
                    </h4>
                    <Link
                      to={`/article/${article.article_id}`}
                      className="card-link">
                      Read More
                    </Link>
                  </div>
                </div>
              </CCarouselItem>
            })}
          </CCarousel>
        </section>
      </main>
    </>
  )
}
