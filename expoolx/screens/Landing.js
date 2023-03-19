import { StyleSheet, Button ,Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'


export default function Landing ({ navigation }) {
    
    

    return (
        <View style={styles.container}>
          <Image
          source={require('../assets/logo.jpg')}
          style={styles.img}></Image>
          <Text style={styles.heading}>WELCOME TO OLX</Text>
          <Text style={styles.txt}>The trusted community of buyers and sellers</Text>
          
        <View style={styles.btn}>

            <TouchableOpacity style={styles.box1}>
                <Image source={require('../assets/fb.png')}
                    style={styles.icon1}
                ></Image>
                <Text style={styles.txt1}>Sign in with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box2}>
                <Image source={require('../assets/google.png')}
                    style={styles.icon2}
                 ></Image>
                 <Text style={styles.txt2}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box2} 
            onPress={() => navigation.navigate('Login')}>
                <Image source={require('../assets/email.png')}
                    style={styles.icon3}
                ></Image>
                <Text style={styles.txt3}>Login via OLX</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        flex: 1
    },
    img: {
        // flex: 1,
        width: 400,
        height: 150,
        marginLeft: 40,
        marginTop: 140,
        marginBottom: 30
    },
    btn: {
        flex: 3,
        display: 'flex',
        marginTop: 50,
        backgroundColor: 'white',
    },
    box1: {
        width: 300,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 50
    },
    box2: {
        backgroundColor: 'white',
        height: 50,
        marginBottom: 20,
        width: 300,
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    icon1: {
        width: 40,
        height: 40
    },
    icon2: {
        width: 40,
        height: 40,
        position: 'relative',
        left: -10
    },
    icon3: {
        width: 40,
        height: 40,
        position: 'relative',
        left: -25
    },
    txt1: {
        position: 'relative',
        left: 20,
        fontSize: 16
    },
    txt2: {
        position: 'relative',
        left: 14,
        fontSize: 16
    },
    txt3: {
        position: 'relative',
        left: 0,
        fontSize: 16
    },
    heading: {
        fontWeight: '600',
        fontSize: 20,
    },
    txt: {
        fontSize: 16,
        marginTop: 10
    }
})