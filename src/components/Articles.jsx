import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer'
import { fetchArticleById, fetchComments } from '../Api'

const Articles = ({ setIsLoading, scrollUp }) => {
    const [click, setClick] = useState(true)
    const [commentClick, setCommentClick] = useState(true)
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

    //comments 
      const [commentsId, setCommentsId] = useState([])
      useEffect (() => {
        fetchComments(article_id)
        .then((comments) => {
          setCommentsId(comments)
        })
      }, [article_id])
      //
  
    return <div className="flex flex-col items-center p-5 pt-24 text-center gap-2 articleSingle">
      <p className='topic'>{articleId.topic}</p>
      <h2 className="articleTitle">{articleId.title}</h2>
      <p className='author pb-2'>By {articleId.author}</p>

      <a href="/"> <span className="material-symbols-outlined">
        arrow_back
      </span> </a>
      
      <img className='pb-2' src={articleId.article_img_url} alt="" />
      <p className='description'>{articleId.body}</p>


      <div className='p-5 flex gap-10'>
      <div className="flex gap-1">
      <span className="material-symbols-outlined" onClick={() => setCommentClick(!commentClick)}>
      comment
      </span>
      <p className="commentNum">{commentsId.length}</p>
      </div>
      <button onClick={() => setClick(!click)}>{ click ? <div className="flex gap-1 pb-1"><span className="material-symbols-outlined"> favorite
        </span> <p className="votes">{articleId.votes}</p></div> : <div className="flex gap-1"> <span className="material-symbols-outlined"> heart_plus
        </span> <p className="votes">{articleId.votes}</p></div> }</button>
      </div>

     { commentClick ? '' : <div>
        {commentsId.map((comments) => {
          return <div key={comments.comment_id} className="p-4 flex flex-col items-center gap-4 comments"> 
          <hr />
            <h3>{comments.body}</h3>
            <p className="author">{comments.author}</p>
            <div className="flex gap-1">
            <span class="material-symbols-outlined">
          thumb_up
          </span>
          <p className="votes">{comments.votes}</p>
          </div>
            </div>
        })}
        <button><span class="material-symbols-outlined p-2 upArrow" onClick={scrollUp}>
        arrow_upward
        </span></button>
      </div> }
  
      <Footer />
    </div>
  }

  export default Articles