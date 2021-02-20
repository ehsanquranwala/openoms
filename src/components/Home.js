import React from "react";
import { Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Button} from 'reactstrap';
  import {
    Redirect
  } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
  require('dotenv').config()
   class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        navigate:false,
                    };
    }
    componentDidMount(){
    console.log(this.props.product)
      this.getProduct()
      this.getCategory()
     }
     loop(json){
      let data=[];
      for(var a=0;a<= json.length-1;a++){
        let tempData1=[];
      
              for(var b=0;b<= json.length-1;b++){
                let tempData2=[]
                          for(var c=0;c<= json.length-1;c++){
                                if(json[b].id==json[c].parent){
                                    tempData2.push({  'value':json[c].id,
                                                      'label':json[c].name,
                                                            })
                                      console.log(c,json)
                                }
                              }
                    if(json[a].id==json[b].parent){
                         tempData1.push({ 'value':json[b].id,
                                          'label':json[b].name,
                                          'children':tempData2
                                                })
                          json.splice(b, 1); 
                    }
                  }

        data.push({'value':json[a].id,
                    'label':json[a].name,
                    'children':tempData1,
                    })
        
       }
       console.log("category",data)
       this.props.addCategory(data)
    }  
    getProduct(){
      if(this.props.product.length ===0){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products', {
        method:'GET', 
        headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            this.props.addProduct(json)
        }
          else{this.getGuestUser()} 
        
       });
      }
    }
    getCategory(){
      if(this.props.category.length ===0){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/categories?hide_empty=false', {
        method:'GET', 
        headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            this.loop(json)
          }else{this.getGuestUser()} 
        
       });
      }
    }
    getGuestUser(){
      let formData = new FormData();
          formData.append('username','admin');
          formData.append('password','k$bxWKLRM5');
      fetch('https://www.weeklyfishclub.com/wp-json/jwt-auth/v1/token', 
      {method:'POST', 
        body: formData})
        .then(response => response.json())
        .then(json => { 
          if(json.token!=undefined){
             ls.set('token',  json.token)
             
             this.getProduct()
          } else{ alert(json.message)}
                                      });
                
    }
    setParam(id){
      ls.set('productId',id );
      this.setState({navigate:true})
     
    }
    
    render() {
      const { navigate } = this.state
      if (navigate) {
        return <Redirect to="/product" push={true} />
      }
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
                <Row>
                  {this.props.product.map((products,i) =>  <Col sm="3">
                    <Card key={products.id} onClick={()=>{this.props.selectProduct(this.props.product[i])
                                                          this.setState({navigate:true})
                                                          }}>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        {products.images[0]?
                      <CardImg  top width="20%" style={{width:200,height:150}} src={products.images[0].src}  />
                        :<div></div>}<CardTitle tag="h5" >{products.slug} </CardTitle>
                      <CardTitle tag="h6" color="blue">Rs. {products.price}</CardTitle>
                  </CardBody>
                </Card></Col>)}
              </Row>
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
)(Home);