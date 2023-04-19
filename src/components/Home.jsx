import character from '../*/Character.svg'
import Footer from './Footer'
import ArticleCards from './ArticleCards'
import { useState } from "react"; 

const Home = ({ scrollUp }) => {
    const [isLoading, setIsLoading] = useState(false);
      const topics = ['Coding', 'Football', 'Cooking']

      const randNumb = Math.floor(Math.random() * 3)
    

    return <div className="home flex items-center flex-col gap-4 pt-24">
      <hr />
      <div className="banner flex flex-col justify-center items-center p-2">
      <img src={character} alt="Character" />
      <h3 className='bannerText p-2 '>Check out our <a className='bannerLink'href="/">{topics[randNumb]}</a> articles today.</h3>
      </div>
        <hr />
          { isLoading ? <div className='loading'>Loading...</div> : <ArticleCards setIsLoading={setIsLoading}/> }

         <button><span class="material-symbols-outlined p-2 upArrow" onClick={scrollUp}>
        arrow_upward
        </span></button> 

          <Footer />
      </div>;
  };

  export default Home