import React, { Component } from 'react';
import {FlatList,Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from "../services/api"

export default class App extends Component {
  constructor(props){
    super(props);
      this.state={
        listaConsultas: [],
        nome: '',
        email: ''
      };
    
  }

  buscarConsultas = async () => {
    const valorToken = await AsyncStorage.getItem('userToken');
    const resposta =  await api.get('/consultas', {
      headers: {
        'Authorization' : 'Bearer ' + valorToken
      }
    });

    const dadosDaApi = resposta.data;
    this.setState({listaConsultas: dadosDaApi});
  };

  buscarDadosStorage = async () => {
    try {
      
      const valorToken = await AsyncStorage.getItem('userToken');
      console.warn( jwtDecode(valorToken) )

      if (valorToken !== null) {
        this.setState({ email : jwtDecode(valorToken).email });
      }

    } catch (error) {
      console.warn(error)
    }
  };

  componentDidMount() {
    this.buscarConsultas();
    this.buscarDadosStorage();
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.textCont}>
        <Text style={styles.txt} >Olá {this.state.email}</Text>
        </View>
        <View style={styles.corpo}>
        <View style={styles.consul}>
          <View style={styles.textList} >
            <Text style={styles.textList}>Lista De Consultas</Text>
          </View>
          <FlatList
          contentContainerStyle={styles.consul}
          data={this.state.listaConsultas}
          keyExtractor= {(item) => item.descricao}
          renderItem={this.renderizaItem}
          />
        </View>
        </View>
      </View>
    );
  }

  renderizaItem =  ({item}) => (
    
    <View style={styles.flatItemLinha}>
      <View style={styles.box}>
        {
          item.idSituacaoNavigation.situacao1 === 'Agendada'?
          <View>
          <Text style={styles.boxsituacaoagenda}>{item.idSituacaoNavigation.situacao1}</Text>
        </View>: ''
        }
        {
          item.idSituacaoNavigation.situacao1 === 'Realizada'?
          <View>
          <Text style={styles.boxsituacaoreal}>{item.idSituacaoNavigation.situacao1}</Text>
        </View>: ''
        }
        {
          item.idSituacaoNavigation.situacao1 === 'Cancelada'?
          <View>
          <Text style={styles.boxsituacaocancel}>{item.idSituacaoNavigation.situacao1}</Text>
        </View>: ''
        }
        <View style={styles.infos}>
        <Text style={{color:"white"}}>Médico: { item.idMedicoNavigation.nomeMedico}</Text>
        <Text style={{color:"white"}}>Paciente: { item.idPacienteNavigation.nomePaciente}</Text>
        <Text style={{color:"white"}}>Descrição: { item.descricao}</Text>
        <Text style={{color:"white"}}>Data: { Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2625E8'
  },
  textCont:{
    alignItems: "center"
  },
  corpo:{
    width:'100%',
    alignItems:"center",
    justifyContent:"center"
  },
  consul:{
    width:"19.5em",
    borderWidth:3,
    borderColor:"#FFF"
  },
  textList:{
    color: "white",
    margin:9,
    alignItems: "center",
  },
  txt:{
    marginTop:30,
    marginBottom:30,
    color:"white"
  },
  flatItemLinha:{
    width:"100%"
    
  },
  
  boxsituacaoreal:{
    display:"flex",
    justifyContent:"center",
    backgroundColor:"green",
    color: "white"
  },
  boxsituacaocancel:{
    display:"flex",
    justifyContent:"center",
    backgroundColor:"red",
    color: "white"
  },
  boxsituacaoagenda:{
    display:"flex",
    justifyContent:"center",
    backgroundColor:"yellow",
    
  },
  box: {
    // backgroundColor:"red",
    marginHorizontal:10,
    marginTop:6,
    marginBottom:6,
    borderWidth: 3,
    borderColor: "#FFF",
    color:"white"
  },
  infos:{
    marginLeft: 5
  },
});
