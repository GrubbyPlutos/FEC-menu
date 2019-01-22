import React from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import MenuList from './MenuList';
import AddItem from './AddItem/index';

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Nunito+Sans');
    @import url('https://fonts.googleapis.com/css?family=Muli:400,900');
    font-family: 'Muli', sans-serif;
    font-weight: 'Black';

    /* Prevent scrolling while modal is active */
    overflow: ${props => (props.currentItem ? 'hidden' : 'auto')};
  }
`;

const Container = styled.div`
  background-color: #EFEFEF;
  
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      currentItem: null,
      mostPopularItems: [],
    };
    this.NUM_MOST_POPULAR = 4;
    this.menuListItemClick = this.menuListItemClick.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const url = `${window.location.pathname}/menu_items`;
    axios.get(url.replace('//', '/'))
      .then((response) => {
        const items = response.data;
        const categories = Array.from(new Set(items.map(item => item.category)));
        this.setState({ items, categories });
        return items;
      })
      .then(items => this.setMostPopularItems(items));
  }

  setMostPopularItems(items) {
    const mostPopularItems = items
      .filter(item => item.popular)
      .slice(0, this.NUM_MOST_POPULAR);
    this.setState({ mostPopularItems });
  }

  menuListItemClick(itemId) {
    const url = `${window.location.pathname}/menu_items/${itemId}`;
    axios.get(url.replace('//', '/'))
      .then((response) => {
        const item = response.data;
        this.setState({ currentItem: item });
      });
  }

  close() {
    this.setState({ currentItem: null });
  }

  render() {
    const { items, categories, currentItem, mostPopularItems } = this.state;
    return (
      <Container>
        <GlobalStyle currentItem={currentItem} />
        {currentItem ? <AddItem item={currentItem} close={this.close} /> : null}
        <MenuList
          items={items}
          mostPopularItems={mostPopularItems}
          categories={categories}
          menuListItemClick={this.menuListItemClick}
        />
      </Container>
    );
  }
}

export default App;
