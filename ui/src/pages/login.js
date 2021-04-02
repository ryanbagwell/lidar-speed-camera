import React, { useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import getFirebaseApp from "../utils/getFirebaseApp"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"

const app = getFirebaseApp()

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign("<your-privacy-policy-url>")
  },
}

export default () => {
  useEffect(() => {
    const ui = new firebaseui.auth.AuthUI(app.auth())
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig)
  }, [])
  return <div id="firebaseui-auth-container"></div>
}
