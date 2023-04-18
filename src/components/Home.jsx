import character from '../*/Character.svg'
import Footer from './Footer'
import ArticleCards from './ArticleCards'
import { useState } from "react"; 

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    return <div className="home flex items-center flex-col gap-4 pt-24">
      <hr />
      <div className="banner flex flex-col justify-center items-center p-2">
      <img src={character} alt="Character" />
      <h3 className='bannerText p-2 '>Have a read of <a className='bannerLink'href="/">Topics</a> today.</h3>
      </div>
        <hr />
          { isLoading ? <div className='loading'>Loading...</div> : <ArticleCards setIsLoading={setIsLoading}/> }
  
          <Footer />
      </div>;
  };

  export default Home