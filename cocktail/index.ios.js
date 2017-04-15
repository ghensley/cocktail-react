/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class cocktail extends Component {
  
  constructor(props) {
    var cocktails = require('./cocktails.json');
    var cocktailNames = []
    for (ct in cocktails) {
      console.log(cocktails[ct])
      cocktailNames.push(cocktails[ct].name)
    }
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(cocktails)
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <Text style={styles.item}>
              <Text style={styles.cocktailName}>{rowData.name}</Text>
              {"\n"}-
              <Text style={styles.cocktailDescription}> {rowData.description} </Text>
            </Text>
          }
        />
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
    fontSize: 17,
    textAlign: 'center',
    padding: 10,
  },
  cocktailDescription: {
    fontSize: 12,
    padding: 10
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
