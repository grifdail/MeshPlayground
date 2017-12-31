import React, {Component} from 'react';
import {reduce, assoc} from "ramda";

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { EditorStory } from './EditorStory.js';

import {models} from '../ShaderGraph/models/index.js'
import {fields} from '../ShaderGraph/fields/index.js'


storiesOf('ShaderEditor', module)
  .add("everything", () => <EditorStory models={models} fields={fields} onShaderChange={action('shader-update')} />)
