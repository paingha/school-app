import React from 'react';
import { StyleSheet, FlatList, View, Text, ScrollView, StatusBar, AsyncStorage, TouchableNativeFeedback, ImageBackground, TouchableOpacity, Button, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {getStates, getCountries, gpa_search} from '../settings'
import {getStatesCall, getApplicantCountriesCall} from '../calls/misc'
import {gpaSearchCall} from '../calls/gpaSchool'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import GpaScale from './gpa_scale';
const { height } = Dimensions.get('window');
const COUNTRIES = [
  { label: 'Algeria', value: 'Algeria' },
  { label: 'Angola', value: 'Angola' },
  { label: 'Benin', value: 'Benin' },
  { label: 'Botswana', value: 'Botswana' },
  { label: 'Burkina Faso', value: 'Burkina Faso' },
  { label: 'Cameroon', value: 'Cameroon' },
  { label: 'Central African Republic', value: 'Central African Republic' },
  { label: 'Chad', value: 'Chad' },
  { label: 'Congo', value: 'Congo' },
  { label: 'Cote d\'Ivoire', value: 'Cote dIvoire' },
  { label: 'Democratic Republic of Congo', value: 'Democratic Republic of Congo' },
  { label: 'Egypt', value: 'Egypt' },
  { label: 'Eritrea', value: 'Eritrea' },
  { label: 'Ethiopia', value: 'Ethiopia' },
  { label: 'Gabon', value: 'Gabon' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Guinea', value: 'Guinea' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'Liberia', value: 'Liberia' },
  { label: 'Madagascar', value: 'Madagascar' },
  { label: 'Mali', value: 'Mali' },
  { label: 'Mauritania', value: 'Mauritania' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'Mozambique', value: 'Mozambique' },
  { label: 'Namibia', value: 'Namibia' },
  { label: 'Niger', value: 'Niger' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Rwanda', value: 'Rwanda' },
  { label: 'Senegal', value: 'Senegal' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'Swaziland', value: 'Swaziland' },
  { label: 'Togo', value: 'Togo' },
  { label: 'Tunisia', value: 'Tunisia' },
  { label: 'United States', value: 'United States' },
  { label: 'Zambia', value: 'Zambia' },
  { label: 'Zimbabwe', value: 'Zimbabwe' },
];
const NIGERIA_OPTIONS = [
  { label: 'WAEC/NECO', value: 'Waec' },
  { label: 'University', value: 'University' },
]
const GHANA_OPTIONS = [
  { label: 'WAEC', value: 'Waec' },
  { label: 'University', value: 'University' },
]
const EGYPT_OPTIONS = [
  { label: 'University Scale A', value: 'University Scale A' },
  { label: 'University Scale B', value: 'University Scale B' },
  { label: 'University Scale C', value: 'University Scale C' },
]
const KENYA_OPTIONS = [
  { label: 'University', value: 'University' },
  { label: 'Certificate of Secondary School Education', value: 'Certificate of Secondary School Education' },
  { label: 'Most Common', value: 'Most Common' },
  { label: 'Secondary Level', value: 'Secondary Level' },
]
const LIBERIA_OPTIONS = [
  { label: 'WASSCE', value: 'Wassce' },
  { label: 'Most Common', value: 'Most Common' },
]
const NAMIBIA_OPTIONS = [
  { label: 'IGCSE', value: 'IGCSE' },
  { label: 'University', value: 'University' },
]
const ETHIOPIA_OPTIONS = [
  { label: 'Secondary Certificate', value: 'Secondary Certificate' },
  { label: 'University', value: 'University' },
]
const RWANDA_OPTIONS = [
  { label: 'Scale 1', value: 'Scale 1' },
  { label: 'Scale 2', value: 'Scale 2' },
]
const ZAMBIA_OPTIONS = [
{ label: 'Scale 1', value: 'Scale 1' },
{ label: 'Secondary', value: 'Secondary' },
]
const CAMEROON_OPTIONS = [
  { label: 'French System', value: 'French System' },
  { label: 'University of Buea', value: 'University of Buea' },
  { label: 'GCE \'A\' Level', value: 'Gce A Level' },
]

class CalculatorScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      hide: false,
      country: '',
      screenHeight: height,
      isHidden: true,
      countryOptions: [],
      result: '',
      value: 1,
      gpa: [],
      pureGrade: [],
      currentCourse: [],
      credit: [],
      resultOverview: null,
      option: '',
      token: '',
      offset: 0,
      clearingRows: false,
      slideText: [
        "Institutions using WAEC/NECO/GRE/WASSCE grade scale.",
        "The “Credit” column refers to the weight of each course. Some institutions use credit hour, credit unit, or unit.",
        "Alpha-numeric (A1, B2, C4), numeric (7.99, 14, 16), or alphabetic (A, B+, C) grading scales should be entered exactly how they appear on your result sheet, in the Grade column ",
        "Use your converted GPA to search through a wide range of scholarships, using the Scholarship search section.",
      ],
      currentIndex: 0,
      currentText: 'Institutions using WAEC/NECO/GRE/WASSCE grade scale.',
      rowNumber: 4,
            rows: [{
              id: 1,
            },
            {
              id: 2,
            },
            {
              id: 3,
            },
            {
              id: 4,
            }],
    }
    this.addRow = this.addRow.bind(this);   
    this.calcGpa = this.calcGpa.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCredit = this.handleCredit.bind(this);
    this.clearRows = this.clearRows.bind(this);
  }
    static navigationOptions = ({ navigation }) =>{
      return {
        title: 'GPA Calculator',
        headerStyle: {
          backgroundColor: '#085078',
          textAlign: 'center',
        },
        headerLeft: (
          <Icon
            name="bars"
            size={30}
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
          fontWeight: '200',
          fontFamily: 'AdventPro-Bold',
          textAlign: 'center'
        },
      }
      };
      setSlider(){
        /*setTimeout(()=>{
          for(let i = this.state.currentIndex; i <= this.state.slideText.length; i++){
            //this.setState({currentIndex: i + 1, currentText: this.state.slideText[i]})
            alert(i + 1)
          }
        }, 100000) */
        const interval = setInterval(()=>{
          this.setState({currentIndex: this.state.currentIndex + 1, currentText: this.state.slideText[this.state.currentIndex]})
            if (this.state.currentIndex >= this.state.slideText.length){
              this.setState({currentIndex: 0})
            }
        }, 5000)
      }
      onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight });
      };
      addRow(){
        let {rows, rowNumber} = this.state;
        let addNum = rowNumber + 1;
        let updates = {
          id: `${addNum}`
        }
        let updatedRow = _.concat(rows, updates);
        this.setState({rows: updatedRow, rowNumber: addNum})
      }
      async clearRows(){
        //decide for loop or map.
        const {rows} = this.state;
        let newRow =  [{
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        }]
        
        await this.setState({clearingRows: true})
        await rows.forEach((e)=>{
          this.removeRow(e.id)
        })
        await this.setState({rows: newRow, rowNumber: 4, clearingRows: false})
        await this.setState({resultOverview: null})
      }
      removeRow(e){
        const {rows} = this.state;
        const edited = rows.filter(stuff => stuff.id !== e)
        const rowNumberUpdate = this.state.rowNumber - 1
        this.setState({rows: edited, rowNumber: rowNumberUpdate}, ()=>{
          //callback to recalculate gpa after removing row
          let newCredit = _.remove(this.state.credit, function(n) {
            return n.id !== e;
          });
          let newCourse = _.remove(this.state.currentCourse, function(n) {
            return n.id !== e;
          });
          let newGrade = _.remove(this.state.pureGrade, function(n) {
            return n.id !== e;
          });
          let newGpa = _.remove(this.state.gpa, function(n) {
            return n.id !== e;
          });
          this.setState({pureGrade: newGrade, credit: newCredit, currentCourse: newCourse, gpa: newGpa},()=>{
            if(this.state.resultOverview){
              if(!this.state.clearingRows){
              this.calcGpa()
              }
            }
          })

        })
      }
      handleOptionChange(option){
        //console.log('You\'ve selected:', option);
		this.setState({ option })
    }
    handleCredit(id, e){
      //console.log(e.target.value);
      //console.log(e.target.name);
      let currentCredit = this.state.credit;
      let creditObj = {
        "id": id,
        "credit": e
      }
      //add id so you can find the exact credit on edit
      if (_.some(currentCredit, ["id", id])){
        //if id is there remove then add new value
        let newCredit = _.remove(currentCredit, function(n) {
          return n.id != id;
        });
        let yourCredit = _.concat(newCredit, creditObj);
      this.setState({credit: yourCredit});

      }
      else{
      let newCredit = _.concat(currentCredit, creditObj);
      this.setState({credit: newCredit});
      }
    }
    handleChange(id, e){
      //console.log(e.target.value);
      //console.log(e.target.name);
      let country = this.state.country;
      let type = this.state.option;
      let uppercaseGrade = e;
      //alert(uppercaseGrade)
      let grade = uppercaseGrade.toUpperCase();
      let countryGrade = _.concat(this.state.pureGrade, grade);
      let currentGrade = this.state.pureGrade;
      let currentGradeObj = {
        "id": id,
        "countryGrade": grade
      }
      if (_.some(currentGrade, ["id", id])){
        //if id is there remove then add new value
        let newGrades = _.remove(currentGrade, function(n) {
          return n.id != id;
        });
        let yourGrades = _.concat(newGrades, currentGradeObj);
      this.setState({pureGrade: yourGrades});

      }
      else{
      let yourGrades = _.concat(currentGrade, currentGradeObj);
      this.setState({pureGrade: yourGrades});
    }
      //console.log(country);
      //console.log(type);
      let result = (country, type, grade) => {
        switch(country) {
          case "Nigeria":
              if (type == "Waec"){
                
                if ((grade == "A1") || grade == "a1" || ((1.99 >= grade) && (grade >= 1))){
                    return "A+"
                    //console.log("A+")
                }
                if ((grade == "B2") || grade == "b2" || ((2.99 >= grade) && (grade >= 2))){
                    return "A"
                }
                if ((grade == "B3") || grade == "b3" || ((3.99 >= grade) && (grade >= 3))){
                    return "B"
                }
                if ((grade == "C4") || grade == "c4" || ((4.99 >= grade) && (grade >= 4))){
                    return "B"
                }
                if ((grade == "C5") || grade == "c5" || ((5.99 >= grade) && (grade >= 5))){
                    return "C"
                }
                if ((grade == "C6") || grade == "c6" || ((6.99 >= grade) && (grade >= 6))){
                    return "C"
                }
                if ((grade == "D7") || grade == "d7" || ((7.99 >= grade) && (grade >= 7))){
                    return "D"
                }
                if ((grade == "E8") || grade == "e8" || ((8.99 >= grade) && (grade >= 8))){
                    return "D"
                }
                if ((grade == "F9") || grade == "f9" || (grade == 9)){
                    return "F"
                }
                else{
                    return null
                  }
              }
              if (type == "University"){
                
                  if ((grade == "A") || grade == "a" || ((100 >= grade) && (grade >= 70))){
                    return "A"
                  }
                  if ((grade == "B") || grade == "b" || ((69.99 >= grade) && (grade >= 60))){
                    return "B+"
                  }
                  if ((grade == "C") || grade == "c" || ((59.99 >= grade) && (grade >= 50))){
                    return "B"
                  }
                  if ((grade == "D") || grade == "d" || ((49.99 >= grade) && (grade >= 45))){
                    return "C+"
                  }
                  if ((grade == "E") || grade == "e" || ((44.99 >= grade) && (grade >= 40))){
                    return "C"
                  }
                  if ((grade == "F") || grade == "f" || ((39.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              
              break;
          case "Ghana":
              if (type == "University"){
                
                  if ((grade == "A") || grade == "a" || ((100 >= grade) && (grade >= 80))){
                    return "A+"
                  }
                  if ((grade == "A-") || grade == "a-" || ((79.99 >= grade) && (grade >= 75))){
                    return "A"
                  }
                  if ((grade == "B") || grade == "b" || ((74.99 >= grade) && (grade >= 65))){
                    return "B"
                  }
                  if ((grade == "C") || grade == "c" || ((64.99 >= grade) && (grade >= 60))){
                    return "B-"
                  }
                  if ((grade == "D") || grade == "d" || ((59.99 >= grade) && (grade >= 50))){
                    return "C"
                  }
                  if ((grade == "F") || grade == "f" || ((49.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Waec"){
                if (grade == "A1" || grade == "a1"){
                    return "A+"
                }
                else if (grade == "B2" || grade == "b2"){
                    return "A"
                }
                else if (grade == "B3" || grade == "b3"){
                    return "B"
                }
                else if (grade == "C4" || grade == "c4"){
                    return "B"
                }
                else if (grade == "C5" || grade == "c5"){
                    return "C"
                }
                else if (grade == "C6" || grade == "c6"){
                    return "C"
                }
                else if (grade == "D7" || grade == "d7"){
                    return "D"
                }
                else if (grade == "E8" || grade == "e8"){
                    return "D"
                }
                else if (grade == "F9" || grade == "f9"){
                    return "F"
                }
                else{
                    return null
                  }
              }
              break;
              case "Algeria":
              if ((20 >= grade) && (grade >= 15)) {
                return "A+"
              }
              else if ((14.99 >= grade) && (grade >= 13)){
                return "A"
              }
              else if ((12.99 >= grade) && (grade >= 12)){
                return "B+"
              }
              else if ((11.99 >= grade) && (grade >= 11)){
                return "B"
              }
              else if ((10.99 >= grade) && (grade >= 10)){
                return "C"
              }
              else if ((9.99 >= grade) && (grade >= 0)){
                return "F"
              }
              else{
                return null
              }
            
          break;
          case "Benin":
              
                  if ((grade == "A+") || grade == "a+" || ((20 >= grade) && (grade >= 16))){
                    return "A+"
                  }
                  if ((grade == "A") || grade == "a" || ((15.99 >= grade) && (grade >= 15))){
                    return "A"
                  }
                  if ((grade == "A-") || grade == "a-" || ((14.99 >= grade) && (grade >= 14))){
                    return "A-"
                  }
                  if ((grade == "B+") || grade == "b+" || ((13.99 >= grade) && (grade >= 13))){
                    return "B+"
                  }
                  if ((grade == "B-") || grade == "b-" || ((11.99 >= grade) && (grade >= 11))){
                    return "B-"
                  }
                  if ((grade == "B") || grade == "b" || ((12.99 >= grade) && (grade >= 12))){
                    return "B"
                  }
                  if ((grade == "C+") || grade == "c+" || ((10.99 >= grade) && (grade >= 10))){
                    return "C+"
                  }
                  if ((grade == "C") || grade == "c" || ((9.99 >= grade) && (grade >= 9))){
                    return "C"
                  }
                  if ((grade == "C-") || grade == "c-" || ((8.99 >= grade) && (grade >= 8))){
                    return "C-"
                  }
                  if ((grade == "D") || grade == "d" || ((7.99 >= grade) && (grade >= 7))){
                    return "D"
                  }
                  if ((grade == "F") || grade == "f" || ((6.99 >= grade) && (grade >= 0))){
                    return "F"
                  }
                  else{
                    return null
                  }
              
          case "Botswana":
              
                  if (((100 >= grade) && (grade >= 80)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  if (((79.99 >= grade) && (grade >= 70)) || grade == "B" || grade == "b") {
                    return "A-"
                  }
                  if (((69.99 >= grade) && (grade >= 60)) || grade == "C" || grade == "c") {
                    return "B"
                  }
                  if (((59.99 >= grade) && (grade >= 50)) || grade == "D" || grade == "d") {
                    return "C"
                  }
                  if (((49.99 >= grade) && (grade >= 40)) || grade == "E" || grade == "e") {
                    return "D"
                  }
                  if (((39.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Swaziland":
              if (grade == "A" || grade == "a"){
                    return "A"
              }
              else if (grade == "B" || grade == "b"){
                    return "A-"
              }
              else if (grade == "C" || grade == "c"){
                    return "B"
              }
              else if (grade == "D" || grade == "d"){
                    return "C"
              }
              else{
                    return null
                  }
              break;
          case "Zimbabwe":
              if(grade == "A" || grade == "a"){
                    return "A"
              }
              else if (grade == "B" || grade == "b"){
                    return "B"
              }
              else if (grade == "C" || grade == "c"){
                    return "C"
              }
              else if (grade == "D" || grade == "d"){
                    return "D"
              }
              else if (grade == "E" || grade == "e"){
                    return "F"
              }
              else{
                    return null
                  }
              break;
          case "Angola":
              
                  if ((20 >= grade) && (grade >= 16)){
                    return "A"
                  }
                  else if ((15 >= grade) && (grade >= 13)){
                    return "B"
                  }
                  else if ((12 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9 >= grade) && (grade >= 1)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Burkina Faso":
                  if ((20 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
              break;
          case "Central African Republic":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
              break;
          case "Chad":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else {
                    return null
                  }
              break;
          case "Cote dIvoire":

                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                }
                else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                }
                  else{
                    return null
                  }
              break;
          case "Gabon":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Guinea":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Madagascar":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mali":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mauritania":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Niger":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Tunisia":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Democratic Republic Of Congo":
              
                  if ((100 >= grade) && (grade >= 90)) {
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)) {
                    return "A-"
                  }
                  else if ((79 >= grade) && (grade >= 70)) {
                    return "B"
                  }
                  else if ((69 >= grade) && (grade >= 60)) {
                    return "B-"
                  }
                  else if ((59 >= grade) && (grade >= 50)) {
                    return "C"
                  }
                  else if ((49 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Congo":
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)) {
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)) {
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)) {
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)) {
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)) {
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Egypt":
              if (type == "University Scale A"){

                  if (((100 >= grade) && (grade >= 90)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "A-" || grade == "a-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 65)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 35)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((34.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University Scale B"){

                  if (((100 >= grade) && (grade >= 85)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-" || grade == "a-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 65)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 30)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University Scale C"){

                  if (((100 >= grade) && (grade >= 85)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-" || grade == "a-") {
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "B+" || grade == "b+") {
                    return "B+"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B-" || grade == "b-") {
                    return "B-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "C+" || grade == "c+") {
                    return "C+"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((54.99 >= grade) && (grade >= 30)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Eritrea":

                  if (((100 >= grade) && (grade >= 75)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((74.99 >= grade) && (grade >= 65)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 50)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((39.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Ethiopia":
              if (type == "University"){
                if(grade == "A" || grade == "a") {
                    return "A"
                }
                else if (grade == "B+" || grade == "b+"){
                    return "B+"
                }
                else if (grade == "B" || grade == "b"){
                    return "B"
                }
                else if (grade == "C+" || grade == "c+"){
                    return "C+"
                }
                else if (grade == "C" || grade == "c"){
                    return "C"
                }
                else if (grade == "D" || grade == "d"){
                    return "D"
                }
                else if (grade == "F" || grade == "f"){
                    return "F"
                }
                else{
                    return null
                  }
              }
          if (type == "Secondary Certificate"){

                  if (((100 >= grade) && (grade >= 90)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((79.99 >= grade) && (grade >= 60)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((49.99 >= grade) && (grade >= 0)) || grade == "E" || grade == "e") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Kenya":
              if (type == "University"){

                  if (((100 >= grade) && (grade >= 70)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((69 >= grade) && (grade >= 60)) || grade == "B" || grade == "b") {
                    return "A-"
                  }
                  else if (((59 >= grade) && (grade >= 50)) || grade == "C" || grade == "c") {
                    return "B"
                  }
                  else if (((49 >= grade) && (grade >= 40)) || grade == "D" || grade == "d") {
                    return "C"
                  }
                  else if (((39 >= grade) && (grade >= 0)) || grade == "E" || grade == "e") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Certificate of Secondary School Education"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "A-" || grade == "a-") {
                    return "A-"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B+" || grade == "b+") {
                    return "B+"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "B-" || grade == "b-") {
                    return "B-"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C+" || grade == "c+") {
                    return "C+"
                  }
                  else if (((54.99 >= grade) && (grade >= 50)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 45)) || grade == "C-" || grade == "c-") {
                    return "C-"
                  }
                  else if (((44.99 >= grade) && (grade >= 40)) || grade == "D+" || grade == "d+") {
                    return "D+"
                  }
                  else if (((39.99 >= grade) && (grade >= 35)) || grade == "D" || grade == "d") {
                    return "D"
                  }
                  else if (((34.99 >= grade) && (grade >= 30)) || grade == "D-" || grade == "d-") {
                    return "D-"
                  }
                  else if (((29.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Most Common"){
                
                  if (((100 >= grade) && (grade >= 70)) || grade == "A" || grade == "a") {
                    return "A"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "A-" || grade == "a-") {
                    return "A-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "B+" || grade == "b+") {
                    return "B+"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "B" || grade == "b") {
                    return "B"
                  }
                  else if (((49.99 >= grade) && (grade >= 45)) || grade == "C+" || grade == "c+") {
                    return "C+"
                  }
                  else if (((44.99 >= grade) && (grade >= 40)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((39.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f") {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Secondary Level"){

                  if ((grade == 12) || grade == "A" || grade == "a") {
                    return "A+"
                  }
                  else if (((11.99 >= grade) && (grade >= 11)) || grade == "A-" || grade == "a-") {
                    return "A"
                  }
                  else if (((10.99 >= grade) && (grade >= 10)) || grade == "B+" || grade == "b+") {
                    return "A-"
                  }
                  else if (((9.99 >= grade) && (grade >= 9)) || grade == "B" || grade == "b") {
                    return "B+"
                  }
                  else if (((8.99 >= grade) && (grade >= 8)) || grade == "B-" || grade == "b-") {
                    return "B"
                  }
                  else if (((7.99 >= grade) && (grade >= 7)) || grade == "C+" || grade == "c+") {
                    return "C+"
                  }
                  else if (((6.99 >= grade) && (grade >= 6)) || grade == "C" || grade == "c") {
                    return "C"
                  }
                  else if (((5.99 >= grade) && (grade >= 2)) || grade == "C-" || grade == "c-") {
                    return "D"
                  }
                  else if (((1.99 >= grade) && (grade >= 1)) || grade == "D+" || grade == "d+") {
                    return "F"
                  }
                  else {
                    return null
                  }
              }
              break;
          case "Liberia":
              if (type == "Most Common"){
                
                  if ((100 >= grade) && (grade >= 90)) {
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)) {
                    return "B"
                  }
                  else if ((79 >= grade) && (grade >= 70)) {
                    return "C"
                  }
                  else if ((69 >= grade) && (grade >= 60)){
                    return "D"
                  }
                  else if ((59 >= grade) && (grade >= 0)) {
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Wassce"){
                
                  if (((1.99 >= grade) && (grade >= 1)) || (grade == "A1") || grade == "a1") {
                    return "A"
                  }
                  else if (((2.99 >= grade) && (grade >= 2)) || (grade == "B2") || grade == "b2") {
                    return "A"
                  }
                  else if (((3.99 >= grade) && (grade >= 3)) || (grade == "B3") || grade == "b3") {
                    return "B"
                  }
                  else if (((4.99 >= grade) && (grade >= 4)) || (grade == "C4") || grade == "c4"){
                    return "B"
                  }
                  else if (((5.99 >= grade) && (grade >= 5)) || (grade == "C5") || grade == "c5"){
                    return "C"
                  }
                  else if (((6.99 >= grade) && (grade >= 6)) || (grade == "C6") || grade == "c6") {
                    return "C"
                  }
                  else if (((7.99 >= grade) && (grade >= 7)) || (grade == "C7") || grade == "c7") {
                    return "D"
                  }
                  else if (((8.99 >= grade) && (grade >= 8)) || (grade == "E8") || grade == "e8"){
                    return "D"
                  }
                  else if ((grade == 9) || (grade == "F9") || grade == "f9"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Morocco":
              
                  if ((20 >= grade) && (grade >= 14)) {
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)) {
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10.5)){
                    return "B-"
                  }
                  else if ((10.49 >= grade) && (grade >= 10.1)){
                    return "C+"
                  }
                  else if ((10.09 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.99 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else if ((7.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Mozambique":
              
                  if ((20 >= grade) && (grade >= 15)){
                    return "A"
                  }
                  else if ((14.99 >= grade) && (grade >= 12)){
                    return "B"
                  }
                  else if ((11 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Namibia":
              if (type == "IGCSE"){
                
                  if (((100 >= grade) && (grade >= 90)) || grade == "A*" || grade == "a*"){
                    return "A+"
                  }
                  else if (((89.99 >= grade) && (grade >= 80)) || grade == "A" || grade == "a"){
                    return "A"
                  }
                  else if (((79.99 >= grade) && (grade >= 70)) || grade == "B" || grade == "b"){
                    return "A-"
                  }
                  else if (((69.99 >= grade) && (grade >= 60)) || grade == "C" || grade == "c"){
                    return "B"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D" || grade == "d"){
                    return "C+"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "E" || grade == "e"){
                    return "C"
                  }
                  else if (((39.99 >= grade) && (grade >= 30)) || grade == "F" || grade == "f"){
                    return "D+"
                  }
                  else if (((29.99 >= grade) && (grade >= 20)) || grade == "G" || grade == "g"){
                    return "D"
                  }
                  else if (((19.99 >= grade) && (grade >= 0)) || grade == "U" || grade == "u"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A" || grade == "a"){
                    return "A+"
                  }
                  else if (((79.99 >= grade) && (grade >= 70)) || grade == "B" || grade == "b"){
                    return "A"
                  }
                  else if (((69.99 >= grade) && (grade >= 60)) || grade == "C" || grade == "c"){
                    return "B"
                  }
                  else if (((59.99 >= grade) && (grade >= 50)) || grade == "D" || grade == "d"){
                    return "C"
                  }
                  else if (((49.99 >= grade) && (grade >= 0)) || grade == "F" || grade == "f"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Rwanda":
              if (type == "Scale 1"){
              
                  if (((11 >= grade) && (grade >= 10.5)) || grade == "A" || grade == "a"){
                    return "A"
                  }
                  else if (((10.49 >= grade) && (grade >= 9.5)) || grade == "A-" || grade == "a-"){
                    return "A-"
                  }
                  else if (((9.49 >= grade) && (grade >= 8.5)) || grade == "B+" || grade == "b+"){
                    return "B+"
                  }
                  else if (((8.49 >= grade) && (grade >= 7.5)) || grade == "B" || grade == "b"){
                    return "B"
                  }
                  else if (((7.49 >= grade) && (grade >= 6.5)) || grade == "B-" || grade == "b-"){
                    return "B-"
                  }
                  else if (((6.49 >= grade) && (grade >= 5.5)) || grade == "C+" || grade == "c+"){
                    return "C+"
                  }
                  else if (((5.49 >= grade) && (grade >= 4.5)) || grade == "C" || grade == "c"){
                    return "C"
                  }
                  else if (((4.49 >= grade) && (grade >= 3.5)) || grade == "C-" || grade == "c-"){
                    return "C-"
                  }
                  else if (((3.49 >= grade) && (grade >= 1.5)) || grade == "D" || grade == "d"){
                    return "D"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Scale 2"){
                
                  if (((100 >= grade) && (grade >= 85)) || grade == "A" || grade == "a"){
                    return "A"
                  }
                  else if (((84.99 >= grade) && (grade >= 80)) || grade == "A-" || grade == "a-"){
                    return "A-"
                  }
                  else if (((79.99 >= grade) && (grade >= 75)) || grade == "B+" || grade == "b+"){
                    return "B+"
                  }
                  else if (((74.99 >= grade) && (grade >= 70)) || grade == "B" || grade == "b"){
                    return "B"
                  }
                  else if (((69.99 >= grade) && (grade >= 65)) || grade == "B-" || grade == "b-"){
                    return "B-"
                  }
                  else if (((64.99 >= grade) && (grade >= 60)) || grade == "C+" || grade == "c+"){
                    return "C+"
                  }
                  else if (((59.99 >= grade) && (grade >= 55)) || grade == "C" || grade == "c"){
                    return "C"
                  }
                  else if (((54.99 >= grade) && (grade >= 50)) || grade == "C-" || grade == "c-"){
                    return "C-"
                  }
                  else if (((49.99 >= grade) && (grade >= 40)) || grade == "D" || grade == "d"){
                    return "D"
                  }
                  else{
                    return null
                  }
              }
              break;
          case "Senegal":
              
                  if ((20 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.9 >= grade) && (grade >= 12)){
                    return "B+"
                  }
                  else if ((11.9 >= grade) && (grade >= 11)){
                    return "B"
                  }
                  else if ((10.9 >= grade) && (grade >= 10.5)){
                    return "B-"
                  }
                  else if ((10.4 >= grade) && (grade >= 10.1)){
                    return "C+"
                  }
                  else if (grade == 10){
                    return "C"
                  }
                  else if ((9.9 >= grade) && (grade >= 9)){
                    return "C-"
                  }
                  else if ((8.9 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else if ((7.9 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Togo":
              
                  if ((20 >= grade) && (grade >= 16)){
                    return "A+"
                  }
                  else if ((15.99 >= grade) && (grade >= 14)){
                    return "A"
                  }
                  else if ((13.99 >= grade) && (grade >= 12)){
                    return "B"
                  }
                  else if ((11.99 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 8)){
                    return "D"
                  }
                  else{
                    return null
                  }
              break;
          case "South Africa":
              
                  if ((100 >= grade) && (grade >= 75)){
                    return "A"
                  }
                  else if ((74.99 >= grade) && (grade >= 70)){
                    return "B+"
                  }
                  else if ((69.99 >= grade) && (grade >= 60)){
                    return "B"
                  }
                  else if ((59.99 >= grade) && (grade >= 50)){
                    return "C"
                  }
                  else if ((49.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          case "Cameroon":
              if (type == "French System"){
                
                  if ((20 >= grade) && (grade >= 15)){
                    return "A+"
                  }
                  else if ((14.99 >= grade) && (grade >= 13)){
                    return "A-"
                  }
                  else if ((12.99 >= grade) && (grade >= 12)) {
                    return "B+"
                  }
                  else if ((11.99 >= grade) && (grade >= 11)){
                    return "B"
                  }
                  else if ((10.99 >= grade) && (grade >= 10)){
                    return "C"
                  }
                  else if ((9.99 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "University of Buea"){
                
                  if (((100 >= grade) && (grade >= 80)) || grade == "A" || grade == "a"){
                    return "A"
                  }
                  else if (((79 >= grade) && (grade >= 70)) || grade == "B+" || grade == "b+"){
                    return "B+"
                  }
                  else if (((69 >= grade) && (grade >= 60)) || grade == "B" || grade == "b"){
                    return "B"
                  }
                  else if (((59 >= grade) && (grade >= 55)) || grade == "C+" || grade == "c+"){
                    return "C+"
                  }
                  else if (((54 >= grade) && (grade >= 50)) || grade == "C" || grade == "c"){
                    return "C"
                  }
                  else if (((49 >= grade) && (grade >= 45)) || grade == "D+" || grade == "d+"){
                    return "F"
                  }
                  else if (((44 >= grade) && (grade >= 40)) || grade == "D" || grade == "d"){
                    return "F"
                  }
                  else if (((39 >= grade) && (grade >= 0)) || grade == "F" || grade == "f"){
                    return "F"
                  }
                  else{
                    return null
                  }
              }
              if (type == "Gce A Level"){
                if(grade == "A" || grade == "a") {
                    return "A"
                }
                else if(grade == "B" || grade == "b"){
                    return "B"
                }
                else if(grade == "C" || grade == "c"){
                    return "B"
                }
                else if(grade == "D" || grade == "d"){
                    return "C"
                }
                else if(grade == "E" || grade == "e"){
                    return "C"
                }
                else if(grade == "F" || grade == "f"){
                    return "F"
                }
                else{
                    return null
                  }
              }
            
          case "Zambia":
          if (type == "Secondary"){
                  if ((2 >= grade) && (grade >= 1)){
                    return "A"
                  }
                  else if ((4 >= grade) && (grade >= 3)){
                    return "B"
                  }
                  else if ((6 >= grade) && (grade >= 5)){
                    return "C"
                  }
                  else if ((8 >= grade) && (grade >= 7)){
                    return "D"
                  }
                  else if (grade == 9){
                    return "F"
                  }
                  else{
                    return null
                  }
                }
                if (type == "Scale 1"){
                  
                    if (((100 >= grade) && (grade >= 86)) || grade == "A+" || grade == "a+"){
                      return "A+"
                    }
                    if (((85.99 >= grade) && (grade >= 76)) || grade == "A" || grade == "a"){
                      return "A"
                    }
                    if (((75.99 >= grade) && (grade >= 66)) || grade == "B+" || grade == "b+"){
                      return "B+"
                    }
                    if (((65.99 >= grade) && (grade >= 56)) || grade == "B" || grade == "b"){
                      return "B"
                    }
                    if (((55.99 >= grade) && (grade >= 46)) || grade == "C+" || grade == "c+"){
                      return "C+"
                    }
                    if (((39.99 >= grade) && (grade >= 36)) || grade == "C" || grade == "c"){
                    return "C"
                    }
                    if (((35.99 >= grade) && (grade >= 30)) || grade == "CP" || grade == "cp"){
                    return "C-"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "D+" || grade == "d+"){
                    return "F"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "D" || grade == "d"){
                    return "F"
                    }
                    if (((29.99 >= grade) && (grade >= 0)) || grade == "E" || grade == "e"){
                      return "F"
                    }
                    else{
                      return null
                    }
                }
            
          case "China":
              
                  if ((100 >= grade) && (grade >= 90)){
                    return "A"
                  }
                  else if ((89 >= grade) && (grade >= 80)){
                    return "B"
                  }
                  else if ((79 >= grade) && (grade >= 70)){
                    return "C"
                  }
                  else if ((69 >= grade) && (grade >= 60)){
                    return "D"
                  }
                  else if ((59 >= grade) && (grade >= 0)){
                    return "F"
                  }
                  else{
                    return null
                  }
              break;
          default:
              null;
      }
      
      }
      let currentGpa = this.state.gpa;
      let gpaObj = {
        "id": id,
        "grade": result(country, type, grade)
      }
      //let newGpa = _.merge(currentGpa, gpaObj);
      //this.setState({gpa: newGpa}, ()=> {
        //console.log(result(country, type,grade));
        //console.log(this.state.gpa);
      //});
      if (_.some(currentGpa, ["id", id])){
        //if id is there remove then add new value
        let newGpa = _.remove(currentGpa, function(n) {
          return n.id != id;
        });
        let yourGpa = _.concat(newGpa, gpaObj);
      this.setState({gpa: yourGpa}, ()=> {
        //console.log(result(country, type,grade));
        //console.log(this.state.gpa);
      });

      }
      else{
      let newGpa = _.concat(currentGpa, gpaObj);
      this.setState({gpa: newGpa});
      }
      if ((this.state.country == "Nigeria" && this.state.option == "Waec") || (this.state.country == "Ghana" && this.state.option == "Waec") || (this.state.country == "Liberia" && this.state.option == "Wassce")){
        //console.log(e.target.name);
        let currentCredit = this.state.credit;
        let creditObj = {
          "id": id,
          "credit": 1
        }
        //add id so you can find the exact credit on edit
        if (_.some(currentCredit, ["id", id])){
          //if id is there remove then add new value
          let newCredit = _.remove(currentCredit, function(n) {
            return n.id != id;
          });
          let yourCredit = _.concat(newCredit, creditObj);
        this.setState({credit: yourCredit});
  
        }
        else{
        let newCredit = _.concat(currentCredit, creditObj);
        this.setState({credit: newCredit});
        }
      }
    }
    handleCourse(id, e){
      //console.log(e.target.value);
      //console.log(e.target.name);
      let currentCourse = this.state.currentCourse;
      let courseObj = {
        "id": id,
        "course": e
      }
      //add id so you can find the exact credit on edit
      if (_.some(currentCourse, ["id", id])){
        //if id is there remove then add new value
        let newCourse = _.remove(currentCourse, function(n) {
          return n.id != id;
        });
        let yourCourse = _.concat(newCourse, courseObj);
      this.setState({currentCourse: yourCourse});

      }
      else{
      let newCourse = _.concat(currentCourse, courseObj);
      this.setState({currentCourse: newCourse});
      }
    }
    calcGpa(){
      let gpa = this.state.gpa;//array us grades, convert to numerical values
      let credit = this.state.credit;
      //console.log(gpa);
      //console.log(credit);//take 1
      let creditMapped = _.map(credit, 'credit');
      this.setState({mappedCredit: creditMapped})
      //console.log("Credit Array")
      //console.log(creditMapped);
      let mapped = _.map(gpa, (n)=>{
        if (n.grade == "A+"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "A"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "A-"){
          return {
            "id": n.id,
            "gradeNo": 4.0
          }
        }
        else if (n.grade == "B+"){
          return {
            "id": n.id,
            "gradeNo": 3.3
          }
        }
        else if (n.grade == "B"){
          return {
            "id": n.id,
            "gradeNo": 3.0
          }
        }
        else if (n.grade == "B-"){
          return {
            "id": n.id,
            "gradeNo": 2.7
          }
        }
        else if (n.grade == "C+"){
          return {
            "id": n.id,
            "gradeNo": 2.3
          }
        }
        else if (n.grade == "C"){
          return {
            "id": n.id,
            "gradeNo": 2.0
          }
        }
        else if (n.grade == "C-"){
          return {
            "id": n.id,
            "gradeNo": 1.7
          }
        }
        else if (n.grade == "D"){
          return {
            "id": n.id,
            "gradeNo": 1.0
          }
        }
        else if (n.grade == "F"){
          return {
            "id": n.id,
            "gradeNo": 0
          }
        }
      });
      //console.log(mapped);//take 2
      let gradeMapped = _.map(mapped, 'gradeNo');
      this.setState({mappedGrade: gradeMapped}) //this is the us gpa here
      //console.log("Gpa Array")
      //console.log(gradeMapped);
      let products =  _.zipWith(gradeMapped, creditMapped, function(a, b){ 
      return a * b;
      });
      //console.log(products);
      let addedCredit = _.reduce(creditMapped, function(sum, n) {
        return parseInt(sum) + parseInt(n); //issue here
      }, 0);
      let addedWeight = _.reduce(products, function(sum, n) {
        return sum + n;
      }, 0);
      //console.log(addedWeight);
      //console.log(addedCredit);
      let finalWeightedGpa = addedWeight / addedCredit;
      //console.log(finalWeightedGpa.toFixed(2));
      let twoDpGpa = finalWeightedGpa.toFixed(2);
      //alert(twoDpGpa)
      this.setState({result: twoDpGpa}, ()=> {
        //console.log(userGpa);
        if (isNaN(twoDpGpa)){
          alert('Error!', 'An error occured, check your inputted grades')
        }
      })
     let editArray3 = _.map(this.state.rows, 'id');
     let gpaArray = _.map(this.state.gpa, 'grade');
     let creditArray = _.map(this.state.credit, 'credit');
     let countryGradeArray = _.map(this.state.pureGrade, 'countryGrade');
     let courseArray = _.map(this.state.currentCourse, 'course');
     let twoDpgrade = _.map(gradeMapped, (a)=> {
      return a.toFixed(2);
     })
     //console.log(courseArray);
     //console.log(countryGradeArray)
     //console.log(gradeMapped)
     //console.log(editArray3)
     let result = _.zipWith(editArray3, gpaArray, twoDpgrade, creditArray, countryGradeArray, courseArray, function(a, b, c, d, e, f) {
      return {
        "id": a,
        "usGrade": b,
        "gpa": c,
        "credit": d,
        "countryGrade": e,
        "course": f
      };
    });
    //console.log(result)
    this.setState({resultOverview: result})
    }
    handleCountryChange (country) {
        let {countryOptions} = this.state;
		//console.log('You\'ve selected:', country);
		this.setState({ country: country }, ()=>{
      let emmpiedStuff = [];
      this.setState({resultOverview: emmpiedStuff, credit: emmpiedStuff, gpa: emmpiedStuff}, ()=> {
        
      })
      //console.log(this.state.country)
            if (country == "Egypt"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(EGYPT_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Nigeria"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(NIGERIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Ghana"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(GHANA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Ethiopia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(ETHIOPIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Kenya"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(KENYA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Liberia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(LIBERIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Namibia"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(NAMIBIA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Rwanda"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(RWANDA_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Cameroon"){
                this.setState({isHidden: false}, ()=>{
                    let emptyArray = []
                    this.setState({countryOptions: emptyArray}, ()=> {
                    let work = _.merge(CAMEROON_OPTIONS, this.state.countryOptions)
                    this.setState({countryOptions: work}, ()=>{
                        //console.log(this.state.countryOptions)
                    })
                })
                })
            }
            else if (country == "Zambia"){
              this.setState({isHidden: false}, ()=>{
                  let emptyArray = []
                  this.setState({countryOptions: emptyArray}, ()=> {
                  let work = _.merge(ZAMBIA_OPTIONS, this.state.countryOptions)
                  this.setState({countryOptions: work}, ()=>{
                      //console.log(this.state.countryOptions)
                  })
              })
              })
          }
            else{
              let emptyArray = []
              this.setState({isHidden: true, countryOptions: emptyArray})
            }
        });
    }
  async componentDidMount(){
    await AsyncStorage.getItem('TOKEN', (err, result)=>{
      if (result){
        //get user here
        this.setState({token: result},()=>{
          this.setSlider();
        })
      }
    })
  }
  renderHeader = () => {
  return <Text style={{fontSize: 14, alignSelf:'center', paddingVertical:10, fontWeight:'bold'}}> {this.props.schools.count} {this.props.schools.count == 1 ? <Text>School Found</Text>:  <Text>Schools Found</Text> }</Text>;
  };
  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          marginVertical: 20,
          borderColor: "#CED0CE",
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity style={{paddingVertical: 10, backgroundColor:'#085078', width:150, textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <View style={{textAlign: 'center', justifyContent:'space-around', flexDirection:'row',alignSelf: 'center'}}>
      <Text style={{fontSize:20, color:"white"}}>Load More</Text>
      </View>
      </TouchableOpacity>
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginTop:10,
          marginBottom:10,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  levelChange(value){
    this.setState({level: value})
  }
  stateChange(value){
    this.setState({usState: value})
  }
  gpaChange(value){
    this.setState({gpa: value}, ()=>{
      //alert(parseFloat(value))
    })
  }
  _keyExtractor = (item, index) => item.id;
  render() {
    const {id, firstName, lastName, coin, major, image, referralToken, scholarshipCountry, gpa, applicantCountry, saved, criteria, level} = this.props.currentUser;
    const {height, width} = Dimensions.get('window');
    const scrollEnabled = this.state.screenHeight > height;
    const deviceWidth = width;
    const bannerHeight = height/20;
    const btnWidth = width/2;
    const btnWidth1 = width - 200;
    const deviceWidthinner = width - 40;
    const navWidth = ((width/3) - (10 + 10));
    const navHeight = (height/3) - 40;
    const BContent = <Icon style={[styles.btn, styles.btnModal]} name='close' size={30} color="#085078" />;
    let options = this.state.countryOptions;
    
    return (
      <React.Fragment>
      
      <ScrollView 
      style={{flex:0.85}}
      contentContainerStyle={{flexGrow: 0.85, alignContent:'center'}}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={this.onContentSizeChange}
      >
      
    <View style={styles.mainContent}>
    <StatusBar
        barStyle="light-content"
        backgroundColor="#085078"
        />
    
        <View style={{flex: 0.3, height: '90%', marginTop:-2, padding: 0, alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 1}}>
        
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row'}} >
        <View style={{flex: 1, paddingRight:20, paddingLeft:20}}>
      <Dropdown
        label='Country'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={COUNTRIES}
        onChangeText={this.handleCountryChange.bind(this)}
      />
      </View>
      </View>
      <View style={{marginTop: 0, marginBottom: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}} >
        <View style={{flex: 1, paddingRight:20, paddingLeft:20}}>
        {!this.state.isHidden ?
          <Dropdown
        label='Grade System'
        baseColor='#085078'
        textColor='#085078'
        labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
        style={{fontFamily:'AdventPro-Bold'}}
        fontSize={18}
        data={options}
        onChangeText={this.handleOptionChange.bind(this)}
        />
        :
        null
        }
      </View>
      </View>
        </View>

        <View style={{flex: 1, width:'100%', alignSelf: 'stretch', height: '100%', marginTop:5, paddingLeft:10, paddingRight:10, paddingBottom:15, alignContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 2}}>
              <View style={{flex:1, width:'100%', marginTop:3, flexDirection:'row', paddingLeft:5, paddingRight:10}}>
              <Text style={{fontSize: 14, fontFamily:'AdventPro-Bold', marginTop:4, color:'#085078', marginRight:10}}>#</Text>
              <Text style={{fontSize: 14, width: (deviceWidthinner/2)-65, fontFamily:'AdventPro-Bold', marginTop:4, color:'#085078', marginRight:10}}>Class (optional)</Text>
              {(this.state.country == "Nigeria" && this.state.option == "Waec") || (this.state.country == "Ghana" && this.state.option == "Waec") || (this.state.country == "Liberia" && this.state.option == "Wassce")?
                null
                :
              <Text style={{fontSize: 14, width: (deviceWidthinner/2)-95, fontFamily:'AdventPro-Bold', marginTop:4, color:'#085078', marginRight:10}}>Credits <Text style={{color:'red'}}>*</Text></Text>
              }
              <Text style={{fontSize: 14, width: (deviceWidthinner/2)-95, fontFamily:'AdventPro-Bold', marginTop:4, color:'#085078', marginRight:10}}>Grade <Text style={{color:'red'}}>*</Text></Text>
              </View>
            {this.state.rows.map((row, index) =>
              <View key={row.id} style={{flex:1, width:'100%', elevation: 2, backgroundColor:'white', marginBottom:6, marginTop:6, flexDirection:'row', paddingLeft:5, paddingRight:10}}>
              <Text style={{fontSize: 14, fontWeight:'bold', marginTop:36, color:'#085078', marginRight:10}}>{index + 1}</Text>
              <View style={{width: (deviceWidthinner/2)-65, fontSize: 30, marginRight:15}}>
              <TextField
              label='Class'
              name={`${row.id}`}
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.handleCourse.bind(row.id, value)}
              />
              </View>
              {(this.state.country == "Nigeria" && this.state.option == "Waec") || (this.state.country == "Ghana" && this.state.option == "Waec") || (this.state.country == "Liberia" && this.state.option == "Wassce")?
                null
                :
              <View style={{width: (deviceWidthinner/2)-95, fontSize: 30, marginRight:15}}>
              <TextField
              label='Credits'
              name={`${row.id}`} 
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(value) => this.handleCredit(row.id, value)}
              />
              </View>
            }
              <View style={{width: (deviceWidthinner/2)-95, fontSize: 30, marginRight:5}}>
              <TextField
              name={`${row.id}`}
              label='Grade'
              baseColor='#085078'
              textColor='#085078'
              labelTextStyle = {{fontFamily: 'AdventPro-Bold'}}
              style={{fontFamily:'AdventPro-Bold'}}
              onChangeText={(e) => this.handleChange(row.id, e)}
              />
              </View>
              <View style={{width: 35, fontSize: 30, marginRight:15, marginTop:15}}>
              <TouchableOpacity onPress={this.removeRow.bind(this, row.id)}>
              <Icon style={{textAlign: 'center'}} name="times-circle" size={15} color="#085078" />
              </TouchableOpacity>
              </View>
              </View>
              
            )}
            
            <View style={{height: 35,  flexDirection:'row', marginTop:10}}>
            <TouchableOpacity onPress={this.addRow} style={{height: 35, marginRight: 10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="plus" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", fontFamily:'AdventPro-Bold', marginHorizontal:10}}>ADD ROW</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.clearRows} style={{height: 35, marginRight:10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="undo" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", fontFamily:'AdventPro-Bold', marginHorizontal:10}}>CLEAR GRADE</Text>
            </TouchableOpacity>
            </View>
            <View style={{height: 35,  flexDirection:'row', marginTop:10}}>
            <TouchableOpacity onPress={this.calcGpa} style={{height: 35, marginRight:10, flexDirection:'row', padding:4, alignSelf:'flex-end', borderRadius: 2, borderColor: '#085078', borderWidth: 1}}>
            <Icon name="calculator" size={15} style={{color:'#085078', marginTop: 5}}/><Text style={{fontSize:18, color:"#085078", fontFamily:'AdventPro-Bold', marginHorizontal:10}}>Calculate GPA</Text>
            </TouchableOpacity>
            </View>
        </View>
        
        <View style={{flex: 0.10, width:'100%', flexDirection:'row', alignContent: 'center', alignText:'center', alignItems: 'center', marginVertical: 5, elevation: 1}}>
        <View style={{width:'80%'}}>
        <Text style={{fontSize: 20, color:'#085078', marginLeft: 15, fontFamily:'AdventPro-Bold', marginRight:20}}>Cumulative GPA:</Text>
        </View>
        <View style={{alignContent:'flex-end', width:'20%'}}>
        <Text style={{color:'#085078', marginTop: 5, marginRight:5, fontSize:19, fontFamily:'AdventPro-Bold'}}>
        {!this.state.result ?
        <React.Fragment>
        0.00
        </React.Fragment>
        :
        <React.Fragment>
        { isNaN(this.state.result) ?
        <React.Fragment>
        0.00
        </React.Fragment>
        :
        <React.Fragment>
          {this.state.result}
        </React.Fragment>
        }
        </React.Fragment>
      }
        </Text>
        </View>
        </View>
        <View style={[styles.modal, styles.modal4]}>
        <Text style={{fontSize: 22, color: '#085078', marginTop:8, marginBottom:0, paddingBottom:0}}>The Grade Scale</Text>
        <View style={{ flex: 0.9, width:'100%', paddingBottom:20, paddingLeft:25, paddingRight:25 }}>
        <GpaScale gpaCountry={this.state.country} gpaOption={this.state.option}/>
        </View>
        

        </View>
        
    </View>
    
    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} cancelable={false} animation="fade"/>
  
    </ScrollView>
    <View style={{flex:0.15, width:'100%', padding: 6, backgroundColor: '#085078', alignSelf: 'center',  marginTop:0, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', elevation: 2}}>
        <Text style={{textAlign: 'center', alignSelf:'center', fontFamily:'AdventPro-Bold', color:'#ffffff'}}>{this.state.currentText}</Text>
        <View style={{flexDirection:'row', marginTop: 8, justifyContent:'space-evenly', alignContent:'space-between'}}>
        {this.state.slideText.map((item, index)=>{
          if(this.state.currentIndex == index){
            return <View style={{
              width: 10, 
              height: 10, 
              borderRadius: 5, 
              backgroundColor:'#ffffff', 
              marginRight: 10,
            }}/>
            
          }
          else{
            return <View style={{
              width: 10, 
              height: 10, 
              borderRadius: 5, 
              backgroundColor:'grey', 
              marginRight: 10
            }}/>
          }
        })}
        </View>
        </View>
    </React.Fragment>
    )
}
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 500,
    width:'100%',
    backgroundColor:'white', 
  },
  modal5: {
    height: 450
  },
  modal6: {
    height: 250
  },
  mainContent: {
    flex: 0.75,
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211,0.3)',
  },
  title:{
    fontSize: 30,
    color: '#ffffff',
    //fontWeight: 'bold'
  },
  logo: {
    width: 140,
    height: 165,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

});

function mapper(state) {
  return {
      is_fetching: state.user.is_fetching,
      currentUser: state.user.data,
      statesData: state.usState.data,
      countries: state.country.data,
      scholarships: state.scholarship.data,
      schools: state.gpaSchool.data,
      error: state.user.error,
      redirect: state.user.redirect
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    gpaSearch: (url, token, gpa, level, state, id, offset)=>
    {
        dispatch(
            gpaSearchCall(url, token, gpa, level, state, id, offset)
        )
    },
    fetchStates: (url) => 
      {
        dispatch(
          getStatesCall(url)
        );
      },
      fetchCountries: (url) => 
      {
        dispatch(
          getApplicantCountriesCall(url)
        );
      },
  };
};

export default connect(mapper, mapDispatchToProps)(CalculatorScreen);