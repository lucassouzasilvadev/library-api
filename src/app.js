import  express  from "express";
import connectDatabase from "./config/dbConnect.js";

const connection = await connectDatabase();

connection.on("error", (erro) => {
    console.error("erro de conexão", erro)
});

connection.once("open", () => {
    console.log("Conexão com o mongo feita com sucesso!")
});

const app = express();
app.use(express.json())

const livros = [
    {
        id: 1,
        titulo: "O senhor dos anéis"
    },
    {
        id: 2,
        titulo: "A revolução dos bichos"
    }
];

function buscaLivro(id) {
    return livros.findIndex(livro => {
        return livro.id === parseInt(id);
    });
}

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("livro cadastrado com sucesso!");
});


app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros[index]);    
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("o livro foi deletado com sucesso");
});



export default app;
