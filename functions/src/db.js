const admin = require('firebase-admin')
const creds = require('../credentials.json')

exports.connectDb = () => {
    // checks to see if not already connect
    if(!admin.apps.length) {
        // if not, connect to firebase
        admin.initializeApp({
            credential: admin.credential.cert(creds)
        })
    }
    // return firebase
    return admin.firestore()
}