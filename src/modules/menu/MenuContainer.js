import * as React from 'react'
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import Collapse from 'reactstrap/lib/Collapse'
import Link from 'react-router-dom/Link'

class MenuContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () { //TODO: wrap into redux
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar className='mr-auto'>
              <NavItem>
                <NavLink tag={Link} to='/report'>Текущий отчёт</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/choice'>Выбор деталей</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/part'>Новая деталь</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/archive'>Архив отчётов</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default MenuContainer;