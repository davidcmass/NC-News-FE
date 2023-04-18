import navLogo from '../*/Nav-Logo.svg'

const Nav = ({ click, setClick }) => {
    return <div className="nav flex justify-between items-center pr-6 pl-6">
        <button onClick={() => setClick(!click)}>{ click ? <span className="material-symbols-outlined"> menu
        </span> : <span className="material-symbols-outlined"> close
        </span> }</button>
         <a href="/" className='navLogo'><img src={navLogo} alt="Logo" /></a>
        <button className="navButton">Subscribe</button>
    </div>
  }

  export default Nav
  