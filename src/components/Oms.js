import React from "react";
import { Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Button,Input,FormGroup,Label,Table, CardHeader} from 'reactstrap';
  import {
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";

  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
        const formula={ "Wholesale":[{}],
                        "Resell":[{}],
                        "Special":[{}]

                    }
  require('dotenv').config()
   class Oms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    id:'',            
                    slug:'',
                    Wholeweight:'',
                    Netweight:'',
                    price:'',
                    products:[],
                    date:'',
                    helper:'200',
                    cutting:'20',
                    transport:'400',
                    trolley:'100',
                    ice:'10',
                    shopper:'50',
                    washing:'10',
                    packing:'5',
                    food:'100',
                    otherExpense:'0',
                    base_profit_retail:'60',
                    price_percent_profit_retail:'35',
                    base_profit_wholesale:'60',
                    price_percent_profit_wholesale:'25',
                    base_profit_resale:'60',
                    price_percent_profit_resale:'30',
                    base_profit_special:'60',
                    price_percent_profit_special:'15',
                    special_price_code:'',
                    totalExpense:0
                    };
    }
    componentDidMount(){
      this.getProduct()
      this.setState({date: new Date().getDate('Y-m-d')})
     }
    
    getProduct(){
      if(this.props.product.length ===0){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products', {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            this.props.addProduct(json)
        }
          else{} 
        
       });
      }
    }
    purchase(){
    const{date,
          helper,
          cutting,
          transport,
          trolley,
          ice,
          shopper,
          washing,
          packing,
          food,
          otherExpense,
          base_profit_retail,
          price_percent_profit_retail,
          base_profit_wholesale,
          price_percent_profit_wholesale,
          base_profit_resale,
          price_percent_profit_resale,
          base_profit_special,
          price_percent_profit_special,
          products,
          totalExpense
        }=this.state;

        let data = new FormData();
      data.append('post','addpurchase');
      data.append("purchase_date",date);
      data.append("helper_payment",helper);
      data.append("cutting_payment",cutting);
      data.append("transport_fare",transport);
      data.append("trolley_fare",trolley );
      data.append("ice_cost",ice);
      data.append("shoppers_cost",shopper);
      data.append("washing_payment",washing );
      data.append("packing_expense",packing);
      data.append("food_cost",food );
      data.append("other_cost",otherExpense);
      data.append("base_profit_retail",base_profit_retail);
      data.append("price_percent_profit_retail",price_percent_profit_retail );
      data.append("base_profit_wholesale",base_profit_wholesale);
      data.append("price_percent_profit_wholesale",price_percent_profit_wholesale);
      data.append("base_profit_resale",base_profit_resale);
      data.append("price_percent_profit_resale",price_percent_profit_resale );
      data.append("base_profit_special",base_profit_special);
      data.append("price_percent_profit_special",price_percent_profit_special );
      let totalWholeWeight=0;
      let perKgExpense=0;
      for(var a=0 ; a<=products.length-1;a++ ){
        totalWholeWeight=Number(totalWholeWeight)+ Number(products[a].Wholeweight);
      }
      perKgExpense=(Number(helper)+Number(cutting)+Number(transport)+Number(trolley)+Number(ice)+Number(shopper)+Number(washing)+Number(packing)+Number(food)+Number(otherExpense))/totalWholeWeight;
      
      for(var a=0 ; a<=products.length-1;a++ ){
            data.append("product_id["+a+"]",products[a].product_id);
            data.append("product_slug["+a+"]",products[a].product_slug);
            data.append("purchase_price["+a+"]",products[a].purchase_price);
            data.append("price_date["+a+"]",products[a].price_date);
            data.append("whole_weight["+a+"]",products[a].Wholeweight);
            data.append("net_weight["+a+"]",products[a].Netweight);
            data.append("special_price_code["+a+"]",products[a].special_price_code);
            data.append("expense",perKgExpense);
          }

      if(products.length !==0){
      fetch('https://weeklyfishclub.com/api/create_post', {
        method:'POST',
        body: data
        })
        .then(response =>  response.json())
        .then(json => alert(json.status))
      }else{
        console.log("Product Not Selected")
      }
    }
   
 
    add(){
        const{products,id,slug,Wholeweight,Netweight,price,date,base_profit_retail,price_percent_profit_retail,base_profit_resale,price_percent_profit_resale,base_profit_wholesale,price_percent_profit_wholesale,base_profit_special,price_percent_profit_special,special_price_code}=this.state;
       //Formula Apply
        const resale=(Number(price)/Number(Wholeweight))+ Number(base_profit_resale) +((Number(price)/Number(Wholeweight))/100*Number(price_percent_profit_resale))
        const retail=(Number(price)/Number(Wholeweight))+ Number(base_profit_retail) +((Number(price)/Number(Wholeweight))/100*Number(price_percent_profit_retail))
        const wholesale=(Number(price)/Number(Wholeweight))+ Number(base_profit_wholesale) +((Number(price)/Number(Wholeweight))/100*Number(price_percent_profit_wholesale))
        const special=(Number(price)/Number(Wholeweight))+ Number(base_profit_special) +((Number(price)/Number(Wholeweight))/100*Number(price_percent_profit_special))
        //Table Array
        products.push({product_id:id,product_slug:slug,price_date:date,Wholeweight:Wholeweight,Netweight:Netweight,wholesale_price:wholesale,resale_price:resale,retail_price:retail,special_price:special,purchase_price:price,special_price_code:special_price_code})
        //Set products table state
        this.setState({products:products})
    }
    render() {
       
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            
                <Row>
                <Col md="2">
                <FormGroup>
                <Input  type="date" 
                        required={true} value={this.state.date}  
                        onChange={(e)=>{this.setState({ date:e.target.value })}}>
                   </Input>
                 </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                <Input  type="select" required={true} value={this.state.id}  onChange={(e)=>{this.setState({id:this.props.product[e.target.value].id,slug:this.props.product[e.target.value].slug}); }}>
                          <option  disabled={this.props.defaultDisabled} value="">Select Product</option>
                          {this.props.product.map((data, idx)=>{
                            return <option key={idx} value={idx}>{data.slug}</option>
                          })}
                 </Input>
                 </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                <Input  type="number" placeholder={'Price'} required={true} value={this.state.price}  onChange={(e)=>{this.setState({price:e.target.value}); }}>
                 </Input> </FormGroup>
                </Col>
                <Col md="2">
                    <FormGroup>
                <Input  type="number" placeholder={'Whole Weight'} required={true} value={this.state.Wholeweight}  onChange={(e)=>{this.setState({Wholeweight:e.target.value}); }}>
                 </Input>
                 </FormGroup>
                </Col>
                <Col md="2"><FormGroup>
                <Input  type="number" placeholder={'Net Weight'} required={true} value={this.state.Netweight}  onChange={(e)=>{this.setState({Netweight:e.target.value}); }}>
                 </Input> </FormGroup>
                </Col>
                <Col md="2"><FormGroup>
                <Input  type="text" placeholder={'Coupon Code'} required={true} value={this.state.special_price_code}  onChange={(e)=>{this.setState({special_price_code:e.target.value}); }}>
                 </Input> </FormGroup>
                </Col>
                
                <Col md="1"><FormGroup>
                <Button onClick={()=>this.add()}>Add</Button> </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="7">
                    <Table bordered='true'  style={{fontSize:12}}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Product Name</th>
                        <th>Purchase Price</th>
                        <th>Whole Weight</th>
                        <th>Net Weight</th>
                        
                        <th>Wholesale Price</th>
                        <th>Resale Price</th>
                        <th>Retail Price</th>
                        <th>Special Price</th>
                        <th>Coupon Code</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, i)=>
                      <tr>
                        <td>{product.price_date}</td>       
                        <td>{product.product_id+" "+product.product_slug}</td>
                        <td>{product.purchase_price}</td>
                        <td>{product.Wholeweight}</td>
                        <td>{product.Netweight}</td>
                        <td>{product.wholesale_price}</td>
                        <td>{product.resale_price}</td>
                        <td>{product.retail_price}</td>
                        <td>{product.special_price}</td>
                        <td>{product.special_price_code}</td>
                        
                      </tr>
                      )}
                    </tbody>
                  </Table>
                 
                  </Col>
                  <Row>
                  <Col md="8">
                  <Card>
                      <CardHeader>Expenses</CardHeader>
                      <CardBody><Row>
                          <Col md="3">
                          <FormGroup>
                               <Label size="sm">Helper</Label>
                                <Input size="sm" placeholder="Helper" type="number" value={this.state.helper} onChange={(e)=>{this.setState({helper:e.target.value})}}></Input>
                          </FormGroup></Col>
                          <Col md="3">
                          <FormGroup>
                           <Label size="sm">Cutting</Label>
                                <Input size="sm" placeholder="Cutting" type="number" value={this.state.cutting} onChange={(e)=>{this.setState({cutting:e.target.value})}}></Input>
                          </FormGroup></Col>
                          <Col md="3">
                            <FormGroup>
                            <Label size="sm">Transport</Label>
                                <Input size="sm" placeholder="Transport" type="number" value={this.state.transport} onChange={(e)=>{this.setState({transport:e.target.value})}}></Input>
                            </FormGroup></Col>
                          <Col md="3">
                            <FormGroup>
                            <Label size="sm">Trolley</Label>
                                  <Input size="sm" placeholder="Trolley fare" type="number" value={this.state.trolley} onChange={(e)=>{this.setState({trolley:e.target.value})}}></Input>
                            </FormGroup></Col>
                          <Col md="3">
                              <FormGroup>
                                <Label size="sm">Ice</Label>
                                <Input size="sm" placeholder="Ice" type="number" value={this.state.ice} onChange={(e)=>{this.setState({ice:e.target.value})}}></Input>
                          </FormGroup></Col>
                          <Col md="3">
                              <FormGroup>
                              <Label size="sm">Shoppers</Label>
                                    <Input size="sm" placeholder="Shopper" type="number" value={this.state.shopper} onChange={(e)=>{this.setState({shopper:e.target.value})}}></Input>
                              </FormGroup></Col>
                          <Col md="3">
                              <FormGroup>
                              <Label size="sm">Washing</Label>
                                    <Input size="sm" placeholder="Washing" type="number" value={this.state.washing} onChange={(e)=>{this.setState({washing:e.target.value})}}></Input>
                              </FormGroup></Col>
                          <Col md="3">
                              <FormGroup>
                              <Label size="sm">Packing</Label>
                                    <Input size="sm" placeholder="Packing" type="number" value={this.state.packing} onChange={(e)=>{this.setState({packing:e.target.value})}}></Input>
                              </FormGroup></Col>
                          <Col md="3">
                              <FormGroup>
                              <Label size="sm">Food</Label>
                                    <Input size="sm" placeholder="Food" type="number" value={this.state.food} onChange={(e)=>{this.setState({food:e.target.value})}}></Input>
                              </FormGroup>
                          </Col>
                          <Col md="3">
                              <FormGroup>
                              <Label size="sm">Other Expense</Label>
                                    <Input size="sm" placeholder="Other Expense" type="number" value={this.state.otherExpense} onChange={(e)=>{this.setState({otherExpense:e.target.value})}}></Input>
                              </FormGroup>
                          </Col>
                          </Row>
                          
                      </CardBody>
                  </Card>
                </Col>
                <Col md="4">
                  <Card>
                      <CardHeader>Formula</CardHeader>
                      <CardBody><Row>
                          <Col md="6">
                          <FormGroup>
                               <Label size="sm">base_profit_retail</Label>
                                <Input size="sm" placeholder="base_profit_retail" type="number" value={this.state.base_profit_retail} onChange={(e)=>{this.setState({base_profit_retail:e.target.value})}}></Input>
                          </FormGroup></Col>
                          <Col md="6">
                          <FormGroup>
                           <Label size="sm">price_percent_profit_retail</Label>
                                <Input size="sm" placeholder="price_percent_profit_retail" type="number" value={this.state.price_percent_profit_retail} onChange={(e)=>{this.setState({price_percent_profit_retail:e.target.value})}}></Input>
                          </FormGroup></Col>
                          <Col md="6">
                            <FormGroup>
                            <Label size="sm">base_profit_wholesale</Label>
                                <Input size="sm" placeholder="base_profit_wholesale" type="number" value={this.state.base_profit_wholesale} onChange={(e)=>{this.setState({base_profit_wholesale:e.target.value})}}></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                            <Label size="sm">price_percent_profit_wholesale</Label>
                                  <Input size="sm" placeholder="price_percent_profit_wholesale" type="number" value={this.state.price_percent_profit_wholesale} onChange={(e)=>{this.setState({price_percent_profit_wholesale:e.target.value})}}></Input>
                            </FormGroup></Col>
                            <Col md="6">
                            <FormGroup>
                            <Label size="sm">base_profit_resale</Label>
                                <Input size="sm" placeholder="base_profit_resale" type="number" value={this.state.base_profit_resale} onChange={(e)=>{this.setState({base_profit_resale:e.target.value})}}></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                            <Label size="sm">price_percent_profit_resale</Label>
                                  <Input size="sm" placeholder="price_percent_profit_resale" type="number" value={this.state.price_percent_profit_resale} onChange={(e)=>{this.setState({price_percent_profit_resale:e.target.value})}}></Input>
                            </FormGroup></Col>
                            <Col md="6">
                            <FormGroup>
                            <Label size="sm">base_profit_special</Label>
                                <Input size="sm" placeholder="base_profit_special" type="number" value={this.state.base_profit_special} onChange={(e)=>{this.setState({base_profit_special:e.target.value})}}></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                            <Label size="sm">price_percent_profit_special</Label>
                                  <Input size="sm" placeholder="price_percent_profit_special" type="number" value={this.state.price_percent_profit_special} onChange={(e)=>{this.setState({price_percent_profit_special:e.target.value})}}></Input>
                            </FormGroup></Col>
                          </Row>
                      </CardBody>
                  </Card>
                </Col>
                </Row>
              </Row>
              <FormGroup>
                         <Button onClick={()=>this.purchase()}  size="lg">Update</Button>
               </FormGroup>
            </Container>
           
          </div>
       );
    }
 }

 const mapStateToProps = state => {
  return {
    product: state.product,
    category: state.category,
    selectProduct:state.selectProduct
  };
};

const mapDispatchToProps = dispatch => {
  return {
     addProduct(product) {
      dispatch(products(product));
    },
    addCategory(cat) {
      dispatch(category(cat));
    },
    selectProduct(product) {
      dispatch(selectProduct(product));
      
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Oms);