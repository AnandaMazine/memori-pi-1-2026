import Personagem from "../models/Personagens.js";

class personagemService{
    async getAll() {
    try {
      const personagens = await Personagem.find();
      return personagens;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(nomePersonagem, descricao, imagem, idHistoria) {
    try {
      const newPersonagem = new Personagem({nomePersonagem, descricao, imagem, idHistoria});
      await newPersonagem.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Personagem.findByIdAndDelete(id);
      console.log(`Personagem com id ${id} deletado com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, nomePersonagem, descricao, imagem, idHistoria) {
    try {
      const personagem = await Personagem.findByIdAndUpdate(
        id,
        {nomePersonagem, descricao, imagem, idHistoria},
        { new: true },
      );
      console.log(`Personagem com id ${id} atualizado com sucesso!`);
      return personagem;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const personagem = await Personagem.findOne({ _id: id });
      return personagem;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new personagemService();