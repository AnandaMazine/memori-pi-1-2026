console.log("Tentando conectar ao MongoDB...");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(port, () => {
      console.log(`Rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("ERRO:", error.message);
  });