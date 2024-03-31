import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao buscar autores` });
        }            
    }

    static async listarAutorPorId(req, res) {
        try {        
            const autorEncontrado = await autor.findById(req.params.id)
            res.status(200).json(autorEncontrado);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao buscar autores` });
        }            
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "autor cadastrado com sucesso", autor: novoAutor });
        } catch (erro){
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor ` });
        }
        
    }

    static async atualizarDadosDoAutor(req, res) {
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "autor atualizado" });
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do autor` });
        }            
    }

    static async removerAutor (req, res) {
        try {
            await autor.findByIdAndRemove(req.params.id);
            res.status(200).json({ message: "autor removido com sucesso" });
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na remoção do autor` });
        }            
    }

};

export default AutorController;