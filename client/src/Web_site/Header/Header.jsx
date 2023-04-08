import { Link } from 'react-router-dom';
import './Header.css';
import "../index.css";

const Header = () => {
  return(
    <>
      <header className="header-area header-sticky">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="main-nav"> 
                        <a href="#top" className="logo">
                            <h1>MyCar</h1>
                        </a>
                        <div className="search-input">
                          <form id="search" action="#">
                            <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                            <i className="fa fa-search"></i>
                          </form>
                        </div>
                        <ul className="nav">
                          <li className="scroll-to-section"><a href="#top" className="active">Acueil</a></li>
                          <li className="scroll-to-section"><a href="#services">Avantages</a></li>
                          <li className="scroll-to-section"><a href="#services">Services</a></li>
                          <li className="scroll-to-section"><Link to="/login">Se connecter</Link></li>
                          <li className="scroll-to-section"><a href="#contact">Contactez nous</a></li>
                      </ul>   
                        <a className='menu-trigger'>
                            <span>Menu</span>
                        </a>
                    </nav>
                </div>
            </div>
      </div>
    </header>
    </>
  );
} 

export default Header;