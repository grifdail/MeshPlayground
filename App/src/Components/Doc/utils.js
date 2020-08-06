const iconMapping = {
  number: "calculator",
  vector: "location arrow",
  Vector3: "location arrow",
  "mesh": "cube",
  "string": "quote right",
  "array": "list",
  "function": "code",
  "image": "image",
  "color": "paint brush",
  "boolean": "checkmark box",
  "class": "asterisk",
  "color-palette": "list",
  "default": "square",
}

export const getIconForType = type => {
  return iconMapping[type]
}

export const getIconForItem = item => {
  if (item.icon) {
    return item.icon;
  }
  if (item.iconType) {
     return iconMapping[item.iconType];
  }
  if (item.returnValue) {
     return iconMapping[item.returnValue.type];
  }
  if (item.tags.includes("const")) {
     return "pin";
  }
  if (iconMapping[item.type]) {
     return iconMapping[item.type];
  }
  return "square"
}
