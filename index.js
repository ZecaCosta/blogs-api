const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(routes.usersRoute);
app.use(routes.categoriesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});