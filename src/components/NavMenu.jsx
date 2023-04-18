import { useEffect, useState } from "react";
import { fetchTopics } from '../Api'

const NavMenu = () => {
    const [topics, setTopics] = useState([])
    useEffect(() => {
      fetchTopics()
      .then((topics) => {
        setTopics(topics)
      })
    }, [])
  
    return <ul className="navItems flex flex-col gap-4 p-5"> 
    <a href="/"><li className='navTopics'>Home</li></a>
    {
    topics.map((topic) => {
      const caps = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
  
      return <li key={topic.slug} className="navTopics">{caps}</li>
    })
    }
    <hr />
   </ul>
  
  }

  export default NavMenu