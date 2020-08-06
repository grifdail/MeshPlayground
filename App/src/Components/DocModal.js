import React, {Component} from 'react'
import { Modal, Input} from 'semantic-ui-react';
import './css/Documentation.css';
import documentation from "./Doc/docData.js";
import DefinitionGroup from "./Doc/DefinitionGroup.js";
import DocHeader from "./Doc/DocHeader.js";




const Body = ({filter, onSelectTag}) => {
  var header = <DocHeader content={documentation} onSelect={onSelectTag}/> 
  return (
    <Modal.Content scrolling>
      {!filter ? header : null}
      <DefinitionGroup content={documentation} filter={filter} onSelectTag={onSelectTag}/>
    </Modal.Content>
  )
};

const ModalHeader = ({filter, onChange}) => {

  return (
    <Modal.Header >
      <span>Documentation</span>
      <Input icon={ {name: filter ? "close" : 'search', circular: true, link: true, onClick: (() => onChange(""))} } placeholder='Search...' value={filter} onChange={e => onChange(e.target.value)} />
    </Modal.Header>
  )
};


class DocModal extends Component {
  state={search:""};

  onChangeSearch = (value) => {
    this.setState({search: value})
  };

  render() {
    return (
      <Modal
        className="documentation"
        trigger={this.props.button}
        size="large"
        header={<ModalHeader filter={this.state.search} onChange={this.onChangeSearch}/>}
        content={<Body filter={this.state.search} onSelectTag={this.onChangeSearch}/>}
        actions={['Close']}
      />
    )

  }

}

export default DocModal;
