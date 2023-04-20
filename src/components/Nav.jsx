import navLogo from '../*/Nav-Logo.svg'
import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthProvider"

const Nav = ({ click, setClick, userNames}) => {

    const { auth, setAuth, logSuccess, setLogSuccess } = useContext(AuthContext)
    const [logUser, setLogUser] = useState('')

    const [err, setErr] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (userNames.includes(logUser)) {
            setAuth(logUser)
            setLogSuccess(true)
            setLogUser('')
        } else { 
            setErr(true)
            setTimeout(() => {
                setErr(false)
              }, 2500);
            setLogUser('')
        }
    }

    const handleLogOut = (event) => {
            setAuth('')
            setLogSuccess(false)
    }

    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) setIsDesktop(window.innerWidth > 1000);
        }, false);
    }, []);
 

    return <div className="nav flex justify-between items-center pr-6 pl-6">
       { isDesktop ? <div>
        <ul>
            <li>Home</li>
        </ul>
       </div> : <button onClick={() => setClick(!click)}>{ click ? <span className="material-symbols-outlined"> menu
        </span> : <span className="material-symbols-outlined"> close
        </span> }</button> }
         <a href="/" className='navLogo'><img src={navLogo} alt="Logo" /></a>

         { logSuccess ? <div className='flex justify-center items-center gap-5 border-b border-black logInSuccess'><h3>{auth}</h3> <button type='button' className="navButton" onClick={handleLogOut}>Log out</button></div> : <form className='flex justify-center border-b border-black username' onSubmit={handleSubmit}>
            <input type="text" name="userInput" id="userInput" placeholder={ !err ? 'Enter your username' : 'Invalid Username!' }className='appearance-none bg-transparent border-none text-gray-700 py-1 px-2 focus:outline-none' autoComplete='off' onChange={(e) => setLogUser(e.target.value)} value={
            logUser} required/>
        <button type='submit' className="navButton">Log in</button>
        </form> }
    </div>
  }

  export default Nav
  