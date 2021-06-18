import React from "react";

import {Link,useParams} from "react-router-dom";
import { connect } from "react-redux";
import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});

 export default class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:{},
                    image:'',
                    qty:1 ,
                    modal:false
                    };
    }
    
    componentDidMount(){
      console.log(this.props.selectProduct)
    }
  
   
    
    render() {
   
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
             
           
          </Container>
          </div>
       );
    }
 }
 