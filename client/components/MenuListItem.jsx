import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spicyIcon from './chili.png';
import PopularBadge from './PopularBadge';

const Container = styled.div`
  display: flex;
  font-size: 1rem;
  background-color: white;
  max-height: 130px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: transform 0.1s ease-in-out;

  &:hover {
    outline: solid rgba(0, 0, 0, 0.2) 1px;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Image = styled.img`
  width: 150px;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 115px;
  }
`;

const Main = styled.div`
  padding: 8px 12px;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Name = styled.h6`
  color: rgb(0, 111, 233);
  font-size: 15px;
  margin: 0;
  margin-right: 8px;
  &:hover {
    color: #004FBF;
  }
`;

const Description = styled.p`
  color: rgba(0, 0, 0, 0.55);
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  height: 57px;
  margin: 0;
  margin-bottom: 8px;
  overflow: hidden;
`;

const Price = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 4px;
  font-weight: bold;
  padding: 2px 5px;

  &:hover {
    background-color: white;
  }
`;

const Spicy = styled.img`
  width: 18px;
  height: auto;
`;

const MenuListItem = ({ item, menuListItemClick }) => (
  <Container onClick={() => menuListItemClick(item.itemId)}>
    <Main>
      <Header>
        <Name id="Name">{item.name}</Name>
        <span>{item.popular ? <PopularBadge id="Popular" size="12" /> : null}</span>
      </Header>
      <Description id="Description">{item.description}</Description>
      <div>{item.spicy ? <Spicy src={spicyIcon} alt="spicy" /> : null}</div>
    </Main>
    <Image src={item.pictureUrl} alt="menu item" />
    <Price>{`$${item.price.toFixed(2)}+`}</Price>
  </Container>
);

MenuListItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    restaurantId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    pictureUrl: PropTypes.string.isRequired,
    popular: PropTypes.bool.isRequired,
    spicy: PropTypes.bool.isRequired,
  }).isRequired,
  menuListItemClick: PropTypes.func.isRequired,
};

export default MenuListItem;
