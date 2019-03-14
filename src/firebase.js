import config from './config'
import firebase from 'firebase'
import Rebase from 're-base'

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())

export { app, base } 