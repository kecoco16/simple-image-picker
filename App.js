import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import ModalComponent from './components/Modal'

export default class App extends React.Component {

  state = {
    image: null,
    modalVisible: false
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
          <View style={[styles.image, styles.imageContainer]}>
          { this.state.image === null ? <Text>Seleccciona una foto 📷</Text> :
            <Image resizeMode='stretch' style={styles.image} source={this.state.image} />
          }
          </View>
        </TouchableOpacity>
        <ModalComponent 
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          photoPicker={this.selectPhotoTapped}
          pdfPicker={''}
        />
      </View>
    )
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  selectPhotoTapped = type => {
    this.setModalVisible(!this.state.modalVisible)

    const options = {
      quality: 1.0,
      maxWidth: 800,
      maxHeight: 800,
      storageOptions: {
        skipBackup: true
      },
      title: 'Elegir foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar foto',
      chooseFromLibraryButtonTitle: 'Abrir galeria'
    }

    const selectType = type === 'photo' ? 'launchCamera' : 'launchImageLibrary'

    ImagePicker[selectType](options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        const image = { uri: response.uri }

        this.setState({ image })
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    borderStyle: 'dashed',
    borderColor: '#9B9B9B',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    borderRadius: 5,
    height: 285,
    width: 220
  }
})
