import React from "react";

import {Link} from "react-router-dom";
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:{},
                    image:'',
                    qty:1 ,
                    modal:false
                    };
    }
    
    componentDidMount(){
      this.getProduct() 
    }
    getProduct(){
      const productId= ls.get('productId');
      fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/products/${productId}`, {method:'GET', 
        headers: {'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'}})
        .then(response => response.json())
        .then(json => { this.setState({product:json,image:json.images[0].src}); 
                      //  console.log(json.images[0].src); 
                      });
    }
    addCart(qty,desc,slug,price,image){
      const productId= ls.get('productId');
      let cart= ls.get('cart');
      if(cart!=''){
          cart.push({product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image})
          ls.set('cart',cart);
        }else{
          ls.set('cart',[{product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image}]);
        }
        console.log("Cart",ls.get('cart'));
      }
    
    render() {
      const {product,image,qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
              <Row>
                <Col sm="8">
                  <Card>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                        <Row> 
                          <Col sm="4"> <CardImg top width="20%" style={{width:200,height:250}} src={image} alt="Fish" /></Col>
                          <Col sm="8"><CardTitle tag="h3" >{product.slug} </CardTitle>
                                <hr style={{ color: '#c0c0c0', }} />
                                <CardTitle  tag="h1" > Rs.{product.price} </CardTitle>
                                <Row>
                                  <Col>
                                    <CardTitle>Quantity: </CardTitle>
                                      <div style={{flexDirection:"row",display:"flex"}}>
                                          <Button onClick={()=>{ 
                                            if(qty!=1){this.setState({qty:qty-1})}
                                            }} >-</Button>
                                            <Label style={{padding:10,height:8}}>{qty}</Label>
                                          <Button onClick={()=>{this.setState({qty:qty+1})}}>+</Button>
                                      </div>
                                  </Col>
                                </Row>
                                <hr style={{ color: '#c0c0c0', }} />
                                <Row>
                                  <Col>
                                    <Link  to="/cart" onClick={()=>{
                                      this.addCart(qty,product.short_description,product.slug,product.price,image)
                                      const user=ls.get('user');
                                      if(user!==''){this.setState({modal:true})}
                                      else{}
                                      
                                    }} color="info" size="lg">Add to cart</Link>
                                  </Col>
                                </Row>
                              </Col>
                        </Row>
                    </CardBody>
                  </Card>
                </Col>
                    <Col sm="4"><Card>
                      <CardBody style={{backgroundColor: "#f6f6f3"}}>
                        <h6>Delivery Options</h6>
                        <hr style={{ color: '#c0c0c0', }} />
                          <CardTitle tag="h6" >{product.shipping_class} </CardTitle>
                          <CardTitle tag="h6" color="blue">Rs. {product.price}</CardTitle>
                            
                      </CardBody>
                    </Card></Col>
                        {//this.state.product.map((product) =>  )
                        }
              </Row>
              <Modal isOpen={this.state.modal} >
              <ModalHeader >Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" >Do Something</Button>{' '}
                <Button color="secondary" onClick={()=> this.setState({modal:false})}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Container>
          </div>
       );
    }
 }

 