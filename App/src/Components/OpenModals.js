import React, {Component} from 'react'
import { Modal, Input,  Tab} from 'semantic-ui-react';
import './css/Documentation.css';
import documentation from "./Doc/docData.js";
import DefinitionGroup from "./Doc/DefinitionGroup.js";
import examples from "../Data/examples.json";

function getFilesList(savedSketches, savedGist) {
  var list = [];
  list.push({name: "examples", files:examples});
  if (savedGist && savedGist.length>0) {
    list.push({name: "gists", files: savedGist});
  }
  list.push(...savedSketches);
  return list;
}

const Body = ({filter, onSelectTag}) => {
  const panes = [  ]
  if (hasSave) {

  } 
  panes.push({ menuItem: 'Examples', render: () => (<Tab.Pane>
    <ListOfItem></ListOfItem>
  </Tab.Pane> )});

  return (
    <Modal.Content scrolling>
      <Tab panes={panes} />
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
        header="Open"
        content={<Body filter={this.state.search} onSelectTag={this.onChangeSearch}/>}
        actions={['Close']}
      />
    )

  }

}

export default DocModal;
