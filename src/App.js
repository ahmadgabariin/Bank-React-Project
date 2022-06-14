import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Link, Redirect} from 'react-router-dom'
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import axios from "axios";
import Breakdown from './components/Breakdown';

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions : []
    }
    this.port = 4000
  }
  
  updateTransactions =  () => {
    axios.get(`http://localhost:${this.port}/transactions`)
    .then( data => this.setState({transactions : data.data }) )
    .catch(error => console.log(error))
  }

  deleteTransaction  =  (id) => {
    console.log(id)
    axios.delete(`http://localhost:${this.port}/transaction/${id}`)
    .then( data => {
      console.log(data.data)
      this.updateTransactions()
    })
    .catch(error => console.log(error))
  }

  addTransaction = transaction => {
    axios({
      method: 'post',
      url: `http://localhost:${this.port}/transaction`,
      data: transaction.transaction 
    })
    .then(data => { 
      axios.get(`http://localhost:${this.port}/transactions`)
      .then( data => this.setState({transactions : data.data } 
        ,()=>  window.location.href =`/Transactions`) )
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  calculateBalance = () => {
    let sum = 0
    this.state.transactions.forEach(transaction => sum += transaction.amount)
    return sum
  } 


  componentDidMount = async () => this.updateTransactions()

  render() {
    return (
      <Router>
        <div>
          <div className='Header'>
            <Link to={`/Transactions`} className = {`transctions-title`} >Transctions</Link>
            <Link to={`/Operations`} className = {`Operations-title`}>Operations</Link>
            <Link to={`/Breakdown`} >Breakdown</Link>
            <div className='balance-title'> Balance : <span className='balance-value'>{this.calculateBalance()}</span> </div>
          </div>

            <Route exact path={`/Transactions`} render = {() => <Transactions
             transactions = {this.state.transactions} delete = {this.deleteTransaction}
             /> } >
             </Route>

            <Route exact path={`/Operations`} render={() => <Operations addTransaction = {this.addTransaction} />}></Route>
            <Route exact path={`/Breakdown`} component={Breakdown} ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
