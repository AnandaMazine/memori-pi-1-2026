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

  async Create(nomePersonagem, descricao, poses = []) {
    try {
      const newPersonagem = new Personagem({ nomePersonagem, descricao, poses });
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

  async Update(id, nomePersonagem, descricao, poses) {
    try {
      const updateData = {};
      if (nomePersonagem !== undefined) updateData.nomePersonagem = nomePersonagem;
      if (descricao !== undefined) updateData.descricao = descricao;
      if (poses !== undefined) updateData.poses = poses;

      const personagem = await Personagem.findByIdAndUpdate(
        id,
        updateData,
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