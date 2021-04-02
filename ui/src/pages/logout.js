import firebase from "gatsby-plugin-firebase"

export default () => {
  firebase.auth().signOut()
  window.location = "/"
}
