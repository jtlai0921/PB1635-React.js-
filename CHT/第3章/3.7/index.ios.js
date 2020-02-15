var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  StyleSheet,
  Text,
  AppRegistry,
  View,
  Image,
  ScrollView,
  TabBarIOS,
} = React;

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height - 70;
var App = React.createClass({
  getInitialState: function(){
    return {
      tab: 'message'
    };
  },
  select: function(tabName){
    this.setState({
      tab: tabName
    });
  },
  render: function(){
    return(
      <TabBarIOS style={styles.flex}>
        <TabBarIOS.Item
          title="訊息"
          icon={require("image!message")}
          onPress={this.select.bind(this, 'message')}
          selected={this.state.tab === 'message'}>
          <ScrollView>
            <View style={styles.message}>
              <Text style={styles.message_title}>南山南</Text>
              <Text>
              他不再和誰談論相逢的孤島，因為心裡早已荒蕪人煙
              他的心裡再裝不下一個家，做一個只對自己說謊的啞巴，他說
              你任何為人稱道的美麗，不及他第一次遇見你
              時光苟延殘喘無可奈何
              若果所有土地連在一起，走上一生只為去擁抱你
              喝醉了他的夢，晚安
              有天他聽見有人唱著古老的歌，唱著今天還在遠方發生的
              像在她眼睛裡看到的孤島，沒有悲傷但也沒有花朵
              你在南方的艷陽裡大雪紛飛，我在北方的寒夜裡四季如春
              若果天黑之前來得及，我要忘了你的眼睛
              窮極一生做不完一場夢
              大夢初醒荒唐了這一生
              南山南，北秋悲
              南山有谷堆
              南風喃 ，北海北
              北海有墓碑
              </Text>
            </View>
          </ScrollView>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="聯繫人"
          icon={require("image!phone")}
          onPress={this.select.bind(this, 'phonelist')}
          selected={this.state.tab === 'phonelist'}>
          <ScrollView>
            <Text style={styles.list}>
              <Text>唐三藏</Text>
              <Text>131-8904-9077</Text>
            </Text>
            <Text style={styles.list}>
              <Text>孫悟空</Text>
              <Text>131-8904-9078</Text>
            </Text>
            <Text style={styles.list}>
              <Text>豬八戒</Text>
              <Text>131-8904-9079</Text>
            </Text>
            <Text style={styles.list}>
              <Text>沙和尚</Text>
              <Text>131-8904-9080</Text>
            </Text>
          </ScrollView>          
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="動態"
          icon={require("image!star")}
          onPress={this.select.bind(this, 'star')}
          selected={this.state.tab === 'star'}>
          <ScrollView style={styles.flex}>
            <Image style={{width:width, height:height}} 
            source={{uri:'http://vczero.github.io/ctrip/star_page.jpg'}}/>            
          </ScrollView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex: 1,
  },
  message:{
    alignItems:'center',
    marginLeft:5,
    marginRight:5,
  },
  message_title:{
    fontSize:18,
    color: '#18B5FF',
    marginBottom:5,
  },
  list:{
    height:30,
    fontSize:15,
    marginLeft:10,
    marginTop:10,
  }
});

AppRegistry.registerComponent('APP', () => App);