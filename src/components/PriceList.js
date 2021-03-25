import React from "react";
  import { Link } from "react-router-dom";
  import SecureLS from 'secure-ls';
  import { connect } from "react-redux";
  import { DataGrid } from '@material-ui/data-grid';
  import { Card, CardImg, CardBody,
    CardTitle, Container,Row,Button,Col,Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
  import { products, addtocart, category,addArticle,user ,selectProduct} from "../js/actions/index";
  var ls = new SecureLS({encodingType: 'aes'});
  const token=ls.get('token')
 class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
                    data:[]
                    };
    }
    
    componentDidMount(){
   this.props.product.map((product)=>{
     var Taste_Class='';
     if(product.filter.Taste_Class==1){Taste_Class='Lesser'}
     else if(product.filter.Taste_Class==2){Taste_Class='Normal'}
     else if(product.filter.Taste_Class==3){Taste_Class='Good'}
     else if(product.filter.Taste_Class==4){Taste_Class='Best'}
     else{Taste_Class='Normal'}
     var Thorns='';
     if(product.filter.Thorns==1){Thorns='Many'}
     else if(product.filter.Thorns==2){Thorns='Few'}
     else if(product.filter.Thorns==3){Thorns='One'}
     else if(product.filter.Thorns==0){Thorns='None'}
     else{Thorns='Normal'}
     var Meat_Whiteness='';
     if(product.filter.Meat_Whiteness==1){Meat_Whiteness='Very Light'}
     else if(product.filter.Meat_Whiteness==2){Meat_Whiteness='Light'}
     else if(product.filter.Meat_Whiteness==3){Meat_Whiteness='Dark'}
     else{Meat_Whiteness='Normal'}
     var Size='';
     if(product.filter.Size==1){Size='tiny'}
     else if(product.filter.Size==2){Size='small'}
     else if(product.filter.Size==3){Size='medium'}
     else if(product.filter.Size==4){Size='large'}
     else if(product.filter.Size==5){Size='extra large'}
     else{Size='medium'}
     var Salt_Water='';
     if(product.filter.Salt_Water==1){Salt_Water='Salt'}else{Salt_Water='Fresh'}
    var bestfor='';
     if(product.filter.Whole_Fry==1){bestfor='Whole Fry'}
     else if(product.filter.Piece_Fry==1){bestfor='Piece Fry'}
     else if(product.filter.Fillets==1){bestfor='Fillets'}
     else if(product.filter.Whole_Fry==1){bestfor='Whole Fry'}
     else if(product.filter.Grill==1){bestfor='Grill'}
     else if(product.filter.Salan==1){bestfor='Salan'}
     else if(product.filter.Biryani==1){bestfor='Biryani'}
     else if(product.filter.Soup==1){bestfor='Soup'}
    else{bestfor='none'}
            this.state.data.push({id:                  product.product.id,
                                  Taste_Class:         Taste_Class,
                                    Product:            product.product.name,
                                    Thorns:             Thorns,
                                    Meat_Whiteness:     Meat_Whiteness,
                                    Net_Wt_Fillets_Min:  product.filter.Net_Wt_Fillets_Min,
                                    Net_Wt_Steaks_Min:   product.filter.Net_Wt_Fillets_Min,
                                  Price:                 product.average.total_retail_price,
                                  Local_Grouping:      product.filter.Local_Grouping,
                                  Foreign_Names:       product.filter.Foreign_Names,
                                  Foreign_Grouping:    product.filter.Foreign_Grouping,
                                  Salt_Water:         Salt_Water,
                                  Urdu:                 product.filter.Urdu,
                                  Size:              Size,
                                bestfor:bestfor})
   })
    }

    render() {
      const columns = [
        { field: 'Foreign_Names' ,headerName:'Fish Name(foreign)', width: 200,hide: true},
        { field: 'Foreign_Grouping',headerName:'Group', width: 100  ,hide: true},
       
        { field: 'Product',headerName:'Fish Name(local)', width: 200 ,type:'string'},
        { field: 'Urdu',headerName:'Urdu', width: 100 },
        { field: 'Local_Grouping',headerName:'Group', width: 100 ,type:'string'},
        { field: 'Taste_Class',headerName:'Taste', width: 90 },
        { field: 'Thorns' ,headerName:'Thorns', width: 100},
        { field: 'Meat_Whiteness',headerName:'Meat Color', width: 100 },
        { field: 'Net_Wt_Fillets_Min' ,headerName:'Fillets(Net Wt/kg)', width: 105},
        { field: 'Net_Wt_Steaks_Min',headerName:'Steaks(Net Wt/kg)', width: 110 },
        { field: 'Price', width: 100 },
        
       
        { field: 'Meat_Whiteness',headerName:'Color(meat)', width: 105 },
        { field: 'Salt_Water' ,headerName:'Water', width: 90},
        
        { field: 'Size',headerName:'Size', width: 90 },
        { field: 'bestfor',headerName:'Best For', width: 120 },
      ];
      
      const rows = this.state.data
      ;
      
      
       return (
       
            <Row><Col>
             <div style={{height:800}}>
            <DataGrid rows={rows} columns={columns} rowHeight={25} />
            </div>
            </Col>
            </Row>
         
       );
    }
 }

 const mapStateToProps = state => {
  return {
    product: state.product,
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