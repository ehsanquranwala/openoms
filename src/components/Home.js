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
       //console.log("category",data)
       this.props.addCategory(data)
    }
     
    getProduct(){
      if(this.props.product.length ===0){
     let price_table_data=[];
     let products=[];   
     let data = new FormData();
      data.append('post','getpurchase');
     fetch('https://weeklyfishclub.com/api/create_post', {
        method:'POST', 
        body: data
      })
        .then(response => response.json())
        .then(json => {
          if(json[0].length>0){
            price_table_data=json[0];
            let array=[];
            for(var a=0;a<=price_table_data.length-1;a++){
              array.push(price_table_data[a]);
              
            let product_id=             price_table_data[a].product_id;
            
            let purchase_price=             price_table_data[a].purchase_price;
            let whole_weight=               price_table_data[a].whole_weight;
            let expenses=                   price_table_data[a].expenses;
            let base_profit_retail=         price_table_data[a].base_profit_retail;
            let price_percent_profit_retail=price_table_data[a].price_percent_profit_retail;
            }
         }
       }); 
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products', {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            for(var i=0;i<=json.length-1;i++){
              var found=0;var temp=[];
              for(var a=0;a<=price_table_data.length-1;a++){
                if(json[i].id == price_table_data[a].product_id){
                  console.log('price table',price_table_data[a])
                 temp.push(price_table_data[a])
              //    products.push({product:json[i],price:price_table_data[a]})
              
                  found=found+1;
                }
                 
              }
              for(var d=0;d<=temp.length-1;d++){
                let pp_retail=temp[d].price_percent_profit_retail;
                
              }
              products.push({product:json[i],price:temp})
              console.log(temp)
            }
            this.props.addProduct(products)
        console.log('logs',products)
          }
        
       });
      }
    }
    getCategory(){
      if(this.props.category.length ===0){
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/categories?hide_empty=false', {
        method:'GET', 
        headers: {'Authorization': 'Basic ' + btoa('ck_1c32b3a20592d8658aa6f72350f7843f6e40acce:cs_10dd1b3cf0344130871395eb03936cb5dee5af0c')}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            this.loop(json)
          }else{} 
        
       });
      }
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
                    <Card key={products.product.id} onClick={()=>{this.props.selectProduct(this.props.product[i].product)
                                                          this.setState({navigate:true})
                                                          }}>
                      <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                        {products.product.images[0]?
                      <CardImg  top width="20%" style={{width:200,height:150}} src={products.product.images[0].src}  />
                        :<div></div>}<CardTitle tag="h5" >{products.product.slug} </CardTitle>
                        {this.props.selectProduct.attributes!=undefined?
                      <CardTitle tag="h6" color="blue">Rs. {this.props.selectProduct.product.attributes[0].options[0]}</CardTitle>
                          : <div></div>}   </CardBody>
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