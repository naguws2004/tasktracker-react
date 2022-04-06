import PropTypes from 'prop-types'
import { useAuth0 } from "@auth0/auth0-react"

const Welcome = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  
  const getUserPicUri = ()=>{ 
    try {
      const picUri = user.picture
      return picUri
    } catch(err) {
      return ''
    }
  }

  return (
    isAuthenticated ? 
    (
      <div className='header1'>
        <h3 
            style={ welcomeStyle }>
          &nbsp;
          <img 
              src={getUserPicUri()}
              style={ imgStyle } 
              alt={user.name} />
          &nbsp;Hi {user.name}! 
        </h3>
        <button 
            style={ buttonStyle2 }
            className='btn'
            onClick={() => logout() }>
            Logout
        </button>
      </div>
    ) :
    (
      <div className='header1'>
        <h3 
            style={ welcomeStyle }>
          &nbsp;
          <img 
              src="/favicon.ico"
              style={ imgStyle } 
              alt="Guest" />
          &nbsp;Hi Guest!
        </h3>
        <button 
            style={ buttonStyle1 }
            className='btn'
            onClick={() => loginWithRedirect() }>
            Login
        </button>
      </div>
    )
  )
}

const welcomeStyle = {
    display: 'flex', 
    justifyContent:'flex-end',
    alignItems: 'center',
    color: '#900C3F'
}

const buttonStyle1 = {
  display: 'flex', 
  justifyContent:'flex-start',
  backgroundColor: 'green'
}

const buttonStyle2 = {
  display: 'flex', 
  justifyContent:'flex-end',
  backgroundColor: '#900C3F'
}

const imgStyle = {
  width: '40px',
  borderRadius: '40px'
}

// Welcome.defaultProps = {
//     name: 'Guest'
// }

// Welcome.propTypes = {
//     name: PropTypes.string.isRequired
// }

export default Welcome