import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({h1C, aboutButtonClick}) => {
  return (
    <header className='header'>
        <span />
        <h1 className={h1C}>{h1C === 'about' ? 'About' : 'Food Log'}</h1>
        <Button text={h1C === 'about' ? 'Back' : 'About'} click = {aboutButtonClick} />
    </header>
  )
}

Header.defaultProps = {
    title: 'Food Log',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header