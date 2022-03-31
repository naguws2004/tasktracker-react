import PropTypes from 'prop-types'

const Welcome = ({ name }) => {
  return (
    <h3 style={ welcomeStyle }>Welcome {name}!</h3>
  )
}

const welcomeStyle = {
    display: 'flex', 
    justifyContent:'flex-end',
    textDecorationLine: 'underline',
    color: '#C70039'
}

Welcome.defaultProps = {
    name: 'Guest'
}

Welcome.propTypes = {
    name: PropTypes.string.isRequired
}

export default Welcome