﻿var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var Header = React.createClass({
  render: function(){
    return (
      <View style={styles.flex}>
        <Text style={styles.font}>
          <Text style={styles.font_1}>網易</Text>
          <Text style={styles.font_2}>新聞</Text>
          <Text>有態度°</Text>
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    marginTop:25,
    height:50,
    borderBottomWidth:3/React.PixelRatio.get(),
    borderBottomColor:'#EF2D36',
    alignItems:'center' /* 使Text元件水平置中*/
  },
  font:{
    fontSize:25,
    fontWeight: 'bold',
    textAlign:'center' /*使文字在Text元件中置中*/
  },
  font_1:{
    color:'#CD1D1C'
  },
  font_2:{
    color:'#FFF',
    backgroundColor:'#CD1D1C',
  }
});

module.exports = Header;