import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import Pdf from 'react-native-pdf'
import ModalComponent from './components/Modal'

export default class App extends React.Component {

  state = {
    image: null,
    pdf: null,
    modalVisible: false
  }

  render() {
    const { image, pdf, modalVisible } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
          <View style={[styles.image, styles.imageContainer]}>

          { image === null && pdf === null && (
            <Text>Seleccciona una foto 📷</Text>
          )}

          { image !== null && pdf === null && (
            <Image resizeMode='stretch' style={styles.image} source={image} />
          )}
          
          { image === null && pdf !== null && (
            <Pdf
              source={pdf}
              onLoadComplete={(numberOfPages, filePath)=>{
                console.log(`file path: ${filePath}`)
                console.log(`number of pages: ${numberOfPages}`)
              }}
              onPageChanged={(page, numberOfPages)=>{
                console.log(`current page: ${page}`)
                console.log(`number of pages page: ${numberOfPages}`)
              }}
              onError={(error)=>{
                console.log(error)
              }}
              style={styles.image}
            />
          )}
          </View>
        </TouchableOpacity>
        <ModalComponent 
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          photoPicker={this.photoPicker}
          pdfPicker={this.pdfPicker}
        />
      </View>
    )
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  pdfPicker = () => {
    this.setModalVisible(!this.state.modalVisible)
    this.setState({ image: null })

    DocumentPicker.show({
      filetype: [DocumentPickerUtil.pdf()],
    },(error,res) => {
      if (error) {
        return
      }

      console.log(res)
      const pdf = { uri: res.uri, cache: true }
      this.setState({ pdf })
    })
  }

  photoPicker = type => {
    this.setModalVisible(!this.state.modalVisible)
    this.setState({ pdf: null })
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
