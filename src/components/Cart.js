import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  
  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    qty:1 ,
                    cart:[],
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:'',
                    city:'',
                    area:'',
                    delivery:'',
                    editable:false
                    };
    }
    
    componentDidMount(){
      this.getCart() 
      this.getCustomer()
    }
    async getCustomer(){
      const user=ls.get('user');
        await fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/customers/12`,
          {method:'GET', 
            headers: {
            'Authorization':'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'}})
          .then(response => response.json())
          .then(json => { 
            if(json.id){
              this.setState({firstName:json.billing.first_name,
                          lastName:json.billing.last_name,
                          email:json.billing.email,
                          phone:json.billing.phone,
                          address:json.billing.address_1,
                          city:json.billing.city,
                          area:json.billing.address_2,
                          delivery:json.billing.postcode
                          
                          })} 
            else{ 
              this.setState({ delivery:250,editable:true})
                        } 
              console.log(json.billing)
        });
    }

    getCart(){
      let getCart= ls.get('cart');
      if(getCart===''){}else{
        this.setState({cart:getCart})
      }
    }
    checkOut(){
      const {firstName,lastName,email,phone,address,city,area,delivery}=this.state;
      if(  phone!=='' && address!==''  ){
       let data={
                    "payment_method": "COD",
                    "payment_method_title": "Cash On Delivery",
                    "set_paid": true,
                      "billing":{"first_name":firstName,
                                "last_name":lastName,
                                "email":email ,
                                "phone":phone ,
                                "address_1":address ,
                                "address_2":area ,
                                "city":city,
                                "company":'',
                                "state":'',
                                "postcode":delivery,
                                "country":''},
                      "shipping":
                                {"first_name":firstName,
                                "last_name":lastName,
                                "email":email ,
                                "phone":phone ,
                                "address_1":address ,
                                "address_2":area ,
                                "city":city,
                                "company":'',
                                "state":'',
                                "postcode":'',
                                "country":'pk'},
                      "line_items": 
                                this.state.cart,
                      "shipping_lines": [
                                {"method_id": "flat_rate",
                                "method_title": "Flat Rate",
                                "total": delivery
                              }
                        ]};
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/orders', {method:'POST', 
      headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'},
      body: JSON.stringify(data)})
      .then(response => response.json())
      .then(json => { 
       alert("Order Book Successfull")
        console.log("Order book",json); });
      }
    }
    render() {
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
            <Col md="6">
               
             <Card>
               <CardHeader>Customer Details</CardHeader>
              <CardBody style={{backgroundColor: "#f6f6f6"}}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label >First Name</Label>
                    <Input  name='id' placeholder='Enter First Name' value={this.state.firstName} onChange={ (e)=>this.setState({firstName: e.target.value})}  required></Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label >Last Name</Label>
                    <Input  name='pass' placeholder='Enter Last Name' value={this.state.lastName} onChange={ (e)=>this.setState({lastName: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label >Email Address</Label>
                    <Input type='email'  name='email' placeholder='Enter Email' value={this.state.email} onChange={ (e)=>this.setState({email: e.target.value}) } required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label >Phone</Label>
                    <Input type='number'  name='phone' placeholder='Enter Phone' value={this.state.phone} onChange={ (e)=>this.setState({phone: e.target.value})} required></Input>
                  </FormGroup> 
                  </Col></Row>
                  <Row>
                <Col md="12">
                  <FormGroup>
                    <Label >Address</Label>
                    <Input  name='address' placeholder='Enter Address' value={this.state.address} onChange={ (e)=>this.setState({address: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                 </Row>
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label >Area</Label>
                    <Input  name='area' placeholder='Enter Area' value={this.state.area} onChange={ (e)=>this.setState({area: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label >City</Label>
                    <Input  name='city' placeholder='Enter City' value={this.state.city} onChange={ (e)=>this.setState({city: e.target.value})} required></Input>
                  </FormGroup>
                  </Col></Row>
                 
                 
                  
              </CardBody>
            </Card>
                   
            </Col>
            <Col md="4">
                <Card>
                <CardHeader>Order Summary</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <CardTitle tag="h6">Address</CardTitle>
                    <CardSubtitle >{this.state.address}</CardSubtitle>
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
                        <CardTitle tag="h6" >Rs. {product.price*product.quantity}</CardTitle>
                        
                    </Col>
                    <Col  md="3">
                                <div style={{flexDirection:"row",display:"flex"}}>
                                    <Button color="info" size="sm" onClick={()=>{  product.quantity=product.quantity-1 }} >-</Button>
                                    <Label size="sm" style={{padding:10,height:5}}>{product.quantity}</Label>
                                    <Button color="info" size="sm" onClick={()=>{product.quantity=product.quantity+1 }}>+</Button>
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
                      <Label size="sm" >Pkr. {this.state.delivery}/-</Label>
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
              <Button onClick={()=>this.checkOut()} size="md">GO TO CHECKOUT</Button>
                    </CardBody>
                </Card>
            </Col>
            </Row> 
            </Container>
          </div>
       );
    }
 }

 