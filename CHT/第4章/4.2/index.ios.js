var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NavigatorIOS,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} = React;

var Model = [
  {
    id: '1',
    title: '佳沛新西蘭進口獼猴桃',
    desc: '12個裝',
    price: 99,
    url: 'http://vczero.github.io/ctrip/guo_1.jpg'
  },
  {
    id:'2',
    title: '墨西哥進口牛油果',
    desc: '6個裝',
    price: 59,
    url: 'http://vczero.github.io/ctrip/guo_2.jpg'
  },
  {
    id:'3',
    title: '美國加州進口車厘子',
    desc: '1000g',
    price: 91.5,
    url: 'http://vczero.github.io/ctrip/guo_3.jpg'
  },
  {
    id:'4',
    title: '新疆特產西梅',
    desc: '1000g',
    price: 69,
    url: 'http://vczero.github.io/ctrip/guo_4.jpg'
  },
  {
    id:'5',
    title: '陝西大荔冬棗',
    desc: '2000g',
    price: 59.9,
    url: 'http://vczero.github.io/ctrip/guo_5.jpg'
  },
  {
    id:'6',
    title: '南非紅心西柚',
    desc: '2500g',
    price: 29.9,
    url: 'http://vczero.github.io/ctrip/guo_6.jpg'
  }
];

var Item = React.createClass({
  render: function(){
    return(
      <View style={styles.item}>
        <TouchableOpacity onPress={this.props.press}>
          <Image 
              resizeMode="contain" 
              style={styles.img}
              source={{uri:this.props.url}}>
            <Text numberOfLines={1} style={styles.item_text}>{this.props.title}</Text>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
});

var List = React.createClass({
  getInitialState: function(){
    return{
      count:0
    };
  },
  componentDidMount: function(){
    var _that = this;
    AsyncStorage.getAllKeys(function(err, keys){
      if(err){
        //TODO：儲存取資料出錯
      }
      //將儲存的商品條數反應到按鈕上
      _that.setState({
        count: keys.length
      });
    });
  },
  render: function() {
    var list = [];
    for(var i in Model){
      if(i % 2 === 0){
        var row = (
          <View style={styles.row}>
            <Item url={Model[i].url} 
              title={Model[i].title} 
              press={this.press.bind(this, Model[i])}></Item>
            <Item 
              url={Model[parseInt(i)+1].url} 
              title={Model[parseInt(i)+1].title} 
              press={this.press.bind(this, Model[parseInt(i)+1])}></Item>
          </View>);
        list.push(row);
      }
    }

    var count = this.state.count;
    var str = null;
    if(count){
      str = '，共'+ count + '件商品';
    }
    return (
      <ScrollView style={{marginTop:10}}>
        {list}
        <Text onPress={this.goGouWu} style={styles.btn}>去結算{str}</Text>
      </ScrollView>
    );
  },
  goGouWu: function(){
    this.props.navigator.push({
      component: GouWu,
      title:'購物車'
    });
  },
  press:function(data){
    var count = this.state.count;
    count ++;
    //改變數字狀態
    this.setState({
      count: count
    });
    //AsyncStorage儲存
    AsyncStorage.setItem('SP-' + this.genId() + '-SP', JSON.stringify(data), function(err){
      if(err){
        //TODO：儲存出錯
      }
    });
  },
  //產生隨機ID：GUID
  genId:function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }).toUpperCase();
  }
});

var GouWu = React.createClass({
  getInitialState: function(){
    return {
      data: [],
      price: 0
    };
  },
  render: function(){
    var data = this.state.data;
    var price = this.state.price;
    var list = [];
    for(var i in data){
      price += parseFloat(data[i].price);
      list.push(
        <View style={[styles.row, styles.list_item]}>
          <Text style={styles.list_item_desc}>
            {data[i].title}
            {data[i].desc}
          </Text>
          <Text style={styles.list_item_price}>￥{data[i].price}</Text>
        </View>
      );
    }
    var str = null;
    if(price){
      str = '，共' + price.toFixed(1) + '元';
    }
    return(
      <ScrollView style={{marginTop:10}}>
        {list}
        <Text style={styles.btn}>支付{str}</Text>
        <Text style={styles.clear} onPress={this.clearStorage}>清理購物車</Text>
      </ScrollView>
    );
  },
  componentDidMount: function(){
    var _that = this;
    AsyncStorage.getAllKeys(function(err, keys){
      if(err){
        //TODO：儲存取資料出錯
        //若果發生錯誤，這裡直接傳回（return）防止進入下面的邏輯
      }
      AsyncStorage.multiGet(keys, function(errs, result){
        //TODO：錯誤處理
        //得到的結果是二維陣列
        //result[i][0]表示我們儲存的鍵，result[i][1]表示我們儲存的值
        var arr = [];
        for(var i in result){
          arr.push(JSON.parse(result[i][1]));
        }
        _that.setState({
          data: arr
        });
      });
      
    });
  },
  clearStorage: function(){
    var _that = this;
    AsyncStorage.clear(function(err){
      if(!err){
        _that.setState({
          data:[],
          price: 0
        });
        alert('購物車已經清理');
      }
      //TODO:ERR
    });
  }
});
var App = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={
          {
            component: List,
            title: '水果清單'
          }
        }/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  item:{
    flex:1,
    marginLeft:5,
    borderWidth:1,
    borderColor:'#ddd',
    marginRight:5,
    height:100,
  }, 
  img:{
    flex:1,
    backgroundColor: 'transparent'
  },
  item_text:{
    backgroundColor: '#000',
    opacity: 0.7,
    color:'#fff',
    height:25,
    lineHeight:18,
    textAlign:'center',
    marginTop:74
  },
  btn:{
    backgroundColor:'#FF7200',
    height:33,
    textAlign:'center',
    color:'#fff',
    marginLeft:10,
    marginRight:10,
    lineHeight:24,
    marginTop:40,
    fontSize:18,
  },
  list_item:{
    marginLeft:5,
    marginRight:5,
    padding:5,
    borderWidth:1,
    height:30,
    borderRadius:3,
    borderColor:'#ddd'
  },
  list_item_desc:{
    flex:2,
    fontSize:15
  },
  list_item_price:{
    flex:1, 
    textAlign:'right',
    fontSize:15
  },
  clear:{
    marginTop:10,
    backgroundColor:'#FFF',
    color:'#000',
    borderWidth:1,
    borderColor:'#ddd',
    marginLeft:10,
    marginRight:10,
    lineHeight:24,
    height:33,
    fontSize:18,
    textAlign:'center',
  }
});

AppRegistry.registerComponent('App', () => App);