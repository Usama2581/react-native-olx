import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'


export default function Home({ navigation }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState()

  useEffect(() => {
    if(!data) {
      setLoading(true)
    }
    axios.get('https://average-crown-ant.cyclic.app/ads/')
      .then(res => setData(res.data))
      .catch(err => console.log('err', err))
  }, [data])

  // console.log(data)
  return (

    <View style={styles.container}>
      <Header />
      {
        loading ? <View style={styles.loadingbox}>
        <ActivityIndicator size='large' color='red' /> 

        </View>
        : 

      <ScrollView>
        <View style={styles.ads}>

          {
            data.map(item => {
              return <TouchableOpacity style={styles.cont}
                onPress={() => navigation.navigate('Detail', { adId: item._id })} >
                <Image source={{ uri: item.img }} style={styles.image} ></Image>
                <Text style={styles.title} >{item.title}</Text>
                <Text style={styles.price}>Rs {item.price}/=</Text>
                <Text style={styles.location}  >{item.location}</Text>
              </TouchableOpacity>
            })
          }

        </View>
      </ScrollView> 
      }


    </View>
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
    backgroundColor: '#fff'
  },
  image: {
    // borderRadius: 20,
    width: 340,
    height: 230,
    position: 'relative',
    top: -10,
    left: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  ads: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cont: {
    borderRadius: 20,
    width: 340,
    height: 330,
    padding: 10,
    marginTop: 20,
    backgroundColor: "white",
    elevation: 8,
    // shadow color
    shadowColor: "grey",
    //iOS
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.16,
    position: 'relative'
  },
  title: {
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'left',
    color: '#212F34'
  },
  price: {
    fontSize: 17,
    fontWeight: '900',
    color: '#002F34',
  },
  location: {
    fontSize: 15,
    fontWeight: '400',
    color: '#617B81'
  }

})