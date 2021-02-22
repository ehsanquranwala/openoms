import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import moment from 'moment';
  import { connect } from "react-redux";
  import {
    Redirect
  } from "react-router-dom";
  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  
  const token=ls.get('token')
 class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    orders:[],
                    navigate:false
                    };
    }
    
    componentDidMount(){
      this.getOrders()
    }
    async getOrders(){
      console.log(this.props.user)
      if(this.props.user.status=='ok'){
        await fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/orders?search=${this.props.user.user.email}`,
          {method:'GET', 
            headers: {
            'Authorization':'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
          .then(response => response.json())
          .then(json => { 
            if(json.length>0){
              this.setState({orders:json})
            }
        });
      }
    }
   render() {
    const { navigate } = this.state
    if (navigate) {
      return <Redirect to="/product" push={true} />
    }
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
           <Col md="3"></Col>
            <Col md="5">
            <Card>
            <CardHeader>Active Orders</CardHeader>
                <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    
             {this.state.orders.map((product,i) =>  
                product.status=='processing'?
                
                  <Row key={product[i]}>
                    <Col> 
                      <Row> 
                        <Col>{ moment(product.date_created).format('MM-DD-YYYY')}</Col>
                        <Col>{product.total}</Col>
                      </Row>
                        <div style={{flexDirection:"row",display:"flex"}}>
                          { product.line_items.map((items,i) => 
                              <p style={{fontSize:11}}>{items.quantity}x {items.name} ,</p>
                            ) }
                        </div>
                    </Col>
                      
                  </Row>:
                      <div>
                      </div>
                )}
                  
                    </CardBody>

      <CardHeader>Past Orders</CardHeader>
      <CardBody style={{backgroundColor: "#f6f6f6"}}>
         {this.state.orders.map((product,i) =>  
                product.status=='completed'?
                
                  <Row key={product[i]}>
                    <Col> 
                      <Row> 
                        <Col>{ moment(product.date_created).format('MM-DD-YYYY')}</Col>
                        <Col>{product.total}</Col>
                      </Row>
                        <div style={{flexDirection:"row",display:"flex"}}>
                          { product.line_items.map((items,i) => 
                              <p style={{fontSize:11}}>{items.quantity}x {items.name} ,</p>
                            ) }
                        </div>
                    </Col>
                      
                  </Row>:
                      <div>
                        
                      </div>
          )}
                  
                    </CardBody>
                </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardHeader>Suggestions</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                   
                    {this.props.product.length >0?
                    this.props.product.map((product,i) =>  
                    
                  <Row  key={product.id} 
                        onClick={()=>{this.props.selectProduct(this.props.product[i])
                                      this.setState({navigate:true})
                    }}>
                    <Col  md="4" >
                    {product.images[0]?
                        <CardImg  style={{width:80,height:70,padding:0}} src={product.images[0].src}  />
                        :<div></div>}
                        </Col>
                    <Col  md="6">
                        <CardTitle tag="h6" >{product.slug} </CardTitle>
                        <CardTitle tag="h6" >Rs. {product.price}</CardTitle>
                    </Col>
                 
                </Row>
                 ):<h6>No Product Found</h6>}
              
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
    user:state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectProduct(product) {
      dispatch(selectProduct(product));
      
    },
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
 