import Button from './Button'

const Menu = ({ onRefreshClick, onSaveClick }) => {
    return (
    <div className='header'>
        <Button 
            color='#900C3F' 
            text='Refresh from DB' 
            onClick={onRefreshClick} 
        />
        <Button 
            color='#900C3F' 
            text='Save to DB' 
            onClick={onSaveClick} 
        />
    </div>
  )
}

export default Menu