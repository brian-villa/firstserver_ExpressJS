const express = require("express")
const path = require("path") //biblioteca do NODE para manipular pastas e caminhos de pastas
const app = express()

//definindo o template engine
app.set('view engine', 'ejs') 

//MVC - MODEL(BANCO DE DADOS) VIEW(ARQUIVOS ESTATICOS) CONTROLLER(GERENCIAMENTO DE DADOS)



/*DEFININDO ARQUIVOS ESTÁTICOS - QUANDO NÃO USAR TEMPLATE ENGINE
const staticFolder = path.join(__dirname, 'views') // Definido o caminho da pasta views
const expressStatic = express.static(staticFolder) // Definido a pasta de arquivos estáticos e retorna o objeto para a const 
app.use(expressStatic) // e a const é passada para a aplicação*/

//app.use(express.static(path.join(__dirname, 'views'))) - maneira mais comum de se definir arquivos estaticos e públicos

//DEFININDO ARQUIVOS PÚBLICOS
const publicFolder = path.join(__dirname, 'public') // Definido o caminho da pasta views
const expressPublic = express.static(publicFolder) // Definido a pasta de arquivos estáticos e retorna o objeto para a const 
app.use(expressPublic) // e a const é passada para a aplicação


//ROTAS
app.get('/', (req, res) => {
    res.render('index')
}) // end point


app.get('/quem-somos', (req, res) => {
    res.render("quem-somos")
}) // end point

app.get('/produtos', (req, res) => {
    res.render('produtos')
}) // end point

//404ERROR (not found)
app.use((req, res) => { //middleware
    res.send("Página não encontrada")
})


//EXECUTANDO O SERVIDOR

const gate = process.env.PORT || 8080 // o servidor contratado determina a porta que quer rodar a app e nós usamos essa CONST para permitir a alteração 
app.listen(gate, () => console.log(`Server is listening on gate ${gate}`))

