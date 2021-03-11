import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
  import Child from './dropdown';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
  var fishData = require('../assets/fishdata.json');
 let categories=[];

 
   class Category extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {product:[],
                    catId:0,
                    category:[],
                    value:10,
                    fBone:4,
                    Salt_Water:2,
                    filter:[{"Thorns":{"value":2}}],
                    appliedFilter:[]
                  };
                   }
    componentDidMount(){
      categories=this.props.category
      this.filter()
    }
    filter(){
      let {filter}=this.state;
      let filtered=null;
      fishData.map((fishData) => {
      var matchesAllFilters = true;
                  filter.map(( filterName,filterValue)=>{
                    
                    var fishValue = fishData.Thorns;
            console.log("fu data",fishValue+"  "+filterValue)
                        if (filterValue != fishValue) {
                          matchesAllFilters = false;
                        return false;
                          }
                  })
                  if (matchesAllFilters) {
                    filtered = fishData;
                  }
        })
        console.log(filtered)
        
      //  this.setState({appliedFilter:filtered});
    }
    render() {
      const { value, fBone,filter,appliedFilter} = this.state
    
      return (

        <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <Row>
              <Col md='2'>
                  <FormGroup>
                    <Label size='sm'>Select Thorns/Bones:</Label>
                    <Input size='sm'  type="select" required={true} value={this.state.fBone}  onChange={(e)=>{ this.setState({fBone:e.target.value})}}>
                              <option value={4}>All</option>
                              <option value={0}>Many Bone</option>
                              <option value={1}>one Bone</option>
                              <option value={2}>small few Bone</option>
                              <option value={3}>Boneless</option>
                              
                    </Input>
                    </FormGroup>
              </Col>
              <Col md='2'>
                    <FormGroup>
                    <Label size='sm'>Select Salt Water:</Label>
                      <Input  size='sm' type="select" required={true} value={this.state.Salt_Water}  onChange={(e)=>{ this.setState({Salt_Water:e.target.value})}}>
                              <option key={2} value={2}>All</option>
                              <option key={0} value={0}>True</option>
                              <option key={1} value={1}>false</option>
                      </Input>
                    </FormGroup>
              </Col>
              <Col md='2'></Col><Col md='2'></Col></Row>
            <Row>
              <Col md="4">
                <Child
                  value2={categories}
                  sendToServer={(e)=>this.setState({catId:e})}
                />
                <SingleSlider
                  min={0}
                  max={100}
                  step={1}
                  start={80}
                  onChangeStart={() => console.log('start drag')}
                  onChange={(value)=>console.log('drag value: ', value)}
                  onChangeComplete={(e)=>{this.setState({value:e})}}
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