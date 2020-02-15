var React = require('react-native');
var Header = require('./header');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var List = React.createClass({
  render: function(){
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>
      </View>
    );
  }
});

var ImportantNews = React.createClass({
  show: function(title){
    alert(title);
  },
  render: function(){
    var news = [];
    for(var i in this.props.news){
      var text = (
        <Text 
          onPress={this.show.bind(this, this.props.news[i])}
          numberOfLines={2}
          style={styles.news_item}>
          {this.props.news[i]}
        </Text>
      );
      news.push(text);
    }
    return (
      <View style={styles.flex}>
        <Text style={styles.news_title}>今日要聞</Text>
        {news}
      </View>
    );
  }
});

var app = React.createClass({
  render: function(){
     var news = [
        '1、劉慈欣《三體》獲“雨果獎”為中國作家第一次',
        '2、京津冀協作發展定位明確：北京無經濟中心表述',
        '3、好奇寶寶第一次淋雨，父親用鏡頭記錄了下來',
        '4、京津冀協作發展定位明確：:北京無經濟中心表述+好奇寶寶第一次淋雨，父親用鏡頭記錄了下來'
     ];  
     return (
      <View style={styles.flex}>
        <Header></Header>
        <List title='宇航員在太空宣布“三體”獲獎'></List>
        <List title='NASA發短片紀念火星征程50年'></List>
        <List title='男生連續做一周苦瓜吃吐女友'></List>
        <List title='女童遭鯊魚襲擊又下海救伙伴'></List>
        <ImportantNews news={news}></ImportantNews>
      </View>
      );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex:1
  },
  list_item:{
    height:40,
    marginLeft:10,
    marginRight:10,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    justifyContent: 'center'
  },
  list_item_font:{
    fontSize:16
  },
  news_title:{
    fontSize:20,
    fontWeight:'bold',
    color: '#CD1D1C',
    marginLeft:10,
    marginTop:15,
  },
  news_item:{
    marginLeft:10,
    marginRight:10,
    fontSize:15,
    lineHeight:20,
  }
});

AppRegistry.registerComponent('APP', () => app);