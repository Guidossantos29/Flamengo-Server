const express = require("express");
const app = express() 
const bodyParser = require("body-parser")
const uuid = require("uuid");

const port = 3000

const jogadores = []

app.use(bodyParser.json());


app.get('/',(req,res) => {
    res.json(jogadores)
})

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`);
});

app.post('/', (req,res) => {

  const newId = uuid.v4()
  const novoJogador = req.body
  novoJogador.id = newId
  jogadores.push(novoJogador)
  
    
  if (!novoJogador) {
    jogadores.push({
      id:newId ,  
      nome: '',
      idade: '',
      time: '',
      posicao: ''
    });
  } 
  
  

  res.json({ jogadores });

  
    
  
})

app.delete('/:id', (req,res) => {
  const jogadorId = req.params.id

  const jogadorIndex = jogadores.findIndex((jogador) => jogador.id === jogadorId)
  const jogadorRemovido = jogadorIndex !== -1 ? jogadores.splice(jogadorIndex,1)[0]: null
  const resposta = jogadorIndex
  ? { mensagem: 'Jogador removido com sucesso', jogadores }
  : { erro: 'Jogador não encontrado' };

res.json(resposta);
})

app.patch('/:id' ,(req,res) => {
  const jogadorId = req.params.id;
  const atualizacoes = req.body;

  const jogadorIndex = jogadores.findIndex((jogador) => jogador.id === jogadorId)

  const resposta = jogadorIndex !== -1
    ? (
      Object.assign(jogadores[jogadorIndex], atualizacoes),
      { mensagem: 'Jogador atualizado com sucesso', jogador: jogadores[jogadorIndex] }
    )
    : { erro: 'Jogador não encontrado' };

  res.json(resposta);
});

