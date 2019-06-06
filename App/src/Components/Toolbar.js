import React from 'react';
import { Input, Menu, Dropdown, Loader, Icon } from 'semantic-ui-react';
import { exportToPly, exportToObj } from '../exportMethods.js';
import examples from "../Data/examples.json";
import AboutModal from "./AboutModal";
import DocModal from "./DocModal";
import SettingModal from "./SettingModal";

function FileMenu({files, loadSketch, text, icon, isMenu}) {
  return (
    <Dropdown item text={text} icon={icon || false} className='left'>
      <Dropdown.Menu>
        {
          files.map((file, index) => {
            if (file.files) {
              return <FileMenu files={file.files} loadSketch={loadSketch} key={index} text={file.name} icon="dropdown"/>;
            } else {
              return <Dropdown.Item key={index} onClick={() => loadSketch(file, true)}>{file.name}</Dropdown.Item>
            }
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

function getFilesList(savedSketches) {
  return [
    {name: "examples", files:examples},
    ...savedSketches
  ]
}

const Checkbox = ({value, label, onChange}) => {
  return (<div className="ui toggle checkbox">
    <input type="checkbox" name="public" checked={value} onChange={() => null}/>
    <label>{label}</label>
  </div>);
}

function Toolbar({sketchName, savedSketches, geometry, isInDatabase, camera:{autoRotate}, reducer: {reloadGeometry, updateSketchName, resetSketch, deleteSketch, saveSketch,  loadSketch, resetCamera, toogleCameraRotation}}) {
  const files = getFilesList(savedSketches);
  const confDelete = () => (confirm("Are you sure you want to delete sketch "+sketchName+" ?") ? deleteSketch() : null); // eslint-disable-line no-restricted-globals
  return (
    <Menu className="toolbar">
      <Menu.Item><Loader active={false}/></Menu.Item>
      <Menu.Item>
        <Input className="name-field" icon="pencil" transparent value={sketchName} onChange={e => updateSketchName(e.target.value)}/>
      </Menu.Item>
      <Menu.Item onClick={saveSketch}  >Save<Icon name="save" /></Menu.Item>
      {isInDatabase ?<Menu.Item onClick={confDelete} >Delete<Icon name="trash" /></Menu.Item> : null}

      <Menu.Item onClick={resetSketch} >New Sketch<Icon name="file outline" /></Menu.Item>
      <FileMenu files={files} loadSketch={loadSketch} icon='folder open outline' text="open" isMenu/>
      <Menu.Menu position='right'>
        <Menu.Item onClick={reloadGeometry} >Reload<Icon name="refresh" /></Menu.Item>
        <Dropdown item  text="camera" icon="camera" className='left'>

          <Dropdown.Menu>

            <Dropdown.Item onClick={resetCamera}>Reset</Dropdown.Item>
            <Dropdown.Item onClick={toogleCameraRotation}><Checkbox toggle value={autoRotate} label="Auto rotation"/></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item icon="download" text="Export" className='left' >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => exportToPly(geometry)}>Export as .ply</Dropdown.Item>
            <Dropdown.Item onClick={() => exportToObj(geometry)}>Export as .obj</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <SettingModal   button={<Menu.Item>Setting<Icon name="setting" /></Menu.Item>} />
        <DocModal   button={<Menu.Item>Documentation<Icon name="book" /></Menu.Item>} />
        <AboutModal button={<Menu.Item>About<Icon name="info" /></Menu.Item>} />

      </Menu.Menu>
    </Menu>
  )
}

export default Toolbar;
