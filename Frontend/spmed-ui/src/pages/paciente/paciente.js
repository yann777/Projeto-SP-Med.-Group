import axios from "axios";
import React, { Component } from "react";

import Header from '../../components/header';

import '../../assets/css/med.css';
import logo from '../../assets/img/image 3.png';
import insta from '../../assets/img/6bd4d4b8a16a7ec07ee9b9df0300a983 1.png';
import face from '../../assets/img/logo+label+logo+website+icon-1320166595550437062 1.png';
import ytb from '../../assets/img/60005d802c2876c821bdab2bbdb9af2a 1.png';

function DataFormatada(props) {
    return new Intl.DateTimeFormat('pt-BR', {day: 'numeric', month:'long', year: 'numeric'}).format()
  }

class Pac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        }
    };

    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('login')
            }
        })

    .then(resposta =>{
        if(resposta.status ===200) {
            this.setState({ listaConsultas : resposta.data })
        }
    })
    .catch(erro => console.log(erro));
    }
componentDidMount(){
    this.buscaConsultas();
}

render() {
    return (
      <main>
        <div>
          <Header></Header>
          <section className="corpo">
            <div className="posicao">
              <div className="grid">
                <h1 className="title">Listagem minhas consultas</h1>
                

                  <div className="listagem">
                    {this.state.listaConsultas.map((consulta) => {
                      return (
                        <section className="divisao">
                          <div className="box">
                            <tr key={consulta.idConsulta}></tr>
                            <p>Médico: { consulta.nomeMedico} </p>
                            <p>Idade Paciente:{consulta.idPacienteNavigation.idade}</p>
                            <p>Situação: { consulta.idSituacaoNavigation.Situacao1}</p>
                            <p>Data: {consulta.dataConsulta}</p>
                            
                          </div>
                          <div className="descricao box2">
                              <div className="desc"><p>Descrição: {consulta.descricao}</p></div>
                              
                            </div>
                        </section>

                      )
                    })}


                  </div>


                </div>
              </div>
            
          </section>
          {/* Inicio Footer */}
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
                <div className="links">
                  <h2>Páginas</h2>
                  <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Campeonatos</a></li>
                    <li><a href="#">Resultados</a></li>
                    <li><a href="#">Notícias</a></li>
                    <li><a href="#">Login/Cadastro</a></li>
                  </ul>
                </div>
              </div>
              <img className="logo-rodape" src={logo} alt="Logo E-Players" />
              <div className="sociais">
                <h2>Faça parte do nosso clan, receba notícias e promoções!</h2>
                <form action>
                  <input type="email" placeholder="E-mail" />
                  <input type="submit" defaultValue="Cadastrar" />
                </form>
                <div className="siga-nos">
                  <h2>Siga-nos em:</h2>
                  <a href="#"><img src={insta} alt="Logo do Instagram" /></a>
                  <a href="#"><img src={face} alt="Logo do Facebook" /></a>
                  <a href="#"><img src={ytb} alt="Logo do Youtube" /></a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* <section>
                    <div>
                        <h2>
                            Lista Consultas
                        </h2>
                        {this.state.listaConsultas.map((consulta) => {
                            return(
                                <section>
                                    <div>
                                        <tr key = {consulta.idConsulta}></tr>
                                        <p>{consulta.idConsulta}</p>
                                        <p>{consulta.descricao}</p>
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </section> */}
      </main>
    )
  }
}
export default Pac;