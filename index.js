const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
// MODELS
const db = require('./models/db')
// MIDDLEWARE
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
const csrfProtection = csrf({ cookie: true })
// ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/auth/access', require('./routes/auth/access'));


app.get('/', csrfProtection, (req, res) => res.send({csrfToken: req.csrfToken()}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))