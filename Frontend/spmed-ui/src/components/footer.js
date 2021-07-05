import React from 'react';

import logo from '../assets/img/image 3.png';
import insta from '../assets/img/6bd4d4b8a16a7ec07ee9b9df0300a983 1.png';
import face from '../assets/img/logo+label+logo+website+icon-1320166595550437062 1.png';
import ytb from '../assets/img/60005d802c2876c821bdab2bbdb9af2a 1.png';

export default function Footer(){
    return(
        <footer className="rodape">
            <div className="content flex-spbt-center">
              <div className="links-footer">
                <div className="links">
                  <h2>Links Úteis</h2>
                  <ul>
                    <li><a href="#">Regras de Utilização</a></li>
                    <li><a href="#">Suporte</a></li>
                    <li><a href="#">Central de Ajuda</a></li>
                    <li><a href="#">Contato</a></li>
                  </ul>
                </div>
                {/* <div className="links">
                  <h2>Páginas</h2>
                  <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Médico</a></li>
                    <li><a href="#">Paciente</a></li>
                    <li><a href="#">Notícias</a></li>
                    <li><a href="#">Login/Cadastro</a></li>
                  </ul>
                </div> */}
              </div>
              <img className="logo-rodape" src={logo} alt="Logo E-Players" />
              <div className="sociais">
                <h2>Venha fazer parte do nosso grupo!</h2>
                {/* <form action>
                  <input type="email" placeholder="E-mail" />
                  <input type="submit" defaultValue="Cadastrar" />
                </form> */}
                <div className="siga-nos">
                  <h2>Siga-nos em:</h2>
                  <a href="#"><img src={insta} alt="Logo do Instagram" /></a>
                  <a href="#"><img src={face} alt="Logo do Facebook" /></a>
                  <a href="#"><img src={ytb} alt="Logo do Youtube" /></a>
                </div>
              </div>
            </div>
          </footer>
    )
}