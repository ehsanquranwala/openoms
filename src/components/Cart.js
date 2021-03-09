import React from "react";
import { Card, CardImg, CardBody,
  CardTitle,Container,Row,Button,Input,Col,Label, CardHeader, CardSubtitle,FormGroup,
  Modal, ModalHeader, ModalBody, ModalFooter ,Table} from 'reactstrap';
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
 class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    totalqty:0 ,
                    cart:[],
                    firstName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    address:'',
                    city:'',
                    area:'',
                    delivery:250,
                    readonly:false,
                    subTotal:0,
                    total:0,
                    discount:false,
                    discountPercent:0,
                    discountRadio:'',
                    kidCount:0,
                    wifeCount:0,
                    coupon:'',
                    totaldiscount:0,
                    
                    };
    }
    
    componentDidMount(){
      this.getCart()
    }
    async getCustomer(){
      console.log(this.props.user)
     if(this.props.user.length!==0){
      this.setState({ firstName:this.props.user.user.firstname,
                      lastName:this.props.user.user.lastname,
                      email:this.props.user.user.email,
                      phone:this.props.user.user.username,
                      readonly:true
                  })
        await fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/customers/${this.props.user.user.id}`,
          {method:'GET', 
            headers: {
            'Authorization':'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
          .then(response => response.json())
          .then(json => { 
            console.log(json)
            if(json.id){
              console.log(json)
              this.setState({firstName:json.billing.first_name,
                              lastName:json.billing.last_name,
                              email:json.billing.email,
                              phone:json.billing.phone,
                              address:json.billing.address_1,
                              city:json.billing.city,
                              area:json.billing.address_2,
                              delivery:json.billing.postcode,
                              readonly:true
                           })} 
            else{ 
              this.setState({ delivery:250,editable:false})
                        } 
        });
      }
    }

    getCart(){
     let getCart= ls.get('cart');
     console.log(getCart)
      if(getCart===''){this.setState({delivery:0})}
      else{
        this.setState({cart:getCart})
        this.getCustomer() 
        let total=0,totalqty=0; 
        for(var a=0;a<= getCart.length-1;a++){
          totalqty+=getCart[a].quantity
        }
        var{discountPercent}=this.state;
        var subTotal=0;
        for(var aa=0;a<= getCart.length-1;aa++){
          if(getCart[aa].priceType=='retail'){
                        if(totalqty>=20){
                                subTotal+=    parseInt((getCart[aa].average.price)+(getCart[aa].average.resalebase)+(getCart[aa].average.expense)+((getCart[aa].average.price/100)*(getCart[aa].average.resalepercent-discountPercent)))*getCart[aa].quantity}
                        else{   subTotal+=parseInt((getCart[aa].average.price)+(getCart[aa].average.retailbase)+(getCart[aa].average.expense)+((getCart[aa].average.price/100)*(getCart[aa].average.retailpercent-discountPercent)))*getCart[aa].quantity}
          }else if(getCart[aa].priceType=='wholesale'){
                                subTotal+=  parseInt((getCart[aa].average.price)+(getCart[aa].average.wholebase)+(getCart[aa].average.expense)+((getCart[aa].average.price/100)*(getCart[aa].average.wholepercent-discountPercent)))*getCart[aa].quantity}
          else if(getCart[aa].priceType=='special'){
                                subTotal+=  parseInt((getCart[aa].average.price)+(getCart[aa].average.specialbase)+(getCart[aa].average.expense)+((getCart[aa].average.price/100)*(getCart[aa].average.specialpercent-discountPercent)))*getCart[aa].quantity}
          else{subTotal+=0}
          console.log('subtotal',subTotal)
       this.setState({subTotal:subTotal,totalqty:totalqty})
      }
    }
    }
  
    checkOut(){
      const {firstName,lastName,email,phone,address,city,area,delivery,subTotal,discountPercent,discountRadio,total}=this.state;
      if(  phone!=='' && address!==''  ){
       let data={
                    "payment_method": "COD",
                    "payment_method_title": "Cash On Delivery",
                    "set_paid": true,
                      "billing":{"first_name":firstName,
                                "last_name":lastName,
                                "email":email ,
                                "phone":phone ,
                                "address_1":address ,
                                "address_2":area ,
                                "city":city,
                                "company":'',
                                "state":'',
                                "postcode":delivery.toString(),
                                "country":''},
                      "shipping":
                                {"first_name":firstName,
                                "last_name":lastName,
                                "email":email ,
                                "phone":phone ,
                                "address_1":subTotal.toString(),
                                "address_2":discountPercent.toString() ,
                                "city":discountRadio.toString(),
                                "company":total.toString(),
                                "state":'',
                                "postcode":delivery.toString(),
                                "country":'pk'},
                      "line_items": 
                                this.state.cart,
                      "shipping_lines": [
                                {"method_id": "flat_rate",
                                "method_title": "Flat Rate",
                                "total": delivery.toString()
                              }
                        ]};
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/orders', 
      { method:'POST', 
        headers: {'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')},
        body: JSON.stringify(data)})
      .then(response => response.json())
      .then(json => { if(json.id){
                        alert("Order Book Successfull");
                        this.setState({cart:[],subTotal:0,total:0});
                        ls.set('cart',[]);
                        }
                        else{alert(json)}
        console.log("Order book",json); });
      }else{alert("Please Enter Complete Details")}
    }
    plusProduct(i){
      let {cart,discountPercent}=this.state;
      let price=0;let priceType='';
      var totalqty=1;  
      for(var o=0;o<=cart.length-1;o++){
        totalqty+=cart[o].quantity
        }
      //Apply Wholesale Price
      if(cart[i].quantity>=19){
            priceType='wholesale';}
      else{ 
        if(cart[i].priceType=='special') {priceType='special';}else{priceType='retail';}
      }
      let product={
                  product_id:cart[i].product_id,
                  quantity:cart[i].quantity+1,
                  desc:cart[i].desc,
                  slug:cart[i].slug,
                  price:price,
                  image:cart[i].image,
                  average:cart[i].average,
                  discount:cart[i].discount,
                  priceType:priceType}
      cart[i] = product;
      ls.set('cart',cart);
      this.getCart();
    }
    minusProduct(i){
      let {cart,discountPercent}=this.state;
      var totalqty=-1;  
      for(var o=0;o<=cart.length-1;o++){
        totalqty+=cart[o].quantity
        }
        this.setState({totalqty:totalqty})
      if(cart[i].quantity!==1){
        let price=0;let priceType='';
        //Apply Wholesale Price
        if(cart[i].quantity>20){
          priceType='wholesale';
        }
        else{  
          if(cart[i].priceType=='special') {priceType='special';}else{priceType='retail';}
          }
      
      
          let product={product_id:cart[i].product_id,
                    quantity:cart[i].quantity-1,
                    desc:cart[i].desc,
                    slug:cart[i].slug,
                    price:cart[i].price,
                    image:cart[i].image,
                    average:cart[i].average,
                    discount:cart[i].discount,
                    priceType:priceType}
      cart[i] = product;
      ls.set('cart',cart);
      this.getCart();
      }
    }
    removeProduct(i){
      let {cart}=this.state;
      cart.splice(i, 1);
      ls.set('cart',this.state.cart);
      this.getCart();
      
    }
    getDiscount(){
      var {discountRadio,kidCount,wifeCount,discountPercent}=this.state;
      if(discountRadio=='kids'){
        if( kidCount>5){kidCount=5}
       const discount= (Number(kidCount)*2)
        this.setState({discountPercent:discount})
      }
      else if(discountRadio=='wife'){
        
            if( wifeCount==0){this.setState({discountPercent:0})}
            if( wifeCount==1){this.setState({discountPercent:3})}
            if( wifeCount==2){this.setState({discountPercent:10})}
            if( wifeCount==3){this.setState({discountPercent:18})}
            if( wifeCount==4){this.setState({discountPercent:28})}
               
        
      }
      else if(discountRadio==='guest'){this.setState({discountPercent:5})}
      else if(discountRadio==='health'){this.setState({discountPercent:5})}
      else if(discountRadio==='islamic'){this.setState({discountPercent:7})}
      else if(discountRadio==='jobless'){this.setState({discountPercent:10})}
      
      else if(discountRadio==='disabled'){this.setState({discountPercent:10})}
      else if(discountRadio==='quantity'){this.setState({discountPercent:0})}
      this.setState({discount:false})
      
    }
    getCoupon(){
      let {cart}=this.state;
      var {coupon}=this.state;
      for(var a=0;a<= cart.length-1;a++){
      var priceType=cart[a].priceType;
        if(coupon==cart[a].average.coupon){
        if(cart[a].priceType=='resale' || cart[a].priceType=='retail'){
        priceType= 'special';

        }

        let product={product_id:cart[a].product_id,
          quantity:cart[a].quantity,
          desc:cart[a].desc,
          slug:cart[a].slug,
          price:cart[a].price,
          image:cart[a].image,
          average:cart[a].average,
          discount:cart[a].discount,
          priceType:priceType}

          cart[a] = product;
          ls.set('cart',cart);
          this.getCart();
      }
      }
      
    }
    getretail(product,discount){
      if(discount>0){
       return (((product.average.price/100)*(product.average.retailpercent))-((product.average.price/100)*(product.average.retailpercent-discount))).toFixed(2)
      }else{
        return parseInt((product.average.price)+(product.average.retailbase)+(product.average.expense)+((product.average.price/100)*(product.average.retailpercent)));
      }
    
    }
    getwholesale(product){
     
     return parseInt((product.average.price)+(product.average.wholebase)+(product.average.expense)+((product.average.price/100)*(product.average.wholepercent)));
       
    }
    getresale(product){
     
      return parseInt((product.average.price)+(product.average.resalebase)+(product.average.expense)+((product.average.price/100)*(product.average.resalepercent)));
       
    }
    getpromo(product){
     
     return parseInt((product.average.price)+(product.average.specialbase)+(product.average.expense)+((product.average.price/100)*(product.average.specialpercent)));
       
    }
    getspecial(product){
     
      return parseInt((product.average.price)+(product.average.specialbase)+(product.average.expense)+((product.average.price/100)*(product.average.specialpercent)));
        
     }
    render() {
      var {subTotal,delivery,cart,address,readonly,discount,discountPercent,totalqty,totaldiscount}=this.state;
     const total=Number(delivery)+Number(subTotal)-((Number(subTotal)/100)*discountPercent);
       return (
          <div style={{marginTop:20}}>
            {cart.length >0?
            <Container className="themed-container" fluid="lg" >
            <Row>
            <Col md="8">
             <Row><Col md='12'>
              
             
             <Row>
               <Table bordered={true} style={{fontSize:12}}>
               <thead>
                      <tr><th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Applied Price</th>
                        <th>Qty</th>
                        <th>Actual Price</th>
                        <th>Discounted Price</th>
                      </tr>
                    </thead>
                  <tbody>
                  {cart.length >0?
                    cart.map((product,i) => 
                  <tr>
                    <td><CardImg  style={{width:55,height:50,padding:0}} src={product.image} alt="Fish" /></td>
                    <td>{product.slug}</td>
                      <td ><Row>Retail: {this.getretail(product,0)}</Row>
                          <Row>Wholesale: {this.getwholesale(product)}</Row>
                          <Row>Resale: {this.getresale(product)}</Row>
                          <Row>Promo: {this.getpromo(product)}</Row>
                          <Row>Special: {//Discount
                    product.priceType=='retail'?
                        totalqty>=20?
                        this.getspecial(product):
                        this.getretail(product,discountPercent):
                        product.priceType=='wholesale'?
                        (((product.average.price/100)*(product.average.wholepercent))-((product.average.price/100)*(product.average.wholepercent-discountPercent))).toFixed(2):
                        product.priceType=='special'?
                        (((product.average.price/100)*(product.average.specialpercent))-((product.average.price/100)*(product.average.specialpercent-discountPercent))).toFixed(2):
                        <div></div>
                            }</Row>
                     
                      </td>
                    
                    <td>{//subtotal
                    product.priceType=='retail' && totalqty>=20 ? 'resale':product.priceType }
                      
                    </td>
                    <td>{product.quantity}</td>
                    <td> {product.priceType=='retail'?
                            totalqty>=20?
                             parseInt((product.average.price)+(product.average.resalebase)+(product.average.expense)+((product.average.price/100)*(product.average.resalepercent)))*product.quantity:
                             parseInt((product.average.price)+(product.average.retailbase)+(product.average.expense)+((product.average.price/100)*(product.average.retailpercent)))*product.quantity:
                        product.priceType=='wholesale'?
                        parseInt((product.average.price)+(product.average.wholebase)+(product.average.expense)+((product.average.price/100)*(product.average.wholepercent)))*product.quantity:
                          product.priceType=='special'?
                           parseInt((product.average.price)+(product.average.specialbase)+(product.average.expense)+((product.average.price/100)*(product.average.specialpercent)))*product.quantity:
                        <div></div>
                        }</td>
                    <td>  
                      {//total
                      product.priceType=='retail'?
                        totalqty>=20?
                          parseInt((product.average.price)+(product.average.resalebase)+(product.average.expense)+((product.average.price/100)*(product.average.resalepercent-discountPercent)))*product.quantity:
                          parseInt((product.average.price)+(product.average.retailbase)+(product.average.expense)+((product.average.price/100)*(product.average.retailpercent-discountPercent)))*product.quantity:
                        product.priceType=='wholesale'?
                          parseInt((product.average.price)+(product.average.wholebase)+(product.average.expense)+((product.average.price/100)*(product.average.wholepercent-discountPercent)))*product.quantity:
                          product.priceType=='special'?
                          parseInt((product.average.price)+(product.average.specialbase)+(product.average.expense)+((product.average.price/100)*(product.average.specialpercent-discountPercent)))*product.quantity:
                        <div></div>
                        }
                    </td>
                    </tr>
                    
                  ):<h6>No Product Found</h6>}
                  <tr> <td>Total</td>{totalqty}<td></td><td></td><td></td><td></td></tr>
                  </tbody>
               </Table>
                 
                    
                </Row>
                </Col>
             </Row>
             
             <Row>
               
             <Card>
               <CardHeader>Customer Details</CardHeader>
              <CardBody style={{backgroundColor: "#f6f6f6"}}>
                
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label >Email Address *</Label>
                    <Input readOnly={readonly} type='email'  name='email' placeholder='Enter Email' value={this.state.email} onChange={ (e)=>this.setState({email: e.target.value}) } required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label >Phone *</Label>
                    <Input type='number'  name='phone' placeholder='Enter Phone' value={this.state.phone} onChange={ (e)=>this.setState({phone: e.target.value})} required></Input>
                  </FormGroup> 
                  </Col></Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label >First Name</Label>
                        <Input  name='id' placeholder='Enter First Name' value={this.state.firstName} onChange={ (e)=>this.setState({firstName: e.target.value})}  required></Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label >Last Name</Label>
                        <Input  name='pass' placeholder='Enter Last Name' value={this.state.lastName} onChange={ (e)=>this.setState({lastName: e.target.value})} required></Input>
                      </FormGroup>
                    </Col>
                </Row>
                  <Row>
                <Col md="12">
                  <FormGroup>
                    <Label >Address</Label>
                    <Input  name='address' placeholder='Enter Address' value={this.state.address} onChange={ (e)=>this.setState({address: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                 </Row>
                  <Row>
                <Col md="6">
                  <FormGroup>
                    <Label >Area</Label>
                    <Input  name='area' placeholder='Enter Area' value={this.state.area} onChange={ (e)=>this.setState({area: e.target.value})} required></Input>
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label >City</Label>
                    <Input  name='city' placeholder='Enter City' value={this.state.city} onChange={ (e)=>this.setState({city: e.target.value})} required></Input>
                  </FormGroup>
                  </Col></Row>
                 
                 
                  
              </CardBody>
            </Card>
                   </Row>
            </Col>
            <Col md="4">
                <Card>
                <CardHeader>Order Summary</CardHeader>
                    <CardBody style={{backgroundColor: "#f6f6f6"}}>
                    <CardTitle tag="h6">Address</CardTitle>
                    <CardSubtitle >{address}</CardSubtitle>
                    <hr style={{ color: '#c0c0c0', }} />
                    <CardTitle tag="h6">Your Order</CardTitle>
                    {cart.length >0?
                    cart.map((product,i) =>  
             
                <Row>
                    <Col  md="3">
                        <CardImg  style={{width:80,height:70,padding:0}} src={product.image} alt="Fish" />
                    </Col>
                    <Col  md="5">
                        <CardTitle tag="h6" >{product.slug} </CardTitle>
                        <CardTitle tag="h6" >Rs. {
                        product.priceType=='retail'?
                        totalqty>=20?
                          parseInt((product.average.price)+(product.average.resalebase)+(product.average.expense)+((product.average.price/100)*(product.average.resalepercent-discountPercent)))*product.quantity:
                          parseInt((product.average.price)+(product.average.retailbase)+(product.average.expense)+((product.average.price/100)*(product.average.retailpercent-discountPercent)))*product.quantity:
                        product.priceType=='wholesale'?
                          parseInt((product.average.price)+(product.average.wholebase)+(product.average.expense)+((product.average.price/100)*(product.average.wholepercent-discountPercent)))*product.quantity:
                          product.priceType=='special'?
                          parseInt((product.average.price)+(product.average.specialbase)+(product.average.expense)+((product.average.price/100)*(product.average.specialpercent-discountPercent)))*product.quantity:
                        <div></div>
                        }</CardTitle>
                        
                    </Col>
                    
                    <Col  md="3">
                          <div style={{flexDirection:"row",display:"flex"}}>
                              <Button color="info" size="sm" onClick={()=>this.minusProduct(i)} >-</Button>
                              <Label size="sm" style={{padding:10,height:5}}>{product.quantity}</Label>
                              <Button color="info" size="sm" onClick={()=>this.plusProduct(i)}>+</Button>
                          </div>
                          <Button color="info" size="sm" onClick={()=>this.removeProduct(i)}>Remove</Button>
                  
                    </Col>
                </Row>
             ):<h6>No Product Found</h6>}
              <hr style={{ color: '#c0c0c0', }} />
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Sub Total</Label>
                      <Label size="md" >{parseInt(subTotal)}</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="md" >Discount</Label>
                      <Label size="md" >{parseInt(discountPercent)}</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="sm" >Delivery Fee</Label>
                      <Label size="sm" >{delivery}</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Label size="lg" >Total</Label>
                      <Label size="lg" >{parseInt(total)}</Label>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                      <Input  name='PromoCode' size="sm" placeholder='Promo Code' value={this.state.coupon} onChange={ (e)=>this.setState({coupon: e.target.value})} required></Input>
                      <Button onClick={()=>this.getCoupon()} color='info' size="sm">Apply</Button>
                      <Button onClick={()=>this.setState({discount:true})} color='info' size="sm">Discount</Button>
                    </div>
                    </Col>
                  </Row>
                  <hr style={{ color: '#c0c0c0', }} />
              <Button onClick={()=>this.checkOut()} size="md">GO TO CHECKOUT</Button>
                    </CardBody>
                </Card>
            </Col>
            </Row> 
            </Container>:
            <Container><h3>No product in cart. Start adding items to your cart <Button>here</Button></h3> </Container>}
                    <Modal size="lg" isOpen={discount} >
                      <ModalHeader >Get Discount</ModalHeader>
                      <ModalBody>
                      <FormGroup check>
                        <Label size='sm' check style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                          <Input  type="radio" name="radio1"  value="kids" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})} />{' '}
                          Blessed with kids alhamdulillah, we love kids and have some gift for them. Tell us your kids.<Input min='0' max='5' size='sm'style={{width:60}}  type="number" name="" value={this.state.kidCount} onChange={ (e)=>this.setState({kidCount: e.target.value})}/>.
                          
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check style={{flexDirection:"row",display:"flex",justifyContent:"space-between"}}>
                          <Input type="radio" name="radio1" value="wife" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Taken responsibility of wives, here is a small appreciation for you and your wife/wives. Tell us your wives.<Input size='sm'style={{width:60}} min='0' max='4'  type="number" name="" value={this.state.wifeCount} onChange={ (e)=>this.setState({wifeCount: e.target.value})} />.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input  type="radio" name="radio1" value="guest" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})} />{' '}
                          Having guests to have fish, we want to be a source of Barakah with this small gift.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input type="radio" name="radio1" value="health" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Not feeling well, we pray for your health and here is a small gift.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input type="radio" name="radio1" value="islamic" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Working in some Islamic project like Madrasa, etc, pray for us as we are busy in dunya and do accept our small gift.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input type="radio" name="radio1" value="difficult" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Going through difficult times financially, keep strong, we all are being tested, here is a small gift.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input type="radio" name="radio1" value="disabled" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Taking care of a differntly abled family member, our moral support is with you and this small gift.
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label size='sm' check>
                          <Input type="radio" name="radio1" value="benefitial" onChange={(e)=>this.setState({discountRadio:e.currentTarget.value})}/>{' '}
                          Need lots of fish, lets do a mutually benefitial deal with this discount price.
                        </Label>
                      </FormGroup>
                     
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={()=>this.getDiscount()}>Get Discount</Button>{' '}
                        <Button color="secondary" onClick={()=>this.setState({discount:false})}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
          </div>
       );
    }
 }

 const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);