import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAddClick, showAddTask }) => {
    return (
    <header className='header2'>
        <h1 style={headingStyle}>{title}</h1>
        <Button 
            color={showAddTask ? '#900C3F' : 'green'} 
            text={showAddTask ? 'Close' : 'Add'} 
            onClick={onAddClick} 
        />
    </header>
  )
}

const headingStyle = {
    color: '#900C3F'
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header