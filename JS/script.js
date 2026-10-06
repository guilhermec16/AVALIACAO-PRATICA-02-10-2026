const formulario = document.getElementById("formulario-contato");

if (formulario) {
    const campoServico = document.getElementById("servico");
    const mensagemFormulario = document.getElementById("mensagem-formulario");
    const parametros = new URLSearchParams(window.location.search);
    const servicoEscolhido = parametros.get("servico");
    if (servicoEscolhido) {
        for (let opcao of campoServico.options) {
            if (opcao.value === servicoEscolhido) {
                campoServico.value = servicoEscolhido;
            }
        }
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const camposObrigatorios = formulario.querySelectorAll("[required]");
        let formularioValido = true;
        camposObrigatorios.forEach(function (campo) {
            if (campo.value.trim() === "") {
                campo.style.borderColor = "#A52626";
                formularioValido = false;
            } else {
                campo.style.borderColor = "#B8C5C7";
            }
        });

        if (!formularioValido) {
            mensagemFormulario.textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

        if (!campoValidoEmail()) {
            mensagemFormulario.textContent = "Digite um e-mail válido.";
            return;
        }

        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            animal: document.getElementById("animal").value,
            tipoAnimal: document.getElementById("tipo-animal").value,
            servico: document.getElementById("servico").value,
            mensagem: document.getElementById("mensagem").value
        };
        sessionStorage.setItem("solicitacaoCuidadoPet", JSON.stringify(dados));
        window.location.href = "confirmacao.html";
    });

    function campoValidoEmail() {
        const email = document.getElementById("email").value;
        return email.includes("@") && email.includes(".");
    }
}

const dadosSalvos = sessionStorage.getItem("solicitacaoCuidadoPet");
const dadosConfirmacao = document.getElementById("dados-solicitacao");

if (dadosSalvos && dadosConfirmacao) {
    const dados = JSON.parse(dadosSalvos);
    dadosConfirmacao.textContent = "Olá, " + dados.nome + "! Sua solicitação para " + dados.servico + " foi registrada para o atendimento do animal " + dados.animal + ".";
}