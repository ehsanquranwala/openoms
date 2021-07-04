import React,{useEffect,useState} from "react";

import {Link,useParams} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import { Card, CardImg, CardBody,
  CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import ReactPlayer from 'react-player';
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  var data = require('../assets/data.json');
  var link = 'http://cowmandi.net/cowmandi_assets/';
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
                temp.push({"original": link+id+'/'+a+'.jpg',
                          "thumbnail": link+id+'/'+a+'.jpg'})
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
              <ReactPlayer url={link+id+'/video.mp4'} />
        </Row></Container>
      </div>
    );
  }
 