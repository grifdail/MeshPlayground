import React, {Component} from 'react'
import {Item} from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import FunctionDefinition from './FunctionDefinition.js';
import ClassDefinition from './ClassDefinition.js';
import ObjectDefinition from './ObjectDefinition.js';
import ConstantDefinition from './ConstantDefinition.js';
import {ColorDefinition, ColorPaletteDefinition} from './ColorDefinition.js';

const ItemByType = {
  "function": FunctionDefinition,
  "class": ClassDefinition,
  "object": ObjectDefinition,
  "constant": ConstantDefinition,
  "color": ColorDefinition,
  "color-palette": ColorPaletteDefinition,
}

const getFilterFunction = (target = "") => {

  target = target.toLowerCase();
  return item => {
    if (item.hidden) { return false; }
    if (!target) {return true; }
    if (item.name && item.name.toLowerCase().indexOf(target)>=0) { return true;}
    return (item.tags.some(item => item.toLowerCase().indexOf(target)>=0))
  }
}

class DefinitionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {itemCount: 10}
  }
  loadMore = () => {
    this.setState(oldState => ({itemCount: oldState.itemCount+=10}));
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.filter !== this.props.filter) {
      this.setState({itemCount: 10});
    }
  }
  render() {
    const  {content, filter, onSelectTag} = this.props;
    const itemCount = this.state.itemCount;
    const filterFunction = getFilterFunction(filter);
    const children = content
      .filter(item => (filterFunction(item) && ItemByType[item.type]))
      .slice(0, this.state.itemCount)
      .map((item,i) => {
        const Item = ItemByType[item.type];
        return <Item {...item} onSelectTag={onSelectTag} key={i}/>
      });
    return (
      <InfiniteScroll
          loadMore={this.loadMore}
          hasMore={itemCount < content.length}
          loader={<div className="loader">Loading ...</div>}
          useWindow={false}
      >
          <Item.Group>{ children }</Item.Group>
      </InfiniteScroll>
    )

  }
}

export default DefinitionGroup;
