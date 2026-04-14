# Memori

Esta API é utilizada para gerenciar o sistema MEMORI, permitindo que administradores realizem operações de CRUD (criar, ler, atualizar e deletar) por meio da página web.

## Endpoints de quests
### GET /quests
Esse endpoint é responsável por retornar a listagem de todos os quests cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os quests.

Exemplo de resposta:
```
{
    "nomequest": "Edifício K.K.K.K.",
    "latitudequest": "-24.4880",
    "longitudequest": "-47.8445",
    "tituloRota": "Trilha do Patrimônio",
    "descricaoquest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemquest": "kkk_modelo.extensao"
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
Esse endpoint é responsável por cadastrar um novo quest no banco de dados.

#### Parâmetros:
nomeCheckpont: Nome do quest.<br>
latitudequest: Latitude do quest.<br>
longitudequest: Longitude do quest.<br>
tituloRota: Título da Rota que o quest pertence.<br>
descricaoquest: Descrições do quest.<br>
imagemquest: Imagem para simbolizar o quest.

Exemplo de requisição:
```
{
    "nomequest": "Edifício K.K.K.K.",
    "latitudequest": "-24.4880",
    "longitudequest": "-47.8445",
    "tituloRota": "Trilha do Patrimônio",
    "descricaoquest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemquest": "kkk_modelo.extensao"
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, o novo quest foi criado com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - DELETE /quest
Esse endpoint é responsável por deletar um quest específico pelo seu ID.

#### Parâmetros:
id: ID do quest a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o quest foi deletado com sucesso e não há conteúdo para retornar.

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

### - PUT /quest/
Esse endpoint é responsável por atualizar as informações de um quest específico pelo seu ID.

#### Parâmetros:
id: ID do quest a ser atualizado.<br>
nomeCheckpont: Nome do quest.<br>
latitudequest: Latitude do quest.<br>
longitudequest: Longitude do quest.<br>
tituloRota: Título da Rota que o quest pertence.<br>
descricaoquest: Descrições do quest.

Exemplo de requisição:
```
{
    "nomequest": "Edifício K.K.K.K. UPDATE",
    "latitudequest": "-24.4880",
    "longitudequest": "-47.8445",
    "tituloRota": "Trilha do Patrimônio",
    "descricaoquest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemquest": "kkk_modelo.extensao"
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do quest foram atualizadas com sucesso.

Exemplo de resposta:
```
{
    "nomequest": "Edifício K.K.K.K.",
    "latitudequest": "-24.4880",
    "longitudequest": "-47.8445",
    "tituloRota": "Trilha do Patrimônio",
    "descricaoquest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemquest": "kkk_modelo.extensao"
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
### - GET /quest/
Esse endpoint é responsável por retornar as informações de um quest específico pelo seu ID.

#### Parâmetros:
id: ID do quest a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do quest solicitado.

Exemplo de resposta:
```
{
    "nomequest": "Edifício K.K.K.K.",
    "latitudequest": "-24.4880",
    "longitudequest": "-47.8445",
    "tituloRota": "Trilha do Patrimônio",
    "descricaoquest": "Construído em 1912, foi sede de uma empresa japonesa e hoje é símbolo da imigração no Vale do Ribeira."
    "imagemquest": "kkk_modelo.extensao"
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o quest com o ID fornecido não foi encontrado.

Exemplo de resposta:
```
{
    "error": "quest não encontrado. "
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
Esse endpoint é responsável por retornar a listagem de todos as modelagens cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos as modelagens.

Exemplo de resposta:
```
{
  "idModelagem": 1,
  "nomeModelagem": "KKKK_Modelo3D",
  "nomeCidade": "Registro",
  "arquivoModelagem": "kkk_modelo.glb",
  "arquivoQrCode": "qrcode.extensao",
  "nomequest": "Galpão de armazenamento"
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
nomeCidade: Cidade da Modelagem.<br>
arquivoModelagem: Arquivo da modelagem.<br>
arquivoQrCode: Arquivo do QR Code<br>
nomeCheckpont: Nome do quest.<br>

Exemplo de requisição:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "nomeCidade": "Registro",
  "arquivoModelagem": "kkk_modelo.glb",
  "arquivoQrCode": "qrcode.extensao",
  "nomequest": "Galpão de armazenamento"
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

### - DELETE /modelagem/
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

### - PUT /modelagem/
Esse endpoint é responsável por atualizar as informações de uma modelagem específica pelo seu ID.

#### Parâmetros:
idModelagem: ID da modelagem a ser atualizada.<br>
nomeModelagem: Nome da Modelagem.<br>
nomeCidade: Cidade da Modelagem.<br>
arquivoModelagem: Arquivo da modelagem<br>
arquivoQrCode: Arquivo do QR Code<br>
nomeCheckpont: Nome do quest.<br>

Exemplo de requisição:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "nomeCidade": "Registro",
  "arquivoModelagem": "kkk_modelo.glb",
  "arquivoQrCode": "qrcode.extensao",
  "nomequest": "Galpão de armazenamento"
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações da modelagem foram atualizadas com sucesso.

Exemplo de resposta:
```
{
  "nomeModelagem": "KKKK_Modelo3D",
  "nomeCidade": "Registro",
  "arquivoModelagem": "kkk_modelo.glb",
  "arquivoQrCode": "qrcode.extensao",
  "nomequest": "Galpão de armazenamento"
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
### - GET /modelagem/
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
  "nomeCidade": "Registro",
  "arquivoModelagem": "kkk_modelo.glb",
  "arquivoQrCode": "qrcode.extensao",
  "nomequest": "Galpão de armazenamento"
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

## Endpoints de Quizzes
### GET /quiz
Esse endpoint é responsável por retornar a listagem de todos os quizzes cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os quizzes.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos e armazenados nos galpões?",
  "questQuiz": "Insira o Cp Quiz aqui.",
  "alternativaA": "Grãos como arroz, soja e milho, destinados ao processamento e exportação.",
  "alternativaB": "Peças e componentes de máquinas pesadas, utilizados na construção civil e industrial.",
  "alternativaC": "Produtos químicos e farmacêuticos, como insumos para indústrias locais.",
  "alternativaD": "Madeira e derivados, especialmente para uso na construção civil e no setor moveleiro.",
  "alternativaCorreta": "Insira a alternativa correta aqui."
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

### - POST /quiz
Esse endpoint é responsável por cadastrar um novo quiz no banco de dados.

#### Parâmetros:
  pergunta: Pergunta do quiz a ser cadastrado.<br>
  questQuiz: quest do Quiz a ser cadastrado.<br>
  alternativaA: Alternativa A do quiz.<br>
  alternativaB: Alternativa B do quiz.<br>
  alternativaC: Alternativa C do quiz.<br>
  alternativaD: Alternativa D do quiz.<br>
  alternativaCorreta: Alternativa Correta do quiz.<br>

Exemplo de requisição:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos e armazenados nos galpões?",
  "questQuiz": "Insira o Cp Quiz aqui.",
  "alternativaA": "Grãos como arroz, soja e milho, destinados ao processamento e exportação.",
  "alternativaB": "Peças e componentes de máquinas pesadas, utilizados na construção civil e industrial.",
  "alternativaC": "Produtos químicos e farmacêuticos, como insumos para indústrias locais.",
  "alternativaD": "Madeira e derivados, especialmente para uso na construção civil e no setor moveleiro.",
  "alternativaCorreta": "Insira a alternativa correta aqui."
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

### - DELETE /quiz
Esse endpoint é responsável por deletar um quiz específico pelo seu ID.

#### Parâmetros:
id: ID do quiz a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o quiz foi deletado com sucesso e não há conteúdo para retornar.

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

### - PUT /quiz/
Esse endpoint é responsável por atualizar as informações de um quiz específico pelo seu ID.

#### Parâmetros:
  pergunta: Pergunta do quiz a ser cadastrado.<br>
  questQuiz: quest do Quiz a ser cadastrado.<br>
  alternativaA: Alternativa A do quiz.<br>
  alternativaB: Alternativa B do quiz.<br>
  alternativaC: Alternativa C do quiz.<br>
  alternativaD: Alternativa D do quiz.<br>
  alternativaCorreta: Alternativa Correta do quiz.<br>

Exemplo de requisição:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos e armazenados nos galpões?",
  "questQuiz": "Insira o Cp Quiz aqui.",
  "alternativaA": "Grãos como arroz, soja e milho, destinados ao processamento e exportação.",
  "alternativaB": "Peças e componentes de máquinas pesadas, utilizados na construção civil e industrial.",
  "alternativaC": "Produtos químicos e farmacêuticos, como insumos para indústrias locais.",
  "alternativaD": "Madeira e derivados, especialmente para uso na construção civil e no setor moveleiro.",
  "alternativaCorreta": "Insira a alternativa correta aqui."
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do quiz foram atualizadas com sucesso.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos e armazenados nos galpões?",
  "questQuiz": "Insira o Cp Quiz aqui.",
  "alternativaA": "Grãos como arroz, soja e milho, destinados ao processamento e exportação.",
  "alternativaB": "Peças e componentes de máquinas pesadas, utilizados na construção civil e industrial.",
  "alternativaC": "Produtos químicos e farmacêuticos, como insumos para indústrias locais.",
  "alternativaD": "Madeira e derivados, especialmente para uso na construção civil e no setor moveleiro.",
  "alternativaCorreta": "Insira a alternativa correta aqui."
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
### - GET /quiz/
Esse endpoint é responsável por retornar as informações de um quiz específico pelo seu ID.

#### Parâmetros:
id: ID do quiz a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do quiz solicitado.

Exemplo de resposta:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos e armazenados nos galpões?",
  "questQuiz": "Insira o Cp Quiz aqui.",
  "alternativaA": "Grãos como arroz, soja e milho, destinados ao processamento e exportação.",
  "alternativaB": "Peças e componentes de máquinas pesadas, utilizados na construção civil e industrial.",
  "alternativaC": "Produtos químicos e farmacêuticos, como insumos para indústrias locais.",
  "alternativaD": "Madeira e derivados, especialmente para uso na construção civil e no setor moveleiro.",
  "alternativaCorreta": "Insira a alternativa correta aqui."
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o quiz com o ID fornecido não foi encontrado.

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

## Endpoints de Rotas
### GET /rotas
Esse endpoint é responsável por retornar a listagem de todos as rotas cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos as rotas.

Exemplo de resposta:
```
{
  "tituloRota": "Trilha do Patrimônio",
  "cidadeLocalizada": "Registro",
  "latitudeRota": -24.4872,
  "longitudeRota": -47.8440,
  "imagemCapa": "kkk_capa.jpg",
  "descricaoRota": "Trilha educativa pelos principais pontos históricos de Registro, iniciando pelo Edifício K.K.K.K."
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


### - POST /rota
Esse endpoint é responsável por cadastrar uma nova rota no banco de dados.

#### Parâmetros:
tituloRota: Título da Rota.<br>
cidadeLocalizada": Cidade a qual a rota está localizada.<br>
latitudeRota": Latitude da Rota.<br>
longitudeRota: Longitude da Rota.<br>
imagemCapa": Imagem Capa da Rota.<br>
descricaoRota": Pequena descrição da Rota.<br>

Exemplo de requisição:
```
{
  "tituloRota": "Trilha do Patrimônio",
  "cidadeLocalizada": "Registro",
  "latitudeRota": -24.4872,
  "longitudeRota": -47.8440,
  "imagemCapa": "kkk_capa.jpg",
  "descricaoRota": "Trilha educativa pelos principais pontos históricos de Registro, iniciando pelo Edifício K.K.K.K."
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, uma nova rota foi criada com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:
```
{
    "error": "Erro interno do servidor."
}
```

### - DELETE /rota/
Esse endpoint é responsável por deletar uma rota específica pelo seu ID.

#### Parâmetros:
id: ID da rota a ser deletada.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, a rota foi deletada com sucesso e não há conteúdo para retornar.

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

### - PUT /rota/
Esse endpoint é responsável por atualizar as informações de uma rota específica pelo seu ID.

#### Parâmetros:
idRota: ID da Rota a ser atualizada.<br>
tituloRota: Título da Rota.<br>
cidadeLocalizada: Cidade a qual a rota está localizada.<br>
latitudeRota: Latitude da Rota.<br>
longitudeRota: Longitude da Rota.<br>
imagemCapa: Imagem Capa da Rota.br>
descricaoRota: Pequena descrição da Rota.<br>

Exemplo de requisição:
```
{
  "tituloRota": "Trilha do Patrimônio",
  "cidadeLocalizada": "Registro",
  "latitudeRota": -24.4872,
  "longitudeRota": -47.8440,
  "imagemCapa": "kkk_capa.jpg",
  "descricaoRota": "Trilha educativa pelos principais pontos históricos de Registro, iniciando pelo Edifício K.K.K.K."
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações da rota foram atualizadas com sucesso.

Exemplo de resposta:
```
{
  "tituloRota": "Trilha do Patrimônio",
  "cidadeLocalizada": "Registro",
  "latitudeRota": -24.4872,
  "longitudeRota": -47.8440,
  "imagemCapa": "kkk_capa.jpg",
  "descricaoRota": "Trilha educativa pelos principais pontos históricos de Registro, iniciando pelo Edifício K.K.K.K."
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
### - GET /rota/
Esse endpoint é responsável por retornar as informações de uma rota específica pelo seu ID.

#### Parâmetros:
id: ID da rota a ser consultada.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações da rota solicitada.

Exemplo de resposta:
```
{
  "tituloRota": "Trilha do Patrimônio",
  "cidadeLocalizada": "Registro",
  "latitudeRota": -24.4872,
  "longitudeRota": -47.8440,
  "imagemCapa": "kkk_capa.jpg",
  "descricaoRota": "Trilha educativa pelos principais pontos históricos de Registro, iniciando pelo Edifício K.K.K.K."
}
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que a rota com o ID fornecido não foi encontrada.

Exemplo de resposta:
```
{
    "error": "Rota não encontrada. "
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

### - DELETE /usuario/
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

### - PUT /usuario/
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
### - GET /usuario/
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
# memori-pi-1-2026
