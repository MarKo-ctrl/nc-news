import React from 'react'

export const ErrorPage = (err) => {
  return (
    <div
    className='d-flex justify-content-center mt-5 pt-5'>
      <p
      className='w-50 bg-danger text-warning text-center fs-5 py-2 border border-warning rounded'>
        {err.value}
      </p>
    </div>
  )
}