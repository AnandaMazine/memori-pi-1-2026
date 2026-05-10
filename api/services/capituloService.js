import Capitulo from "../models/Capitulos.js";

class capituloService {
  async getAll() {
    try {
      const capitulos = await Capitulo.find();
      return capitulos;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(tituloBloco, conteudoDialogo, pose, ordem, idHistoria, idPersonagem) {
    try {
      const newCapitulo = new Capitulo({
        tituloBloco,
        conteudoDialogo,
        pose,
        ordem,
        idHistoria,
        idPersonagem,
      });

      await newCapitulo.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Capitulo.findByIdAndDelete(id);
      console.log(`Capítulo com id ${id} deletado com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, tituloBloco, conteudoDialogo, pose, ordem, idHistoria, idPersonagem) {
    try {
      const capitulo = await Capitulo.findByIdAndUpdate(
        id,
        {
          tituloBloco,
          conteudoDialogo,
          pose,
          ordem,
          idHistoria,
          idPersonagem,
        },
        { new: true },
      );

      console.log(`Capítulo com id ${id} atualizado com sucesso!`);
      return capitulo;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const capitulo = await Capitulo.findOne({ _id: id });
      return capitulo;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new capituloService();