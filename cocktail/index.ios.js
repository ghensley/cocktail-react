"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Modal,
  View
} from 'react-native';

export default class cocktail extends Component {
  
  constructor(props) {
    var cocktails = require('./cocktails.json');
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(cocktails),
      ingredientSource: ds.cloneWithRows({}),
      modalVisible: false,
      modalData: {},
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            //<TouchableHighlight onPress = {()=> {this.setState({modalData: rowData, modalVisible: true})}} style={styles.item}>
            <TouchableHighlight onPress = {()=> {    
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({modalData: rowData,modalVisible:true,ingredientSource:ds.cloneWithRows(rowData.ingredients)})
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
         <View style={{marginTop: 22}}>
          <View>
            <Text>{this.state.modalData.name}</Text>
            <Text>{this.state.modalData.description}</Text>
            <Text>{this.state.modalData.preperation}</Text>
            <ListView
            dataSource={this.state.ingredientSource}
            renderRow={(rowData) => 
                <Text>{rowData.name} - {rowData.amount}</Text>
            }
            />


            <TouchableHighlight onPress={() => {
              this.setState({modalVisible: false})
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

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
