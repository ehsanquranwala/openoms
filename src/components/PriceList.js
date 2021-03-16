import React,{useState} from "react";
import { Button,Card, CardImg,  CardBody,
  CardTitle, Container,Row,Col,Input,FormGroup,Label} from 'reactstrap';
  import { connect } from "react-redux";
  import { products, addtocart, category,addArticle,user } from "../js/actions/index";
  import { XGrid } from '@material-ui/x-grid';
  import { useDemoData } from '@material-ui/x-grid-data-generator';

   class Category extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
                  };
                   }
    componentDidMount(){
    
    }
   
    render() {
      
      return (
        <div style={{marginTop:20}}>
            <Container className="themed-container" fluid="sm" >
            <h6>Price List</h6>
       
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