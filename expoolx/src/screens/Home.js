import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'


export default function Home({ navigation }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState()


  useEffect(() => {
    if (!data) {
      setLoading(true)
    }
    
    axios.get('https://average-crown-ant.cyclic.app/ads/')
      .then(res => setData(res.data))
      .catch(err => console.log('err', err))
  }, [data])


  const renderItem = ({ item }) => {

    return (
      <View style={styles.ad_box}>
        <TouchableOpacity style={styles.ad} onPress={() => navigation.navigate('Details', item)} >
          <View style={styles.image_box}>
            <Image source={{ uri: item.img }} style={styles.image} />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>Rs.{item.price} </Text>
            <Text style={styles.location}>{item.location} </Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }


  return (

    <View style={styles.container}>
      <Header />
      {
        loading ? <View style={styles.loadingbox}>
          <ActivityIndicator size='large' color='red' />

        </View>
          :

          <FlatList
            data={data}
            // horizontal={true}
            renderItem={renderItem}
            numColumns='2'
            ListEmptyComponent={
              <View style={{ width: '100%', height: 750, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={'crimson'} />
              </View>
            }
          />




        // {/* <View style={styles.ads}>

        //   {
        //     data.map(item => {
        //       return <TouchableOpacity style={styles.ad}
        //         onPress={() => navigation.navigate('Detail', { adId: item._id })} >
        //         <Image source={{ uri: item.img }} style={styles.image}></Image>
        //         <Text style={styles.title} >{item.title}</Text>
        //         <Text style={styles.price}>Rs {item.price}/=</Text>
        //         <Text style={styles.location}  >{item.location}</Text>
        //       </TouchableOpacity>
        //     })
        //   }

        // </View> */}

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
  title: {
    fontSize: 14,
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
    fontSize: 13,
    fontWeight: '400',
    color: '#617B81'
  },
  ad: {
    width: '90%',
    // flex: 1,
    backgroundColor: 'white',
    margin: '5%',
    elevation: 8,
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom: 5,
    height: 200
  },
  image_box: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ad_box: {
    flex: 1,
    // borderWidth: 2
  },

})