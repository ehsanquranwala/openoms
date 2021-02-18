import React from "react";
import { Card,  CardBody,Container,Row,Input,Col,Label, CardHeader, FormGroup} from 'reactstrap';
  
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  
  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:'',
                    city:'',
                    area:'',
                    delivery:250,
                    editable:false,
                    
                    };
    }
    
    componentDidMount(){
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
  
    render() {
      var {subTotal,delivery,cart,address,total}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
                <Col md="3"></Col>
            <Col md="6">
               
             <Card>
               <CardHeader>My Profile</CardHeader>
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

            </Row> 
            </Container>
          </div>
       );
    }
 }

 