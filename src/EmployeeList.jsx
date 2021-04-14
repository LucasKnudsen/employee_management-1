import React, { Component } from 'react'
import axios from 'axios'
import { Header, Item, Pagination } from 'semantic-ui-react'
import EmployeeModal from './EmployeeModal.jsx'

class EmployeeList extends Component {
  state = {
    employees: [],
    page: 1
  }

  componentDidMount() {
    this.getEmployees()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getEmployees()
    }
  }

  getEmployees = async () => {
    let employeeData = await axios.get(`https://reqres.in/api/users?per_page=${this.state.itemsPerPage}&page=${this.state.page}`)
    // if you want to see employees 7 -12 put ?page=2 after users in URL
    // if you want to fetch 10 employees put ?per_page=10 after users in URL
    this.setState({ employees: employeeData.data.data })
  }

  pageChangeHandler = (event, { activePage }) => {
    this.setState({ page: activePage })

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
            <EmployeeModal id={employee.id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
    )
    return (
      <>
        <Header data-cy='page-header'>Page {this.state.page}</Header>
        <Item.Group data-cy='employee-list' data-page={this.state.page}>
          {employeeList}
        </Item.Group>
        <Pagination
          data-cy='pagination-element'
          totalPages={5}
          activePage={this.state.page}
          onPageChange={this.pageChangeHandler}
        />
      </>
    )
  }
}

export default EmployeeList
