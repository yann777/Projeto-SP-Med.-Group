import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Listagem from './consultas';
import Perfil from './perfil';

const bottomTab = createBottomTabNavigator();

export default class Main extends Component{

  render(){
    return (
      <View style={styles.main}>
        <bottomTab.Navigator
        initialRouteName = 'Listagem'
        tabBarOptions = {{
            showLabel : false,
            showIcon : true,
            activeBackgroundColor : '#3683FF',
            inactiveBackgroundColor : '#FFF',
            activeTintColor : '#FFF',
            inactiveTintColor : '#FFF',
            
            style : { height : 70 }
        }}
        screenOptions = { ({ route }) => ({
            tabBarIcon : () => {
            if (route.name === 'Perfil') {
                return(
                <Image 
                    source={require('../../assets/img/perfil.png')}
                    style={styles.tabBarIcon}
                />
                )
            }
            if(route.name === 'Listagem'){
              return(
                <Image
                  source={require('../../assets/img/consultas.png')}
                  style={styles.tabBarIcon}
                />
              )
            }

            
            }
        }) }
        >
        <bottomTab.Screen name='Listagem' component={Listagem} />
        <bottomTab.Screen name='Perfil' component={Perfil} />
        </bottomTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },

  tabBarIcon : {
    width : 36,
    height : 36
  }
  
});