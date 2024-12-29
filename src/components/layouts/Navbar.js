import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Style.css";

class NavBar extends Component {
    
    render () {
        return (
            <div className="container">
            <nav className="navbar-expand-lg navbar-light bg-light">
              <div id="navbarTogglerDemo02">
                <ul>
                  <li className="nav-item"><Link className="link" to="/">Bill Dashboard</Link></li>
                  <li className="nav-item"><Link className="link" to="/add">Add a Bill</Link></li>
                  <li className="nav-item"><Link className="link" to="/chart">Billing Cycle</Link></li>
                </ul>
              </div>
            </nav>
            </div>  
        );
    }  
}

export default NavBar;