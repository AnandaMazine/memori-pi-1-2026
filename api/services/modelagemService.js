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

  async Create(nomeModelagem, nomeCidade, arquivoModelagem, arquivoQrCode, idQuest) {
    try {
      const newModelagem = new Modelagem({
        nomeModelagem,
        nomeCidade,
        arquivoModelagem, // Path da Pasta
        arquivoQrCode,    // Path do QR Code
        idQuest,
      });

      console.log("[SERVICE] Instância Mongoose criada. Tentando salvar...");
      await newModelagem.save(); // <<< O ERRO PODE ESTAR AQUI
      console.log("[SERVICE] Modelagem salva no DB com SUCESSO!"); // <<< ESTE LOG APARECE?

    } catch (error) {
      console.error("!!! [SERVICE] ERRO ao criar/salvar Modelagem !!!");
      console.error("Erro do Mongoose/DB:", error);
      // É crucial re-lançar o erro para o controller saber que falhou
      throw error;
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

  async Update(id,nomeModelagem,nomeCidade,arquivoModelagem,arquivoQrCode,idQuest) {
    try {
      // Build update object only with fields that were provided (!== undefined)
      const updateData = {};
      if (nomeModelagem !== undefined) updateData.nomeModelagem = nomeModelagem;
      if (nomeCidade !== undefined) updateData.nomeCidade = nomeCidade;
      // arquivoModelagem and arquivoQrCode: undefined => don't touch; null => clear; string => set
      if (arquivoModelagem !== undefined) updateData.arquivoModelagem = arquivoModelagem;
      if (arquivoQrCode !== undefined) updateData.arquivoQrCode = arquivoQrCode;
      if (idQuest !== undefined) updateData.idQuest = idQuest;

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