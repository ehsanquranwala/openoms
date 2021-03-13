import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
  import { Slider,Switch  } from '@material-ui/core';
  import Child from './dropdown';
  import 'react-dropdown-tree-select/dist/styles.css';
  
  var ls = new SecureLS({encodingType: 'aes'});
  var fishData = require('../assets/fishdata.json');
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
    label: 'Salt Water',
  },
  {
    value: 100,
    label: 'Sweet Water',
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
    value: 8,
    label: '100',
  }
  ,{
    value: 16,
    label: '200',
  },
  {
    value: 24,
    label: '300',
  },
  {
    value: 32,
    label: '400',
  }
  ,{
    value: 40,
    label: '500',
  },
  {
    value: 48,
    label: '600',
  },
  {
    value: 56,
    label: '700',
  },
  {
    value: 64,
    label: '800',
  },
  {
    value: 72,
    label: '1000',
  },{
    value: 80,
    label: '1200',
  },{
    value: 88,
    label: '1500',
  },{
    value: 96,
    label: '10000',
  },
];


function valuetext(value) {
  return `${value}`;
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
                    filter:{Thorns:4,Salt_Water:2,Meat_Whiteness:0,Taste_Class:0,Steaks_Available:false,Fillets_Available:false,Whole_Available:false,Dots_Spots:false,Lines_Stripes:false},
                    appliedFilter:[],
                  };
                   }
    componentDidMount(){
      categories=this.props.category
      this.filter()
    }
    filter(){
      let {filter}=this.state;
      let filtered=[];
      console.log('as',Object.keys(filter).length)
      if(Object.keys(filter).length==0){
        this.setState({appliedFilter:fishData});
        console.log('filtered',fishData)
      }else{
        fishData.map((fishDataa) => {

        let thorn=(fishDataa[`Thorns`]<5);
        if(filter[`Thorns`]!=4){ thorn=(filter[`Thorns`]==fishDataa[`Thorns`]) }

        let Salt_Water=(fishDataa[`Salt_Water`]<2);
        if(filter[`Salt_Water`]!=2){  Salt_Water=(filter[`Salt_Water`]==fishDataa[`Salt_Water`]) }

        let Meat_Whiteness=(fishDataa[`Meat_Whiteness`]<5);
        if(filter[`Meat_Whiteness`]!=0){ Meat_Whiteness=(filter[`Meat_Whiteness`]==fishDataa[`Meat_Whiteness`]) }

        let Taste_Class=(fishDataa[`Taste_Class`]<5);
        if(filter[`Taste_Class`]!=0){ Taste_Class=(filter[`Taste_Class`]==fishDataa[`Taste_Class`]) }
        
        let Steaks_Available=(fishDataa[`Steaks_Available`]<5);
        if(filter[`Steaks_Available`]!=false){ Steaks_Available=(1==fishDataa[`Steaks_Available`]) }
        let Fillets_Available=(fishDataa[`Fillets_Available`]<5);
        if(filter[`Fillets_Available`]!=false){ Fillets_Available=(1==fishDataa[`Fillets_Available`]) }
        let Whole_Available=(fishDataa[`Whole_Available`]<5);
        if(filter[`Whole_Available`]!=false){ Whole_Available=(1==fishDataa[`Whole_Available`]) }
        let Scales=(fishDataa[`Scales`]<5);
        if(filter[`Scales`]!=false){ Scales=(1==fishDataa[`Scales`]) }
        let Dots_Spots=(fishDataa[`Dots_Spots`]<5);
        if(filter[`Dots_Spots`]!=false){ Dots_Spots=(1==fishDataa[`Dots_Spots`]) }
        let Lines_Stripes=(fishDataa[`Lines_Stripes`]<5);
        if(filter[`Lines_Stripes`]!=false){ Lines_Stripes=(1==fishDataa[`Lines_Stripes`]) }

          if(thorn&& Salt_Water&&Meat_Whiteness&&Taste_Class&&Steaks_Available&&Fillets_Available&&Whole_Available&&Scales&&Dots_Spots&&Lines_Stripes){
              filtered.push(fishDataa)
           }
            // for (let [key, value] of Object.entries(filter)) {
               /*       var filterValue= fishDataa[`${key}`]
                    
                        if(filterValue == value ) {
                          filtered.push(fishDataa)
                        }
                }*/
          
        })
     
        console.log('filtered',filtered)
        
        this.setState({appliedFilter:filtered});
      }

    }
    render() {
      const { value, fBone,filter,appliedFilter,Steaks,Fillets} = this.state
    var tempo=0;
      return (

        <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <Row>
              <Col md="3">
              <Label size='sm'>Thorns/Bones:</Label>
               <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={25}
                    marks={thorns}
                    track={false}
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
                  <Label size='sm'>Salt Water:</Label>
                   <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={50}
                    marks={Salt_Water}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=2:
                      a==50?tempo=0:
                      a==100?tempo=1:
                      tempo=2
                      
                      Object.assign(filter,{'Salt_Water':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}}
                  />
                  <Label size='sm'>Meat Whiteness:</Label>
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
                  />
                    <Label size='sm'>Taste Class:</Label>
                  <Slider
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-slider"
                    step={25}
                    marks={Taste_Class}
                    track={false}
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
                  />
              <Label size='sm'>Price Class:</Label>
                  <Slider
                    defaultValue={[0,100]}
                    getAriaValueText={valuetext}
                    aria-labelledby="track-false-range-slider"
                    valueLabelDisplay="on"
                    step={8}
                    marks={Price_Class}
                    track={false}
                    onChange={(e,a)=>{
                      a==0? tempo=0:
                      a==25?tempo=4:
                      a==50?tempo=2:
                      a==75?tempo=3:
                      
                      tempo=0
                      
                      Object.assign(filter,{'Price_Class':tempo });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  />
                  <Label size='sm'>Steaks Available:</Label>
                   <Switch
                        checked={filter['Steaks_Available']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Steaks_Available':!filter['Steaks_Available'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /> <br></br>
                      <Label size='sm'>Fillets Available:</Label>
                      <Switch
                        checked={filter['Fillets_Available']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Fillets_Available':!filter['Fillets_Available'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /><br></br>
                      <Label size='sm'>Whole Available:</Label>
                      <Switch
                        checked={filter['Whole_Available']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Whole_Available':!filter['Whole_Available'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /><br></br>
                      <Label size='sm'>Scales Available:</Label>
                      <Switch
                        checked={filter['Scales']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Scales':!filter['Scales'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /><br></br>
                       <Label size='sm'>Lines Stripes:</Label>
                      <Switch
                        checked={filter['Lines_Stripes']}
                        onChange={()=>{ 
                          Object.assign(filter,{'Lines_Stripes':!filter['Lines_Stripes'] });
                        this.setState({filter:filter}) 
                        this.filter()}}
                        color='primary'
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      /><br></br>
                       <Label size='sm'>Dots Spots:</Label>
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
              
              <Col md='1'></Col>
                <Col>
                <Row>
                {appliedFilter.map((product) =>
                 
                <Col sm="4">
                  <Card>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        <CardTitle tag="h5" >{product.Local_Names} </CardTitle>
                        <CardTitle tag="h6" >Rs. {product.Urdu}</CardTitle>
                      </CardBody>
                  </Card>
                </Col>

                )}
                </Row>
                <h5>Fishes</h5><Row>


                {this.props.product.map((product) => 
                product.product.categories[0].id==this.state.catId.value? 
                <Col sm="4">
                  <Card>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        {product.product.images[0]?
                      <CardImg top width="20%" style={{width:200,height:150}} src={product.product.images[0].src} alt="Fish" />
                        :<div></div>}
                        <CardTitle tag="h5" >{product.product.slug} </CardTitle>
                      <CardTitle tag="h6" color="blue">Rs. {product.product.price}</CardTitle>
                  </CardBody>
                </Card></Col>:<div></div>)}
                </Row>
              </Col>
            </Row>
          </Container>
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
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);