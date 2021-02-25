import { render } from "@testing-library/react";
import React from "react";
import DropdownTreeSelect from 'react-dropdown-tree-select';

function Child({value2, sendToServer}) {
    const onChange = (currentNode, selectedNodes) => {
       // console.log('onChange::',  currentNode)
        
          sendToServer(currentNode) 
      }
 
      return(
    <DropdownTreeSelect
    data={value2} 
    onChange={onChange}
    showDropdown='always'
    hierarchical={true}
    />
      );
  
}

export default React.memo(Child);