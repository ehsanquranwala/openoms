import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Container,Row,Button,Input,Col,Label} from 'reactstrap';
  import {
    Link,
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  require('dotenv').config()
  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:[],
        navigate:false,
                    };
    }
    componentDidMount(){
      
      if(ls.get('token')=='' ){this.getGuestUser()}
      this.getProduct()
     }
    
    getProduct(){
      const token=ls.get('token')
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products', {
        method:'GET', 
        headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => {this.setState({product:json}); 
        console.log(json);
       });
    }
    getGuestUser(){
      let formData = new FormData();
          formData.append('username',process.env.REACT_APP_WORDPRESS_USER_ID);
          formData.append('password','k$bxWKLRM5');
      fetch('https://www.weeklyfishclub.com/wp-json/jwt-auth/v1/token', 
      {method:'POST', 
        body: formData})
        .then(response => response.json())
        .then(json => { 
          if(json.token!=undefined){
             ls.set('token',  json.token)
          } else{ alert(json.message)}
                                      });
                
    }
    setParam(id){
      ls.set('productId',id );
      this.setState({navigate:true})
    }
    
    render() {
      const { navigate } = this.state
      if (navigate) {
        return <Redirect to="/product" push={true} />
      }
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <h2>Fishes</h2>
              <Row>
                {this.state.product.map((product) =>  <Col sm="3">
                  <Card>
                    <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                    <CardImg onClick={()=>{this.setParam(product.id)}} top width="20%" style={{width:200,height:150}} src={product.images[0].src} alt="Fish" />
                    <CardTitle tag="h5" >{product.slug} </CardTitle>
                    <CardTitle tag="h6" color="blue">Rs. {product.price}</CardTitle>
                        
                </CardBody>
              </Card></Col>)}
            </Row>
          </Container>
          </div>
       );
    }
 }

 