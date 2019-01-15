import * as React from 'react'
import { Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import Collapse from 'reactstrap/lib/Collapse'
import Link from 'react-router-dom/Link'
import './MenuContainer.css'

class MenuContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className='justify-content-center'
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  tag={Link}
                  to='/report'
                  active={
                    window.location.pathname === '/report' ||
                    window.location.pathname === '/'
                  }
                >
                  Текущий отчёт
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to='/choice'
                  active={window.location.pathname === '/choice'}
                >
                  Каталог сборок
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to='/part'
                  active={window.location.pathname === '/part'}
                >
                  Новая сборка
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to='/archive'
                  active={window.location.pathname === '/archive'}
                >
                  Архив отчётов
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default MenuContainer
