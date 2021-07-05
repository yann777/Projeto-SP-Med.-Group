import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';


import './index.css';

import App from './pages/login/App';
import Pac from './pages/paciente/paciente';
import Adm from './pages/administrador/adm';
import Med from './pages/medico/med';

import reportWebVitals from './reportWebVitals';

const PermissaoPac = ({component : Component}) => (
  <Route
    render = {props =>
    // Verifica se o usuario esta logado e se é Paciente
    usuarioAutenticado() && parseJwt().role === "3" ?
    // Se sim, renderiza de acordo com a rota solicitada e permitida
    <Component {...props} /> :
    // Se não, redireciona para a pagina login
    <Redirect to = 'login' />
    }
  />
)

const PermissaoAdm = ({component : Component}) => (
  <Route
    render = {props =>
    // Verifica se o usuario esta logado e se é Adm
    usuarioAutenticado() && parseJwt().role === "1" ?
    // Se sim, renderiza de acordo com a rota solicitada e permitida
    <Component {...props} /> :
    // Se não, redireciona para a pagina login
    <Redirect to = 'login' />
    }
  />
)
const PermissaoMed = ({component : Component}) => (
  <Route
    render = {props =>
    // Verifica se o usuario esta logado e se é Adm
    usuarioAutenticado() && parseJwt().role === "2" ?
    // Se sim, renderiza de acordo com a rota solicitada e permitida
    <Component {...props} /> :
    // Se não, redireciona para a pagina login
    <Redirect to = 'login' />
    }
  />
)
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} /> {/* Home */}
        <PermissaoPac path = "/paciente" component={Pac} />
        <PermissaoAdm path = "/adm" component={Adm} />
        <PermissaoMed path = "/med" component={Med} />
        



 
        <Redirect to = "/notfound"/> {/* Redireciona para NotFound caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
