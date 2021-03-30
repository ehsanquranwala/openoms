import React from "react";
import { Button,Card, CardBody, CardHeader,Container,Row,Col,Input,FormGroup,Label,
 } from 'reactstrap';
  import {
    Link,
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user ,selectProduct, userdetail} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
 
 class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username:'',
                    password:'',
                    email:'',
                    navigate:false,
                    admin:false};
    }
  getUserDetail(id){
    
  
       fetch(`https://blog.weeklyfishclub.com/wp-json/wc/v3/customers/${id}`,
         {method:'GET', 
           headers: {
           'Authorization':'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
         .then(response => response.json())
         .then(json => { 
           if(json.id){
            this.props.Adduserdetail(json)
           
              this.setState({navigate:true})
            
            } 
           else{ 
                       } 
       });
     
  }

    handleSubmit=()=>{
      const {username,password}=this.state;
      if(username!='' && password!=''){
      let formData = new FormData();
          formData.append('username',username);
          formData.append('password',password);
      //fetch('https://blog.weeklyfishclub.com/wp-json/jwt-auth/v1/token',
      fetch(`https://blog.weeklyfishclub.com/api/user/generate_auth_cookie?email=${username}&password=${password}`,
      {method:'POST'})
        .then(response => response.json())
        .then(json => { 
          console.log(json)
          if(json.status=='ok'){
            this.props.Adduser(json)
            this.getUserDetail(json.user.id)
            
             // 
               } else{ alert(json.error)}   });
                        
                }else{alert("Username or Password empty")} 
    }


    render() {
      const { navigate,admin } = this.state
      if (navigate) {
        return <Redirect to="/" push={true} />
      }
   
      
       return (
          <div style={{marginTop:'5%'}}>
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

 
 const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Adduser(json) {
    dispatch(user(json));
    },
    Adduserdetail(json) {
      dispatch(userdetail(json));
      }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);