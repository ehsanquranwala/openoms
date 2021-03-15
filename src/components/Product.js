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
  
    addCart(qty,desc,slug,price,image,average){
      const productId= this.props.selectProduct.id
      var checkCart=0;
      let cart= ls.get('cart');
      if(cart!=''){
        
        cart.map((value,i)=>{
          if(cart[i].product_id==productId){
                var priceType='';
                qty=cart[i].quantity+qty;
                if(qty>=19){
                  priceType='wholesale';}
                else{ 
                  if(cart[i].priceType=='special') {priceType='special';}else{priceType='retail';}
                }
                    let product={
                      product_id:cart[i].product_id,
                      quantity:qty,
                      desc:cart[i].desc,
                      slug:cart[i].slug,
                      price:price,
                      image:cart[i].image,
                      average:cart[i].average,
                      discount:cart[i].discount,
                      priceType:priceType}
                cart[i] = product;
                ls.set('cart',cart);
                checkCart=0
                        }else{checkCart=1}
        })
        if(checkCart==1){  
            cart.push({product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image,average:average,discount:0,priceType:'retail'})
              ls.set('cart',cart);
        }
        }else{
          ls.set('cart',[{product_id:productId,quantity:qty,desc:desc,slug:slug,price:price,image:image,average:average,discount:0,priceType:'retail'}]);
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
                            <Col sm="4">
                            {this.props.selectProduct.product.images[0]?
                             <CardImg top width="20%" style={{width:200,height:250}} src={this.props.selectProduct.product.images[0].src}  alt="Fish" />
                             :<div></div>}
                             </Col>
                            <Col sm="8"><CardTitle tag="h3" >{this.props.selectProduct.product.slug} </CardTitle>
                                  <hr style={{ color: '#c0c0c0', }} />
                                  {this.props.selectProduct.average!=undefined?
                                  <CardTitle  tag="h1" > Rs.{parseInt(this.props.selectProduct.average.total_retail_price)} </CardTitle>:
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
                                    {this.props.selectProduct.average!=undefined?
                                      <Link  to="/cart" onClick={()=>{
                                        this.addCart(qty,this.props.selectProduct.product.short_description,this.props.selectProduct.product.slug,this.props.selectProduct.average.total_retail_price,this.props.selectProduct.product.images,this.props.selectProduct.average)
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
 