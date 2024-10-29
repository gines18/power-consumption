// src/components/portableTextComponents.js

export const ColorComponent = ({children, value}) => {
    return <span style={{color: value.color}}>{children}</span>;
  };
  
  export const portableTextComponents = {
    marks: {
      color: ColorComponent
    }
  
  };