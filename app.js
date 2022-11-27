const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(5000, ()=> {
    console.log('Listen port 5000')
})
 app.get('/', (req, res) => {
     res.json("ok")
 })
app.post('/users', (req, res)=> {
    const userInfo = req.body
    console.log(userInfo);
    res.json("Created")
})