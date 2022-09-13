import React from 'react';

export const LoadingSpinner = () => {
  return (
    <main className='position-relative'>
      <div
        className='d-flex flex-wrap justify-content-center w-25 position-absolute top-0 start-50 translate-middle-x'>
        <div className='spinner-border' role='status'>
        </div>
        <span className='mt-3 text-muted'>
          Loading...
        </span>
      </div>
    </main>
  )
}