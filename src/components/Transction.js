import React, { Component } from 'react'

export class Transction extends Component {

  deleteTransaction = () => {
    this.props.delete(this.props.transction._id )
  }

  render() {
    const transaction = this.props.transction
    return (
      <div className='transction'>
        <div className='title-transaction'>{transaction.vendor}</div>
        <div className='title-transaction' >{transaction.category}</div>
        <div className={`title-transaction ${transaction.amount < 0 ? `red` : `green`}`}>{transaction.amount}</div>
        <div className='btn-div'><button onClick={this.deleteTransaction} className={`button-delete`} >Delete</button></div>
      </div>
    )
  }
}

export default Transction