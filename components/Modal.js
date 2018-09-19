import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native'

export default class ModalComponent extends Component {
  render () {
    const { modalVisible, setModalVisible, photoPicker, pdfPicker } = this.props
    return (
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => null}
        visible={modalVisible}
      >
        <View behavior='padding' style={styles.modalShadow}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBottom}
              onPress={() => {
                photoPicker('photo')
              }}
            >
              <Text>Tomar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBottom}
              onPress={() => {
                photoPicker('album')
              }}
            >
              <Text>Buscar en galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBottom}
              onPress={() => {
                pdfPicker()
              }}
            >
              <Text>Buscar en pdf</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBottom}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalShadow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '75%'
  },
  modalBottom: {
    margin: 12
  }
})
