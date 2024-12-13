const form = document.querySelector("#formulario");
const btnSubmit1 = document.getElementById("Enviar");


function mascaraData() {
  const nascimento = document.querySelector("#data");
  nascimento.value = nascimento.value.replace(/\D/g, ""); // permite inserir somente números
  nascimento.value = nascimento.value.replace(
    /(\d{2})(\d{2})(\d{4})/,
    "$1/$2/$3"
  );
}


// Firebase
btnSubmit1.addEventListener('click', async (event) => {
  event.preventDefault();

  // Obtendo os valores dos campos de entrada do formulário
  const nome = form.nome.value;
  const data = form.data.value;
  const obs = form.obs.value;

  // Validação: Verificar se os campos obrigatórios estão preenchidos
  if (!nome || !data ) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }

  // Criando o objeto do usuário
  const usuario = {
    nome: nome,
    data: data,
    obs: obs,
  };

  // Enviando os dados para o Firebase
  const resultado = await fetch(
    "https://idw2024-cb8b9-default-rtdb.firebaseio.com/usuarios.json",
    {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Se a resposta do fetch for positiva, resetamos o formulário e lemos os dados
  if (resultado.ok) {
    formulario.reset();  
    lerDados();        
  } else {
    alert('Erro ao enviar os dados.');
  }
});

const corpoTabela = document.querySelector("#corpoTabela");
const lerDados = async () => {
  const resultado = await fetch(
    "https://idw2024-cb8b9-default-rtdb.firebaseio.com/usuarios.json",
    {
      method: "GET",
    }
  );
  if (resultado.ok) {
    corpoTabela.innerHTML = ""; // limpa o corpo da tabela

    // converter os dados de json para objeto js
    const dados = await resultado.json();
    for (let id in dados) {
      const tr = document.createElement("tr");
      const usuario = dados[id];
      tr.innerHTML = `<td class ="sem">${id}</td><td>${usuario.nome}</td><td>${usuario.data}</td><td>${usuario.obs}</td>`;
      tr.innerHTML += `<td class = "sem"><button onclick="editar('${id}')">Editar</button>
      <button onclick="remover('${id}')">Excluir</button></td>`;
      corpoTabela.appendChild(tr);
    }
  }
};
lerDados();

const editar = async (id) => {
  const usuario = {};
  usuario.nome = prompt("Novo nome");
  usuario.data = prompt("Nova Data");
  usuario.obs = prompt("Observações");
  const resultado = await fetch(`https://idw2024-cb8b9-default-rtdb.firebaseio.com/usuarios/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
    headers: {
        "Content-Type": "application/json",
    }
  });
  if(resultado.ok){
    lerDados();
  }
};

const remover = async (id) => {
  const resultado = await fetch(`https://idw2024-cb8b9-default-rtdb.firebaseio.com/usuarios/${id}.json`, {
    method: "DELETE",
  });
  if(resultado.ok){
    lerDados();
  }
}






  
