import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  padding: 0 1rem;
  width: 1024px;
  margin: 0 auto; /*중앙 정렬 */

  /*브라우져 크기에 따라 가로 크기 변경 */
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Responsive = ({ children, ...rest }) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
