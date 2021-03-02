import React from "react";

import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});

 class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:{},
                    image:'',
                    qty:1 ,
                    modal:false
                    };
    }
    
    componentDidMount(){
     // console.log(this.props.selectProduct)
    }
  
    addCart(qty,desc,slug,price,image,attributes){
      const productId= this.props.selectProduct.id
      let cart= ls.get('cart');
      if(cart!=''){
          cart.push({product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image,attributes:attributes})
          ls.set('cart',cart);
        }else{
          ls.set('cart',[{product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image,attributes:attributes}]);
      }
        console.log("Cart",ls.get('cart'));
      }
    
    render() {
      const {image,qty}=this.state;
      const {selectProduct}=this.props.selectProduct
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
             
            {
                  <Row>
                  <Col sm="8">
                    <Card>
                      <CardBody style={{backgroundColor: "#f6f6f6"}}>
                     
                          <Row> 
                            <Col sm="4"> <CardImg top width="20%" style={{width:200,height:250}} src={this.props.selectProduct.images[0].src}  alt="Fish" /></Col>
                            <Col sm="8"><CardTitle tag="h3" >{this.props.selectProduct.slug} </CardTitle>
                                  <hr style={{ color: '#c0c0c0', }} />
                                  {this.props.selectProduct.attributes[0]!=undefined?
                                  <CardTitle  tag="h1" > Rs.{this.props.selectProduct.attributes[0].options[0]} </CardTitle>:
                                  <div></div>
                                  }<Row>
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
                                    {this.props.selectProduct.attributes[0]!=undefined?
                                      <Link  to="/cart" onClick={()=>{
                                        this.addCart(qty,this.props.selectProduct.short_description,this.props.selectProduct.slug,this.props.selectProduct.attributes[0].options[0],this.props.selectProduct.images[0].src,this.props.selectProduct.attributes)
                                        const user=ls.get('user');
                                        if(user!==''){this.setState({modal:true})}
                                        else{}
                                        
                                      }} color="info" size="lg">Add to cart</Link>:
                                      <div></div>}
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
                            <CardTitle tag="h6" >{this.props.selectProduct.shipping_class} </CardTitle>
                            <CardTitle tag="h6" color="blue">Rs. {this.props.selectProduct.price}</CardTitle>
                              
                        </CardBody>
                      </Card></Col>
                         
                </Row>
                                    }

              
              
              
          </Container>
          </div>
       );
    }
 }
 const mapStateToProps = state => {
  return {
    selectProduct: state.selectProduct,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addtocart(product) {
      dispatch(addtocart(product));
      
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
 