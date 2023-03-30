import { Link } from 'react-router-dom';
import './Header.css';
import "../index.css";

const Header = () => {
  return(
    <>
      <header class="header-area header-sticky">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav"> 
                        <a href="#top" class="logo">
                            <h1>MyCar</h1>
                        </a>
                        <div class="search-input">
                          <form id="search" action="#">
                            <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" onkeypress="handle" />
                            <i class="fa fa-search"></i>
                          </form>
                        </div>
                        <ul class="nav">
                          <li class="scroll-to-section"><a href="#top" class="active">Acueil</a></li>
                          <li class="scroll-to-section"><a href="#services">Avantages</a></li>
                          <li class="scroll-to-section"><a href="#services">Services</a></li>
                          <li class="scroll-to-section"><Link to="/dashboard">Se connecter</Link></li>
                          <li class="scroll-to-section"><a href="#contact">Contactez nous</a></li>
                      </ul>   
                        <a class='menu-trigger'>
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