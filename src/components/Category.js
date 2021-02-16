import React from "react";
import { Button,Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Container,Row,Col,List} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import DropdownTreeSelect from 'react-dropdown-tree-select';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
  export default class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {category:[],
                    product:[],
                    catId:0,};
                   

                  
              }
                  
    
    componentDidMount(){
    this.getCategory()
    }
    loop(json){
      let data=[];
      for(var a=0;a<= json.length-1;a++){
        let tempData1=[];
      
              for(var b=0;b<= json.length-1;b++){
               
                    if(json[a].id==json[b].parent){
                        
                                tempData1.push({'value':json[b].id,
                                                'label':json[b].name,
                                                })
                          json.splice(b, 1); 
                    }
                  
                }

        data.push({'value':json[a].id,
                    'label':json[a].name,
                    'children':tempData1,
                    })
        
       }
       console.log("array",json) 
    }
    getCategory(){
      
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/categories?hide_empty=false', 
        { method:'GET', 
          headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => { //this.setState({category:json}); 
        
        this.loop(json)
       });
    }
    getProduct(id){
      const token=ls.get('token')
      const {catId}=this.state;
      
      fetch(`https://www.weeklyfishclub.com/wp-json/wc/v3/products/?category=${id}`, {
        method:'GET', 
        headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => {
          if(json.length>0){
            
     
          //   this.setState({product:json});
            }
          else{this.setState({product:[]});} 
        
       });
    }
    
    render() {
      const data = {
        label: 'search me',
        value: 'searchme',
        children: [
          {
            label: 'search me too',
            value: 'searchmetoo',
            children: [
              {
                label: 'No one can get me',
                value: 'anonymous',
              },
            ],
          },
        ],
      }
      const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
      }
      const onAction = (node, action) => {
        console.log('onAction::', action, node)
      }
      const onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
      }
       return (
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
           <Row>
            <Col md="4">
            
              <h5>Category</h5>
              <DropdownTreeSelect
                            data={this.state.category} 
                            onChange={onChange}
                            onAction={onAction} 
                            onNodeToggle={onNodeToggle} 
                            showDropdown={false}
                            />
            </Col>
              <Col>
              <h5>Fishes</h5><Row>
             
                {this.state.product.map((product) =>  <Col sm="4">
                
                  <Card>
                    <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                      {product.images[0]?
                    <CardImg onClick={()=>{this.setParam(product.id)}} top width="20%" style={{width:200,height:150}} src={product.images[0].src} alt="Fish" />
                      :<div></div>}
                      <CardTitle tag="h5" >{product.slug} </CardTitle>
                    <CardTitle tag="h6" color="blue">Rs. {product.price}</CardTitle>
                        
                </CardBody>
              </Card></Col>)}
              </Row>
            </Col>
            </Row>
          </Container>
          </div>
       );
    }
 }

 