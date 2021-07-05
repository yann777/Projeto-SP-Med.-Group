import React, {Component} from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : ''
        }
    }

    realizarLogin = async () => {
        console.warn(this.state.email + ' ' + this.state.senha);

        try {
            
            const resposta = await api.post('/login', {
                email : this.state.email,
                senha : this.state.senha,
            });
    
            const token = resposta.data.token;
            
            console.warn(token);
            
            await AsyncStorage.setItem('userToken', token);
            
            this.props.navigation.navigate('Main');

        } catch (error) {
            console.warn(error)
        }
    };

    render(){
        return (
            <ImageBackground
                //source={require('../../assets/img/login.png')}
                style={StyleSheet.absoluteFillObject}
            >
                <View style={styles.overlay} />
                <View style={styles.main}>
                <View style={styles.borda}>
                    <Image 
                        source={require('../../assets/img/logo.png')}
                        style={styles.mainImgLogin}
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder="EMAIL"
                        placeholderTextColor="#FFF"
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput 
                        style={styles.inputLogin}
                        placeholder="SENHA"
                        placeholderTextColor="#FFF"
                        secureTextEntry={true}

                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.realizarLogin}
                    >
                        <Text style={styles.btnLoginText}>login</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#2625E8'
    },

    // conteúdo da main
    main: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
     
    },

    borda:{
        width: 333,
        height: 477,
  //      backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    mainImgLogin: {
        
        height: 150,
        width: 140,
        margin: 60,
        marginTop: 0
    },

    inputLogin: {
        width: 240,
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 18,
        color: '#FFF',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        fontFamily: 'Arial',
        fontSize: 14,
        letterSpacing: 2,
        textDecorationLine: 'none'
    },

    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 240,
        backgroundColor: '#FFF',
        
       
        borderRadius: 4,
        
        marginTop: 20
    },

    btnLoginText: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: '#2625E8',
        letterSpacing: 2,
        textTransform: 'uppercase'
    }
  
});