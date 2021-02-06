import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Container,Row,Button,Input,Col,Label} from 'reactstrap';
  import { useParams } from "react-router-dom";

  export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:[],
                    };
    }
    
    componentDidMount(){
    this.getProduct()
    }
    getProduct(){
       // let params = queryString.parse(url);
   // alert(params)
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/', {method:'GET', 
        headers: {'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'}})
        .then(response => response.json())
        .then(json => {this.setState({product:json}); console.log(json); });
    }
    render() {
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <h2>Fishes</h2>
              <Row>
                
                {this.state.product.map((product) =>  <Col sm="12"><Card>
              
                <CardBody style={{backgroundColor: "#c0c0c0"}}>
                  
                    <CardImg top width="20%" style={{width:400,height:250}} src={product.images[0].src} alt="Fish" />
                    <CardTitle tag="h5" >{product.slug} </CardTitle>
                    <CardTitle tag="h6" color="blue">Rs. {product.price}</CardTitle>
                        <Row>
                            
                            <Col md="2"><Label>Qty:</Label></Col>
                            <Col md="4">
                              <Input style={{padding:5}} size="sm" defaultValue="1" type="number" max="10" min="1"  ></Input> 
                            </Col>
                            <Col md="6">
                              <Button color="info" size="sm" >Add to Cart</Button>
                            </Col>
                        </Row>
                </CardBody>
              </Card></Col>)}
            </Row>
          </Container>
          </div>
       );
    }
 }

 