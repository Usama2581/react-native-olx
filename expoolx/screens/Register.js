import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { register } from '../config/firebase'


export default function Register({ navigation }) {
  const [form, setForm] = useState({})
  const [disableText, setDisableText] = useState(true);


  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e })
  }

  const signup = async () => {
    try {
      await register(form)
      alert("logged in")
      navigation.navigate('LoginPage')
      alert('registered')
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {
          disableText ? <>
            <Image source={require("../assets/olx.jpg")} style={styles.img}></Image>
            <Text style={styles.text}>Register in OLX</Text>
          </>
            :
            <Image source={require("../assets/olx.jpg")} style={styles.olx}></Image>
        }
      </View>
      <View style={styles.form}>
        <View style={styles.box}>
          <TextInput placeholder='Name' keyboardType='default' style={styles.input} onChangeText={(e) => updateForm(e, 'name')} onFocus={() => setDisableText(false)}
            onBlur={() => setDisableText(true)} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Email' keyboardType='email-address' style={styles.input} onChangeText={(e) => updateForm(e, 'email')} onFocus={() => setDisableText(false)}
            onBlur={() => setDisableText(true)} />
        </View>
        <View style={styles.box}>
          <TextInput placeholder='Password' style={styles.input} onChangeText={(e) => updateForm(e, 'password')} secureTextEntry={true} autoCapitalize="none" onFocus={() => setDisableText(false)}
            onBlur={() => setDisableText(true)} />
        </View>
        <TouchableOpacity style={styles.btn1} onPress={signup} >
          <Text style={styles.log}>Register</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.txt}>Already have an Account?</Text>
        </View>
        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.reg}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  img: {
    // flex: 1,
    width: 400,
    height: 250,
    // marginLeft: 40,
    // marginTop: -30,
  },
  text: {
    color: '#002F34',
    fontSize: 20,
    fontWeight: '600',
    position: 'relative',
    top: 5,
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    marginTop: -90
  },
  box: {
    marginLeft: 30,
    marginRight: 30
  },
  input: {
    borderWidth: 2,
    borderColor: '#612182',
    padding: 10,
    marginTop: 30,
    fontSize: 17,
    borderRadius: 10
  },
  btn1: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: 'center'
  },
  btn2: {
    borderWidth: 2,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#A4B300',
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  reg: {
    fontSize: 17,
    color: '#A4B300'
  },
  log: {
    fontSize: 17,
    color: 'white'
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 15,
  },
  txt: {
    fontSize: 15
  },
  olx: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: -30,
  },
})