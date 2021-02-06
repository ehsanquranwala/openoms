import React from "react";
import { Button,Card, CardImg, CardText, CardBody,
  CardTitle, CardHeader,Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import {
    Link
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
                    password:''};
    }


    
    handleSubmit=()=>{
      const {firstName,lastName,email,phone,address,city,area,password}=this.state;
      const billing={"first_name":firstName,
                    "last_name":lastName,
                    "email":'moh@gmail.com' ,
                    "phone":phone ,
                    "address_1":address ,
                    "address_2":area ,
                    "city":city,
                    "company":'',
                    "state":'sindh',
                    "postcode":'',
                    "country":'pk'};
      let formData = new FormData();
          formData.append('first_name',firstName);
          formData.append('last_name',lastName);
          formData.append('email',email);
          formData.append('password',password);
          formData.append('username',phone);
         // formData.append('billing',JSON.stringify(billing));
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/customers', {method:'POST', 
        headers: {
                  'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'},
        body: formData})
        .then(response => response.json())
        .then(json => { 
          if(json.id!=undefined){
                alert("Thank You For Registration");
              }else{alert(json.message)}
          console.log(json); });
    }
    render() {
       return (
         
        <div style={{marginTop:'10%'}}>
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
                    <Label >Password</Label>
                    <Input type={'password'}  name='password' placeholder='Enter Password' value={this.state.password} onChange={ (e)=>this.setState({password: e.target.value})} required></Input>
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
                  <FormGroup>
                    <Label >Phone</Label>
                    <Input type='number'  name='phone' placeholder='Enter Phone' value={this.state.phone} onChange={ (e)=>this.setState({phone: e.target.value})} required></Input>
                  </FormGroup> 
                  <FormGroup>
                    <Button onClick={()=>this.handleSubmit()}>Register</Button>
                  
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

 