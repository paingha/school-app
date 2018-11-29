import React from 'react'
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {getBlogs} from '../settings';
import {getBlogCall} from '../calls/blog';
import HTML from 'react-native-render-html';
const { height } = Dimensions.get('window');

export default class BlogDetailScreen extends React.Component{
constructor(props){
    super(props)
    this.state = {
        screenHeight: height,
        offset: 0
    }
}
static navigationOptions = ({ navigation }) =>{
  return {
    title: `${navigation.getParam('topic', 'NO-ID')}`,
    headerStyle: {
      backgroundColor: '#085078',
      textAlign: 'center',
    },
    headerLeft: (
      <Icon
        name="arrow-left"
        size={20}
        onPress={()=> {
          let e = navigation;
          //onSignOut(e)
          navigation.navigate('SeventhViewStack')
          //navigation.navigate('Drawer')
        }}        
        style={{
          marginLeft: 15, 
          paddingRight: 15,
          color:'#ffffff'
        }}
        />),
        headerRight: (
            <Icon
              name="ellipsis-v"
              size={20}
              onPress={()=> {
                let e = navigation;
                //onSignOut(e)
                navigation.openDrawer();
                //navigation.navigate('Drawer')
              }}        
              style={{
                marginLeft: 15, 
                paddingRight: 15,
                color:'#ffffff'
              }}
              />),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
  }
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  componentDidMount(){
    //call getForum here
    //this.props.getBlog(getBlogs, this.state.offset);
  }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const { navigation } = this.props
        const blogId = navigation.getParam('blog_id', 'NO-ID');
        const blogData = {
            "id": 1,
            "topic": "How Easy Can Scholarship Applications Be?",
            "content": "<p>Scholarships are free money in various amounts that aid students in paying for their college tution. There is an endless amount of available scholarships international students are able to take adavantage of, ranging from students with a proven low household income, to indivduals that have excelled academically. Criteria for scholarships varies drastically beyond just these two listed, so don&rsquo;t worry, there is definitely free money out there that you might qualify for. Here, we will discuss how international students unfortunatley miss out in scholarship oppurtunities, and how to avoid mistakes once you are ready to apply. It can be very tasking to apply for scholarships, and at times, very time-consuming. With the variety of scholarships offered in schools, and companies within the U.S., and Canada, each year there will undeniably be an abundance of applicants applying for scholarships, many of which you will be interested in. It is true that some scholarships require little to no effort on your part when considering the application process, as true as this may be, many students still could miss out, due to lack of knowledge, so let&rsquo;s get informed!</p>\n\n<p>Application Deadline</p>\n\n<p>Failure to apply for scholarships on time is a major reason why some students become ineligible for one. In most cases, its due to the lack of awarenes on the deadlines. Applicants spend more time to research scholarship opportunities but often find out the deadline was close enough, and insufficient for application, this leads an applicant to hastily put in for it with discouragement, and unnerved. However, depending on the institution offering the scholarship, more than one scholarship may be available that you can qualify for, which will allow you to choose the deadline that best suits you. Another way to appropriately plan out that application process, it to write deadlines down on your calendar, along with a list of each requirement, to ensure you won&rsquo;t miss out.Learn to plan at least five to nine months ahead.</p>\n\n<p>Entrance Exam Scores</p>\n\n<p>Many scholarships require the student to have taken exams such IELTS, TOEFL, SAT, ACT, GRE, or GMAT, depending on what level and which of it is applicable to you; if you have not yet taken at least one of these exams, it is heavily advised for you to do so. Depending on the scholarship(s) it may be required that you submit your score on any of these given exams. Keep in mind it isn&rsquo;t enough that you just take one or more of these exams; a high or moderate score is preferred, as it will help not only in your efforts to obtain a scholarship, but it may help your admission process when applying for school.</p>\n\n<p>GPA Requirement</p>\n\n<p>For International students in search of both undergraduate and postgraduate scholarship opportunities for the U.S. or Canadian schools, the ireligibility status may require an above average GPA from either secondary (high) school, or their undergraduate degree. And most applicants are either unsure if their foreign GPA is equivalent to the U.S/Canada GPA or don&rsquo;t even know. If you are unsure of where you stand in regards to measuring your academic score from your home country, to that of the U.S. GPA standard, please visit the GPA calculator Tool tab at the top of this webpage. Follow the instructions and input your information accordingly, to insure you are applying to the correct scholarships in regards to GPA requirements.</p>\n\n<p>Caveat: All U.S scholarships with GPA requirement use the U.S GPA grade system, and not foreign.</p>\n\n<p>Leadership and Volunteering</p>\n\n<p>Volunteering and giving back to the community through selfless service is a huge way to ensure you are eligible for scholarships that require students to show involvement in their surrounding community. Leadership roles in clubs and students organizations could also be a way to show your involvement in things surrounding you. You are implored not to overlook those two valuables (leading and volunteering). If you&rsquo;re curious on ways to dive into your surrounding community, read How Volunteer Programs Can Help International Students in our other article to learn its advantages and more.</p>\n\n<p>Recommendation Letters</p>\n\n<p>In the U.S. and Canada, recommendation letters are used as a tool to see how your teachers, professors or mentors assess your performance academically, as well as your social involvements. If the student fails to make a lasting impression with their instructors, or school officals, it could make it extremely hard in finding someone to submit a recommendation letter on your behalf. Many scholarships ask for a recommendation letter(s) to be sent in along with your application. Make sure you select individuals that you are sure will speak well on your behalf, and be sure to allow ample time for them to give you a written statement. You may not want to rush this process, as it could lead to both you, and the selected person to feel stained and could affect your application quality. Finding Scholarships</p>\n\n<p>A lot more students fail to deeply investigate and search for scholarships, and end up applying for only one or two. Although you may be extremely lucky to obtain one or more of the few you have applied for; however the vast majority of people are unlucky and end up not being awarded any. Searching through scholarships far in advance to ensure you have ample time to obtain everything that is required, could be the best way to ensure you don&rsquo;t miss deadlines. It is also better if you have an extensive list of scholarships you plan to apply for; there are millions of scholarships available, and there are also millions of people planning to take advantage of the same free resources as you. Do not put all of your eggs in one basket. The best tool for international students to ensure a scholarship is available to them, would be is The Academist scholarship tool. Thousands of scholarships have been researched to ensure that international students undoubtable qualify for. This tool allows you to enter your GPA, monetary requirements for the scholarship, and</p>\n\n<p>so many other criteria you are able to hand pick to ensure the best scholarship are known to you. Check it out today, for better chances of being awarded a scholarship.</p>\n",
            "urlParam": "how-easy-can-scholarship-applications-be?",
            "featuredImage": "https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg",
            "by": 1,
            "createdAt": "2018-11-27T03:37:09.930Z",
            "updatedAt": "2018-11-27T03:37:09.930Z",
            "deletedAt": null
          }
        return(
            <ScrollView 
                style={{flex:1}}
                contentContainerStyle={{flexGrow: 1, alignContent:'center'}}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={{flex:1, flexDirection:'column', alignItems:'center', width:'100%'}}>
                <View style={{backgroundColor:'white', height:'100%', elevation:2, width:'100%'}}>
                <Image source={{uri: `https://apeelit-payment.s3.amazonaws.com/1543289826992dreamstime_xxl_37039314.jpg`}} style={{width: '100%', height:200, backgroundColor:'white'}}/>
                    <View style={{flex:1, justifyContent:'center', paddingHorizontal:10}}>
                    <Text style={{alignSelf:'center', fontSize:16, fontWeight:"bold", color:'black', marginVertical:10}}>{blogData.topic}</Text>
                    <View style={{alignSelf:'center', marginTop:-10, paddingHorizontal:10}}>
                    <HTML ptSize={12} html={blogData.content} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                    </View>
                </View>               
            </View>
            </ScrollView>
        )
    }
}

/*function mapper(state) {
    return {
        currentUser: state.user.data,
        blogs: state.blog.data
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getBlog: (url, offset) => {
        dispatch(
          getBlogCall(url, offset)
        );
      },
    }
  }
  
  export default connect(mapper, mapDispatchToProps)(BlogScreen); */