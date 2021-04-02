import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

export default () => {
  const [currentUser, setCurrentUser] = useState(null)

  firebase.auth().onAuthStateChanged(user => {
    setCurrentUser(user)
  })
  return currentUser
}
