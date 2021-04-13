import React, { Component } from 'react'
import axios from 'axios'
import { Item } from 'semantic-ui-react'
import EmployeeModal from './EmployeeModal.jsx'

class EmployeeList extends Component {
  state = {
    employees: [],
    page: 0
  }

  componentDidMount() {
    this.getEmployees()
  }

  getEmployees = async () => {
    let employeeData = await axios.get('https://reqres.in/api/users?per_page=4&page=3')
    // if you want to see employees 7 -12 put ?page=2 after users in URL
    // if you want to fetch 10 employees put ?per_page=10 after users in URL
    this.setState({ employees: employeeData.data.data, page: employeeData.data.page })
  }
  
  render() {
    let employeeList = this.state.employees.map(employee => (
        <Item key={employee.id} data-cy='employee-item'>
          <Item.Image data-cy='avatar' circular size='tiny' 
            alt={employee.first_name} src={employee.avatar} />

            <Item.Content verticalAlign='middle'>
              <Item.Header data-cy='name'>
                {employee.first_name} {employee.last_name}
              </Item.Header>
              <Item.Extra>
                <EmployeeModal id={employee.id}/>
              </Item.Extra>
            </Item.Content>            
        </Item>
      )
    )
  return (
    <Item.Group data-cy='employee-list' data-page={this.state.page}>
      {employeeList}
    </Item.Group>
  )
  }
}

export default EmployeeList
