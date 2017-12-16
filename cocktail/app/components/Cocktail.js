'use strict';

import React, { Component } from 'react';
import PreparationModal from './PreparationModal';
import COLORS from '../constants/COLORS';

import {
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Modal,
  View,
  Button,
  AsyncStorage
} from 'react-native';

export default class Cocktail extends Component {
  constructor(props) {
    super(props);
    var cocktails = require('../../cocktails.json');
    var ingredients = require('../../ingredients.json');
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ingredients: ingredients,
      cocktailSource: ds.cloneWithRows(cocktails),
      ingredientSource: ds.cloneWithRows({}),
      onHandSource: ds.cloneWithRows(ingredients),
      modalVisible: false,
      modalData: {},
      onHandShown: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('@Cocktail:onHand')
    .then(ingredients => {
      if (ingredients) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState({
          ingredients: JSON.parse(ingredients),
          onHandSource: ds.cloneWithRows(JSON.parse(ingredients))
        });
      }
    }).catch (error => {
      console.log("couldn't retrieve")
    });
  }

  canMake(cocktail) {
    for (var i = 0; i < cocktail.ingredients.length; i++) {
      for (var j = 0; j < this.state.ingredients.length; j++) {
        if (
          cocktail.ingredients[i].name === this.state.ingredients[j].name &&
          this.state.ingredients[j].have === false
        ) {
          return false;
        }
      }
    }
    return true
  }

  toggleOnHand(ingredient) {
    var ingredients = this.state.ingredients;
    var index = ingredients.findIndex(x => x.name == ingredient.name);
    console.log(ingredients[1].have)
    console.log(index);
    if (ingredients[index].have === true) {
      ingredients[index].have = false;
    } else {
      ingredients[index].have = true;
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({
      ingredients,
      onHandSource: ds.cloneWithRows(ingredients),
    })
    AsyncStorage.setItem('@Cocktail:onHand', JSON.stringify(ingredients))
  }

  render() {
    return this.state.onHandShown
      ? <View style={styles.container}>
          <Button
            title="Back"
            onPress={() => {
              this.setState({ onHandShown: false });
            }}
          />
          <ListView
            initialListSize={30}
            contentContainerStyle={styles.ingredientList}
            dataSource={this.state.onHandSource}
            renderRow={rowData => {
              return rowData.have
                ? <TouchableHighlight
                    style={styles.have}
                    onPress={() => {
                      this.toggleOnHand(rowData);
                    }}
                  >
                    <View style={styles.center}>
                      <Text style={styles.text}>
                        {rowData.name}
                      </Text>
                    </View>
                  </TouchableHighlight>
                : <TouchableHighlight
                    style={styles.missing}
                    onPress={() => {
                      this.toggleOnHand(rowData);
                    }}
                  >
                    <View style={styles.center}>
                      <Text style={styles.text}>
                        {rowData.name}
                      </Text>
                    </View>
                  </TouchableHighlight>;
            }}
          />
        </View>
      : <View style={styles.container}>
          <Button
            title="Show On Hand"
            onPress={() => {
              this.setState({ onHandShown: true });
            }}
          />
          <ListView
            initialListSize={30}
            contentContainerStyle={styles.list}
            dataSource={this.state.cocktailSource}
            renderRow={rowData => {
              return this.canMake(rowData)
                ? <TouchableHighlight
                    onPress={() => {
                      const ds = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2,
                      });
                      this.setState({
                        modalData: rowData,
                        modalVisible: true,
                        ingredientSource: ds.cloneWithRows(rowData.ingredients),
                      });
                    }}
                    style={styles.item}
                  >
                    <View>
                      <Text style={styles.cocktailName}>
                        {rowData.name}
                      </Text>
                      <Text style={styles.cocktailDescription}>
                        {'\n'}-{rowData.description}{' '}
                      </Text>
                    </View>
                  </TouchableHighlight>
                : null;
            }}
          />
          <PreparationModal
            ingredientSource={this.state.ingredientSource}
            modalData={this.state.modalData}
            modalVisible={this.state.modalVisible}
            hideModal={() => this.setState({ modalVisible: false })}
          />
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.onHandShown}
            style={styles.container}
          >
            <Button
              title="Back"
              onPress={() => {
                this.setState({ onHandShown: false });
              }}
            />
            <ListView
              contentContainerStyle={styles.ingredientList}
              dataSource={this.state.onHandSource}
              renderRow={rowData => {
                return rowData.have
                  ? <TouchableHighlight
                      style={styles.have}
                      onPress={() => {
                        this.toggleOnHand(rowData);
                      }}
                    >
                      <View style={styles.center}>
                        <Text style={styles.text}>
                          {rowData.name}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  : <TouchableHighlight
                      style={styles.missing}
                      onPress={() => {
                        this.toggleOnHand(rowData);
                      }}
                    >
                      <View style={styles.center}>
                        <Text style={styles.text}>
                          {rowData.name}
                        </Text>
                      </View>
                    </TouchableHighlight>;
              }}
            />
          </Modal>
        </View>;
  }
}

const styles = StyleSheet.create({
  have: {
    backgroundColor: 'green',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 2,
    padding: 5,
    width: 90,
    height: 90,
  },
  missing: {
    backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 2,
    padding: 5,
    width: 90,
    height: 90,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.light,
  },
  center: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    paddingTop: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
  },
  cocktailName: {
    fontSize: 16,
    textAlign: 'center',
    padding: 2,
    color: COLORS.light,
  },
  cocktailDescription: {
    color: COLORS.light,
    fontSize: 12,
    padding: 2,
  },
  instructions: {
    textAlign: 'center',
    color: COLORS.light,
    marginBottom: 5,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientList: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 1,
    padding: 5,
    width: 115,
    height: 100,
  },
});
