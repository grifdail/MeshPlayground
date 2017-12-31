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
