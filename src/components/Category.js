import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import {SingleSlider} from 'react-slider-kit';
  import DropdownTreeSelect from 'react-dropdown-tree-select';
  import Child from './dropdown';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
 let categories=[];

 
   class Category extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {product:[],
                    catId:0,
                    category:[],
                    value:10};
                   }
    componentDidMount(){
      categories=this.props.category
    }

    render() {
      const { value } = this.state
    
      return (

        <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <Row>
              <Col md="4">
                <h5>Category</h5>
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
                <h5>Fishes</h5><Row>
                {this.props.product.map((product) => 
                product.categories[0].id==this.state.catId.value? 
                <Col sm="4">
                  <Card>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        {product.images[0]?
                      <CardImg top width="20%" style={{width:200,height:150}} src={product.images[0].src} alt="Fish" />
                        :<div></div>}
                        <CardTitle tag="h5" >{product.slug} </CardTitle>
                      <CardTitle tag="h6" color="blue">Rs. {product.price}</CardTitle>
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