import React from "react";
import { Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Button,Input,FormGroup,Label,Table, CardHeader} from 'reactstrap';
  import {
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";

  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
        const formula={ "Wholesale":[{}],
                        "Resell":[{}],
                        "Special":[{}]

                    }
  require('dotenv').config()
   class Oms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    id:'',            
                    slug:'',
                    Wholeweight:'',
                    Netweight:'',
                    price:'',
                    products:[],
                    helper:'',
                    cutting:'',
                    transport:'',
                    ice:'',
                    shopper:'',
                    washing:'',
                    packing:'',
                    food:'',
                    otherExpense:''
                    };
    }
    componentDidMount(){
      this.getProduct()
     }
    
    getProduct(){
      if(this.props.product.length ===0){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products', {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            this.props.addProduct(json)
        }
          else{} 
        
       });
      }
    }
 
    add(){
        const{products,id,slug,Wholeweight,Netweight,price}=this.state;
        products.push({id:id,slug:slug,Wholeweight:Wholeweight,Netweight:Netweight,price:price})
        this.setState({products:products})
        console.log(this.state.products)
    }
    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            
                <Row>
                <Col md="3"><FormGroup>
                <Input  type="select" required={true} value={this.state.id}  onChange={(e)=>{this.setState({id:this.props.product[e.target.value].id,slug:this.props.product[e.target.value].slug}); }}>
                          <option  disabled={this.props.defaultDisabled} value="">Select Product</option>
                          {this.props.product.map((data, idx)=>{
                            return <option key={idx} value={idx}>{data.slug}</option>
                          })}
                 </Input>
                 </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                <Input  type="text" placeholder={'Whole Weight'} required={true} value={this.state.Wholeweight}  onChange={(e)=>{this.setState({Wholeweight:e.target.value}); }}>
                 </Input>
                 </FormGroup>
                </Col>
                <Col md="2"><FormGroup>
                <Input  type="text" placeholder={'Net Weight'} required={true} value={this.state.Netweight}  onChange={(e)=>{this.setState({Netweight:e.target.value}); }}>
                 </Input> </FormGroup>
                </Col>
                <Col md="2"><FormGroup>
                <Input  type="text" placeholder={'Price'} required={true} value={this.state.price}  onChange={(e)=>{this.setState({price:e.target.value}); }}>
                 </Input> </FormGroup>
                </Col>
                <Col md="1"><FormGroup>
                <Button onClick={()=>this.add()}>Add</Button> </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                    <Table bordered="solid">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Whole Weight</th>
                        <th>Net Weight</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, i)=>
                      <tr>
                        <td>{product.id}</td>
                        <td>{product.slug}</td>
                        <td>{product.Wholeweight}</td>
                        <td>{product.Netweight}</td>
                        <td>{product.price}</td>
                      </tr>
                      )}
                    </tbody>
                  </Table>
                 
                  </Col>
                  <Col md="3">
                  <Card>
                      <CardHeader>Expenses</CardHeader>
                      <CardBody><Row>
                          <Col md="6">
                          <FormGroup>
                               <Label size="sm">Helper</Label>
                                <Input size="sm" placeholder="Helper" type="text" value={this.state.helper} onChange={(e)=>{this.setState({helper:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Cutting</Label>
                                <Input size="sm" placeholder="Cutting" type="text" value={this.state.cutting} onChange={(e)=>{this.setState({cutting:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Transport</Label>
                                <Input size="sm" placeholder="transport" type="text" value={this.state.transport} onChange={(e)=>{this.setState({transport:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Ice</Label>
                                <Input size="sm" placeholder="Ice" type="text" value={this.state.ice} onChange={(e)=>{this.setState({ice:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Shoppers</Label>
                                <Input size="sm" placeholder="Shopper" type="text" value={this.state.shopper} onChange={(e)=>{this.setState({shopper:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Washing</Label>
                                <Input size="sm" placeholder="Washing" type="text" value={this.state.washing} onChange={(e)=>{this.setState({washing:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Packing</Label>
                                <Input size="sm" placeholder="Packing" type="text" value={this.state.packing} onChange={(e)=>{this.setState({packing:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="6">
                          <FormGroup>
                           <Label size="sm">Food</Label>
                                <Input size="sm" placeholder="Food" type="text" value={this.state.food} onChange={(e)=>{this.setState({food:e.target.value})}}></Input>
                          </FormGroup></Col><Col md="12">
                          <FormGroup>
                           <Label size="sm">Other Expense</Label>
                                <Input size="sm" placeholder="Other Expense" type="text" value={this.state.otherExpense} onChange={(e)=>{this.setState({otherExpense:e.target.value})}}></Input>
                          </FormGroup></Col>
                         
                          
                          </Row>
                          <FormGroup>
                         <Button size="lg">Update</Button>
                          </FormGroup>
                      </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
           
          </div>
       );
    }
 }

 const mapStateToProps = state => {
  return {
    product: state.product,
    category: state.category,
    selectProduct:state.selectProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
     addProduct(product) {
      dispatch(products(product));
    },
    addCategory(cat) {
      dispatch(category(cat));
    },
    selectProduct(product) {
      dispatch(selectProduct(product));
      
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Oms);