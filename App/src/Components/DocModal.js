import React, {Component} from 'react'
import { Modal, Input} from 'semantic-ui-react';
import './css/Documentation.css';
import documentation from "./Doc/docData.js";
import DefinitionGroup from "./Doc/DefinitionGroup.js";




const Body = ({filter, onSelectTag}) => {
  return (
    <Modal.Content scrolling>
      <DefinitionGroup content={documentation} filter={filter} onSelectTag={onSelectTag}/>
    </Modal.Content>
  )
};

const ModalHeader = ({filter, onChange}) => {
  return (
    <Modal.Header >
      <span>Documentation</span>
      <Input icon='search' placeholder='Search...' value={filter} onChange={e => onChange(e.target.value)} />
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
        size="fullscreen"
        header={<ModalHeader filter={this.state.search} onChange={this.onChangeSearch}/>}
        content={<Body filter={this.state.search} onSelectTag={this.onChangeSearch}/>}
        actions={['Close']}
      />
    )

  }

}

export default DocModal;
