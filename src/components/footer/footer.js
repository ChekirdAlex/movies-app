import React from 'react';
import './footer.css';
import { Pagination } from 'antd';

function Footer({ onSelectPage, totalMovies }) {
  return (
    <Pagination defaultCurrent={1} pageSize={20} showSizeChanger={false} total={totalMovies} onChange={onSelectPage} />
  );
}

export default Footer;
