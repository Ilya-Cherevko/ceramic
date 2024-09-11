import React, { Component } from 'react'
import Menu from './menu'

export default class Ccomponent extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>Class component {this.props.namber}</h1>
      </div>
    )
  }
}
