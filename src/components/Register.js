import React from "react";
import { Button,Card,  CardBody, CardHeader,Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
 
  import {
    Link,
    Redirect
  } from "react-router-dom";
  export default class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:'',
                    city:'',
                    area:'',
                    pinLocation:'',
                    password:'',
                    navigate:false};
    }
    handleSubmit=()=>{
      const {firstName,lastName,email,phone,address,city,area,password,pinLocation}=this.state;
      if(firstName!=='' && lastName !=='' && email!=='' && phone!=='' && address!=='' && city!=='' && area!=='' && password!=='' ){
      let data={  "first_name":firstName,
                    "last_name":lastName,
                    "email":email ,
                    "username":phone,
                    "password":password ,
                      "billing":{"first_name":firstName,
                      "last_name":lastName,
                      "email":email ,
                      "phone":phone ,
                      "address_1":address ,
                      "address_2":area ,
                      "city":city,
                      "company":'',
                      "state":pinLocation,
                      "postcode":'',
                      "country":'pk'},
                        "shipping":{"first_name":firstName,
                        "last_name":lastName,
                        "email":email ,
                        "phone":phone ,
                        "address_1":address ,
                        "address_2":area ,
                        "city":city,
                        "company":'',
                        "state":pinLocation,
                        "postcode":'',
                        "country":'pk'}};

      fetch('https://blog.weeklyfishclub.com/wp-json/wc/v3/customers', 
      {method:'POST', 
        headers: {'Content-Type': 'application/json',
                  'Authorization':  'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')},
        body: JSON.stringify(data)})
        .then(response => response.json())
        .then(json => { 
          if(json.id!==undefined){
                alert("Thank You For Registration");
         this.setState({navigate:true})
              }else{alert(json.message)}
          });
            }
            else{alert("Please Fill Complete Data")}
    }
    render() {
      const { navigate } = this.state
      if (navigate) {
        return <Redirect to="/" push={true} />
      }
       return (
        <div style={{marginTop:'5%'}}>
        <Container className="themed-container" fluid="sm" >
          <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Card>
                <CardHeader>Register</CardHeader>
                <CardBody style={{backgroundColor: "#006994"}}> 
                
                <Row>
                <Col md="6">
                  <FormGroup>
                    <Label size='sm' >First Name</Label>
                    <Input size='sm' name='id' placeholder='Enter First Name' value={this.state.firstName} onChange={ (e)=>this.setState({firstName: e.target.value})}  required></Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label size='sm' >Last Name</Label>
                    <Input size='sm' name='pass' placeholder='Enter Last Name' value={this.state.lastName} onChange={ (e)=>this.setState({lastName: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label size='sm'>Email Address</Label>
                    <Input size='sm' type='email'  name='email' placeholder='Enter Email' value={this.state.email} onChange={ (e)=>this.setState({email: e.target.value}) } required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label size='sm' >Password</Label>
                    <Input size='sm' type={'password'}  name='password' placeholder='Enter Password' value={this.state.password} onChange={ (e)=>this.setState({password: e.target.value})} required></Input>
                  </FormGroup> 
                  </Col></Row>
                  <Row>
                <Col md="12">
                  <FormGroup>
                    <Label size='sm'>Address</Label>
                    <Input  size='sm' name='address' placeholder='Enter Address' value={this.state.address} onChange={ (e)=>this.setState({address: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                 </Row>
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label size='sm'>Area</Label>
                    <Input size='sm' name='area' placeholder='Enter Area' value={this.state.area} onChange={ (e)=>this.setState({area: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label size='sm'>City</Label>
                    <Input size='sm' name='city' placeholder='Enter City' value={this.state.city} onChange={ (e)=>this.setState({city: e.target.value})} required></Input>
                  </FormGroup>
                  </Col></Row>
                  <FormGroup>
                    <Label size='sm'>Pin Location</Label>
                    <Input size='sm' type='text'  name='pinLocation' placeholder='Enter Pin Location' value={this.state.pinLocation} onChange={ (e)=>this.setState({pinLocation: e.target.value})} required></Input>
                  </FormGroup> 
                  <FormGroup>
                    <Label size='sm'>Phone</Label>
                    <Input size='sm' type='number'  name='phone' placeholder='Enter Phone' value={this.state.phone} onChange={ (e)=>this.setState({phone: e.target.value})} required></Input>
                  </FormGroup> 
                 
                  <FormGroup>
                    <Button size='sm' onClick={()=>this.handleSubmit()}>Register</Button>
                  </FormGroup>
                  <Label>OR </Label>
                  <FormGroup>
                    <Label>Already have an Account </Label>
                    <Link to="/login"> Login</Link>
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

 