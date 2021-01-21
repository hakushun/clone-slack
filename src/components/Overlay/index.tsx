import React from 'react';
import ReactDOM from 'react-dom';

export const Overlay: React.FC = ({ children }) =>
  ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 bg-black bg-opacity-80">{children}</div>,
    document.getElementById('overlay')!,
  );
