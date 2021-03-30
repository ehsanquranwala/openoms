import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { selectProduct} from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
  import { Redirect} from "react-router-dom";
  import { Slider,Switch,Checkbox  } from '@material-ui/core';
  import Child from './dropdown';
  import 'react-dropdown-tree-select/dist/styles.css';
  
  var ls = new SecureLS({encodingType: 'aes'});
 let categories=[];


 const thorns = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 25,
    label: 'None',
  },
  {
    value: 50,
    label: 'One',
  },
  {
    value: 75,
    label: 'Few',
  },
  {
    value: 100,
    label: 'Many',
  },
];
const Salt_Water = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 50,
    label: 'Salt',
  },
  {
    value: 100,
    label: 'Fresh',
  },
];
const Meat_Whiteness = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 33,
    label: 'Very Light',
  },
  {
    value: 66,
    label: 'Light',
  },
  {
    value: 99,
    label: 'Dark',
  },
];
const Taste_Class = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 25,
    label: 'Best',
  },
  {
    value: 50,
    label: 'Good',
  },
  {
    value: 75,
    label: 'Normal',
  },
  {
    value: 100,
    label: 'Lesser',
  },
];
const Price_Class = [
  {
    value: 0,
    label: 'A',
  }
  ,{
    value: 9,
    label: 'B',
  },
  {
    value: 18,
    label: 'C',
  },
  {
    value: 27,
    label: 'D',
  }
  ,{
    value: 36,
    label: 'E',
  },
  {
    value: 45,
    label: 'F',
  },
  {
    value: 54,
    label: 'G',
  },
  {
    value: 63,
    label: 'H',
  },
  {
    value: 72,
    label: 'I',
  },{
    value: 81,
    label: 'J',
  },{
    value: 90,
    label: 'K',
  },{
    value: 99,
    label: 'L',
  },
];
const Net_Wt_Steaks_Min = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
    label: '',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 30,
    label: '',
  },
  {
    value: 40,
    label: '40%',
  },
  {
    value: 50,
    label: '',
  },
  {
    value: 60,
    label: '60%',
  },
  {
    value: 70,
    label: '',
  },
  {
    value: 80,
    label: '80%',
  },
  {
    value: 90,
    label: '',
  },
  {
    value: 100,
    label: '100%',
  },
];
const Net_Wt_Fillets_Min = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
    label: '',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 30,
    label: '',
  },
  {
    value: 40,
    label: '40%',
  },
  {
    value: 50,
    label: '',
  },
  {
    value: 60,
    label: '60%',
  },
  {
    value: 70,
    label: '',
  },
  {
    value: 80,
    label: '80%',
  },
  {
    value: 90,
    label: '',
  },
  {
    value: 100,
    label: '100%',
  },
];
const Net_Wt_Whole_Min = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
    label: '',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 30,
    label: '',
  },
  {
    value: 40,
    label: '40%',
  },
  {
    value: 50,
    label: '',
  },
  {
    value: 60,
    label: '60%',
  },
  {
    value: 70,
    label: '',
  },
  {
    value: 80,
    label: '80%',
  },
  {
    value: 90,
    label: '',
  },
  {
    value: 100,
    label: '100%',
  },
];
const Length = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 25,
    label: 'Short',
  },
  {
    value: 50,
    label: 'Medium',
  },
  {
    value: 75,
    label: 'Long',
  },
  {
    value: 100,
    label: 'Very Long',
  },
];
const Body = [
  {
    value: 0,
    label: 'All',
  }
  ,{
    value: 33,
    label: 'Slim',
  },
  {
    value: 66,
    label: 'Medium',
  },
  {
    value: 99,
    label: 'Round',
  },
];
const Size = [
  {
    value: 0,
    label: 'All',
  },
  {
    value: 20,
    label: 'Tiny',
  }
  ,{
    value: 40,
    label: 'Small',
  },
  {
    value: 60,
    label: 'Medium',
  },
  {
    value: 80,
    label: 'Large',
  },
  {
    value: 100,
    label: 'x-Large',
  },
];
function valuetext(value) {
  return `${value}`+'0g';
}
function valueLabelFormat(value) {
  return thorns.findIndex((thorn) => thorn.value === value) + 1;
}
 
   class Category extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {product:[],
                    catId:0,
                    category:[],
                    value:10,
                    fBone:4,
                    Salt_Water:2,
                    filter:{Thorns:4,Salt_Water:2,Meat_Whiteness:0,Taste_Class:0,Length:0,Body:0,Size:0,Steaks_Available:false,Fillets_Available:false,Whole_Available:false,Dots_Spots:false,Lines_Stripes:false,Price_Class:[0,99],Net_Wt_Steaks_Min:10,Net_Wt_Fillets_Min:10,Net_Wt_Whole_Min:10},
                    colorFilter:{'white':true, 'black':true, 'silver':true, 'golden':true, 'gray':true, 'red':true,
                     'pink':true, 'green':true, 'brown':true, 'purple':true, 'yellow':true, 'orange':true},
                    appliedFilter:[],
                    select_all_color:true,
                    navigate:false
                  };
        }
    componentDidMount(){
      categories=this.props.category
      this.filter()
    }
    filter(){
      let {filter,colorFilter}=this.state;
      let filtered=[];
     
        this.props.product.map((fishDataa) => {

        let thorn=(fishDataa.filter[`Thorns`]<5);
        if(filter[`Thorns`]!=4){ thorn=(filter[`Thorns`]==fishDataa.filter[`Thorns`]) }

        let Salt_Water=(fishDataa.filter[`Salt_Water`]<2);
        if(filter[`Salt_Water`]!=2){  Salt_Water=(filter[`Salt_Water`]==fishDataa.filter[`Salt_Water`]) }

        let Meat_Whiteness=(fishDataa.filter[`Meat_Whiteness`]<5);
        if(filter[`Meat_Whiteness`]!=0){ Meat_Whiteness=(filter[`Meat_Whiteness`]==fishDataa.filter[`Meat_Whiteness`]) }

        let Taste_Class=(fishDataa.filter[`Taste_Class`]<10);
        if(filter[`Taste_Class`]!=0){ Taste_Class=(filter[`Taste_Class`]==fishDataa.filter[`Taste_Class`]) }
       //Price Filter
       var a=filter[`Price_Class`],tempo=0,tempo1=0;
       if( a[0]==0){ tempo=12
       }else if(a[0]==9){tempo=11
       }else if(a[0]==18){tempo=10
       }else if(a[0]==27){tempo=9
       }else if(a[0]==36){tempo=8
       }else if(a[0]==45){ tempo=7
       }else if(a[0]==54){tempo=6
       }else if(a[0]==63){tempo=5
       }else if(a[0]==72){tempo=4
       }else if(a[0]==81){ tempo=3
       }else if(a[0]==90){tempo=2
       }else if( a[0]==99){tempo=1}
       else{tempo=13}

      if( a[1]==0){ tempo1=12
        }else if( a[1]==9){ tempo1=11
        }else if( a[1]==18){tempo1=10
        }else if( a[1]==27){tempo1=9
        }else if( a[1]==36){tempo1=8
        }else if( a[1]==45){ tempo1=7
        }else if( a[1]==54){tempo1=6
        }else if( a[1]==63){tempo1=5
        }else if( a[1]==72){tempo1=4
        }else if(a[1]==81){ tempo1=3
        }else if( a[1]==90){tempo1=2
        }else if( a[1]==99){tempo1=1}
        else{tempo1=1}
        let Price_Class_Low=(fishDataa.filter[`Price_Class`]<=15);
        let Price_Class_High=(fishDataa.filter[`Price_Class`]>=0);
       if(tempo<13 || tempo1>1){ 
         Price_Class_Low=( fishDataa.filter[`Price_Class`]>=tempo1)
         Price_Class_High=(fishDataa.filter[`Price_Class`]<=tempo)}

        let Length=(fishDataa.filter[`Length`]<10);
        if(filter[`Length`]!=0){ Length=(filter[`Length`]==fishDataa.filter[`Length`]) }
        let Body=(fishDataa.filter[`Body`]<10);
        if(filter[`Body`]!=0){ Taste_Class=(filter[`Body`]==fishDataa.filter[`Body`]) }
        let Size=(fishDataa.filter[`Size`]<10);
        if(filter[`Size`]!=0){ Taste_Class=(filter[`Size`]==fishDataa.filter[`Size`]) }
        
        let Net_Wt_Steaks_Min=(fishDataa.filter[`Net_Wt_Steaks_Min`]<=100);
        if(filter[`Net_Wt_Steaks_Min`]!=10){ 
          Net_Wt_Steaks_Min=((filter[`Net_Wt_Steaks_Min`]*10)<=fishDataa.filter[`Net_Wt_Steaks_Min`]) }

          let Net_Wt_Fillets_Min=(fishDataa.filter[`Net_Wt_Fillets_Min`]<=100);
        if(filter[`Net_Wt_Steaks_Min`]!=10){ 
          Net_Wt_Fillets_Min=((filter[`Net_Wt_Fillets_Min`]*10)<=fishDataa.filter[`Net_Wt_Fillets_Min`]) }

          let Net_Wt_Whole_Min=(fishDataa.filter[`Net_Wt_Whole_Min`]<=100);
        if(filter[`Net_Wt_Whole_Min`]!=10){ 
          Net_Wt_Whole_Min=((filter[`Net_Wt_Whole_Min`]*10)<=fishDataa.filter[`Net_Wt_Whole_Min`]) }

        let Steaks_Available=(fishDataa.filter[`Steaks_Available`]<5);
        if(filter[`Steaks_Available`]!=false){ Steaks_Available=(1==fishDataa.filter[`Steaks_Available`]) }
        let Fillets_Available=(fishDataa.filter[`Fillets_Available`]<5);
        if(filter[`Fillets_Available`]!=false){ Fillets_Available=(1==fishDataa.filter[`Fillets_Available`]) }
        let Whole_Available=(fishDataa.filter[`Whole_Available`]<5);
        if(filter[`Whole_Available`]!=false){ Whole_Available=(1==fishDataa.filter[`Whole_Available`]) }

        let Scales=(fishDataa.filter[`Scales`]<10);
        if(filter[`Scales`]!=false){ Scales=(1==fishDataa.filter[`Scales`]) }
        let Dots_Spots=(fishDataa.filter[`Dots_Spots`]<10);
        if(filter[`Dots_Spots`]!=false){ Dots_Spots=(1==fishDataa.filter[`Dots_Spots`]) }
        let Lines_Stripes=(fishDataa.filter[`Lines_Stripes`]<10);
        if(filter[`Lines_Stripes`]!=false){ Lines_Stripes=(1==fishDataa.filter[`Lines_Stripes`]) }
       
        //Red Check
       let red1=fishDataa.filter[`Skin_Color_1`]!='red';
       let red2=fishDataa.filter[`Skin_Color_2`]!='red';
       let red3=fishDataa.filter[`Skin_Color_3`]!='red';
       if(colorFilter["red"]==true){
        red1=( fishDataa.filter[`Skin_Color_1`]=='red');
        red2=( fishDataa.filter[`Skin_Color_2`]=='red')
        red3=(fishDataa.filter[`Skin_Color_3`]=='red')} 
         //Red Check
       let white1=fishDataa.filter[`Skin_Color_1`]!='white';
       let white2=fishDataa.filter[`Skin_Color_2`]!='white';
       let white3=fishDataa.filter[`Skin_Color_3`]!='white';
       if(colorFilter["white"]==true){
        white1=( fishDataa.filter[`Skin_Color_1`]=='white');
        white2=( fishDataa.filter[`Skin_Color_2`]=='white')
        white3=(fishDataa.filter[`Skin_Color_3`]=='white')} 
         //Red Check
       let black1=fishDataa.filter[`Skin_Color_1`]!='black';
       let black2=fishDataa.filter[`Skin_Color_2`]!='black';
       let black3=fishDataa.filter[`Skin_Color_3`]!='black';
       if(colorFilter["black"]==true){
        black1=( fishDataa.filter[`Skin_Color_1`]=='black');
        black2=( fishDataa.filter[`Skin_Color_2`]=='black')
        black3=(fishDataa.filter[`Skin_Color_3`]=='black')} 
         //Red Check
       let silver1=fishDataa.filter[`Skin_Color_1`]!='silver';
       let silver2=fishDataa.filter[`Skin_Color_2`]!='silver';
       let silver3=fishDataa.filter[`Skin_Color_3`]!='silver';
       if(colorFilter["silver"]==true){
        silver1=( fishDataa.filter[`Skin_Color_1`]=='silver');
        silver2=( fishDataa.filter[`Skin_Color_2`]=='silver')
        silver3=(fishDataa.filter[`Skin_Color_3`]=='silver')} 
         //Red Check
       let golden1=fishDataa.filter[`Skin_Color_1`]!='golden';
       let golden2=fishDataa.filter[`Skin_Color_2`]!='golden';
       let golden3=fishDataa.filter[`Skin_Color_3`]!='golden';
       if(colorFilter["golden"]==true){
        golden1=( fishDataa.filter[`Skin_Color_1`]=='golden');
        golden2=( fishDataa.filter[`Skin_Color_2`]=='golden')
        golden3=(fishDataa.filter[`Skin_Color_3`]=='golden')} 
         //Red Check
       let gray1=fishDataa.filter[`Skin_Color_1`]!='gray';
       let gray2=fishDataa.filter[`Skin_Color_2`]!='gray';
       let gray3=fishDataa.filter[`Skin_Color_3`]!='gray';
       if(colorFilter["gray"]==true){
        gray1=( fishDataa.filter[`Skin_Color_1`]=='gray');
        gray2=( fishDataa.filter[`Skin_Color_2`]=='gray')
        gray3=(fishDataa.filter[`Skin_Color_3`]=='gray')} 
         //Red Check
       let pink1=fishDataa.filter[`Skin_Color_1`]!='pink';
       let pink2=fishDataa.filter[`Skin_Color_2`]!='pink';
       let pink3=fishDataa.filter[`Skin_Color_3`]!='pink';
       if(colorFilter["pink"]==true){
        pink1=( fishDataa.filter[`Skin_Color_1`]=='pink');
        pink2=( fishDataa.filter[`Skin_Color_2`]=='pink')
        pink3=(fishDataa.filter[`Skin_Color_3`]=='pink')} 
         //Red Check
       let green1=fishDataa.filter[`Skin_Color_1`]!='green';
       let green2=fishDataa.filter[`Skin_Color_2`]!='green';
       let green3=fishDataa.filter[`Skin_Color_3`]!='green';
       if(colorFilter["green"]==true){
        green1=( fishDataa.filter[`Skin_Color_1`]=='green');
        green2=( fishDataa.filter[`Skin_Color_2`]=='green')
        green3=(fishDataa.filter[`Skin_Color_3`]=='green')} 
         //Red Check
       let brown1=fishDataa.filter[`Skin_Color_1`]!='brown';
       let brown2=fishDataa.filter[`Skin_Color_2`]!='brown';
       let brown3=fishDataa.filter[`Skin_Color_3`]!='brown';
       if(colorFilter["brown"]==true){
        brown1=( fishDataa.filter[`Skin_Color_1`]=='brown');
        brown2=( fishDataa.filter[`Skin_Color_2`]=='brown')
        brown3=(fishDataa.filter[`Skin_Color_3`]=='brown')} 
         //Red Check
       let purple1=fishDataa.filter[`Skin_Color_1`]!='purple';
       let purple2=fishDataa.filter[`Skin_Color_2`]!='purple';
       let purple3=fishDataa.filter[`Skin_Color_3`]!='purple';
       if(colorFilter["purple"]==true){
        purple1=( fishDataa.filter[`Skin_Color_1`]=='purple');
        purple2=( fishDataa.filter[`Skin_Color_2`]=='purple')
        purple3=(fishDataa.filter[`Skin_Color_3`]=='purple')} 
         //Red Check
       let yellow1=fishDataa.filter[`Skin_Color_1`]!='yellow';
       let yellow2=fishDataa.filter[`Skin_Color_2`]!='yellow';
       let yellow3=fishDataa.filter[`Skin_Color_3`]!='yellow';
       if(colorFilter["yellow"]==true){
        yellow1=( fishDataa.filter[`Skin_Color_1`]=='yellow');
        yellow2=( fishDataa.filter[`Skin_Color_2`]=='yellow')
        yellow3=(fishDataa.filter[`Skin_Color_3`]=='yellow')} 
         //Red Check
       let orange1=fishDataa.filter[`Skin_Color_1`]!='orange';
       let orange2=fishDataa.filter[`Skin_Color_2`]!='orange';
       let orange3=fishDataa.filter[`Skin_Color_3`]!='orange';
       if(colorFilter["orange"]==true){
        orange1=( fishDataa.filter[`Skin_Color_1`]=='orange');
        orange2=( fishDataa.filter[`Skin_Color_2`]=='orange')
        orange3=(fishDataa.filter[`Skin_Color_3`]=='orange')} 
        
    
         if(thorn&& Salt_Water&&Meat_Whiteness&&Taste_Class&&Steaks_Available&&Fillets_Available&&Whole_Available&&Scales&&Dots_Spots&&Lines_Stripes&&Length&&Body&&Size&&Price_Class_Low&&Price_Class_High&Net_Wt_Steaks_Min&&Net_Wt_Fillets_Min&&Net_Wt_Whole_Min
    /*      && red1|| white1|| black1|| gray1 || silver1 || brown1 || purple1 || yellow1||orange1||green1||pink1||golden1 &&
            red2|| white2|| black2|| gray2 || silver2 || brown2 || purple2 || yellow2||orange2||green2||pink2||golden2 &&
            red3|| white3|| black3|| gray3 || silver3 || brown3 || purple3 || yellow3||orange3||green3||pink3||golden3*/ ){
              filtered.push(fishDataa)
           }
        })
     
        console.log('filtered',filtered)
        
        this.setState({appliedFilter:filtered});

    }
    
    render() {
      let { value, fBone,filter,appliedFilter,Steaks,Fillets,colorFilter,select_all_color} = this.state
    var tempo=0,tempo1=0;
    var color=this.state.colorFilter
    const { navigate } = this.state
    if (navigate) {
      return <Redirect to="/product" push={true} />
    }
      return (

        <div style={{marginTop:20,padding:10}}>
            <Row>
            
              <Col md="3">
              <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Thorns</Label>
               <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={25}
                    marks={thorns}
                    track={false}
                    valueLabelDisplay="auto"
                    onChange={(e,a)=>{
                      a==0? tempo=4:
                      a==25?tempo=0:
                      a==50?tempo=1:
                      a==75?tempo=2:
                      a==100?tempo=3:
                      tempo=4
                      
                      Object.assign(filter,{'Thorns':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}}
                  />
                  </div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Water</Label>
                   <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={50}
                    marks={Salt_Water}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=2:
                      a==50?tempo=1:
                      a==100?tempo=0:
                      tempo=2
                      
                      Object.assign(filter,{'Salt_Water':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}}
                  /></div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Meat Whiteness</Label>
                  <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={33}
                    marks={Meat_Whiteness}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==33?tempo=1:
                      a==66?tempo=2:
                      a==99?tempo=3:
                      tempo=0
                      
                      Object.assign(filter,{'Meat_Whiteness':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}}
                  /></div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Taste Class</Label>
                  <Slider
                  
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={25}
                    marks={Taste_Class}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==25?tempo=4:
                      a==50?tempo=3:
                      a==75?tempo=2:
                      a==100?tempo=1:
                      tempo=0
                      
                      Object.assign(filter,{'Taste_Class':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}}
                  /></div>
              
              <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Price Class</Label>
                  <Slider
                    defaultValue={[0,99]}
                    marks={Price_Class}
                    aria-labelledby="track-false-slider"
                    step={9}
                    onChange={(e,a)=>{
                      Object.assign(filter,{'Price_Class':a });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  /></div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Whole (Net Wt)</Label>
                  <Slider
                    defaultValue={0}
                    marks={Net_Wt_Whole_Min}
                    aria-labelledby="track-false-slider"
                    step={0}
                    onChange={(e,a)=>{
                      Object.assign(filter,{'Net_Wt_Whole_Min':a })
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  /></div>
                 <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Steaks (Net Wt)</Label>
                  <Slider
                    defaultValue={0}
                    marks={Net_Wt_Steaks_Min}
                    aria-labelledby="track-false-slider"
                    step={0}
                    onChange={(e,a)=>{
                      Object.assign(filter,{'Net_Wt_Steaks_Min':a })
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  />
                  </div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Fillets (Net Wt)</Label>
                  <Slider
                    defaultValue={0}
                    marks={Net_Wt_Fillets_Min}
                    aria-labelledby="track-false-slider"
                    step={0}
                    onChange={(e,a)=>{
                      Object.assign(filter,{'Net_Wt_Fillets_Min':a })
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  /></div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Fish Length</Label>
                  <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-range-slider"
                    step={25}
                    marks={Length}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==25?tempo=1:
                      a==50?tempo=2:
                      a==75?tempo=3:
                      a==100?tempo=4:
                      
                      tempo=0
                      
                      Object.assign(filter,{'Length':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  />  </div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Fish Body</Label>
                  <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-range-slider"
                    step={33}
                    marks={Body}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==33?tempo=1:
                      a==66?tempo=2:
                      a==99?tempo=3:
                      tempo=0
                      
                      Object.assign(filter,{'Body':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  />  </div>
                  <div style={{flexDirection:"row",display:"flex"}}>
              <Label size='sm' style={{padding:10}}>Fish Size</Label>
                  <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-range-slider"
                    step={20}
                    marks={Size}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==20?tempo=1:
                      a==40?tempo=2:
                      a==60?tempo=3:
                      a==80?tempo=4:
                      a==100?tempo=5:
                      tempo=0

                      Object.assign(filter,{'Size':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  /></div>
                  <div style={{marginLeft:30}}>
                  <Row>
                  <Col md='6'>
                  <Label size='sm'>Steaks</Label>
                   <Switch
                        checked={filter['Steaks_Available']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Steaks_Available':!filter['Steaks_Available'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /> </Col>
                      <Col md='6'>
                      <Label size='sm'>Fillets</Label>
                      <Switch
                        checked={filter['Fillets_Available']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Fillets_Available':!filter['Fillets_Available'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                      </Col>
                      </Row>
                    <Row>
                       <Col md='6'>  
                            <Label size='sm'>Whole</Label>
                            <Switch
                              checked={filter['Whole_Available']}
                              onChange={()=>{ 
                                Object.assign(filter,{'Whole_Available':!filter['Whole_Available'] });
                              this.setState({filter:filter}) 
                              this.filter()}}
                              color='primary'
                              name="checkedA"
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                      </Col>
                      <Col md='6'>
                          <Label size='sm'>Scales</Label>
                          <Switch
                            checked={filter['Scales']}
                            onChange={()=>{ 
                              Object.assign(filter,{'Scales':!filter['Scales'] });
                            this.setState({filter:filter}) 
                            this.filter()}}
                            color='primary'
                            name="checkedA"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                      </Col>
                    </Row>
                       <Row>
                         <Col md='6'>
                       <Label size='sm'>Lines</Label>
                      <Switch
                        checked={filter['Lines_Stripes']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Lines_Stripes':!filter['Lines_Stripes'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /></Col>
                      <Col md='6'>
                       <Label size='sm'>Dots</Label>
                      <Switch
                        checked={filter['Dots_Spots']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Dots_Spots':!filter['Dots_Spots'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                      </Col>
                      </Row>
                          </div>
                      <div>
                        <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between",padding:20}}>
                      <Label size='sm'>Fish Color</Label>
                      <Button size='sm' onClick={()=>{
                   color['white']=true; color['black']=true; color['silver']=true; color['golden']=true; 
                   color['gray']=true; color['red']=true; color['pink']=true; color['green']=true;
                    color['brown']=true; color['purple']=true; color['yellow']=true; color['orange']=true
                       
                       this.filter()}} > Select all</Button>
                         <Button size='sm' onClick={()=>{
                   color['white']=false; color['black']=false; color['silver']=false;color['golden']=false; 
                   color['gray']=false; color['red']=false; color['pink']=false; color['green']=false;
                    color['brown']=false; color['purple']=false; color['yellow']=false; color['orange']=false
                       
                       this.filter()}} >Clear</Button>
                   </div>
                      <div style={{flexDirection:"row",justifyContent:"space-between"}}> 

                      <Checkbox 
                      checked={color['white']}
                        onChange={(e,w)=>{
                          color['white']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="white"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'white',borderRadius:0,borderColor:'white'}}
                      />
                        <Checkbox
                        checked={color['black']}
                        onChange={(e,w)=>{
                          color['black']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'black',borderColor:'black',borderRadius:0}}
                      />
                      <Checkbox
                      checked={color['silver']}
                        onChange={(e,w)=>{
                          color['silver']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="silver"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'silver',borderColor:'silver',borderRadius:0}}
                      />
                      <Checkbox
                      checked={color['golden']}
                        onChange={(e,w)=>{
                          color['golden']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="golden"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'#b29700',borderColor:'#b29700',borderRadius:0}}
                      />
                       <Checkbox
                      checked={color['gray']}
                        onChange={(e,w)=>{
                          color['gray']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="gray"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'grey',borderRadius:0,borderColor:'grey'}}
                        
                      />
                       <Checkbox
                      checked={color['brown']}
                        defaultChecked
                        onChange={(e,w)=>{
                          color['brown']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="brown"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'brown',borderRadius:0,borderColor:'brown'}}
                      />
                      </div>
                      <div style={{flexDirection:"row",justifyContent:"space-between"}}> 
                     
                        <Checkbox
                        checked={color['red']}
                        onChange={(e,w)=>{
                          color['red']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="red"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'red',borderColor:'red',borderRadius:0}}
                      />
                      <Checkbox
                      checked={color['pink']}
                        onChange={(e,w)=>{
                          color['pink']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="pink"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'pink',borderColor:'pink',borderRadius:0}}
                      />
                       <Checkbox
                      checked={color['orange']}
                        onChange={(e,w)=>{
                          color['orange']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="orange"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'orange',borderColor:'orange',borderRadius:0}}
                      />
                      <Checkbox
                      checked={color['yellow']}
                        onChange={(e,w)=>{
                          color['yellow']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="yellow"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'yellow',borderColor:'yellow',borderRadius:0}}
                      />
                      
                       <Checkbox
                      checked={color['green']}
                        onChange={(e,w)=>{
                          color['green']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color='green'
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'green',borderColor:'green',borderRadius:0}}
                      />
                     
                        <Checkbox
                        checked={color['purple']}
                        onChange={(e,w)=>{
                          color['purple']=w
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="purple"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'purple',borderColor:'purple',borderRadius:0}}
                      />
                      
                      </div>
                      </div>
              </Col>
              
              <Col md='1'></Col>
                <Col>
                <Row>
                {appliedFilter.map((product,i) =>
                 
                <Col sm="3" onClick={()=>{this.props.selectProduct(product)
                  this.setState({navigate:true})
                  }}>
                  <Card style={{marginTop:5}}>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        <CardTitle tag="h5" >{product.filter.Local_Names} </CardTitle>
                        <CardTitle tag="h6" color="blue">Rs. {product.filter.Fishery_Price_Max}</CardTitle>
                     </CardBody>
                  </Card>
                </Col>

                )}
                </Row>
               
              </Col>
            </Row>
        </div>
       );
    }
 }

 const mapStateToProps = state => {
  return {
    category: state.category,
    product: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
    selectProduct(product) {
      dispatch(selectProduct(product));
      
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);