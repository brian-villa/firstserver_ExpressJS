const express = require("express")
const app = express()

//ROTAS

app.get('/', (req, res) => {
    res.send("Hello World")
}) // end point

app.get('/sobre', (req, res) => {
    res.send("Sobre")
}) // end point

//404ERROR (not found)
app.use((req, res) => { //middleware
    res.send("Página não encontrada")
})




const gate = process.env.PORT || 8080 // o servidor contratado determina a porta que quer rodar a app e nós usamos essa CONST para permitir a alteração 
app.listen(gate, () => console.log(`Server is listening on gate ${gate}`))

