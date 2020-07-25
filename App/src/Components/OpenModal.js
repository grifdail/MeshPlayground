import React, {Component, useState} from 'react'
import { Modal, Input,  Tab, List} from 'semantic-ui-react';
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

const ListOfItem = ({files, loadSketch, icon}) => {
  console.log(files);
  return <List divided relaxed>
    {files.map((file, i) => {
      return <List.Item onClick={() => loadSketch(file, true)} key={i} className="open-item">
        <List.Icon name={icon} size='large' verticalAlign='middle' />
         <List.Content>
          <List.Header>{file.name}</List.Header>
        </List.Content>
      </List.Item>
    })}

  </List>
};

const Body = ({files, onSelectTag, loadSketch}) => {
  const panes = [  ]
  if (files.savedSketches && files.savedSketches.length) {
    panes.push({ menuItem: 'Saved', render: () => (<Tab.Pane>
      <ListOfItem files={files.savedSketches}  loadSketch={loadSketch} icon="file"></ListOfItem>
    </Tab.Pane> )});
  } 
  if (files.savedGist && files.savedGist.length) {
    panes.push({ menuItem: 'Gist', render: () => (<Tab.Pane>
      <ListOfItem files={files.savedGist}  loadSketch={loadSketch} icon="github"></ListOfItem>
    </Tab.Pane> )});
  } 
  panes.push({ menuItem: 'Examples', render: () => (<Tab.Pane>
    <ListOfItem files={examples}  loadSketch={loadSketch}  icon="idea"></ListOfItem>
  </Tab.Pane> )});

  return (
    <Modal.Content scrolling>
      <Tab panes={panes} />
    </Modal.Content>
  )
};


function DocModal({files, button, loadSketch}) {

    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);
    const onOpen = () => setOpen(true);

    return (
      <Modal
        className="documentation"
        trigger={button(onOpen)}
        size="fullscreen"
        header="Open"
        open={open}
        onClose={onClose}
        content={<Body loadSketch={(...params) => {
          loadSketch(...params);
          onClose();
        }} files={files}/>}
        actions={['Close']}
      />
    )

  }



export default DocModal;
