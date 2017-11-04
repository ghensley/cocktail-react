'use strict';

import React, { Component } from 'react';
import COLORS from '../constants/COLORS';
import {
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Modal,
  View,
  Button,
} from 'react-native';

export default class PreparationModal extends Component {
  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => {}}
      >
        <View style={modalStyles.content}>
          <View>
            <Text style={modalStyles.name}>
              {this.props.modalData.name}
            </Text>
            <Text style={modalStyles.description}>
              {this.props.modalData.description}
            </Text>
            <View style={modalStyles.ingredients}>
              <ListView
                dataSource={this.props.ingredientSource}
                renderRow={rowData =>
                  <Text style={modalStyles.ingredient}>
                    {rowData.name} - {rowData.amount}
                  </Text>}
              />
            </View>
            <Text style={modalStyles.preparation}>
              {this.props.modalData.preparation}
            </Text>

            <Button
              title="Done"
              onPress={() => {
                this.props.hideModal();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const modalStyles = StyleSheet.create({
  content: {
    marginTop: 22,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
    color: COLORS.light,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
    color: COLORS.light,
  },
  preparation: {
    fontSize: 15,
    padding: 12,
    color: COLORS.light,
  },
  ingredients: {
    height: 80,
    padding: 12,
  },
  ingredient: {
    color: COLORS.light,
  },
});
