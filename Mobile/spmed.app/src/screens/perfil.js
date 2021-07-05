import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import  api from '../services/api';

export default class Perfil extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      nome : '',
      descricao : '',
      idTema: 0
  };
}

render () {
    return(
        <Text>PERFIL</Text>
    )
}
}