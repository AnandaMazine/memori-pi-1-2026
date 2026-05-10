import Modelagem from "../models/Modelagens.js";

class modelagemService {
  async getAll() {
    try {
      const modelagens = await Modelagem.find();
      return modelagens;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(nomeModelagem, latitude, longitude, descricaoModelagem, imagemModelagem) {
    try {
      const newModelagem = new Modelagem({
        nomeModelagem,
        latitude,
        longitude,
        descricaoModelagem,
        imagemModelagem,
      });

      await newModelagem.save();

    } catch (error) {
      console.log(error);
    }
  }


  async Delete(id) {
    try {
      await Modelagem.findByIdAndDelete(id);
      console.log(`Modelagem com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, nomeModelagem, latitude, longitude, descricaoModelagem, imagemModelagem) {
    try {
      const updateData = {};
      if (nomeModelagem !== undefined) updateData.nomeModelagem = nomeModelagem;
      if (latitude !== undefined) updateData.latitude = latitude;
      if (longitude !== undefined) updateData.longitude = longitude;
      if (descricaoModelagem !== undefined) updateData.descricaoModelagem = descricaoModelagem;
      if (imagemModelagem !== undefined) updateData.imagemModelagem = imagemModelagem;

      const modelagem = await Modelagem.findByIdAndUpdate(id, updateData, { new: true });
      if (modelagem) {
        console.log(`Modelagem com id ${id} atualizada com sucesso!`);
      } else {
        console.log(`Nenhuma modelagem encontrada com id ${id} para atualizar.`);
      }
      return modelagem;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const modelagem = await Modelagem.findOne({ _id: id });
      return modelagem;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new modelagemService();