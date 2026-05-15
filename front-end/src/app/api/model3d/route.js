import fs from 'fs';
import path from 'path';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let modelPath = searchParams.get('path');
    let uploadedFile = searchParams.get('uploaded');
    const isFile = searchParams.get('file') === 'true';

    // Determinar qual diretório usar
    let baseDir = 'public/uploads/modelagens/extracted';
    
    if (uploadedFile === 'true') {
      baseDir = 'public/uploads/modelagens/models_3d';
      modelPath = searchParams.get('name');
    }

    if (!modelPath) {
      return new Response(JSON.stringify({ error: 'Caminho do modelo é obrigatório' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sanitizar caminho para evitar directory traversal
    const sanitizedPath = modelPath.replace(/\.\./g, '').replace(/\\/g, '/');
    const fullPath = path.join(process.cwd(), baseDir, sanitizedPath);

    // Verificar se o arquivo existe
    if (!fs.existsSync(fullPath)) {
      return new Response(JSON.stringify({ error: 'Arquivo não encontrado: ' + fullPath }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Se for uma requisição de arquivo específico
    if (isFile) {
      const fileContent = fs.readFileSync(fullPath);
      
      // Determinar tipo de conteúdo baseado na extensão
      const ext = path.extname(fullPath).toLowerCase();
      let contentType = 'application/octet-stream';
      
      if (ext === '.gltf') {
        contentType = 'model/gltf+json';
      } else if (ext === '.glb') {
        contentType = 'model/gltf-binary';
      } else if (ext === '.bin') {
        contentType = 'application/octet-stream';
      } else if (ext === '.jpg' || ext === '.jpeg') {
        contentType = 'image/jpeg';
      } else if (ext === '.png') {
        contentType = 'image/png';
      }

      return new Response(fileContent, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Se for JSON do glTF, processar URLs relativas
    const ext = path.extname(fullPath).toLowerCase();
    if (ext === '.gltf') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let gltfJson = JSON.parse(content);

      // Determinar prefix da URL
      const urlPrefix = uploadedFile === 'true' ? 'uploaded=true&' : '';
      const dirPath = path.dirname(sanitizedPath).replace(/\\/g, '/');

      // Substituir URLs relativas por URLs da API
      if (gltfJson.buffers && Array.isArray(gltfJson.buffers)) {
        gltfJson.buffers = gltfJson.buffers.map((buffer) => {
          if (buffer.uri && !buffer.uri.startsWith('data:')) {
            const newUri = `/api/model3d?${urlPrefix}${uploadedFile === 'true' ? 'name' : 'path'}=${dirPath}/${buffer.uri}&file=true`;
            return { ...buffer, uri: newUri };
          }
          return buffer;
        });
      }

      if (gltfJson.images && Array.isArray(gltfJson.images)) {
        gltfJson.images = gltfJson.images.map((image) => {
          if (image.uri && !image.uri.startsWith('data:')) {
            const newUri = `/api/model3d?${urlPrefix}${uploadedFile === 'true' ? 'name' : 'path'}=${dirPath}/${image.uri}&file=true`;
            return { ...image, uri: newUri };
          }
          return image;
        });
      }

      return new Response(JSON.stringify(gltfJson), {
        status: 200,
        headers: {
          'Content-Type': 'model/gltf+json',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const fileContent = fs.readFileSync(fullPath);
    const contentType = 'application/octet-stream';

    return new Response(fileContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Erro ao servir modelo 3D:', error);
    return new Response(JSON.stringify({ error: 'Erro ao servir arquivo: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

