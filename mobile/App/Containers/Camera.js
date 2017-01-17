import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Button } from 'react-native';
import { Images } from '../Themes';
import styles from './Styles/PresentationScreenStyle';
import ImagePicker from 'react-native-image-picker';
import URL from '../config/URL';

class Camera extends Component {

  selectPhoto() {
    const options = {
      takePhotoButtonTitle: 'Capture Image',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        path: 'Photos'
      }
    };

    ImagePicker.showImagePicker(options, (response)=> {

      if (response.didCancel) {
        console.log('Cancel');
      }
      else if (response.error) {
        console.log('Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const splitter = response.uri.split('/');
        const name = (splitter.length) ? splitter[splitter.length -1] : null;
        console.log(name);
        const file = {
          uri: response.uri,
          type:'image/jpeg',
          name: name,
        };
        const body = new FormData();

        body.append('image', file);
        fetch(URL.photos, {
          method: 'POST',
          body: body, 
        })
        .then((res) => {
          console.log(res);
        });

      }
    });
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} >
              Take Photo
            </Text>
            <Button 
            onPress = {this.selectPhoto.bind(this)}
            title ='Capture or Upload Image'
            color = "#841584"
          />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Camera;
