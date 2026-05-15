# Memori

Esta API é utilizada para gerenciar o sistema MEMORI, permitindo que administradores realizem operações de CRUD (criar, ler, atualizar e deletar) por meio da página web.

## Endpoints de Quests
### GET /quests
Esse endpoint é responsável por retornar a listagem de todos as quests cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos as quests.

Exemplo de resposta:
```
{
    "nomeQuest": "Edifício K.K.K.K.",
    "latitudeQuest": "-24.4880",
    "longitudeQuest": "-47.8445",
    "descricaoQuest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemQuest": "kkk_modelo.extensao"
}
```
##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - POST /quest
Esse endpoint é responsável por cadastrar uma nova quest no banco de dados.

#### Parâmetros:
nomeQuest: Nome da quest.<br>
latitudeQuest: Latitude da quest.<br>
longitudeQuest: Longitude da quest.<br>
descricaoQuest: Descrições da quest.<br>
imagemQuest: Imagem para simbolizar a quest.

Exemplo de requisição:
```
{
    "nomeQuest": "Edifício K.K.K.K.",
    "latitudeQuest": "-24.4880",
    "longitudeQuest": "-47.8445",
    "descricaoQuest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemQuest": "kkk_modelo.extensao"
}
``` 
#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, a nova quest foi criada com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```
### - DELETE /quest/:id
Esse endpoint é responsável por deletar uma quest específica pelo seu ID.

#### Parâmetros:
id: ID da quest a ser deletada.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, a quest foi deletada com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```
{
    "error": "A ID enviada é inválida. "
}
```
##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```

### - PUT /quest/:id
Esse endpoint é responsável por atualizar as informações de uma quest específica pelo seu ID.

#### Parâmetros:
nomeQuest: Nome da quest.<br>
latitudeQuest: Latitude da quest.<br>
longitudeQuest: Longitude da quest.<br>
descricaoQuest: Descrições da quest.<br>
imagemQuest: Imagem para simbolizar a quest.

Exemplo de requisição:
```
{
    "nomeQuest": "Edifício K.K.K.K.",
    "latitudeQuest": "-24.4880",
    "longitudeQuest": "-47.8445",
    "descricaoQuest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemQuest": "kkk_modelo.extensao"
}
```
#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações da quest foram atualizadas com sucesso.

Exemplo de resposta:
```
{
    "nomeQuest": "Edifício K.K.K.K.",
    "latitudeQuest": "-24.4880",
    "longitudeQuest": "-47.8445",
    "descricaoQuest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemQuest": "kkk_modelo.extensao"
}
```
##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor. "
}
```

### - GET /quest/:id
Esse endpoint é responsável por retornar as informações de uma quest específica pelo seu ID.

#### Parâmetros:
id: ID da quest a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações da quest solicitada.

Exemplo de resposta:
```
{
    "nomeQuest": "Edifício K.K.K.K.",
    "latitudeQuest": "-24.4880",
    "longitudeQuest": "-47.8445",
    "descricaoQuest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemQuest": "kkk_modelo.extensao"
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que a quest com o ID fornecido não foi encontrada.

Exemplo de resposta:
```
{
    "error": "Quest não encontrada. "
}
```
##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```

## Endpoints de Modelagens
### GET /modelagens
Esse endpoint é responsável por retornar a listagem de todos as modelagens cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todas as modelagens.

Exemplo de resposta:
```
{
  "idModelagem": 1,
  "nomeModelagem": "KKKK_Modelo3D",
  "latitude": -24.4971,
  "longitude": -47.8449,
  "descricaoModelagem": "Modelo 3D de um galpão histórico localizado em Registro.",
  "modeloURL": "https://exemplo.com/modelos/kkkk_modelo.glb",
  "tipoModelo": "glb"
}
```
##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - POST /modelagem
Esse endpoint é responsável por cadastrar uma nova modelagem no banco de dados.

#### Parâmetros:
nomeModelagem: Nome da Modelagem.<br>
latitude: Latitude da Modelagem.<br>
longitude: Longitude da Modelagem.<br>
descricaoModelagem: Descrição da Modelagem.<br>
modeloURL: URL do arquivo 3D (.glb ou .gltf).<br>
tipoModelo: Tipo de modelo (padrão: "gltf").<br>

Exemplo de requisição:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "latitude": -24.4971,
  "longitude": -47.8449,
  "descricaoModelagem": "Modelo 3D de um galpão histórico localizado em Registro.",
  "modeloURL": "https://exemplo.com/modelos/kkkk_modelo.glb",
  "tipoModelo": "glb"
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, uma nova modelagem foi criada com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```


### - DELETE /modelagem/:id
Esse endpoint é responsável por deletar uma modelagem específica pelo seu ID.

#### Parâmetros:
id: ID da modelagem a ser deletada.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, a modelagem foi deletada com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```

### - PUT /modelagem/:id
Esse endpoint é responsável por atualizar as informações de uma modelagem específica pelo seu ID.

#### Parâmetros:
nomeModelagem: Nome da Modelagem.<br>
latitude: Latitude da Modelagem.<br>
longitude: Longitude da Modelagem.<br>
descricaoModelagem: Descrição da Modelagem.<br>
modeloURL: URL do arquivo 3D (.glb ou .gltf).<br>
tipoModelo: Tipo de modelo (padrão: "gltf").<br>

Exemplo de requisição:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "latitude": -24.4971,
  "longitude": -47.8449,
  "descricaoModelagem": "Modelo 3D de um galpão histórico localizado em Registro.",
  "modeloURL": "https://exemplo.com/modelos/kkkk_modelo.glb",
  "tipoModelo": "glb"
}
```
#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações da modelagem foram atualizadas com sucesso.

Exemplo de resposta:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "latitude": -24.4971,
  "longitude": -47.8449,
  "descricaoModelagem": "Modelo 3D de um galpão histórico localizado em Registro.",
  "modeloURL": "https://exemplo.com/modelos/kkkk_modelo.glb",
  "tipoModelo": "glb"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor. "
}
```

### - GET /modelagem/:id
Esse endpoint é responsável por retornar as informações de uma modelagem específica pelo seu ID.

#### Parâmetros:
id: ID da modelagem a ser consultada.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações da modelagem solicitada.

Exemplo de resposta:
```
{
  "idModelagem": 1,
  "nomeModelagem": "KKKK_Modelo3D",
  "latitude": -24.4971,
  "longitude": -47.8449,
  "descricaoModelagem": "Modelo 3D de um galpão histórico localizado em Registro.",
  "modeloURL": "https://exemplo.com/modelos/kkkk_modelo.glb",
  "tipoModelo": "glb"
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que a modelagem com o ID fornecido não foi encontrada.

Exemplo de resposta:
```
{
    "error": "Modelagem não encontrada. "
}
```
##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```
## Endpoints de Desafios
### GET /desafios
Esse endpoint é responsável por retornar a listagem de todos os desafios cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os desafios.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "tipoDesafio": "Encaixe",
  "dificuldade": 3,
  "tempoLimite": 120,
  "estadoInicial": "321",
  "estadoCorreto": "123",
  "numeroPeca": 5
}
```
##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - POST /desafio
Esse endpoint é responsável por cadastrar um novo desafio no banco de dados.

#### Parâmetros:
pergunta: Pergunta do desafio.<br>
tipoDesafio: Tipo do desafio (ex: quiz, puzzle, memória).<br>
dificuldade: Nível de dificuldade do desafio.<br>
tempoLimite: Tempo máximo para conclusão do desafio, em segundos.<br>
estadoInicial: Estado inicial do desafio.<br>
estadoCorreto: Estado correto esperado para conclusão do desafio.<br>
numeroPeca: Número da peça relacionada ao desafio.<br>

Exemplo de requisição:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "tipoDesafio": "Encaixe",
  "dificuldade": 3,
  "tempoLimite": 120,
  "estadoInicial": "321",
  "estadoCorreto": "123",
  "numeroPeca": 5
}
```
#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, o novo quiz foi criado com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - DELETE /desafio/:id
Esse endpoint é responsável por deletar um desafio específico pelo seu ID.
#### Parâmetros:
id: ID do quiz a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o desafio foi deletado com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```

### - PUT /desafio/:id
Esse endpoint é responsável por atualizar as informações de um desafio específico pelo seu ID.

#### Parâmetros:
pergunta: Pergunta do desafio.<br>
tipoDesafio: Tipo do desafio (ex: quiz, puzzle, memória).<br>
dificuldade: Nível de dificuldade do desafio.<br>
tempoLimite: Tempo máximo para conclusão do desafio, em segundos.<br>
estadoInicial: Estado inicial do desafio.<br>
estadoCorreto: Estado correto esperado para conclusão do desafio.<br>
numeroPeca: Número da peça relacionada ao desafio.<br>

Exemplo de requisição:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "tipoDesafio": "Encaixe",
  "dificuldade": 3,
  "tempoLimite": 120,
  "estadoInicial": "321",
  "estadoCorreto": "123",
  "numeroPeca": 5
}
```
#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do quiz foram atualizadas com sucesso.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "tipoDesafio": "Encaixe",
  "dificuldade": 3,
  "tempoLimite": 120,
  "estadoInicial": "321",
  "estadoCorreto": "123",
  "numeroPeca": 5
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor. "
}
```

### - GET /desafio/:id
Esse endpoint é responsável por retornar as informações de um desafio específico pelo seu ID.

#### Parâmetros:
id: ID do desafio a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do desafio solicitado.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "tipoDesafio": "Encaixe",
  "dificuldade": 3,
  "tempoLimite": 120,
  "estadoInicial": "321",
  "estadoCorreto": "123",
  "numeroPeca": 5
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o desafio com o ID fornecido não foi encontrado.

Exemplo de resposta:
```
{
    "error": "Quiz não encontrado. "
}
```
##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```

## Endpoints de Histórias

### GET /historias
Esse endpoint é responsável por retornar a listagem de todas as histórias cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todas as histórias.

Exemplo de resposta:
```json
{
  "_id": "6644d9b4f1c2a8b7c1234567",
  "titulo": "A História dos Galpões do KKKK",
  "descricao": "Os galpões do KKKK foram utilizados para armazenamento e transporte de mercadorias durante o desenvolvimento ferroviário da região de Registro.",
  "idQuest": "6644d8a1f1c2a8b7c7654321"
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### POST /historia
Esse endpoint é responsável por cadastrar uma nova história no banco de dados.

#### Parâmetros:
titulo: Título da história.<br>
descricao: Descrição ou conteúdo da história.<br>
idQuest: Identificador da quest relacionada à história.<br>

Exemplo de requisição:
```json
{
  "titulo": "A História dos Galpões do KKKK",
  "descricao": "Os galpões do KKKK foram utilizados para armazenamento e transporte de mercadorias durante o desenvolvimento ferroviário da região de Registro.",
  "idQuest": "6644d8a1f1c2a8b7c7654321"
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, uma nova história foi criada com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### DELETE /historia/:id
Esse endpoint é responsável por deletar uma história específica pelo seu ID.

#### Parâmetros:
id: ID da história a ser deletada.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, a história foi deletada com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### PUT /historia/:id
Esse endpoint é responsável por atualizar as informações de uma história específica pelo seu ID.

#### Parâmetros:
titulo: Título da história.<br>
descricao: Descrição ou conteúdo da história.<br>
idQuest: Identificador da quest relacionada à história.<br>

Exemplo de requisição:
```json
{
  "titulo": "A História dos Galpões do KKKK",
  "descricao": "Os galpões do KKKK foram utilizados para armazenamento e transporte de mercadorias durante o desenvolvimento ferroviário da região de Registro.",
  "idQuest": "6644d8a1f1c2a8b7c7654321"
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações da história foram atualizadas com sucesso.

Exemplo de resposta:
```json
{
  "_id": "6644d9b4f1c2a8b7c1234567",
  "titulo": "A História dos Galpões do KKKK",
  "descricao": "Os galpões do KKKK foram utilizados para armazenamento e transporte de mercadorias durante o desenvolvimento ferroviário da região de Registro.",
  "idQuest": "6644d8a1f1c2a8b7c7654321"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### GET /historia/:id
Esse endpoint é responsável por retornar as informações de uma história específica pelo seu ID.

#### Parâmetros:
id: ID da história a ser consultada.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações da história solicitada.

Exemplo de resposta:
```json
{
  "_id": "6644d9b4f1c2a8b7c1234567",
  "titulo": "A História dos Galpões do KKKK",
  "descricao": "Os galpões do KKKK foram utilizados para armazenamento e transporte de mercadorias durante o desenvolvimento ferroviário da região de Registro.",
  "idQuest": "6644d8a1f1c2a8b7c7654321"
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que a história com o ID fornecido não foi encontrada.

Exemplo de resposta:
```json
{
  "error": "História não encontrada."
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

## Endpoints de Personagens

### GET /personagens
Esse endpoint é responsável por retornar a listagem de todos os personagens cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os personagens.

Exemplo de resposta:
```json
{
  "_id": "6644e3c2f1c2a8b7c1111222",
  "nomePersonagem": "Guia Ferroviário",
  "descricao": "Personagem responsável por apresentar a história dos galpões ferroviários.",
  "poses": [
    {
      "nomePose": "feliz",
      "imagem": "https://exemplo.com/personagens/guia-feliz.png"
    },
    {
      "nomePose": "serio",
      "imagem": "https://exemplo.com/personagens/guia-serio.png"
    }
  ]
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### POST /personagem
Esse endpoint é responsável por cadastrar um novo personagem no banco de dados.

#### Parâmetros:
nomePersonagem: Nome do personagem.<br>
descricao: Descrição do personagem.<br>
poses: Array de poses disponíveis para o personagem.<br>

Exemplo de requisição:
```json
{
  "nomePersonagem": "Guia Ferroviário",
  "descricao": "Personagem responsável por apresentar a história dos galpões ferroviários.",
  "poses": [
    {
      "nomePose": "feliz",
      "imagem": "https://exemplo.com/personagens/guia-feliz.png"
    },
    {
      "nomePose": "serio",
      "imagem": "https://exemplo.com/personagens/guia-serio.png"
    }
  ]
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, um novo personagem foi criado com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### DELETE /personagem/:id
Esse endpoint é responsável por deletar um personagem específico pelo seu ID.

#### Parâmetros:
id: ID do personagem a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o personagem foi deletado com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### PUT /personagem/:id
Esse endpoint é responsável por atualizar as informações de um personagem específico pelo seu ID.

#### Parâmetros:
nomePersonagem: Nome do personagem.<br>
descricao: Descrição do personagem.<br>
poses: Array de poses disponíveis para o personagem.<br>

Exemplo de requisição:
```json
{
  "nomePersonagem": "Guia Ferroviário",
  "descricao": "Personagem responsável por apresentar a história dos galpões ferroviários.",
  "poses": [
    {
      "nomePose": "feliz",
      "imagem": "https://exemplo.com/personagens/guia-feliz.png"
    },
    {
      "nomePose": "serio",
      "imagem": "https://exemplo.com/personagens/guia-serio.png"
    }
  ]
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do personagem foram atualizadas com sucesso.

Exemplo de resposta:
```json
{
  "_id": "6644e3c2f1c2a8b7c1111222",
  "nomePersonagem": "Guia Ferroviário",
  "descricao": "Personagem responsável por apresentar a história dos galpões ferroviários.",
  "poses": [
    {
      "nomePose": "feliz",
      "imagem": "https://exemplo.com/personagens/guia-feliz.png"
    },
    {
      "nomePose": "serio",
      "imagem": "https://exemplo.com/personagens/guia-serio.png"
    }
  ]
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

---

### GET /personagem/:id
Esse endpoint é responsável por retornar as informações de um personagem específico pelo seu ID.

#### Parâmetros:
id: ID do personagem a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do personagem solicitado.

Exemplo de resposta:
```json
{
  "_id": "6644e3c2f1c2a8b7c1111222",
  "nomePersonagem": "Guia Ferroviário",
  "descricao": "Personagem responsável por apresentar a história dos galpões ferroviários.",
  "poses": [
    {
      "nomePose": "feliz",
      "imagem": "https://exemplo.com/personagens/guia-feliz.png"
    },
    {
      "nomePose": "serio",
      "imagem": "https://exemplo.com/personagens/guia-serio.png"
    }
  ]
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o personagem com o ID fornecido não foi encontrado.

Exemplo de resposta:
```json
{
  "error": "Personagem não encontrado."
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.
Exemplo de resposta:
```json
{
  "error": "A ID enviada é inválida."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
Exemplo de resposta:
```json
{
  "error": "Erro interno do servidor."
}
```

## Endpoints de Capítulos
### - POST /capitulo
Esse endpoint é responsável por cadastrar um novo capítulo no banco de dados.

#### Parâmetros:
tituloBloco: Título do capítulo.<br>
conteudoDialogo: Conteúdo/diálogo do capítulo.<br>
pose: Pose do personagem.<br>
tipoBloco: Tipo de bloco (Quest, Desafio, Modelagem, Capítulo).<br>
idReferencia: ID da referência (se aplicável).<br>
ordem: Ordem do capítulo na história.<br>
idHistoria: ID da história associada.<br>
idPersonagem: ID do personagem (opcional).<br>

Exemplo de saída:
```
{
  "_id": "6644e1b8f1c2a8b7c9876543",
  "tituloBloco": "Chegada aos Galpões",
  "conteudoDialogo": "Bem-vindo aos antigos galpões ferroviários de Registro.",
  "pose": "feliz",
  "tipoBloco": "Capítulo",
  "idReferencia": "6644d9b4f1c2a8b7c1234567",
  "ordem": 1,
  "idHistoria": "6644d9b4f1c2a8b7c1234567",
  "idPersonagem": "6644e3c2f1c2a8b7c1111222"
}
```

## Endpoints de Usuários
### GET /usuarios
Esse endpoint é responsável por retornar a listagem de todos os usuários cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os usuários.
Exemplo de resposta:
```
{
  "nome": "Ana Paula",
  "nomeUsuario": "ana.paula",
  "emailUsuario": "ana@email.com",
  "senhaUsuario": "*****",
  "permissao": "Administrador"
}
```
##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.
Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```
### - POST /usuario
Esse endpoint é responsável por cadastrar um novo usuário no banco de dados.

#### Parâmetros:
nome: Nome do Usuário.<br>
nomeUsuario: Apelido/Nick do Usuário.<br>
emailUsuario: E-mail do Usuário.<br>
senhaUsuario: Senha do Usuário.<br>
permissao: Tipo de Permissão (ex: "Administrador").<br>
Exemplo de requisição:
```
{
  "nome": "Ana Paula",
  "nomeUsuario": "ana.paula",
  "emailUsuario": "ana@email.com",
  "senhaUsuario": "*****",
  "permissao": "Administrador"
}
```
#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, o novo usuário foi criado com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - DELETE /usuario/:id
Esse endpoint é responsável por deletar um usuário específico pelo seu ID.
#### Parâmetros:
id: ID do usuário a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o usuário foi deletado com sucesso e não há conteúdo para retornar.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:
```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```
### - PUT /usuario/:id
Esse endpoint é responsável por atualizar as informações de um usuário específico pelo seu ID.

#### Parâmetros:
id: ID do Usuário a ser atualizado.<br>
nome: Nome do Usuário.<br>
nomeUsuario: Apelido/Nick do Usuário.<br>
emailUsuario: E-mail do Usuário.<br>
senhaUsuario: Senha do Usuário.<br>
permissao: Tipo de Permissão que o Usuário possui.<br>

Exemplo de requisição:
```
{
  "nome": "Ana Paula",
  "nomeUsuario": "ana.paula",
  "emailUsuario": "ana@email.com",
  "senhaUsuario": "*****",
  "permissao": "Administrador"
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do usuário foram atualizadas com sucesso.
Exemplo de resposta:
```
{
  "nome": "Ana Paula",
  "nomeUsuario": "ana.paula",
  "emailUsuario": "ana@email.com",
  "senhaUsuario": "*****",
  "permissao": "Administrador"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "error": "Erro interno do servidor. "
}
```
### - GET /usuario/:id
Esse endpoint é responsável por retornar as informações de um usuário específico pelo seu ID.
#### Parâmetros:
id: ID do usuário a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do usuário solicitado.

Exemplo de resposta:
```
{
  "nome": "Ana Paula",
  "nomeUsuario": "ana.paula",
  "emailUsuario": "ana@email.com",
  "senhaUsuario": "*****",
  "permissao": "Administrador"
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o usuário com o ID fornecido não foi encontrado.

Exemplo de resposta:
```
{
    "error": "Usuário não encontrado. "
}
```
##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
    "error": "A ID enviada é inválida. "
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
Exemplo de resposta:

```
{
    "error": "Erro interno do servidor."
}
```
## Endpoints de Upload

### POST /upload
Esse endpoint é responsável por fazer upload de arquivos de imagem (mídia).

#### Parâmetros:
file: Arquivo de imagem (JPEG, PNG, GIF, WebP, etc.).

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, o arquivo foi enviado com sucesso.

Exemplo de resposta:
```
{
    "url": "/uploads/midias/1609459200000-imagen.jpg"
}
```

### POST /upload/3d
Esse endpoint é responsável por fazer upload de modelos 3D em formato .glb (GL Transmission Format Binary).

#### Parâmetros:
file: Arquivo de modelo 3D em formato .glb.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, o modelo 3D foi enviado com sucesso.

Exemplo de resposta:
```
{
    "url": "/uploads/modelagens/models_3d/1609459200000-modelo.glb"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que apenas arquivos .glb são permitidos nesta rota.

Exemplo de resposta:
```
{
    "error": "Nesta rota apenas .glb é permitido. Para .gltf com dependências, envie um .zip na rota /3d-zip."
}
```

### POST /upload/3d-zip
Esse endpoint é responsável por fazer upload de modelos 3D em formato .zip que contenha arquivos .gltf com suas dependências (arquivos .bin, texturas, etc.).

#### Detalhes:
- O ZIP deve conter um arquivo .gltf e todos os seus arquivos dependentes (scene.bin, texturas, etc.)
- O endpoint extrai o ZIP preservando a estrutura de pastas e os caminhos relativos
- O arquivo .gltf é procurado recursivamente dentro do ZIP
- A estrutura extraída é armazenada em `/uploads/modelagens/extracted/<timestamp>/`

#### Parâmetros:
file: Arquivo ZIP contendo modelo 3D com estrutura completa.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, o modelo 3D foi extraído e armazenado com sucesso.

Exemplo de resposta:
```
{
    "url": "/uploads/modelagens/extracted/1609459200000-123456789/modelo/scene.gltf"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que nenhum arquivo .gltf foi encontrado dentro do ZIP.

Exemplo de resposta:
```
{
    "error": "Nenhum arquivo .gltf encontrado no ZIP."
}
```

## Observações Gerais

- **Autenticação**: Algumas rotas podem exigir autenticação via token JWT
- **CORS**: A API está configurada para aceitar requisições de múltiplas origens
- **Armazenamento de Arquivos**: 
  - Imagens são armazenadas em `/public/uploads/midias/`
  - Modelos 3D .glb são armazenados em `/public/uploads/modelagens/models_3d/`
  - Modelos 3D extraídos de ZIP são armazenados em `/public/uploads/modelagens/extracted/`
- **Tamanho Máximo de Arquivo**:
  - Imagens: 5 MB
  - Modelos 3D (.glb): 100 MB
  - ZIP com modelos: 200 MB
