import React from 'react'

function Profile(user) {
  return (
    <>
      <h2>{user?.fullName}</h2>

      <address>{user?.address}</address>

      <div>{user?.tele}</div>
       
       

    </>
  )
}

export default Profile