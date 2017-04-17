"use strict";

import React, { Component } from 'react';
import { createStore } from 'redux'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Modal,
  View,
  Button
} from 'react-native';

export default class cocktail extends Component {

  onHand(state = [], action) {
    state = state
    switch (action.type) {
      case 'ADD':
        state.push(action.ingredient)
        return state;
      case 'REMOVE':
        var index = state.indexOf(action.ingredient);
        if (index > -1) {
          state.splice(index, 1)
        }
        return state
      default:
        return state
    }
  }
  
  constructor(props) {
    super(props);
    var cocktails = require('./cocktails.json');
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(cocktails),
      ingredientSource: ds.cloneWithRows({}),
      modalVisible: false,
      modalData: {},
      store: createStore(this.onHand)
    };
    this.state.store.subscribe(() =>
      console.log(this.state.store.getState())
    )
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <TouchableHighlight onPress = {()=> {    
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({modalData: rowData,modalVisible:true,ingredientSource:ds.cloneWithRows(rowData.ingredients)})
                this.state.store.dispatch({ type: 'ADD', ingredient: 'Butter' })
              }}
              style={styles.item}>
              <View>
                <Text style={styles.cocktailName}>{rowData.name}</Text>
                <Text style={styles.cocktailDescription}>{"\n"}-{rowData.description} </Text>
              </View>
            </TouchableHighlight>
          }
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={modalStyles.content}>
          <View>
            <Text style={modalStyles.name}>{this.state.modalData.name}</Text>
            <Text style={modalStyles.description}>{this.state.modalData.description}</Text>
            <View style = {modalStyles.ingredients}>
              <ListView
                dataSource={this.state.ingredientSource}
                renderRow={(rowData) => 
                    <Text>{rowData.name} - {rowData.amount}</Text>
                }
              />
            </View>
            <Text style={modalStyles.preperation}>{this.state.modalData.preperation}</Text>


            <Button title="Done" onPress={() => {
              this.setState({modalVisible: false})}
            }/>

          </View>
         </View>
        </Modal>
      </View>
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
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  preperation: {
    fontSize: 15,
    padding: 12
  },
  ingredients: {
    height: 80,
    padding: 12
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cocktailName: {
    fontSize: 16,
    textAlign: 'center',
    padding: 2,
  },
  cocktailDescription: {
    fontSize: 12,
    padding: 2
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: '#CCC',
    margin: 2,
    padding: 5,
    width: 110,
    height: 100
  }
});

AppRegistry.registerComponent('cocktail', () => cocktail);
