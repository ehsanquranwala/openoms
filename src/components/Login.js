import React from "react";
import { Button,Card, CardBody, CardHeader,Container,Row,Col,Input,FormGroup,Label,
 } from 'reactstrap';
  import {
    Link,
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
 
  export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username:'',
                    password:'',
                    email:'',
                    navigate:false};
    }
  

    handleSubmit=()=>{
      const {username,password}=this.state;
      if(username!='' && password!=''){
      let formData = new FormData();
          formData.append('username',username);
          formData.append('password',password);
      fetch('https://www.weeklyfishclub.com/wp-json/jwt-auth/v1/token', {method:'POST', 
        body: formData})
        .then(response => response.json())
        .then(json => { 
          if(json.token!=undefined){
             ls.set('user', { token: json.token,
                              email: json.user_email,
                              user: json.user_nicename})
              this.setState({navigate:true})
                        } else{ alert(json.message)}  });
                }else{alert("Username or Password empty")} 
    }


    render() {
      const { navigate } = this.state
      if (navigate) {
        return <Redirect to="/product" push={true} />
      }
       return (
          <div style={{marginTop:'10%'}}>
            <Container className="themed-container" fluid="sm" >
              <Row>
              <Col md="4"></Col>
              <Col md="4">
                <Card>
                    <CardHeader>Login</CardHeader>
                    <CardBody style={{backgroundColor: "#006994"}}> 
                      <FormGroup>
                        <Label for="UserID">Enter Phone</Label>
                        <Input  name='id' placeholder='Enter Phone' value={this.state.username} onChange={ (e)=>this.setState({username: e.target.value})}  required></Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="Password">Enter Password</Label>
                        <Input  name='pass' placeholder='Enter Password' value={this.state.password} onChange={ (e)=>this.setState({password: e.target.value})} required></Input>
                      </FormGroup> 
                      <FormGroup>
                        <Button onClick={()=>this.handleSubmit()}>Login</Button>   
                      </FormGroup>
                      <Label>OR </Label>
                      <FormGroup>
                      <Label>Create an account </Label>
                        <Link to="/register"> Register</Link>
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

 