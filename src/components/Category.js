import React from "react";
import { Button,Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Container,Row,Col,List} from 'reactstrap';
  import SecureLS from 'secure-ls';
  import TreeMenu from 'react-simple-tree-menu';
  import CheckboxTree from 'react-checkbox-tree';
  import { enableRipple } from '@syncfusion/ej2-base';

  import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
  import DropdownTreeSelect from 'react-dropdown-tree-select';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
  export default class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {category:[],
                    product:[],
                    catId:0,
                    checked: [],
                    expanded: [],};
                   

                  
              }
              
              nodeChecked(args) {
                alert("The checked node's id: " + this.checkedNodes); }      
    
    componentDidMount(){
    this.getCategory()
    }
    getCategory(){
      let data=[];
      fetch('https://www.weeklyfishclub.com/wp-json/wc/v3/products/categories?hide_empty=false', {method:'GET', 
        headers: {'Authorization': 'Bearer ' + token}})
        .then(response => response.json())
        .then(json => { //this.setState({category:json}); 
        console.log("json",json)  
        for(var a=0;a<= json.length-1;a++){
          let tempData1=[];
          console.log(json[a].name)
                for(var b=0;b<= json.length-1;b++){
                  console.log(json[b].name)
                      if(json[a].id==json[b].parent){
                          let tempData2=[];
                            
                            for(var c=0;c<= json.length-1;c++){
                              console.log(json[c].name)
                                      if(json[b].id==json[c].parent){
                                            tempData2.push({'value':json[c].id,
                                                            'label':json[c].name,
                                                            })
                                            json.splice(c, 1); 
                                      }
                            } 
                                  tempData1.push({'value':json[b].id,
                                                  'label':json[b].name,
                                                  'children':tempData2})
                              json.splice(b, 1); 
                      }
                    
                  }

          data.push({'value':json[a].id,
                      'label':json[a].name,
                      'children':tempData1,
                      })
          
         }
         console.log("array",data)  
         this.setState({category:data})
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
                            onNodeToggle={onNodeToggle} />
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

 