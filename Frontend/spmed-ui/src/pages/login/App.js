import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {parseJwt , usuarioAutenticado} from "../../services/auth";

import '../../assets/css/login.css';

 import logo from '../../assets/img/image 3.png';


class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        email : '',
        senha : '',
        erroMensagem : '',
        isLoading : false
      }
    };
efetuaLogin =(event) => {
  // Ignora o comportamento padrao do navegador (recarregar)

  event.preventDefault();

  this.setState ({ erroMensagem: '', isLoading: true })

  // Define a url e o corpo da requisição
  axios.post("http://localhost:5000/api/login", {
    email : this.state.email,
    senha : this.state.senha
  })
  
  // Verifica o retorno da requisição
  .then(resposta =>{
    // Caso o status code seja 200, 
    if (resposta.status === 200){
      // salva o valor do token no localStorage
      localStorage.setItem('login', resposta.data.token)

      console.log(resposta.data.token)

      this.setState({ isLoading: false})

      // // define a var base64 que vai receber o payload do token
      // let base64 = localStorage.getItem('login').split('.')[1];

      // // Exibe no console o vakor decodificado de base64 paara string
      // console.log(window.atob(base64));

      // // Exibe no console o valor convertido de string para json
      // console.log(JSON.parse(window.atob(base64)))

      // // Exibe no console apenas o valor do tipo de usuariovconvertido de string para json
     // console.log(JSON.parse(window.atob(base64)).role)

     console.log(parseJwt());

     // Se for um paciente, redireciona para a pagina de paciente
    //  if(parseJwt().role === "3"){
    //    this.props.history.push('/paciente')
    //  }
    switch (parseJwt().role) {
      case "1" :
        this.props.history.push('/adm')
        break;
      case "2" :
        this.props.history.push('/med')
        break;
      case "3" :
        this.props.history.push('/paciente')
        break;
    
      default:
        break;
    }
    }
  })

  // Caso haja o erro,
  .catch(() => {
    // define o valor do state erroMensagem com uma mensagem personalizada e define que a requisição acabou
    this.setState({ erroMensagem : "email ou senha invalidos, tente novamente", isLoading : false})
  })

}

//função generica que atualiza o state de acordo com o input
// pode ser reutilizado em varios inputs diferentes
atualizaCampo =( campo ) => {
  this.setState({ [campo.target.name] : campo.target.value})
}

  render(){
    return(
    <div>
    <main>
        <section className="container-login flex">
            <div className="img__login"></div>

            <div className="item__login">
                <div className="row">
                    <div className="item">
                        <Link to="/"><img src={logo} className="icone__login" alt="logo da Gufi" /></Link>
                    </div>
                    <div className="item" id="item__title">
                        <p className="text__login" id="item__description">Bem-vindo(a)! Faça login para acessar sua conta.</p>
                    </div>

                    {/* Faz a chamada para a função de login quando o botão é pressionado */}
                    <form onSubmit={this.efetuaLogin}>
                        <div className="item">
                            <input
                                id="login__email"
                                className="input__login"
                                // E-mail
                                type="text"
                                name="email"
                                // Define que o input email recebe o valor do state email
                                value={this.state.email}
                                // Faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                                onChange={this.atualizaCampo}
                                placeholder="username"
                            />
                        </div>

                        <div className="item">
                            <input 
                                id="login__password"
                                className="input__login"
                                // Senha
                                type="password"
                                name="senha"
                                // Define que o input senha recebe o valor do state senha
                                value={this.state.senha}
                                // Faz a chamada para a função que atualiza o state, conforme
                                // o usuário altera o valor do input
                                onChange={this.atualizaCampo}
                                placeholder="password"
                            />
                        </div>

                        {/* Exibe a mensagem de erro ao tentar logar com credenciais inválidas */}
                        <p style={{ color : 'red', textAlign : 'center' }}>{this.state.erroMensagem}</p>

                        {/* 
                            Verifica se a requisição está em andamento
                            Se estiver, desabilita o click do botão
                        */}

                        {
                            // Caso seja true, renderiza o botão desabilitado com o texto 'Loading...'
                            this.state.isLoading === true &&
                            <div className="item">
                                <button className="btn btn__login" id="btn__login" type="submit" disabled>Loading...</button>
                            </div>
                        }

                        {
                            // Caso seja false, renderiza o botão habilitado com o texto 'Login'
                            this.state.isLoading === false &&
                            <div className="item">
                                <button
                                    className="btn btn__login" id="btn__login"
                                    type="submit"
                                    disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}>
                                    Login
                                </button>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </section>
    </main>
</div>

    )}
};

export default App;
