import { StyleSheet, Text, View, Image, TextInput, StatusBar } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
        <StatusBar barStyle={'default'}/>
    <View style={styles.header}>
      <Image
        source={require('../assets/small.jpg')}
        style={styles.icon1}
      ></Image>
      <Image
        source={require('../assets/car.png')}
      ></Image>
      <Text style={styles.txt}>Motors</Text>
      <Image
        source={require('../assets/property.png')}
      ></Image>
      <Text style={styles.txt} >Property</Text>
    </View>

    <View style={styles.search}>
      <View style={styles.bar}>
        <Image source={require('../assets/search.png')}
          style={styles.icon2}
        ></Image>
        <TextInput placeholder='What you are looking for?' style={styles.input} />
      </View>
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
      },
      img: {
        width: 300,
        height: 300
      },
      olx: {
        fontSize: 40,
        fontWeight: '600',
        color: 'blue'
      },
      header: {
          height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      txt: {
        position: 'relative',
        left: -20
      },
      icon1: {
        width: 80,
        alignSelf: 'flex-end'
      },
      search: {
        width: '100%',
        height: 70,
        backgroundColor: '#D3D3D3',
        display: 'flex',
        justifyContent: 'center',
      },
      bar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        marginLeft: 30,
        marginRight: 30
      },
      icon2: {
        position: 'relative',
        left: -30,
        width: 20
      },
      input: {
        position: 'relative',
        left: -20
      }
    
})