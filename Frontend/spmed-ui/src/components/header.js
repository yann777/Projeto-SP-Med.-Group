import React from "react";

import logo from '../assets/img/image 3.png';
import perfil from '../assets/img/image 6.png';

export default function Header(){
    return(
        <div>
        <header className="topo">
        <div className="container">
            <div className="menu_topo2">
                <a href="/"><img className="imglogo" src={logo} /></a>
            </div>
            <nav className="menu_topo">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Minhas consultas</a></li>
                    <a href="#"><img className="imgperfil" src={perfil} /></a>
                </ul>
                <nav>
                </nav></nav></div>
    </header>
    <div></div> 
    </div>
    )
}
