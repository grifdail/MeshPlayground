import React from 'react'
import { Modal, Icon } from 'semantic-ui-react';

const Body = () => {
  return (
    <Modal.Content>
      <p>This website was made with <Icon name="heart"/> by <a href="http://grifdail.fr/" >Grifdail</a>. Find me on<a href="https://twitter.com/grifdail">Twitter</a></p>
      <p>Made during <a href="http://procjam.com" >Procjam</a> for <a href="https://www.youtube.com/watch?v=XIA1kk22lNs">Alitia</a>.</p>
    </Modal.Content>
  )
};

function SettingModal({button}) {
  return (
    <Modal
      trigger={button}

      header="Settings"
      content={<Body />}
      actions={[
        'Close',
      ]}
    />
  )
}

export default SettingModal;
