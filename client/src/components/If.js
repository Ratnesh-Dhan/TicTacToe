import React from 'react'

const If = ({ condition, then, else: e = null }) => {
    if (condition) return then
    else return e
}

export default If