import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer'
import { fetchArticleById, fetchComments, articleVote, commentPost } from '../Api'

const Articles = ({ setIsLoading, scrollUp, userNames}) => {
    const [click, setClick] = useState(true)
    const [commentClick, setCommentClick] = useState(true)
    const [articleId, setArticleId] = useState({})
    const { article_id } = useParams()
    const [err, setErr] = useState(false)

    useEffect (() => {
      setIsLoading(true)
      fetchArticleById(article_id)
      .then((article) => {
        setArticleId(article)
      })
      setIsLoading(false)
    }, [article_id])

    const handleVote = () => {
      setClick(!click)
      articleVote(article_id, 1)
      .catch((err) => {
        if(err) {
        setErr(true)
        setTimeout(() => {
          setErr(false)
        }, 2500);
        }
      })

      // Optimistic Rendering
      articleId.votes++
    }
   

    //comments 
      const [commentsId, setCommentsId] = useState([])
      useEffect (() => {
        fetchComments(article_id)
        .then((comments) => {
          setCommentsId(comments)
        })
      }, [article_id])
      //

      const [username, setUsername] = useState('');
      const [body, setBody] = useState('');
      const [error, setError] = useState(false)
      const [success, setSuccess] = useState(false)
      const [commentErr, setCommentErr] = useState(false)
     

      const handleSubmit = (event) => {
        event.preventDefault()
        
        if (userNames.includes(username)) {
        commentPost(article_id, {
          username: username,
          body: body
          
        }).then((comment) => {
          setCommentsId((commentsId) => {
            const commentsArr = [comment[0], ...commentsId]
            return commentsArr
          })
        }).catch((err) => {
          if (err) {
          setCommentErr(true)
          setTimeout(() => {
            setCommentErr(false)
          }, 2500);
          }
        })
        setUsername('')
        setBody('')
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2500);
        } else setError(true)
        setTimeout(() => {
          setError(false)
        }, 2500);
      }
  
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
      <button onClick={() => setCommentClick(!commentClick)} > { commentClick ? <span className="material-symbols-outlined">
      comment
      </span> : <span className="material-symbols-outlined">
    add_comment
</span> } </button>
      <p className="commentNum">{commentsId.length}</p>
      </div>
      <button onClick={handleVote}>{ click ? <div className="flex gap-1 pb-1"><span className="material-symbols-outlined"> favorite
        </span> <p className="votes">{articleId.votes}</p></div> : <div className="flex gap-1"> <span className="material-symbols-outlined"> heart_plus
        </span> <p className="votes">{articleId.votes}</p></div> }</button> 
      </div>
      { err ? <h3 className="text-red-600">Error! Please try again</h3> : "" }
     
     { commentClick ? '' : <div className="flex flex-col items-center">
     <hr />
        <form className='addComment flex m-8 text-center gap-10 pt-4  p-1'>
        <input value={username} type="text" className='userNameInput border-b border-black' autoFocus="autoFocus" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}} required/>
          <input value={body} type="text" className='commentText border-b border-black' placeholder="Comment on this article" onChange={(event) => {setBody(event.target.value)}} required/>
          <button className="button" onClick={handleSubmit}>Submit</button>
        </form>
        { error || commentErr ? <h3 className=" text-red-600">Error! Please try again</h3> : ""} 
        { !commentErr && success ? <h3 className=" text-green-600">Comment posted!</h3> : "" }

        { commentsId.length === 0 ? <h3>Nothing to see here...</h3> : ''}

        {commentsId.map((comments) => {
          return <div key={comments.comment_id} className="p-4 flex flex-col items-center gap-4 comments"> 
          <hr />
            <h3>{comments.body}</h3>
            <p className="author">{comments.author}</p>
            <div className="flex gap-1">
            <span className="material-symbols-outlined">
          thumb_up
          </span>
          <p className="votes">{comments.votes}</p>
          </div>
            </div>
        })}
        <button><span className="material-symbols-outlined p-2 upArrow" onClick={scrollUp}>
        arrow_upward
        </span></button>
      </div> }
  
      <Footer />
    </div>
  }

  export default Articles