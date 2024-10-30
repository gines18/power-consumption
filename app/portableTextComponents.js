// src/components/portableTextComponents.js

export const ColorComponent = ({ children, value }) => {
  return (
    <span style={{ color: value?.hex }}>
      {children}
    </span>
  );
};

export const portableTextComponents = {
  marks: {
    color: ColorComponent
  }
};