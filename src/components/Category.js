import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
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
    label: 'Salt Water',
  },
  {
    value: 100,
    label: 'Fresh Water',
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
    label: 'A',
  }
  ,{
    value: 16,
    label: 'B',
  },
  {
    value: 24,
    label: 'C',
  },
  {
    value: 32,
    label: 'D',
  }
  ,{
    value: 40,
    label: 'E',
  },
  {
    value: 48,
    label: 'F',
  },
  {
    value: 56,
    label: 'G',
  },
  {
    value: 64,
    label: 'H',
  },
  {
    value: 72,
    label: 'I',
  },{
    value: 80,
    label: 'J',
  },{
    value: 88,
    label: 'K',
  },{
    value: 96,
    label: 'L',
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
    label: 'Extra Large',
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
                    filter:{Thorns:4,Salt_Water:2,Meat_Whiteness:0,Taste_Class:0,Length:0,Body:0,Size:0,Steaks_Available:false,Fillets_Available:false,Whole_Available:false,Dots_Spots:false,Lines_Stripes:false},
                    colorFilter:[],
                    appliedFilter:[],
                  };
                   }
    componentDidMount(){
      categories=this.props.category
      this.filter()
    }
    filter(){
      let {filter,colorFilter}=this.state;
      let filtered=[];
      console.log('as',Object.keys(filter).length)
     
        this.props.product.map((fishDataa) => {

        let thorn=(fishDataa.filter[`Thorns`]<5);
        if(filter[`Thorns`]!=4){ thorn=(filter[`Thorns`]==fishDataa.filter[`Thorns`]) }

        let Salt_Water=(fishDataa.filter[`Salt_Water`]<2);
        if(filter[`Salt_Water`]!=2){  Salt_Water=(filter[`Salt_Water`]==fishDataa.filter[`Salt_Water`]) }

        let Meat_Whiteness=(fishDataa.filter[`Meat_Whiteness`]<5);
        if(filter[`Meat_Whiteness`]!=0){ Meat_Whiteness=(filter[`Meat_Whiteness`]==fishDataa.filter[`Meat_Whiteness`]) }

        let Taste_Class=(fishDataa.filter[`Taste_Class`]<10);
        if(filter[`Taste_Class`]!=0){ Taste_Class=(filter[`Taste_Class`]==fishDataa.filter[`Taste_Class`]) }
console.log('price',filter[`Price_Class`])
       // let Price_Class=(fishDataa.filter[`Price_Class`]<10);
       // if(filter[`Price_Class`]!=0){ Price_Class=(filter[`Price_Class`]==fishDataa.filter[`Price_Class`]) }


        let Length=(fishDataa.filter[`Length`]<10);
        if(filter[`Length`]!=0){ Length=(filter[`Length`]==fishDataa.filter[`Length`]) }
        let Body=(fishDataa.filter[`Body`]<10);
        if(filter[`Body`]!=0){ Taste_Class=(filter[`Body`]==fishDataa.filter[`Body`]) }
        let Size=(fishDataa.filter[`Size`]<10);
        if(filter[`Size`]!=0){ Taste_Class=(filter[`Size`]==fishDataa.filter[`Size`]) }
        
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

        let Skin_Color_1=(fishDataa.filter[`Skin_Color_1`]!='none')
        if(colorFilter.length > -1){ 
           Skin_Color_1=fishDataa.filter[`Skin_Color_1`]=='none';
          colorFilter.map((v,i)=>{
            Skin_Color_1=Skin_Color_1 && v
        })
      }
            console.log('coloe',Skin_Color_1)
          if(thorn&& Salt_Water&&Meat_Whiteness&&Taste_Class&&Steaks_Available&&Fillets_Available&&Whole_Available&&Scales&&Dots_Spots&&Lines_Stripes&&Length&&Body&&Size){
              filtered.push(fishDataa)
           }
          
        })
     
        console.log('filtered',filtered)
        
        this.setState({appliedFilter:filtered});

    }
    render() {
      let { value, fBone,filter,appliedFilter,Steaks,Fillets,colorFilter} = this.state
    var tempo=0,tempo1=0;
    var color=this.state.colorFilter
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
                      a==50?tempo=1:
                      a==100?tempo=0:
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
                  <div style={{height:70}}>
                    <Label size='sm'>Taste Class:</Label>
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
              <Label size='sm'>Price Class:</Label>
                  <Slider
                    defaultValue={[0,100]}
                    marks={Price_Class}
                    step={8}
                    onChange={(e,a)=>{
                      console.log(a[0])
                      a[0]==8? tempo=3000:
                      a[0]==16?tempo=2000:
                      a[0]==24?tempo=1500:
                      a[0]==32?tempo=1200:
                      a[0]==40? tempo=1000:
                      a[0]==48?tempo=800:
                      a[0]==56?tempo=700:
                      a[0]==64?tempo=600:
                      a[0]==72? tempo=500:
                      a[0]==80?tempo=300:
                      a[0]==88?tempo=200:
                      a[0]==96?tempo=100:

                      a[1]==8? tempo1=3000:
                      a[1]==16?tempo1=2000:
                      a[1]==24?tempo1=1500:
                      a[1]==32?tempo1=1200:
                      a[1]==40? tempo1=1000:
                      a[1]==48?tempo1=800:
                      a[1]==56?tempo1=700:
                      a[1]==64?tempo1=600:
                      a[1]==72? tempo1=500:
                      a[1]==80?tempo1=300:
                      a[1]==88?tempo1=200:
                      a[1]==96?tempo1=100:

                      Object.assign(filter,{'Price_Class':[tempo,tempo1] });
                    this.setState({filter:filter}) 
                    this.filter()}
                  }
                  />
                  <Label size='sm'>Length:</Label>
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
                  />
                  <Label size='sm'>Body:</Label>
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
                  />
                  <Label size='sm'>Size:</Label>
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
                      /><br></br>

                      <Label size='sm'>Choose Color:</Label>
                      <div style={{flexDirection:"row",justifyContent:"space-between"}}> 
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('white')
                            }else{
                              tempo = color.indexOf('white');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'white',borderRadius:0,borderColor:'white'}}
                      />
                        <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('black')
                            }else{
                              tempo = color.indexOf('black');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'black',borderColor:'black',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('silver')
                            }else{
                              tempo = color.indexOf('silver');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'silver',borderColor:'silver',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('golden')
                            }else{
                              tempo = color.indexOf('golden');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'#b29700',borderColor:'#b29700',borderRadius:0}}
                      />
                      </div>
                      <div style={{flexDirection:"row",justifyContent:"space-between"}}> 
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('grey')
                            }else{
                              tempo = color.indexOf('grey');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'grey',borderRadius:0,borderColor:'grey'}}
                        
                      />
                        <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('red')
                            }else{
                              tempo = color.indexOf('red');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'red',borderColor:'red',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('pink')
                            }else{
                              tempo = color.indexOf('pink');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'pink',borderColor:'pink',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('green')
                            }else{
                              tempo = color.indexOf('green');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'green',borderColor:'green',borderRadius:0}}
                      />
                      </div>
                      <div style={{flexDirection:"row",justifyContent:"space-between"}}> 
                      <Checkbox
                        defaultChecked
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('brown')
                            }else{
                              tempo = color.indexOf('brown');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'brown',borderRadius:0,borderColor:'brown'}}
                      />
                        <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('purple')
                            }else{
                              tempo = color.indexOf('purple');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'purple',borderColor:'purple',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('yellow')
                            }else{
                              tempo = color.indexOf('yellow');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'yellow',borderColor:'yellow',borderRadius:0}}
                      />
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('blue')
                            }else{
                              tempo = color.indexOf('blue');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'blue',borderColor:'blue',borderRadius:0}}
                      />
                      </div>
                      <Checkbox
                        onChange={(e,w)=>{
                          if(w==true){ 
                          color.push('orange')
                            }else{
                              tempo = color.indexOf('orange');
                            if (tempo > -1) {
                              color.splice(tempo, 1);
                            }}
                            this.setState({colorFilter:color})
                            this.filter()
                        }}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        style={{border:'solid',backgroundColor:'orange',borderColor:'orange',borderRadius:0}}
                      />
                     
                      
                      
                      
              </Col>
              
              <Col md='1'></Col>
                <Col>
                <Row>
                {appliedFilter.map((product) =>
                 
                <Col sm="4">
                  <Card>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        <CardTitle tag="h5" >{product.filter.Local_Names} </CardTitle>
                        <CardTitle tag="h6" >Rs. {product.filter.Urdu}</CardTitle>
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