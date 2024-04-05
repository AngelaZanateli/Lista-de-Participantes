let participantes =[
  {
    nome: "Angela Rodrigues Zanateli",
    email: "angelazanateli@hotmail.com",
    dataInscricao: new Date(2024, 1, 22, 15, 30),
    dataCheckIn: new Date(2024, 1, 26, 12, 40)
  },
  {
    nome: "Gabriela Zanateli",
    email: "gabrielazanateli@hotmail.vom",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 10, 30),
    dataCheckIn: new Date(2024, 0, 20, 16, 45)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@hotmail.com",
    dataInscricao: new Date(2024, 2, 28, 14, 10),
    dataCheckIn: new Date(2024, 3, 3, 9, 30)
  },
  {
    nome: "Laura Santos",
    email: "laura.santos@hotmail.com",
    dataInscricao: new Date(2024, 1, 5, 17, 45),
    dataCheckIn: new Date(2024, 1, 10, 11, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro.almeida@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 8, 0),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana.costa@hotmail.com",
    dataInscricao: new Date(2024, 2, 20, 13, 20),
    dataCheckIn: null
  },
  {
    nome: "Rodrigo Ferreira",
    email: "rodrigo.ferreira@gmail.com",
    dataInscricao: new Date(2024, 0, 1, 9, 40),
    dataCheckIn: new Date(2024, 0, 6, 18, 20)
  },
  {
    nome: "Juliana Oliveira",
    email: "juliana.oliveira@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 11, 15),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Martins",
    email: "rafaela.martins@gmail.com",
    dataInscricao: new Date(2024, 0, 25, 20, 0),
    dataCheckIn: new Date(2024, 0, 31, 9, 45)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email='${participante.email}'    
    onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `    
  <tr>
    <td>
      <strong>
       ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
      </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>`

}

const atualizarlista = (participantes) => {
  let output = ""
  // estrutura de repetição
for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

  // Subistituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p)=> p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value =""
  event.target.querySelector('[name="email"]').value =""
}

const fazerCheckIn = (event) => {
  // confirmar se reaumente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que desaja fazer o check-in?'
   if(confirm(mensagemConfirmacao) == false) {
    return
   }
     
  // encontrar o participante dentro da lista
   const participante = participantes.find((p) => p.email == event.target.dataset.email
   )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarlista(participantes)
}
