import React, { Component } from 'react'
import Transction from './Transction'

export class Transactions extends Component {
  render() {
    const transactions = this.props.transactions
    const deleteTransaction = this.props.delete
    return (
      <div className='transctions-component'>
        {transactions.map( transaction => <Transction transction = {transaction} key= {transaction._id} delete = {deleteTransaction} />)}
      </div>
    )
  }
}

export default Transactions