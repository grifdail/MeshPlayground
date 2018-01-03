import React, {Component} from "react";
import "./css/Editor.css";
import { Icon } from 'semantic-ui-react';

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      openTab: 1
    }
  }
  onToogle = tab => () => {
    this.setState(s => ({openTab: s.openTab === tab ? 0 : tab}));
  };

  componentDidUpdate() {
    this.props.windowNeedResize();
  }

  render() {
    const {children} = this.props;
    const {openTab} = this.state;
    const className = `tab-menu ${openTab ? "" : "minimized"}`;
    return (
      <div className={className}>
        {
          openTab ? children[openTab-1] : null
        }

        <div className="icons">
          {
            children.map((_item,i) =>  <div className="icon-minimize" onClick={this.onToogle(i+1)}>
              <Icon name="toggle left" />
            </div>)
          }
        </div>
      </div>
    )
  }
}



export default Tabs;
