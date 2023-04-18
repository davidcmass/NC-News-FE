import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer'
import { fetchArticleById } from '../Api'

const Articles = ({ setIsLoading }) => {
    const [click, setClick] = useState(true)
    const [articleId, setArticleId] = useState({})
    const { article_id } = useParams()
    useEffect (() => {
      setIsLoading(true)
      fetchArticleById(article_id)
      .then((article) => {
        setArticleId(article)
      })
      setIsLoading(false)
    }, [article_id])
  
    return <div className="flex flex-col items-center p-5 pt-24 text-center gap-2 articleSingle">
      <p className='topic'>{articleId.topic}</p>
      <h2 className="articleTitle">{articleId.title}</h2>
      <p className='author'>By {articleId.author}</p>
  
      <div className='p-5 flex gap-10'>
      <a href="/"> <span className="material-symbols-outlined">
        arrow_back
      </span> </a>
      <span className="material-symbols-outlined">
  comment
      </span>
      <button onClick={() => setClick(!click)}>{ click ? <span className="material-symbols-outlined"> favorite
        </span> : <span className="material-symbols-outlined"> heart_plus
        </span> }</button>
      </div>
      
      <img className='pb-2' src={articleId.article_img_url} alt="" />
      <p className='description'>{articleId.body}</p>
  
      <Footer />
    </div>
  }

  export default Articles