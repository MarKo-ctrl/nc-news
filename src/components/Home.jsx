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
        <section className="carousel">
          <CCarousel controls indicators dark>
            {latestArticles.map((article) => {
              return <CCarouselItem key={article.article_id}>
                <div
                  className="card">
                  <div
                    className="card-body">
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
