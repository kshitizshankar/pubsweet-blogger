import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { AppBar, Action, Icon } from '@pubsweet/ui'

const Navigation = ({ logoutUser, currentUser, client }) => {
  const links = [
    <Action to="/dashboard/posts">
      <Icon primary size={2}>
        file-text
      </Icon>
      Posts
    </Action>,
  ]

  return (
    <div>
      <AppBar
        brand={<img alt="pubsweet" src="/assets/pubsweet.svg" />}
        navLinkComponents={links}
        onLogoutClick={() => logoutUser(client)}
        user={currentUser}
      />
    </div>
  )
}

Navigation.propTypes = {
  client: PropTypes.any, // eslint-disable-line
  currentUser: PropTypes.any, // eslint-disable-line
  history: PropTypes.any.isRequired, // eslint-disable-line
  logoutUser: PropTypes.func.isRequired,
}

export default compose(
  withRouter,
  withProps(props => ({
    logoutUser: client => {
      client.cache.reset()
      localStorage.removeItem('token')
      props.history.push('/login')
    },
  })),
)(Navigation)
