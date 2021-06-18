import React from "react";
import { Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Button} from 'reactstrap';
  import {
    Redirect
  } from "react-router-dom";

  import SecureLS from 'secure-ls';
  import ImageGallery from 'react-image-gallery';
  import {image} from './Images';
  var ls = new SecureLS({encodingType: 'aes'});
  var data = require('../assets/data.json');
  const token=ls.get('token')
  require('dotenv').config()

   export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        navigate:false,
                    };
    }
    componentDidMount(){
    console.log(this.props.product)
      
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
        <div style={{marginTop:'1%'}}>
        <Container className="themed-container"  >
          <Row>
        <ImageGallery items={data}
                      ref={i => this._imageGallery = i} 
                      onClick={(e)=>
                            console.log(this._imageGallery.getCurrentIndex())
                            } />
        </Row></Container>
        </div>
       );
    }
 }

