import React, { Component } from 'react'

export class Operations extends Component {
  constructor () {
    super()
    this.state = {
      vendor : ``,
      amount : `` ,
      category : ``
    }
  }
  getInputsValues = () => {
    return {
      amount   : parseInt(this.state.amount , 10),
      category : this.state.category,
      vendor   : this.state.vendor
    }
  }
  emptyInputs = () => {
    this.setState({
      vendor : `` ,
      amount : `` ,
      category : ``,
    })
  }

  checkInputs = () => {
    let values = this.getInputsValues()
    values.amount = values.amount + ``
    for (let val of Object.values(values)) {
      if ( ! val.trim()) { return false }
    }
    return true
  }

  addTransaction = (event) => {
    if(this.checkInputs()) {
      let addTransaction = this.props.addTransaction
      let transaction = this.getInputsValues()
      switch (event.target.innerHTML) {
        case `Deposit` : 
          this.state.amount > 0 
          ? addTransaction(({type : `deposit` , transaction : transaction}))
          : alert(`You need to add positive value`)
          this.emptyInputs()
        break
        
        case `Withdraw` :
          transaction.amount < 0
          ? addTransaction ({type :`withdraw`, transaction : transaction})
          : alert(`You need to add negative value`)
          this.emptyInputs()
        break

        default : 
          
        break
      }
    }
    else { alert(`please fill the rows`)}
  }

  getInputVlue = event => {
    let value = event.target.value
    let name = event.target.name
    this.setState({[name] : value})
  }

  render() {
    return (
      <div className='operations'>
      <div className='Operations-grid' >
        <h1>Operations</h1>
          <input value={this.state.vendor} name='vendor' placeholder='Vendor' onChange={this.getInputVlue}></input>
          <input value={this.state.amount} name='amount' placeholder='Amount' onChange={this.getInputVlue}></input>
          <input value={this.state.category} name='category' placeholder='Category' onChange={this.getInputVlue}></input>
        <div className='opreations-buttons'>
          <button onClick={this.addTransaction} className = {`deposit`} >Deposit</button>
          <button onClick={this.addTransaction} className = {`withdraw`} >Withdraw</button>
        </div>
      </div>
      </div>
    )
  }
}

export default Operations