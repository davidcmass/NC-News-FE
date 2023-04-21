import { useEffect, useState } from "react";
import { fetchTopics, fetchArticleTopic } from '../Api'

const NavMenu = ({ newTopic, setNewTopic }) => {
    const [topics, setTopics] = useState([])
    useEffect(() => {
      fetchTopics()
      .then((topics) => {
        setTopics(topics)
      })
    }, [])


    const handleClick = (e) => {
      setNewTopic(e.target.value)
    
    }
   
  
    return <ul className="navItems flex flex-col gap-4 p-5"> 
    <a href="/"><li className='navTopics'>Home</li></a>
    {
    topics.map((topic) => {
      const caps = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
  
      return <button value={topic.slug} key={topic.slug} onClick={handleClick} className="navTopics text-left">{caps}</button>
    })
    }
    <hr />
   </ul>
  
  }

  export default NavMenu