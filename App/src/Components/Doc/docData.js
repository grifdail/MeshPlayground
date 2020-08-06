//const param = (type, name, description, defaultValue ) => ({name, type, defaultValue, description})
//const number = (...arg) => param("number", ...arg);
import json from "../../Data/doc.json";
import * as ColorPalettes from "../../MeshTools/Utils/ColorPalettes.js"
import * as Pico8Colors from "../../MeshTools/Utils/Pico8Colors.js"
import * as Endesga64 from "../../MeshTools/Utils/Endesga64.js";

var colorPaletteDoc = [
  {
    name: "ColorPalettes",
    type: "object",
    iconType: "color-palette",
    description: "A collection of color palette",
    tags: ["color"],
    hidden: false,
    properties: Object.keys(ColorPalettes).map(name => ({
        name,
        type:"color-palette",
        tags: [],
        description: "",
        colors: ColorPalettes[name]
    }))
  },
  {
    name: "Pico8Colors",
    type: "object",
    iconType: "color-palette",
    description: "A collection of colors",
    tags: ["color"],
    hidden: false,
    properties: Object.keys(Pico8Colors).map(name => (Array.isArray(Pico8Colors[name]) ? {
        name,
        type:"color-palette",
        tags: [],
        description: "",
        colors: Pico8Colors[name]
    } : {
      name,
      type:"color",
      tags: [],
      description: "",
      value: Pico8Colors[name]
    }))
  },
  {
    name: "Endesga64",
    type: "object",
    iconType: "color-palette",
    description: "A collection of colors",
    tags: ["color"],
    hidden: false,
    properties: Object.keys(Endesga64).map(name => (Array.isArray(Endesga64[name]) ? {
        name,
        type:"color-palette",
        tags: [],
        description: "",
        colors: Endesga64[name]
    } : {
      name,
      type:"color",
      tags: [],
      description: "",
      value: Endesga64[name]
    }))
  }
]

var doc = [
  ...json,
  ...colorPaletteDoc
]

export default doc;
