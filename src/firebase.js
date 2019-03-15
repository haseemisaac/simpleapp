import config from './config'
import app from 'firebase'
import Rebase from 're-base'

const firebase = app.initializeApp(config);
const base = Rebase.createClass(app.database())

export { firebase, base } 