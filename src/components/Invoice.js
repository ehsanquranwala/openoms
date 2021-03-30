import React from "react";
import { Card, CardImg, CardBody,
 Table, CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import moment from 'moment';
  import { connect } from "react-redux";
  import {
    Redirect
  } from "react-router-dom";
  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  
  const token=ls.get('token')
 class Orders extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    orders:[],
                    navigate:false
                    };
    }
    componentDidMount(){
        console.log(this.props.invoice)
      }
  
   render() {
    const { navigate } = this.state
    if (navigate) {
      return <Redirect to="/product" push={true} />
    }
      const {qty}=this.state;
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="lg" >
            <Row>
                <Col md='2'></Col>
            <Col md="8">
            <Card>
            <CardHeader>Invoice</CardHeader>
                <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <Row>
                        <Col md="3">Billed To:<br></br>
                        {this.props.invoice.billing.first_name}
                        <br></br>
                        {this.props.invoice.billing.address_1}
                        </Col>
                        <Col  md="3">
                        Invoice No:<br></br>
                         {this.props.invoice.id}<br></br>
                            Order Date:<br></br>
                            {moment(this.props.invoice.date_created).format('MM-DD-YYYY')}
                        </Col><Col md="3"></Col>
                        <Col>Total Billed:<br></br>{this.props.invoice.shipping.address_2}</Col>
                      
                    </Row>
                  <Row>
                  <Table bordered={true} style={{fontSize:12}}>
               <thead>
                      <tr><th></th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                  <tbody>
                  {this.props.invoice.line_items.length >0?
                    this.props.invoice.line_items.map((product,i) => 
                  <tr>
                    <td><CardImg  style={{width:55,height:50,padding:0}} src={product.image} alt="Fish" /></td>
                    <td>{product.name}</td>
                      <td >{product.quantity} </td>
                    <td>{this.props.invoice.shipping_lines[i].total}
                    </td>
                    <td>
                    {this.props.invoice.shipping_lines[i].total*product.quantity}
                    </td>
                   
                    </tr>
                    
                  ):<h6>No Product Found</h6>}
                  
                  <tr> <td></td><td></td><td></td><td>SubTotal</td><td>{this.props.invoice.shipping.address_1}</td></tr>
                  <tr> <td></td><td></td><td></td><td>Delivery Charges</td><td>{this.props.invoice.shipping.postcode}</td></tr>
                  <tr> <td></td><td></td><td></td><td>Total</td><td>{parseInt(this.props.invoice.shipping.address_1)+parseInt(this.props.invoice.shipping.postcode)}</td></tr>
                  </tbody>
               </Table>
                  </Row>
                    </CardBody>

                </Card>
            </Col>
            <Col md='2'></Col>
            </Row> 
            </Container>
          </div>
       );
    }
 }
 const mapStateToProps = state => {
  return {
    invoice: state.invoice,
    user:state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectProduct(product) {
      dispatch(selectProduct(product));
      
    },
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
 