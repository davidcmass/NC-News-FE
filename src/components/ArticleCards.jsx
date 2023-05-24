import { useEffect, useState } from "react";
import { fetchArticles } from "../Api";
import { useSearchParams } from "react-router-dom";

const ArticleCards = ({ setIsLoading }) => {
  const [articles, setArticles] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const searchTopic = searchParams.get("topic");

  useEffect(() => {
    // setIsLoading(true)
    fetchArticles(searchTopic).then((articles) => {
      setArticles(articles);
    });
    // setIsLoading(false)
  }, [searchTopic, setIsLoading]);

  return (
    <div className="articleContainer">
      {articles.map((article) => {
        const aBody = article.body.substring(0, 120) + "...";

        return (
          <div
            className={"articleCard flex flex-col p-5 text-left gap-1"}
            key={article.article_id}
          >
            <img className="pb-2" src={article.article_img_url} alt="image" />
            <p className="topic">{article.topic}</p>
            <a href={`Articles/${article.article_id}`}>
              <h2 className="articleTitle">{article.title}</h2>
            </a>
            <p className="description">{aBody}</p>
            <p className="author">By {article.author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleCards;
