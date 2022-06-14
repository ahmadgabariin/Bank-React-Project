import axios from 'axios'
import React, { Component } from 'react'
import Category from './Category'

export class Breakdown extends Component {
    constructor () {
        super()
        this.state = {
            categories : []
        }
        this.port = 4000
    }
    componentDidMount = () => {
        axios.get(`http://localhost:${this.port}/breakDown`)
        .then ( categories => this.setState({categories : categories.data}) )
        .catch (error => console.log(error))
    }

    render() {
        return (
            
            <div className='breakdown'>
                <div className='categories'>
                    <div className='breakdown-title'>BreakDown</div>
                    {this.state.categories.map( category => <Category key={category.amount} category = {category} />)}

                </div>
            </div>
        )
    }
}

export default Breakdown