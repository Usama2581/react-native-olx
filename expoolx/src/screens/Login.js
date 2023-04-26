import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { login } from '../config/firebase'


export default function Login({ navigation }) {
  const [form, setForm] = useState({})
  const [disableText, setDisableText] = useState(true);


  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e })
  }

  const signin = async () => {
    try {
      let { email, password } = form
      await login(email, password)
      // alert("logged in")
      navigation.navigate('Home')
    } catch (e) {
      alert(e.message)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.head}>
      {
          disableText ? <>
          <Image source={require("../../assets/olx.jpg")} style={styles.img}></Image>
          <Text style={styles.text}>Welcome to OLX</Text>
          </>
          : 
          <Image source={require("../../assets/olx.jpg")} style={styles.olx}></Image>
        }
      </View>
      <View style={styles.form}>

        <View style={styles.box}>
          <KeyboardAvoidingView>
            <TextInput placeholder='Email' keyboardType='email-address' style={styles.input} onChangeText={(e) => updateForm(e, 'email')}  onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}/>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.box}>

          <TextInput placeholder='Password' style={styles.input} onChangeText={(e) => updateForm(e, 'password')} secureTextEntry={true} autoCapitalize="none"  onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}/>
        </View>
        <TouchableOpacity style={styles.btn1} onPress={signin} >
          <Text style={styles.log}>Login</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.txt}>Don't have an account?</Text>
        </View>
        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.reg}>Register</Text>
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
    // marginTop: 50,
  },
  text: {
    color: '#002F34',
    fontSize: 20,
    fontWeight: '600',
    position: 'relative',
    top: 10,
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    flex: 1,
    marginTop: -70
  },
  box: {
    marginLeft: 30,
    marginRight: 30
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#612182',
    padding: 10,
    marginTop: 30,
    fontSize: 17
  },
  btn1: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    // borderColor: '#002F34',
    backgroundColor: 'orange',
    // borderWidth: 2,
    alignItems: 'center',
    borderRadius: 10,
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
    color: '#A4B300',
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
    top: -20,
  },
})