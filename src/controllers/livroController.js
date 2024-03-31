import { CURSOR_FLAGS } from "mongodb";
import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
    static async listarLivros(req, res) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao buscar livros` });
        }            
    };

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao buscar livros` });
        }            
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: {...autorEncontrado._doc }};
            const livroSalvo = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro criado com sucesso", livro: livroSalvo });
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
        
    };

    static async atualizarLivro(req, res) {
        try {
            await livro.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "livro atualizado" });
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do livro` });
        }            
    };

    static async removerLivro(req, res) {
        try {
            await livro.findByIdAndRemove(req.params.id);
            res.status(200).json({ message: "livro removido com sucesso" });
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na remoção do livro` });
        }            
    };

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora)
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` })
        }
    }

};

export default LivroController;