const corpoTabela = document.querySelector("#esque");
const lerDados = async () => {
  const resultado = await fetch(
    "https://idw2024-cb8b9-default-rtdb.firebaseio.com/login.json",
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
      const login = dados[id];
      tr.innerHTML += `<td class = "sem"><button onclick="editar('${id}')">Redefinir Senha</button></td>`;
      corpoTabela.appendChild(tr);
    }
  }
};
lerDados();

const editar = async (id) => {
  // Solicita a nova senha
  const novaSenha = prompt("Nova Senha");

  // Verifica se a senha foi fornecida
  if (novaSenha) {
    // Cria um objeto com a nova senha
    const login = { senha: novaSenha };

    // Envia a atualização usando o método PATCH
    const resultado = await fetch(`https://idw2024-cb8b9-default-rtdb.firebaseio.com/login/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Se a atualização for bem-sucedida, recarrega os dados
    if (resultado.ok) {
      alert("Senha atualizada com sucesso!");
      lerDados();
      window.location.href = "formulario.html"; 

    } else {
      alert("Erro ao atualizar a senha!");
    }
  } else {
    alert("Senha não fornecida!");
  }
};