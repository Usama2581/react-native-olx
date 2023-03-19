import { StyleSheet, Text, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header';
import { StatusBar } from 'react-native';

export default function Details({ route }) {
  const { adId } = route.params;


  const [data, setData] = useState({})
  const [loading, setLoading] = useState()

  if (!data) {
    setLoading(true)
  }

  useEffect(() => {
    axios.get(`https://average-crown-ant.cyclic.app/ads/one/${adId}`)
      .then(res => setData(res.data))
      .catch(err => console.log('err', err))
  }, [data])


  let { title, price, description, img, location } = data
  return (
    <>
    <StatusBar barStyle={'default'} />
    <Header />
    {
      loading ? <View style={styles.loadingbox}>
        <ActivityIndicator size='large' color='red' /> 

        </View>
        : 
    <ScrollView style={styles.container} >
      <ScrollView style={styles.container1} >
        <Image source={{ uri: img }}
          style={styles.img}
        ></Image>
        <Text style={styles.title} >{title}</Text>
        <Text style={styles.price} >Rs {price}/=</Text>
        <Text style={styles.location} >{location}</Text>
        <Text style={styles.description} >{description}</Text>
        <Pressable style={styles.contact}>
          <Text style={styles.contacttxt}>Contact seller</Text>
        </Pressable>
      </ScrollView>
    </ScrollView>
    }
    </>
  )
}

const styles = StyleSheet.create({
  loadingbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
  },
  container1: {
    margin: 20
  },
  img: {
    width: '100%',
    height: 300
  },
  title: {
    fontSize: 25,
    fontWeight: '500'
  },
  price: {
    fontSize: 17,
    fontWeight: '900'
  },
  location: {
    fontSize: 15,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    fontWeight: '400'
  },
  contact: {
    backgroundColor: 'crimson',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 15
  },
  contacttxt: {
    color: 'white',
    display: 'flex',
    fontSize: 16
  }
})