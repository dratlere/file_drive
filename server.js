const express = require('express'),
    app = express(),
    PORT = 3600,
    router = express.Router()

app.use(express.json())
app.use(require('cors')())

app.use('/files', require('./fileRouter'))

app.listen(process.env.PORT || PORT, () => { console.log("Connection Success | port :", PORT); })

