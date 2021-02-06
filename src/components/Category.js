import React from "react";
import { Button,Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Container,Row,Col} from 'reactstrap';
  export default class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {product:[]};
    }
    componentDidMount(){
    this.getProduct()
    }
    getProduct(){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/categories', {method:'GET', 
        headers: {'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'}})
        .then(response => response.json())
        .then(json => { this.setState({product:json}); 
        console.log(json); });
    }
    render() {
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <h2>Category</h2>
              <Row>
                
                {this.state.product.map((product) =>  <Col sm="3"><Card>
              
                <CardBody style={{backgroundColor: "#006994"}}>
                  <CardImg top width="20%" style={{width:200,height:150}} src={product.name} alt="Fish" />
                    <CardTitle tag="h5" >{product.name} </CardTitle>
                  <CardText>{}</CardText>
                </CardBody>
              </Card></Col>)}
            </Row>
          </Container>
          </div>
       );
    }
 }

 