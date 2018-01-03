import React, {Component} from 'react'

export function formatFloat(f) {
  return `${Math.floor(f)}.${(f%1) ? (f%1).toString().slice(2) : "0" }`;
}


export class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      text: props.value.toString()
    }
  }
  updateValueFromProps(props) {
    this.setState({value: props.value, text: props.value.toString()})
  }

  componentWillReceiveProps(nextProps) {
  if (this.props.value != nextProps.value) {
    this.updateValueFromProps(nextProps);
  }
}
  onChange = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    this.setState({text: value});
    if (!isNaN(floatValue)) {
      this.props.onChange(floatValue);
    }
  }
  onBlur = () => {
    this.updateValueFromProps(this.props);
  }

  render() {
    const {value, onChange, ...props} = this.props;
    return <input  {...this.props}  value={this.state.text} onChange={this.onChange} onBlur={this.onBlur}/>
  }
}
