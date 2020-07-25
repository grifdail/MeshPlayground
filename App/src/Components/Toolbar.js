import React from 'react';
import { Input, Menu, Dropdown, Loader, Icon } from 'semantic-ui-react';
import { exportToPly, exportToObj } from '../exportMethods.js';
import examples from "../Data/examples.json";
import AboutModal from "./AboutModal";
import DocModal from "./DocModal";
import SettingModal from "./SettingModal";
import OpenModal from "./OpenModal";



const Checkbox = ({value, label, onChange}) => {
  return (<div className="ui toggle checkbox">
    <input type="checkbox" name="public" checked={value} onChange={() => null}/>
    <label>{label}</label>
  </div>);
}

function Toolbar({sketchName, savedSketches, savedGist, geometry, isInDatabase, camera:{autoRotate}, connected, reducer: {reloadGeometry, logout, initiateLogin, updateSketchName, resetSketch, deleteSketch, saveSketch,  loadSketch, resetCamera, toogleCameraRotation}}) {
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
      <OpenModal button={(onClick)=> <Menu.Item onClick={onClick}>Open<Icon name="folder open outline" /></Menu.Item>} files={({savedSketches, savedGist})} loadSketch={loadSketch}  isMenu/>
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
            <Dropdown.Item onClick={() => exportToPly(geometry, sketchName)}>Export as .ply</Dropdown.Item>
            <Dropdown.Item onClick={() => exportToObj(geometry, sketchName)}>Export as .obj</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <SettingModal   button={<Menu.Item>Setting<Icon name="setting" /></Menu.Item>} />
        <DocModal   button={<Menu.Item>Documentation<Icon name="book" /></Menu.Item>} />
        <AboutModal button={<Menu.Item>About<Icon name="info" /></Menu.Item>} />
         <Menu.Item onClick={connected ? logout : initiateLogin}  >{connected ? "Log out" : "Log in with Github"}<Icon name="github" /></Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Toolbar;
