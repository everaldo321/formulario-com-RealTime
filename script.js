function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); 
}
let numb = 0
const lerDados = async () => {
  try {
    // Faz a requisição ao Firebase
    const resultado = await fetch(
      "https://idw2024-cb8b9-default-rtdb.firebaseio.com/login.json",
      {
        method: "GET",
      }
    );

    // Converte a resposta para JSON
    const dados = await resultado.json();

    // Obtém os dados de entrada (nome, email, senha)
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Valida se todos os campos obrigatórios foram preenchidos
    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
  }
    // Valida o formato do e-mail
    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
  }
    // Itera sobre os dados retornados
    for (let id in dados) {
      const login = dados[id];

      // Verifica se os dados de login correspondem aos fornecidos
      if (nome === login.nome && email === login.email && senha === login.senha) {
        window.location.href = "index.html"; 
        return; 
      }
      else{
        numb += 1
      }
    }

    // Se não encontrar um match, alerta o usuário
    
    window.alert("Acesso Negado");
    if( numb === 3){
      window.open("https://www.kaspersky.com.br/resource-center/threats/data-theft","_blank")
    }

  } catch (error) {
    console.error("Erro ao ler os dados:", error);
    window.alert("Ocorreu um erro ao tentar acessar os dados.");
  }
};

// Obtém o botão de login pelo ID e adiciona o evento de clique
document.getElementById("enviarBtn").addEventListener("click", lerDados);

