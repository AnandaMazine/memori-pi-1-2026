// Dados mockados para demonstração de modelagens 3D
// Estes dados apontam para os modelos já existentes em public/uploads/modelagens/extracted

export const mockedModelagens = [
  {
    id: "mock-1",
    nomeModelagem: "Suburban House - Modelo 3D",
    latitude: -23.5505,
    longitude: -46.6333,
    descricaoModelagem: "Casa suburbana completa com textures aplicadas. Um modelo 3D realista de uma residência com múltiplos materiais.",
    imagemModelagem: "/images/house-placeholder.png",
    modeloURL: "/api/model3d?path=teste-1761260476658/teste/scene.gltf",
    tipoModelo: "gltf",
  },
  {
    id: "mock-2",
    nomeModelagem: "Modelo de Teste - Estrutura 3D",
    latitude: -23.5510,
    longitude: -46.6340,
    descricaoModelagem: "Modelo estrutural de teste com geometria básica. Ideal para validação de renderização e interação.",
    imagemModelagem: "/images/model-placeholder.png",
    modeloURL: "/api/model3d?path=teste-1761260968284/teste/scene.gltf",
    tipoModelo: "gltf",
  },
  {
    id: "mock-3",
    nomeModelagem: "Asset 3D - Cenário Urbano",
    latitude: -23.5500,
    longitude: -46.6320,
    descricaoModelagem: "Ambiente urbano em 3D com texturas de alta resolução. Demonstra capacidades de renderização complexa.",
    imagemModelagem: "/images/urban-placeholder.png",
    modeloURL: "/api/model3d?path=teste-1761261363818/teste/scene.gltf",
    tipoModelo: "gltf",
  },
  {
    id: "mock-4",
    nomeModelagem: "Prototipo Industrial",
    latitude: -23.5515,
    longitude: -46.6345,
    descricaoModelagem: "Modelo 3D de equipamento industrial com múltiplos componentes. Textures realistas aplicadas.",
    imagemModelagem: "/images/industrial-placeholder.png",
    modeloURL: "/api/model3d?path=teste-1761261611215/teste/scene.gltf",
    tipoModelo: "gltf",
  },
];

// Função para obter dados mockados
export const getMockedModelagens = () => {
  return mockedModelagens;
};

// Função para obter um modelo mockado por ID
export const getMockedModelagemById = (id) => {
  return mockedModelagens.find((m) => m.id === id);
};
