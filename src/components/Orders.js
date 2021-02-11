import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  var ls = new SecureLS({encodingType: 'aes'});
  
  export default class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    orders:[],
                    };
    }
    
    componentDidMount(){
      this.getOrders()
    }
    async getOrders(){
      const user=ls.get('user');
        await fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/orders?search=ymohsin102@gmail.com`,
          {method:'GET', 
            headers: {
            'Authorization':'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2Vla2x5ZmlzaGNsdWIuY29tIiwiaWF0IjoxNjEyNjA2NjQyLCJuYmYiOjE2MTI2MDY2NDIsImV4cCI6MTYxMzIxMTQ0MiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.APfUmhipRCDa-ylYZeOgdbmZIW1iZsjLovpjZAfBsjk'}})
          .then(response => response.json())
          .then(json => { 
             this.setState({orders:json})
             console.log(json)
        });
    }
   render() {
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
           
            <Col md="12">
                <Card>
                <CardHeader>My Orders</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <hr style={{ color: '#c0c0c0', }} />
        {this.state.orders.length >0?
            this.state.orders.map((product,i) =>  
            product.line_items.map((items,i) => 
             
                <Row>
                    <Col  md="3">
                        <CardImg  style={{width:80,height:70,padding:0}} src={items.image} alt="Fish" />
                    </Col>
                    <Col  md="5">
                        <CardTitle tag="h6" >{items.name} </CardTitle>
                        <CardTitle tag="h6" >Rs. {items.currency}</CardTitle>
                        
                    </Col>
                    <Col  md="3">
                       <Label size="sm" style={{padding:10,height:5}}>{items.quantity}</Label>
                    </Col>
                </Row>
         ) ):<h6>Oops, looks like you haven't placed any orders yet.</h6>}
              <hr style={{ color: '#c0c0c0', }} />
                  
                    </CardBody>
                </Card>
            </Col>
            </Row> 
            </Container>
          </div>
       );
    }
 }

 