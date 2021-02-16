import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import moment from 'moment';
  var ls = new SecureLS({encodingType: 'aes'});
  
  const token=ls.get('token')
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
            'Authorization':'Bearer ' + token}})
          .then(response => response.json())
          .then(json => { 
            if(json.length>0){
              this.setState({orders:json})
            }
        });
    }
   render() {
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
           <Col md="3"></Col>
            <Col md="5">
                <Card>
                <CardHeader>Active Orders</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    
             {this.state.orders.map((product,i) =>  
                product.status=='processing'?
                
                  <Row>
                    <Col> 
                      <Row> 
                        <Col>{ moment(product.date_created).format('MM-DD-YYYY')}</Col>
                        <Col>{product.total}</Col>
                      </Row>
                        <div style={{flexDirection:"row",display:"flex"}}>
                          { product.line_items.map((items,i) => 
                              <p style={{fontSize:11}}>{items.quantity}x {items.name} ,</p>
                            ) }
                        </div>
                    </Col>
                      
                  </Row>:
                      <div>
                      </div>
                )}
                  
                    </CardBody>

      <CardHeader>Past Orders</CardHeader>
      <CardBody style={{backgroundColor: "#f6f6f6"}}>
         {this.state.orders.map((product,i) =>  
                product.status=='completed'?
                
                  <Row>
                    <Col> 
                      <Row> 
                        <Col>{ moment(product.date_created).format('MM-DD-YYYY')}</Col>
                        <Col>{product.total}</Col>
                      </Row>
                        <div style={{flexDirection:"row",display:"flex"}}>
                          { product.line_items.map((items,i) => 
                              <p style={{fontSize:11}}>{items.quantity}x {items.name} ,</p>
                            ) }
                        </div>
                    </Col>
                      
                  </Row>:
                      <div>
                        
                      </div>
          )}
                  
                    </CardBody>
                </Card>
            </Col>
            </Row> 
            </Container>
          </div>
       );
    }
 }

 