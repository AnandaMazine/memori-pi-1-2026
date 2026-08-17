import Historia from "../models/Historias.js";

class historiaService {
  async getAll() {
    try {
      const historias = await Historia.find();
      return historias;
    } catch (error) {
      console.log(error);
    }
  }

    async Create(titulo, descricao, idQuest, idCapitulo, idModelagem, idDesafio) {
    try {
        const newHistoria = new Historia({ titulo, descricao, idQuest, idCapitulo, idModelagem, idDesafio });
      await newHistoria.save();
      return newHistoria;
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Historia.findByIdAndDelete(id);
      console.log(`História com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

    async Update(id, titulo, descricao, idQuest, idCapitulo, idModelagem, idDesafio) {
    try {
      const historia = await Historia.findByIdAndUpdate(
        id,
          { titulo, descricao, idQuest, idCapitulo, idModelagem, idDesafio },
        { new: true }
      );
      console.log(`História com id ${id} atualizada com sucesso!`);
      return historia;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const historia = await Historia.findOne({ _id: id });
      return historia;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new historiaService();