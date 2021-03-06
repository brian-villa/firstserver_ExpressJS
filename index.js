const express = require("express")
const path = require("path") //biblioteca do NODE para manipular pastas e caminhos de pastas
const fs = require('fs')

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

app.use(express.urlencoded({extended: true})) // recebendo dados de formulário para o servidor


//ROTAS
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Furniture - Home'
    })
}) // end point


app.get('/quem-somos', (req, res) => {
    res.render("quem-somos", {
        title: 'Furniture - Quem Somos'
    } )
}) // end point

app.get('/produtos', (req, res) => {
    res.render('produtos', {
        title: 'Furniture - Produtos',
    })
}) // end point

app.get('/posts', (req, res) => {
    res.render('posts', {
        title:'Furniture -Posts',  
        
        posts: [
            {
                title: 'Novidade no mundo da tecnologia',
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque laboriosam obcaecati eveniet perspiciatis facilis, animi dolorem distinctio nulla soluta saepe! Enim dolorem sint nesciunt dolores tempore quae praesentium cumque ad!',
                stars: 3,
            },

            {
                title: 'Criando um servidor com Nodejs',
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque laboriosam obcaecati eveniet perspiciatis facilis, animi dolorem distinctio nulla soluta saepe! Enim dolorem sint nesciunt dolores tempore quae praesentium cumque ad!',
                
            },

            {
                title: 'Javascript é a linguagem mais usada no mundo',
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque laboriosam obcaecati eveniet perspiciatis facilis, animi dolorem distinctio nulla soluta saepe! Enim dolorem sint nesciunt dolores tempore quae praesentium cumque ad!',
                stars: 5,
            },
        ]
    })
}) // end point

app.get('/cadastro-posts', (req, res) => {
    const {c} = req.query 
    res.render('cadastro-posts', {
        title: 'Furniture - Cadastrar Post',
        cadastrado: c,
    })
}) // end point

app.post('/salvar-post', (req, res) => {
    const {titulo, texto} = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        titulo,
        texto,
    })

    const postsString = JSON.stringify(posts)
    fs.writeFileSync('./store/posts.json', postsString)
    
    res.redirect('/cadastro-posts?c=1')
})

//404ERROR (not found)
app.use((req, res) => { //middleware
    res.send("Página não encontrada")
})


//EXECUTANDO O SERVIDOR

const gate = process.env.PORT || 8080 // o servidor contratado determina a porta que quer rodar a app e nós usamos essa CONST para permitir a alteração 
app.listen(gate, () => console.log(`Server is listening on gate ${gate}`))

