import React, { useEffect, useCallback, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "in",
  category = "general",
  apiKey,
  pageSize = 20,
  setProgress = () => {},
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Fetch news for the current page
  const updateNews = useCallback(async () => {
    setProgress(0);
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}&page=1&pageSize=20`;

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);
    setProgress(100);
  }, [country, category, apiKey, page, pageSize, setProgress]);

  // Initial fetch when component mounts or category changes
  useEffect(() => {
    document.title = `NewsOnn - ${capitalizeFirstLetter(category)}`;
    setPage(1);
    updateNews();
  }, [category, updateNews]);

  // Fetch more data for infinite scroll
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    console.log(url);

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
  };

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "65px" }}>
        NewsOnn - Top {capitalizeFirstLetter(category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={fetchMoreData}
        hasMore={(articles?.length || 0) < (totalResults || 0)}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 80) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func,
};

export default News;
