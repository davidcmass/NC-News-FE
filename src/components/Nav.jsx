import navLogo from '../*/Nav-Logo.svg'
import { useEffect, useState } from "react";
import { fetchUser } from '../Api'

const Nav = ({ click, setClick }) => {
    const [user, setUser] = useState([])
      useEffect(() => {
        fetchUser()
        .then((user) => {
          setUser(user)
      })
    }, [])
   
    const userNames = user.map((user) => {
        return user.username
    })

    const handleSubmit = (event) => {
        event.preventDefault()
    }
 

    return <div className="nav flex justify-between items-center pr-6 pl-6">
        <button onClick={() => setClick(!click)}>{ click ? <span className="material-symbols-outlined"> menu
        </span> : <span className="material-symbols-outlined"> close
        </span> }</button>
         <a href="/" className='navLogo'><img src={navLogo} alt="Logo" /></a>

         <form className='flex justify-center border-b border-black username' onSubmit={handleSubmit}>
            <input type="text" name="userInput" id="userInput" placeholder='Enter your username' className='appearance-none bg-transparent border-none text-gray-700 py-1 px-2 focus:outline-none'/>
        <button type='submit' className="navButton">Log in</button>
        </form>
    </div>
  }

  export default Nav
  