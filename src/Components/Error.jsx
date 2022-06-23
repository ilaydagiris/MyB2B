import React from 'react'
import PropTypes from 'prop-types'

function Error({ error }) {
    return (
        <div className={`bg-red-600 rounded-xl px-2 text-white font-bold transition-all ease-in-out flex duration-1000 overflow-hidden ${error ? 'h-8' : 'h-0'}`}>
            <p className="m-auto">{error}</p>
        </div>
    )
}

Error.propTypes = {
    error: PropTypes.string
}

export default Error
