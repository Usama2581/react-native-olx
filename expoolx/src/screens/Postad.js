import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default function Postad({ navigation }) {



  let [adsDetails, setAdsDetails] = useState({});
  const [image, setImage] = useState(null);
  const [showPostBtn, setShowPostBtn] = useState(false);
  const [disableText, setDisableText] = useState(true);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("result", result);
    let picture
    if (!result.cancelled) {
      picture = result.uri;
    }


    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", picture, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/Image1${Math.random()}`);

    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        // setUploading(true)
        console.log("");
      },
      (error) => {
        // setUploading(false)
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          // setUploading(false)
          console.log("Download URL: ", url);
          setAdsDetails({ ...adsDetails, ["img"]: url });
          blob.close();
          return url;
        });
      }
    );
  };

  // console.log("img", image);

  const updateForm = (e, key) => {
    setAdsDetails({ ...adsDetails, [key]: e });
  };
  // console.log(adsDetails);



  const submit = async () => {

    if (
      !adsDetails.title ||
      !adsDetails.description ||
      !adsDetails.price ||
      !adsDetails.location ||
      !adsDetails.img
    ) {
      alert("all fields are required");
    } else {
      axios
        .post("https://average-crown-ant.cyclic.app/ads/insert", adsDetails)
        .then((res) => done(res))
        .catch((err) => console.log("err", err));
      // alert('posted')
    }
  }

  useEffect(() => {
    console.log(adsDetails)
    if (adsDetails.img) {
      setShowPostBtn(true);
    }
  }, [adsDetails])

  const done = () => {
    alert("posted");
    console.log(res);
    setAdsDetails("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {
          disableText ? <>
            <Image source={require("../../assets/olx.jpg")} style={styles.img}></Image>
            <Text style={styles.text}>SELL ON OLX</Text>
          </>
            :
            <Image source={require("../../assets/olx.jpg")} style={styles.olx}></Image>
        }
      </View>
      <ScrollView style={styles.adsDetails}>
        <KeyboardAvoidingView>
          <View style={styles.box}>
            <TextInput
              placeholder="Title"
              style={styles.input}
              onChangeText={(e) => updateForm(e, "title")}
              onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}
            />
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Price"
              style={styles.input}
              onChangeText={(e) => updateForm(e, "price")}
              keyboardType="number-pad"
              keyboardAppearance="dark"
              onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}
            />
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Description"
              style={styles.input}
              onChangeText={(e) => updateForm(e, "description")}
              onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}
            />
          </View>
          <View style={styles.box}>
            <TextInput
              placeholder="Location"
              style={styles.input}
              onChangeText={(e) => updateForm(e, "location")}
              onFocus={() => setDisableText(false)}
              onBlur={() => setDisableText(true)}
            />
          </View>
          <TouchableOpacity style={styles.btn1} onPress={pickImage}>
            <Text style={styles.log}>Select image</Text>
          </TouchableOpacity>
          {showPostBtn ? (
            <TouchableOpacity style={styles.btn2} onPress={submit}>
              <Text style={styles.log}>Post</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btn3}>
              <Text style={styles.log}>Post</Text>
            </View>
          )}
          <Text style={styles.hello}>hello</Text>
          {/* <Text>hello</Text> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: "white",
  },
  img: {
    // flex: 1,
    width: 400,
    height: 250,
    position: "relative",
    top: -40,
    left: 5,
  },
  text: {
    color: "#002F34",
    fontSize: 20,
    fontWeight: "600",
    position: "relative",
    top: -40,
  },
  head: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  adsDetails: {
    flex: 4,
    marginTop: -120,
  },
  box: {
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: "#641C87",
    padding: 10,
    marginTop: 30,
    fontSize: 17,
    borderRadius: 10,
  },
  btn1: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 30,
    height: 50,
    justifyContent: "center",
    // borderColor: '#002F34',
    backgroundColor: "#FE7800",
    // borderWidth: 2,
    alignItems: "center",
    borderRadius: 10,
  },
  btn2: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    // marginTop: 30,
    marginBottom: 30,
    height: 50,
    justifyContent: "center",
    // borderColor: '#002F34',
    backgroundColor: "#AABA00",
    // borderWidth: 2,
    alignItems: "center",
    borderRadius: 10,
  },
  btn3: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    // marginTop: 30,
    marginBottom: 30,
    height: 50,
    justifyContent: "center",
    // borderColor: '#002F34',
    backgroundColor: "rgba(170, 186, 0, 0.3)",
    // backgroundColor: "",
    // borderWidth: 2,
    alignItems: "center",
    borderRadius: 10,
  },
  log: {
    fontSize: 17,
    color: "white",
  },
  img1: {
    width: 200,
    height: 200,
  },
  olx: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  hello: {
    color: "white",
  }
});
