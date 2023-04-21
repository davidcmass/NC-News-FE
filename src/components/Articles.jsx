import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from './Footer'
import { fetchArticleById, fetchComments, articleVote, commentPost, deleteComment} from '../Api'
import AuthContext from "../contexts/AuthProvider"

const Articles = ({ setIsLoading, scrollUp }) => {
    const [commentClick, setCommentClick] = useState(true)
    const [articleId, setArticleId] = useState({})
    const { article_id } = useParams()
    const [err, setErr] = useState(false)

    const { auth, logSuccess } = useContext(AuthContext) 


    useEffect (() => {
      setIsLoading(true)
      fetchArticleById(article_id)
      .then((article) => {
        setArticleId(article)
      })
      setIsLoading(false)
    }, [article_id])

    const [voted, setVoted] = useState(false);

    const handleVote = () => {
      if (logSuccess) {
        if (voted) {
          // Remove 
          articleVote(article_id, -1)
            .catch((err) => {
              if (err) {
                setErr(true);
                setTimeout(() => {
                  setErr(false);
                }, 2500);
              }
            });
          articleId.votes--;
          setVoted(false);
        } else {
          // Add 
          articleVote(article_id, 1)
            .catch((err) => {
              if (err) {
                setErr(true);
                setTimeout(() => {
                  setErr(false);
                }, 2500);
              }
            });
          articleId.votes++;
          setVoted(true);
        }
      } else {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 2500);
      }
    };
    
    

    
   

    //comments 
      const [commentsId, setCommentsId] = useState([])
      useEffect (() => {
        fetchComments(article_id)
        .then((comments) => {
          setCommentsId(comments)
        })
      }, [article_id])
      //

      const [body, setBody] = useState('');
      const [error, setError] = useState(false)
      const [success, setSuccess] = useState(false)
      const [commentErr, setCommentErr] = useState(false)
     

      const handleSubmit = (event) => {
        event.preventDefault()
        
        if (logSuccess && body.length >= 1) {
        commentPost(article_id, {
          username: auth,
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
        setBody('')
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2500);
        } else setError(true)
        setBody('')
        setTimeout(() => {
          setError(false)
        }, 2500);
      }

      const [successDelete, setSuccessDelete] = useState(false)

      const handleDelete = (e) => {
        
        deleteComment(e.target.value)
        .then(() => {
          setSuccessDelete(true)
        })
        .catch((err) => {
         if (err) {
          console.log(err)
         }
        })
      }

    return <div className="flex flex-col items-center p-5 pt-24 text-center gap-2 articleSingle">
      <p className='topic'>{articleId.topic}</p>
      <h2 className="articleTitle">{articleId.title}</h2>
      <p className='author pb-2'>By {articleId.author}</p>

      <a href="/"> <span className="material-symbols-outlined">
        arrow_back
      </span> </a>
      
      <img className='pb-2' src={articleId.article_img_url} alt="" />
      <p className='description max-w-6xl'>{articleId.body}</p>


      <div className='p-5 flex gap-10'>
      <div className="flex gap-1">
      <button onClick={() => setCommentClick(!commentClick)} > { commentClick ? <span className="material-symbols-outlined">
      comment
      </span> : <span className="material-symbols-outlined">
    add_comment
</span> } </button>
      <p className="commentNum">{commentsId.length}</p>
      </div>
      <button onClick={handleVote}>{ !voted ? <div className="flex gap-1 pb-1.5"><span className="material-symbols-outlined"> favorite
        </span> <p className="votes">{articleId.votes}</p></div> : <div className="flex gap-1 pb-1.5"> <span className="material-symbols-outlined"> heart_plus
        </span> <p className="votes">{articleId.votes}</p></div> }</button> 
      </div>
      { err ? <h3 className="text-red-600">Error! Please try again</h3> : "" }
     
     { commentClick ? '' : <div className="flex flex-col items-center">
     <hr />
        <form className='addComment flex m-8 text-center gap-10 pt-4  p-1 border-b border-black'>
          <input required value={body} type="text" className='commentText' placeholder="Comment on this article" onChange={(event) => {setBody(event.target.value)}} autoComplete='off'/>
          <button className="button" onClick={handleSubmit}>Submit</button>
        </form>
        { error || commentErr ? <h3 className=" text-red-600">Error! Please try again</h3> : ""} 
        { !commentErr && success ? <h3 className=" text-green-600">Comment posted!</h3> : "" }

        { commentsId.length === 0 ? <h3>Nothing to see here...</h3> : ''}

        {commentsId.map((comments) => {
          return <div key={comments.comment_id} className="p-4 flex flex-col items-center gap-4 comments"> 
          <hr />
            <h3 className="max-w-6xl">{comments.body}</h3>
            <p className="author">{comments.author}</p>
            <div className="flex gap-1">
            <span className="material-symbols-outlined">
          thumb_up
          </span>
          <p className="votes">{comments.votes}</p>
          </div>
          { auth === comments.author ?  <button value={comments.comment_id} onClick={handleDelete} className="button">Delete</button> : '' } 
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