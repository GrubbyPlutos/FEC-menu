import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NameAndPriceBox = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 4px;
  padding: 8px;
  transition: background-color 0.2s ease-in-out;
`;

const Heading = styled.h6`
  margin: 0;
  margin-bottom: 4px;
  font-size: 15.4px;
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 127px;
  padding: 8px;
  background-image: url(${props => props.pictureUrl});
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 4px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 192px;
    padding: 0;
  }

  &:hover > ${NameAndPriceBox} {
    background-color: white;
  }
`;

const PopularItem = ({ item, handleClick }) => (
  <Container onClick={() => handleClick(item.itemId)} pictureUrl={item.pictureUrl}>
    <NameAndPriceBox>
      <Heading>{item.name}</Heading>
      <Heading>{`$${item.price.toFixed(2)}+`}</Heading>
    </NameAndPriceBox>
  </Container>
);

PopularItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PopularItem;
