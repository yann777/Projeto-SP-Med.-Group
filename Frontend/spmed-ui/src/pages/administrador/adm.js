import React, {Component} from 'react';
import axios from "axios";

import Header from '../../components/header';
import Footer from '../../components/footer';


import '../../assets/css/med.css';


class Adm extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaConsultas : [],
            listaPacientes: [],
            listaMedicos:[],
            listaSituacao:[],
            IdPaciente : 0,
            IdMedico : 0,
            IdSituacao:0,
            dataConsulta : new Date,
            descricao: ''
        }
    };
    buscaPacientes = () => {
          axios("http://localhost:5000/api/pacientes",{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('login')
            }
          })
          .then(resposta => {
            if(resposta.status === 200){
              this.setState({listaPacientes: resposta.data})
              console.log(this.state.listaPacientes)
            }
          })
          .catch(erro => console.log(erro))
    }
    buscaMedicos = () => {
      axios("http://localhost:5000/api/medicos",{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('login')
            }
          })
          .then(resposta => {
            if(resposta.status === 200){
              this.setState({listaMedicos: resposta.data})
              console.log(this.state.listaMedicos)
            }
          })
          .catch(erro => console.log(erro))
    }
    buscaSituacoes =() => {
      axios("http://localhost:5000/api/situacoes",{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('login')
            }
          })
          .then(resposta => {
            if(resposta.status === 200){
              this.setState({listaSituacao: resposta.data})
              console.log(this.state.listaSituacao)
            }
          })
          .catch(erro => console.log(erro))
    }
    buscaConsultas = () => {
        axios("http://localhost:5000/api/Consultas/listartodas", {
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

      cadastarConsulta = (event) => {
        event.preventDefault();
        
        let consulta = {
            idPaciente : this.state.IdPaciente,
            idMedico :this.state.IdMedico,
            descricao : this.state.descricao,
            dataConsulta : new Date(this.state.dataConsulta),
            idSituacao : this.state.IdSituacao
        };
        axios.post("http://localhost:5000/api/Consultas", consulta,{
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('login')
          }
        })
        .then (resposta => {
          if(resposta.status === 201){
            console.log('foi familia')
          }

        })
        .catch(erro => {
          console.log(erro);
        })
        .then(this.buscaConsultas);
      }

      componentDidMount() {
        this.buscaConsultas();
        this.buscaPacientes();
        this.buscaMedicos();
        this.buscaSituacoes();
      }

      atualizaStateCampo = (campo) => {
        this.setState({[campo.target.name]: campo.target.value})
      }
    render(){
        return(
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
                       
                          <div className="box">
                            <tr key={consulta.idConsulta}></tr>
                            <p>Paciente: {consulta.idPacienteNavigation.nomePaciente} </p>
                            <p>Data Nascimento:{new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.idPacienteNavigation.dataNascimento))}</p>
                            <p>Situação: { consulta.idSituacaoNavigation.situacao1}</p>
                            <p>Data Consulta: {new Intl.DateTimeFormat('pt-BR').format(new Date(consulta.dataConsulta))}</p>
                            
                          </div>
                          
                  

                      )
                    })}


                  </div>


                </div>
                
                <section className= "cadastrotipo">
                  
                    
                 
                  <div className="inputtipo">
                  <h2>Cadastrar Consulta</h2>
                    <div className="flx">
                    <form  onSubmit={this.cadastarConsulta}>
                    <div className="formcon">


                    <select
                    className="select"
                    name="IdPaciente"
                    value={this.state.IdPaciente}
                    onChange={this.atualizaStateCampo}
                    >
                      <option value="0">Selecione o Paciente</option>
                    {
                      this.state.listaPacientes.map(paciente => {
                        return(
                          <option key={paciente.IdPaciente} value={paciente.idPaciente}>
                            {paciente.nomePaciente}

                          </option>
                        );
                      })
                    }
                    </select>
                    
                    
                    <select
                    className="select"
                    name="IdMedico"
                    value={this.state.IdMedico}
                    onChange={this.atualizaStateCampo}
                    >
                      <option value="0">Selecione o Médico</option>
                    {
                      this.state.listaMedicos.map(medico => {
                        return(
                          <option key={medico.IdMedico} value={medico.idMedico}>
                            {medico.nomeMedico}

                          </option>
                        );
                      })
                    }
                      
                    </select>
                    <input
                    className="select"
                    required
                    type="text"
                    name='descricao'
                    value={this.state.descricao}
                    onChange={this.atualizaStateCampo}
                    placeholder="Descricao"
                    />
                    <select
                    className="select"
                    name="IdSituacao"
                    value={this.state.IdSituacao}
                    onChange={this.atualizaStateCampo}
                    >
                      <option value="0">Status Consulta</option>
                    {
                      this.state.listaSituacao.map(situacao => {
                        return(
                          <option key={situacao.idSituacao} value={situacao.idSituacao}>
                            {situacao.situacao1}

                          </option>
                        );
                      })
                    }
                    </select>
                    <input
                    className="select"
                    type="date"
                    name="dataConsulta"
                    value={this.state.dataConsulta}
                    onChange={this.atualizaStateCampo}
                    />
                    <button type="submit">Cadastrar</button>
                    </div>
                    </form>
                    </div>
                  </div>
               
                  

                  
                </section>
              </div>
            
          </section>
                <Footer></Footer>
            </div>
            </main>
        )
    }
}
export default Adm;