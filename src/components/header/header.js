import React from 'react';
import './header.css';
import { Input } from 'antd';

function Header({ query, onLabelChange }) {
  const onSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Input placeholder="Type to search..." value={query} allowClear onChange={onLabelChange} />
    </form>
  );
}

export default Header;
