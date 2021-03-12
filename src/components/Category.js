import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
  import { Slider } from '@material-ui/core';
  import Child from './dropdown';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
  var fishData = require('../assets/fishdata.json');
 let categories=[];

 const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 50,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
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
                    filter:{Thorns:4,Salt_Water:2,Meat_Whiteness:0},
                    appliedFilter:[]
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

          if(thorn&& Salt_Water&&Meat_Whiteness){
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
      const { value, fBone,filter,appliedFilter} = this.state
    
      return (

        <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <Row>
              <Col md='2'>
                  <FormGroup>
                    <Label size='sm'>Thorns/Bones:</Label>
                    <Input  size='sm'  
                            type="select" 
                            required={true} 
                            value={filter[`Thorns`]} 
                            onChange={(e)=>{
                                Object.assign(filter,{'Thorns':e.target.value });
                              this.setState({filter:filter}) 
                              this.filter()
                                            }}>
                              <option value={4}>All</option>
                              <option value={0}>None</option>
                              <option value={1}>One</option>
                              <option value={2}>Few</option>
                              <option value={3}>Many</option>
                              
                    </Input>
                    </FormGroup>
              </Col>
              <Col md='2'>
                    <FormGroup>
                    <Label size='sm'>Salt Water:</Label>
                    <Input  size='sm'  
                            type="select" 
                            required={true} 
                            value={filter[`Salt_Water`]} 
                            onChange={(e)=>{
                                Object.assign(filter,{'Salt_Water':e.target.value });
                              this.setState({filter:filter}) 
                              this.filter()
                                            }}>
                              <option value={2}>All</option>
                              <option value={1}>True</option>
                              <option value={0}>False</option>
                              
                    </Input>
                    </FormGroup>
              </Col>
              <Col md='2'>
              <FormGroup>
                    <Label size='sm'>Meat Whiteness:</Label>
                    <Input  size='sm'  
                            type="select" 
                            required={true} 
                            value={filter[`Meat_Whiteness`]} 
                            onChange={(e)=>{
                                Object.assign(filter,{'Meat_Whiteness':e.target.value });
                              this.setState({filter:filter}) 
                              this.filter()
                                            }}>
                              <option value={0}>All</option>
                              <option value={1}>Very Light</option>
                              <option value={2}>Light</option>
                              <option value={3}>Dark</option>
                              
                    </Input>
                    </FormGroup>
                </Col>
                <Col md='2'>
                <Slider
                    defaultValue={20}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                  </Col></Row>
            <Row>
              <Col md="4">
               
               <Slider
                    defaultValue={20}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
              </Col>
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