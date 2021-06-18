import React,{useEffect} from "react";

import {Link,useParams} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  var data = require('../assets/data.json');
  var link = 'http://10.0.1.105/cowmandipk/';
  var temp=[]
  export default function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    useEffect(() => {    
      data.map((e)=>{
      if(e.id==id){
            for(var a=1;a<=e.pic_count;a++){
                temp.push({"original": link+"1/1.jpeg",
                          "thumbnail": link+id1/1.jpeg"})
            }
      }
    }
      )

      });
    return (

      <div>
        <Container className="themed-container"  >
          <Row>
        <ImageGallery items={data} />
        </Row></Container>
      </div>
    );
  }
 