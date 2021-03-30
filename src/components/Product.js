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
      console.log(this.props.selectProduct)
    }
  
    addCart(qty,desc,slug,price,image,average){
      const productId= this.props.selectProduct.product.id
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
                          <h6>Product features</h6>
                          <hr style={{ color: '#c0c0c0', }} />
                            <CardTitle tag="h6" >Whole Available: {this.props.selectProduct.filter.Whole_Available==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Fillet Available: {this.props.selectProduct.filter.Fillets_Available==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Steaks Available: {this.props.selectProduct.filter.Steaks_Available==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Dots_Spots Available: {this.props.selectProduct.filter.Dots_Spots==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Lines_Stripes Available: {this.props.selectProduct.filter.Lines_Stripes==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Scales Available: {this.props.selectProduct.filter.Scales==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Horizontal Available: {this.props.selectProduct.filter.Horizontal==1?'Yes':'No'} </CardTitle>
                            <CardTitle tag="h6" >Water: {this.props.selectProduct.filter.Salt_Water==1?'Salt':'Sweet'} </CardTitle>
                            <CardTitle tag="h6" >Thorns: {this.props.selectProduct.filter.Thorns==0?'None':
                            this.props.selectProduct.filter.Thorns==1?'One':
                            this.props.selectProduct.filter.Thorns==2?'Few':
                            this.props.selectProduct.filter.Thorns==3?'Many':
                            'Many'} </CardTitle>
                              <CardTitle tag="h6" >Meat Color: {this.props.selectProduct.filter.Meat_Whiteness==1?'Very Light':
                            this.props.selectProduct.filter.Meat_Whiteness==2?'Light':
                            this.props.selectProduct.filter.Meat_Whiteness==3?'Dark':
                            'Light'} </CardTitle>
                              <CardTitle tag="h6" >Taste: {this.props.selectProduct.filter.Taste_Class==1?'Lesser':
                            this.props.selectProduct.filter.Taste_Class==2?'Normal':
                            this.props.selectProduct.filter.Taste_Class==3?'Good':
                            this.props.selectProduct.filter.Taste_Class==4?'Best':
                            'Normal'} </CardTitle>

                        <CardTitle tag="h6" >Length: {this.props.selectProduct.filter.Length==1?'Short':
                            this.props.selectProduct.filter.Length==2?'Medium':
                            this.props.selectProduct.filter.Length==3?'Long':
                            this.props.selectProduct.filter.Length==4?'Very Long':
                            'Many'} </CardTitle>
                              <CardTitle tag="h6" >Body: {this.props.selectProduct.filter.Body==1?'Slim':
                            this.props.selectProduct.filter.Body==2?'Medium':
                            this.props.selectProduct.filter.Body==3?'Round':
                            'Light'} </CardTitle>
                              <CardTitle tag="h6" >Size: {this.props.selectProduct.filter.Size==1?'Tiny':
                            this.props.selectProduct.filter.Size==2?'Small':
                            this.props.selectProduct.filter.Size==3?'Medium':
                            this.props.selectProduct.filter.Size==4?'Large':
                            this.props.selectProduct.filter.Size==5?'Extra Large':
                            'Medium'} </CardTitle>
                              <CardTitle tag="h6" >Price Class: {this.props.selectProduct.filter.Price_Class==1?'Lesser':
                            this.props.selectProduct.filter.Price_Class==2?'L':
                            this.props.selectProduct.filter.Price_Class==3?'K':
                            this.props.selectProduct.filter.Price_Class==4?'J':
                            this.props.selectProduct.filter.Price_Class==5?'I':
                            this.props.selectProduct.filter.Price_Class==6?'H':
                            this.props.selectProduct.filter.Price_Class==7?'G':
                            this.props.selectProduct.filter.Price_Class==8?'F':
                            this.props.selectProduct.filter.Price_Class==9?'E':
                            this.props.selectProduct.filter.Price_Class==10?'D':
                            this.props.selectProduct.filter.Price_Class==11?'C':
                            this.props.selectProduct.filter.Price_Class==12?'B':
                            this.props.selectProduct.filter.Price_Class==13?'A':
                            'D'} </CardTitle>
                            <CardTitle tag="h6" >Whole(Net wt/kg): {this.props.selectProduct.filter.Net_Wt_Whole_Min}</CardTitle>
                            <CardTitle tag="h6" >Steaks(Net wt/kg): {this.props.selectProduct.filter.Net_Wt_Steaks_Min}</CardTitle>
                            <CardTitle tag="h6" >Net_Wt_Fillets(Net wt/kg): {this.props.selectProduct.filter.Net_Wt_Fillets_Min}</CardTitle>
                            <CardTitle tag="h6" >Pieces(Net wt/kg): {this.props.selectProduct.filter.Pieces_Per_Kg_Min}</CardTitle>
                            <CardTitle tag="h6" >Piece(Net wt/kg): {this.props.selectProduct.filter.Piece_Weight_Min}</CardTitle>
                            <CardTitle tag="h6" >Local_Grouping: {this.props.selectProduct.filter.Local_Grouping}</CardTitle>
                            <CardTitle tag="h6" >Foreign_Names: {this.props.selectProduct.filter.Foreign_Names}</CardTitle>
                            <CardTitle tag="h6" >Foreign_Grouping: {this.props.selectProduct.filter.Foreign_Grouping}</CardTitle>
                            <CardTitle tag="h6" >Fish Color: {this.props.selectProduct.filter.Skin_Color_1}, {this.props.selectProduct.filter.Skin_Color_2}, {this.props.selectProduct.filter.Skin_Color_3}</CardTitle>
                            <CardTitle tag="h6" >{this.props.selectProduct.filter.Whole_Fry==0?'Not':
                            this.props.selectProduct.filter.Whole_Fry==1?'Best':
                            this.props.selectProduct.filter.Whole_Fry==2?'Good':
                            this.props.selectProduct.filter.Whole_Fry==3?'Normal':'Lesser'} for Whole Fry</CardTitle>
                                <CardTitle tag="h6" >{this.props.selectProduct.filter.Piece_Fry==0?'Not':
                            this.props.selectProduct.filter.Piece_Fry==1?'Best':
                            this.props.selectProduct.filter.Piece_Fry==2?'Good':
                            this.props.selectProduct.filter.Piece_Fry==3?'Normal':'Lesser'} for Piece Fry</CardTitle>
                                <CardTitle tag="h6" >{this.props.selectProduct.filter.Fillets==0?'Not':
                            this.props.selectProduct.filter.Fillets==1?'Best':
                            this.props.selectProduct.filter.Fillets==2?'Good':
                            this.props.selectProduct.filter.Fillets==3?'Normal':'Lesser'} for Fillets</CardTitle>
                                <CardTitle tag="h6" >{this.props.selectProduct.filter.Grill==0?'Not':
                            this.props.selectProduct.filter.Grill==1?'Best':
                            this.props.selectProduct.filter.Grill==2?'Good':
                            this.props.selectProduct.filter.Grill==3?'Normal':'Lesser'} for Grill</CardTitle>
                                <CardTitle tag="h6" >{this.props.selectProduct.filter.Salan==0?'Not':
                            this.props.selectProduct.filter.Salan==1?'Best':
                            this.props.selectProduct.filter.Salan==2?'Good':
                            this.props.selectProduct.filter.Salan==3?'Normal':'Lesser'} for Salan</CardTitle>
                                <CardTitle tag="h6" >{this.props.selectProduct.filter.Biryani==0?'Not':
                            this.props.selectProduct.filter.Biryani==1?'Best':
                            this.props.selectProduct.filter.Biryani==2?'Good':
                            this.props.selectProduct.filter.Biryani==3?'Normal':'Lesser'} for Biryani</CardTitle>
                             <CardTitle tag="h6" >{this.props.selectProduct.filter.Soup==0?'Not':
                            this.props.selectProduct.filter.Soup==1?'Best':
                            this.props.selectProduct.filter.Soup==2?'Good':
                            this.props.selectProduct.filter.Soup==3?'Normal':'Lesser'} for Soup</CardTitle>
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
 