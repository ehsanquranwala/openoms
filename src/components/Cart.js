import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  
  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:[],
                    qty:1 ,
                    cart:[],

                    };
    }
    
    componentDidMount(){
      this.getCart() 
      this.getCustomer()
    }
    getCustomer(){
      const user=ls.get('user');
          fetch(`https://www.weeklyfishclub.com/wc-api/v3/customers/email/admina@gmail.com`, {method:'GET', 
          headers: {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Authorization':'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
          .then(response => response.json())
          .then(json => { 
          console.log(json);
        });
    }

    getCart(){
      let getCart= ls.get('cart');
      if(getCart===''){}else{
        this.setState({cart:getCart})
      }
    }
    checkOut(){
        let data={    "first_name":'firstName',
                      "last_name":'lastName',
                      "email":'email' ,
                      "username":'phone',
                      "password":'password' ,
                      "billing":{"first_name":'firstName',
                                "last_name":'lastName',
                                "email":'email' ,
                                "phone":'phone' ,
                                "address_1":'address' ,
                                "address_2":'area' ,
                                "city":'city',
                                "company":'',
                                "state":'sindh',
                                "postcode":'',
                                "country":'pk'},
                      "shipping":
                                {"first_name":'firstName',
                                "last_name":'lastName',
                                "email":'email' ,
                                "phone":'phone' ,
                                "address_1":'address' ,
                                "address_2":'area' ,
                                "city":'city',
                                "company":'',
                                "state":'sindh',
                                "postcode":'',
                                "country":'pk'},
                      "line_items": [
                                {"product_id": 12,
                                "quantity": 2},
                                {"product_id": 12,
                                "quantity": 1}],
                      "shipping_lines": [
                                {"method_id": "flat_rate",
                                "method_title": "Flat Rate",
                                "total": "10.00"
                              }
                        ]};
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/orders', {method:'POST', 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'},
      body: JSON.stringify(data)})
      .then(response => response.json())
      .then(json => { 
       
        console.log(json); });
    }
    render() {
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
            <Col md="6">
               
                    {
             <Card>
               <CardHeader>Customer Details</CardHeader>
              <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Full Name:</Label>
                      <Label size="md" >Mohsin Yousuf</Label>
                    </div>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Email Address:</Label>
                      <Label size="md" >ymohsin100@gmail.com</Label>
                    </div>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Phone:</Label>
                      <Label size="md" >03442193769</Label>
                    </div>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Address:</Label>
                      <Label size="md" >Gulistan e johar block 17 Karachi</Label>
                    </div>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Area:</Label>
                      <Label size="md" >Johar</Label>
                    </div>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >City:</Label>
                      <Label size="md" >Karachi</Label>
                    </div>
              </CardBody>
            </Card>}
                   
            </Col>
            <Col md="4">
                <Card>
                <CardHeader>Order Summary</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <CardTitle tag="h6">Address</CardTitle>
                    <CardSubtitle >Gulshan e iqbal bl-17 <Link to="/">Change</Link></CardSubtitle>
                    <hr style={{ color: '#c0c0c0', }} />
                    <CardTitle tag="h6">Your Order</CardTitle>
                    {this.state.cart.length >0?
                    this.state.cart.map((product,i) =>  
             
                <Row>
                    <Col  md="3">
                        <CardImg  style={{width:80,height:70,padding:0}} src={product.image} alt="Fish" />
                    </Col>
                    <Col  md="5">
                        <CardTitle tag="h6" >{product.slug} </CardTitle>
                        <CardTitle tag="h6" >Rs. {product.price*product.qty}</CardTitle>
                        
                    </Col>
                    <Col  md="3">
                                <div style={{flexDirection:"row",display:"flex"}}>
                                    <Button color="info" size="sm" onClick={()=>{  product.qty=product.qty-1 }} >-</Button>
                                    <Label size="sm" style={{padding:10,height:5}}>{product.qty}</Label>
                                    <Button color="info" size="sm" onClick={()=>{product.qty=product.qty+1 }}>+</Button>
                                </div>
                    </Col>
                </Row>
             ):<h6>No Product Found</h6>}
              <hr style={{ color: '#c0c0c0', }} />
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Sub Total</Label>
                      <Label size="md" >Pkr. 500/-</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="sm" >Delivery Fee</Label>
                      <Label size="sm" >Pkr. 150/-</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="lg" >Total</Label>
                      <Label size="lg" >Pkr. 750/-</Label>
                    </div>
                    </Col>
                  </Row>
              <Button onClick={()=>this.checkOut} size="md">GO TO CHECKOUT</Button>
                    </CardBody>
                </Card>
            </Col>
            </Row> 
            </Container>
          </div>
       );
    }
 }

 