import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from '../Api';

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
    <Link value={undefined} onClick={handleClick} to="/" className="navTopics">Home</Link>
    {
    topics.map((topic) => {
      const caps = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
  
      return <Link to={`/?topic=${topic.slug}`}> <button onClick={handleClick} value={topic.slug} key={topic.slug} className="navTopics text-left">{caps}</button> </Link>
    })
    }
    <hr />
   </ul>
  
  }

  export default NavMenu