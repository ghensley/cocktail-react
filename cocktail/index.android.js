"use strict";

import React, { Component } from 'react';
import { createStore } from 'redux';
import Cocktail from "./app/components/Cocktail";
import {
  AppRegistry
} from 'react-native';

class CocktailApp extends Component {
  render() {
    return <Cocktail />
  }
}

AppRegistry.registerComponent('cocktail', () => CocktailApp);
