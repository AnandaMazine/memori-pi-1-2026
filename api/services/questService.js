import Quest from "../models/Quests.js";

class questService {
  async getAll() {
    try {
      const quests = await Quest.find();
      return quests;
    } catch (error) {
      console.log(error);
    }
  }
  
async Create(
  nomeQuest,
  latitudeQuest,
  longitudeQuest,
  descricaoQuest,
  imagemQuest,
  imagemQrCode,
) {
  try {
    const newquest = new Quest({
      nomeQuest,
      latitudeQuest,
      longitudeQuest,
      descricaoQuest,
      imagemQuest,
      imagemQrCode,
    });
    await newquest.save();
  } catch (error) {
    console.log(error);
  }
}

  async Delete(id) {
    try {
      await Quest.findByIdAndDelete(id);
      console.log(`Quest com id ${id} deletado com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(
    id,
    nomeQuest,
    latitudeQuest,
    longitudeQuest,
    descricaoQuest,
    imagemQuest,
    imagemQrCode,
  ) {
    try {
      // Monta objeto de atualização apenas com os campos enviados (não sobrescrever com undefined)
      const updateData = {};
      if (nomeQuest !== undefined) updateData.nomeQuest = nomeQuest;
      if (latitudeQuest !== undefined) updateData.latitudeQuest = latitudeQuest;
      if (longitudeQuest !== undefined) updateData.longitudeQuest = longitudeQuest;
      if (descricaoQuest !== undefined) updateData.descricaoQuest = descricaoQuest;
      // imagemquest pode ser undefined (não enviar), null (limpar) ou string (novo/antigo path)
      if (imagemQuest !== undefined) updateData.imagemQuest = imagemQuest;
      if (imagemQrCode !== undefined) updateData.imagemQrCode = imagemQrCode;

      const quest = await Quest.findByIdAndUpdate(id, updateData, { new: true });

      if (quest) {
        console.log(`Quest com id ${id} atualizado com sucesso!`);
      } else {
        console.log(`Nenhum Quest encontrado com id ${id} para atualizar.`);
      }
      return quest;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const quest = await Quest.findOne({ _id: id });
      return quest;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new questService();
