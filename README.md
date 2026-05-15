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

### - POST /quest
Esse endpoint é responsável por cadastrar um novo quest no banco de dados.

### - DELETE /quest/:id
Esse endpoint é responsável por deletar um quest específico pelo seu ID.

### - PUT /quest/:id
Esse endpoint é responsável por atualizar as informações de um quest específico pelo seu ID.

### - GET /quest/:id
Esse endpoint é responsável por retornar as informações de um quest específico pelo seu ID.

## Endpoints de Modelagens
### GET /modelagens
Esse endpoint é responsável por retornar a listagem de todos as modelagens cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todas as modelagens.

### - POST /modelagem
Esse endpoint é responsável por cadastrar uma nova modelagem no banco de dados.

#### Parâmetros:
nomeModelagem: Nome da Modelagem.<br>
latitude: Latitude da Modelagem.<br>
longitude: Longitude da Modelagem.<br>
descricaoModelagem: Descrição da Modelagem.<br>
modeloURL: URL do arquivo 3D (.glb ou .gltf).<br>
tipoModelo: Tipo de modelo (padrão: "gltf").<br>

### - DELETE /modelagem/:id
Esse endpoint é responsável por deletar uma modelagem específica pelo seu ID.

### - PUT /modelagem/:id
Esse endpoint é responsável por atualizar as informações de uma modelagem específica pelo seu ID.

### - GET /modelagem/:id
Esse endpoint é responsável por retornar as informações de uma modelagem específica pelo seu ID.

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
  "descricaoDesafio": "Descrição do desafio"
}
```

### - POST /desafio
Esse endpoint é responsável por cadastrar um novo desafio no banco de dados.

#### Parâmetros:
pergunta: Pergunta do desafio.<br>
descricaoDesafio: Descrição do desafio.<br>

Exemplo de requisição:
```
{
  "pergunta": "Os galpões de armazenamento do KKKK possuíam trilhos que interligavam suas dependências. Quais eram os produtos transportados nesses trilhos?",
  "descricaoDesafio": "Desafio sobre o transporte de produtos nos galpões."
}
```

### - DELETE /desafio/:id
Esse endpoint é responsável por deletar um desafio específico pelo seu ID.

### - PUT /desafio/:id
Esse endpoint é responsável por atualizar as informações de um desafio específico pelo seu ID.

### - GET /desafio/:id
Esse endpoint é responsável por retornar as informações de um desafio específico pelo seu ID.

## Endpoints de Histórias
### GET /historias
Esse endpoint é responsável por retornar a listagem de todas as histórias cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todas as histórias.

### - POST /historia
Esse endpoint é responsável por cadastrar uma nova história no banco de dados.

#### Parâmetros:
titulo: Título da história.<br>
descricao: Descrição da história.<br>
idQuest: ID da quest associada (opcional).<br>

### - DELETE /historia/:id
Esse endpoint é responsável por deletar uma história específica pelo seu ID.

### - PUT /historia/:id
Esse endpoint é responsável por atualizar as informações de uma história específica pelo seu ID.

### - GET /historia/:id
Esse endpoint é responsável por retornar as informações de uma história específica pelo seu ID.

## Endpoints de Capítulos
### GET /capitulos
Esse endpoint é responsável por retornar a listagem de todos os capítulos cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os capítulos.

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

### - DELETE /capitulo/:id
Esse endpoint é responsável por deletar um capítulo específico pelo seu ID.

### - PUT /capitulo/:id
Esse endpoint é responsável por atualizar as informações de um capítulo específico pelo seu ID.

### - GET /capitulo/:id
Esse endpoint é responsável por retornar as informações de um capítulo específico pelo seu ID.

## Endpoints de Personagens
### GET /personagens
Esse endpoint é responsável por retornar a listagem de todos os personagens cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os personagens.

### - POST /personagem
Esse endpoint é responsável por cadastrar um novo personagem no banco de dados.

#### Parâmetros:
nome: Nome do personagem.<br>
descricao: Descrição do personagem.<br>
poses: Array de poses disponíveis para o personagem.<br>

### - DELETE /personagem/:id
Esse endpoint é responsável por deletar um personagem específico pelo seu ID.

### - PUT /personagem/:id
Esse endpoint é responsável por atualizar as informações de um personagem específico pelo seu ID.

### - GET /personagem/:id
Esse endpoint é responsável por retornar as informações de um personagem específico pelo seu ID.

## Endpoints de Pontuações
### GET /pontuacoes
Esse endpoint é responsável por retornar a listagem de todas as pontuações cadastradas no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todas as pontuações.

### - POST /pontuacao
Esse endpoint é responsável por registrar uma nova pontuação no banco de dados.

#### Parâmetros:
idUsuario: ID do usuário.<br>
idDesafio: ID do desafio (opcional).<br>
pontos: Quantidade de pontos.<br>

### - DELETE /pontuacao/:id
Esse endpoint é responsável por deletar uma pontuação específica pelo seu ID.

### - PUT /pontuacao/:id
Esse endpoint é responsável por atualizar uma pontuação específica pelo seu ID.

### - GET /pontuacao/:id
Esse endpoint é responsável por retornar as informações de uma pontuação específica pelo seu ID.

## Endpoints de Rankings
### GET /rankings
Esse endpoint é responsável por retornar a listagem de todos os rankings cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os rankings.

### - POST /ranking
Esse endpoint é responsável por cadastrar um novo ranking no banco de dados.

#### Parâmetros:
titulo: Título do ranking.<br>
descricao: Descrição do ranking.<br>

### - DELETE /ranking/:id
Esse endpoint é responsável por deletar um ranking específico pelo seu ID.

### - PUT /ranking/:id
Esse endpoint é responsável por atualizar as informações de um ranking específico pelo seu ID.

### - GET /ranking/:id
Esse endpoint é responsável por retornar as informações de um ranking específico pelo seu ID.

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

### - POST /usuario
Esse endpoint é responsável por cadastrar um novo usuário no banco de dados.

#### Parâmetros:
nome: Nome do Usuário.<br>
nomeUsuario: Apelido/Nick do Usuário.<br>
emailUsuario: E-mail do Usuário.<br>
senhaUsuario: Senha do Usuário.<br>
permissao: Tipo de Permissão (ex: "Administrador").<br>

### - DELETE /usuario/:id
Esse endpoint é responsável por deletar um usuário específico pelo seu ID.

### - PUT /usuario/:id
Esse endpoint é responsável por atualizar as informações de um usuário específico pelo seu ID.

### - GET /usuario/:id
Esse endpoint é responsável por retornar as informações de um usuário específico pelo seu ID.

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
