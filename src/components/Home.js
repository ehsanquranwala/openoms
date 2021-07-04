import React from "react";
import { Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Button} from 'reactstrap';
  import {
    Redirect
  } from "react-router-dom";

  import SecureLS from 'secure-ls';
  import ImageGallery from 'react-image-gallery';
  import {image} from './Images';
  import banner from '../assets/banner.jpg';
  var ls = new SecureLS({encodingType: 'aes'});
  var data = require('../assets/data.json');
  const token=ls.get('token')
  require('dotenv').config()

   export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        navigate:false,
        id:null,
                    };
    }
    componentDidMount(){
    //console.log(this.props.product)
      
     }
 
   
    setParam(id){
     
      this.setState({navigate:true,id:id})
     
    }
 
    render() {
      const { navigate,id } = this.state
      if (navigate) {
        return <Redirect to={'/'+id} push={true} />
      }
       return (
        <div style={{marginTop:'1%'}}>
        <Container className="themed-container"  >
          <Row>
        <ImageGallery
        
         items={data}
         thumbnailPosition="right"
                      ref={i => this._imageGallery = i} 
                      onClick={(e)=>
                        this.setParam(this._imageGallery.getCurrentIndex())
                            } />
        </Row>
        <Row style={{mardinTop:10}}>
          <img width={'100%'} src={banner}></img>
        </Row>
        </Container>
        </div>
       );
    }
 }

