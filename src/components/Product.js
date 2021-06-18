import React,{useEffect,useState} from "react";

import {Link,useParams} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import ReactPlayer from 'react-player'
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  var data = require('../assets/data.json');
  var link = 'http://10.0.1.105/cowmandipk/';
  var temp =[]
  export default function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    var [count, setCount] =useState(0);
    useEffect(() => {    
      data.map((e)=>{
      if(e.id==id){
        if(temp.length==0){
        setCount(count + 1)  
            for(var a=1;a<=e.pic_count;a++){
                temp.push({"original": link+id+'/'+a+'.jpeg',
                          "thumbnail": link+id+'/'+a+'.jpeg'})
            }
          }
      } 
    }

      )

      });
    return (

      <div>
        <Container className="themed-container"  >
          <Row>
              <ImageGallery items={temp} />
              <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        </Row></Container>
      </div>
    );
  }
 