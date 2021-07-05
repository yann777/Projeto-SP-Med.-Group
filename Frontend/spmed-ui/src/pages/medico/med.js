import React, { Component, useState } from 'react';
import axios from "axios"

import Header from '../../components/header';


import '../../assets/css/med.css';

import Footer from '../../components/footer';

class Med extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      idConsultaAlterada : 0,
      descricao:''
    }
  };
  buscaConsultas = () => {
    axios("http://localhost:5000/api/Consultas", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('login')
      }
    })
      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ listaConsultas: resposta.data })
        }
      })
      .catch(erro => console.log(erro));
  }
  componentDidMount() {
    this.buscaConsultas();
  }

  // Recebe uma consulta da lista
buscarConsultaPorId = (consulta)=> {
    this.setState({
      // Atualiza o state id ConsultaAlterada com o valor do id da consulta recebida
      idConsultaAlterada : consulta.idConsulta,
      descricao : consulta.descricao
      
    }, ()=> {
      console.log(
        'A consulta ' + consulta.idConsulta + 'foi selecionada',
        'agora o valor do state idConsultaAlterada é: ' + this.state.idConsultaAlterada,
        'e o valor do state descricao é: '+ this.state.descricao
      )
    })
}
atualizaCampo = async(event) => {
  await this.setState({ descricao : event.target.value})
  console.log(this.state.descricao)
};

editaDesc = (event) => {
    event.preventDefault();

    axios.patch("http://localhost:5000/api/Consultas/descricao/"+ this.state.idConsultaAlterada, {
    
       descricao : this.state.descricao
      
    }, 
    {
      headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('login')
    }})
    .then(resposta => {
      if(resposta.status ===204){
        console.log(
        'Consulta ' + this.state.idConsultaAlterada + 'atualizada!',
        'Sua nova descrição agora é: ' + this.state.descricao
         ) }
    })
    .then(this.buscaConsultas)
}
  render() {
    return (
      <main>
        <div>
          <Header></Header>
          <section className="corpo">
            <div className="posicao">
              <div className="grid">
                <h1 className="title">Listagem consultas médico</h1>
                

                  <div className="listagem">
                    {this.state.listaConsultas.map((consulta) => {
                      return (
                        <section className="divisao">
                          <div className="box">
                            <tr key={consulta.idConsulta}></tr>
                            <p>Paciente: {consulta.idPacienteNavigation.nomePaciente} </p>
                            <p>Data Nascimento:{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.idPacienteNavigation.dataNascimento))}</p>
                            <p>Situação: { consulta.idSituacaoNavigation.situacao1}</p>
                            <p>Data Consulta: {new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))}</p>
                            
                          </div>
                          <div className="descricao box2">
                              <div className="desc"><p>Descrição: {consulta.descricao}</p></div>
                              <section className="alterar">
                                <div className="alterar">
                                  <form onSubmit={this.editaDesc}>
                                  
                                  
                                  {/* Faz a chamada da função buscarConsultaPorId passando o Consulta selecionada */}
                                  <button onClick={() => this.buscarConsultaPorId(consulta)} className="btnalt">Alterar</button>
                                  <input
                                    type="text"
                                    value={this.state.descricao}
                                    onChange={this.atualizaCampo}
                                    className="input"
                                    placeholder = "Descrição consulta"
                                  />
                                  <button className="conf"type="submit" >Confirmar</button>
                                  </form>
                                </div>
                              </section>
                            </div>
                        </section>

                      )
                    })}


                  </div>


                </div>
              </div>
            
          </section>
          
          <Footer></Footer>
        </div>

       
      </main>
    )
  }
}
export default Med;