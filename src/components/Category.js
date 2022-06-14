import React, { Component } from 'react'

export class Category extends Component {
  render() {
    const category = this.props.category
    return (
      <div className='category'>
            <span>{`${category._id}`} </span>
            <span>{category.amount}</span>
      </div>
    )
  }
}

export default Category