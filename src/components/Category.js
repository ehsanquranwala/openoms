import React from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,} from 'reactstrap';
  import SecureLS from 'secure-ls';

  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";

  import DropdownTreeSelect from 'react-dropdown-tree-select';
  import 'react-dropdown-tree-select/dist/styles.css';
  var ls = new SecureLS({encodingType: 'aes'});
 
   class Category extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {product:[],
                    catId:0,};
                   }
    
    render() {
      const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::',  selectedNodes)
        

        for(var a=0;a <= selectedNodes.length-1;a++ )
        {//onsole.log(selectedNodes[a].value)
         
        
        }
      }
       return (
         
          <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
           <Row>
            <Col md="4">
            
              <h5>Category</h5>
              <DropdownTreeSelect
                            data={this.props.category} 
                            onChange={onChange}
                            showDropdown='always'
                            hierarchical={true}
                            />
                            
              
            </Col>
              <Col>
              <h5>Fishes</h5><Row>
              {this.state.product.map((product) =>  
               <Col sm="4">
                <Card>
                    <CardBody  style={{backgroundColor: "#f6f6f6"}}>
                      {product.images[0]?
                    <CardImg top width="20%" style={{width:200,height:150}} src={product.images[0].src} alt="Fish" />
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

 const mapStateToProps = state => {
  return {
    category: state.category,
    product: state.product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);