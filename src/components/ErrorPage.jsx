import React from 'react'

export const ErrorPage = (err) => {
  return (
    <>
      {Object.keys(err).length > 0 ?
        <main>
          {err.value}
        </main>
        :
        <main>
          <div>
            The requested page does not exist
          </div>
        </main>
      }
    </>
  )
}