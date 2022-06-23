import React from 'react'
import PropTypes from 'prop-types'

function Button({ action, text }) {
    return (
        <button onClick={action} className="transition-colors ease-in-out bg-blue-600 hover:bg-blue-800 focus:ring-2 ring-blue-800 ring-offset-2 text-lg py-2 px-4 rounded-lg mt-4 text-white">{text}</button>
    )
}

Button.propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default Button
