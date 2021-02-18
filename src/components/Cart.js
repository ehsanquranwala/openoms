import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
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
                    delivery:250,
                    readonly:false,
                    subTotal:0,
                    total:0
                    };
    }
    
    componentDidMount(){
      this.getCart()
      
    }
    async getCustomer(){
      const user=ls.get('user');
        await fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/customers/12`,
          {method:'GET', 
            headers: {
            'Authorization':'Bearer ' + token}})
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
                          delivery:json.billing.postcode,
                          readonly:true
                           })} 
            else{ 
              this.setState({ delivery:250,editable:false})
                        } 
        });
        this.updateCart()
    }

    getCart(){
     let getCart= ls.get('cart');
      if(getCart===''){this.setState({delivery:0})}
      else{
        this.setState({cart:getCart})
        this.getCustomer()  
      }
    }
    updateCart(){
      let{cart,subTotal}=this.state;
      let total=subTotal;
      for(var a=0;a<= cart.length-1;a++){
         total= total+(cart[a].price*cart[a].quantity)
       }
      this.setState({subTotal:total})
      
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
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/orders', 
      { method:'POST', 
        headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token},
        body: JSON.stringify(data)})
      .then(response => response.json())
      .then(json => { if(json.id){
                        alert("Order Book Successfull");
                        this.setState({cart:[],subTotal:0,total:0});
                        ls.set('cart',[]);
                        }
                        else{alert(json)}
        console.log("Order book",json); });
      }else{alert("Please Enter Complete Details")}
    }
    render() {
      var {subTotal,delivery,cart,address,readonly}=this.state;
     const total=Number(delivery)+Number(subTotal);
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
                    <Label >Email Address *</Label>
                    <Input readOnly={readonly} type='email'  name='email' placeholder='Enter Email' value={this.state.email} onChange={ (e)=>this.setState({email: e.target.value}) } required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label >Phone *</Label>
                    <Input type='number'  name='phone' placeholder='Enter Phone' value={this.state.phone} onChange={ (e)=>this.setState({phone: e.target.value})} required></Input>
                  </FormGroup> 
                  </Col></Row>
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
                    <CardSubtitle >{address}</CardSubtitle>
                    <hr style={{ color: '#c0c0c0', }} />
                    <CardTitle tag="h6">Your Order</CardTitle>
                    {cart.length >0?
                    cart.map((product,i) =>  
             
                <Row>
                    <Col  md="3">
                        <CardImg  style={{width:80,height:70,padding:0}} src={product.image} alt="Fish" />
                    </Col>
                    <Col  md="5">
                        <CardTitle tag="h6" >{product.slug} </CardTitle>
                        <CardTitle tag="h6" >Rs. {product.price*product.quantity }</CardTitle>
                        
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
                      <Label size="md" >{subTotal}</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="sm" >Delivery Fee</Label>
                      <Label size="sm" >Pkr. {delivery}/-</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="lg" >Total</Label>
                      <Label size="lg" >{total}</Label>
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

 