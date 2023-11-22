function verificarRodizio() {
    const placa = document.getElementById("placaInput").value;
    const diaSemana = parseInt(document.getElementById("diaSemana").value);
    const tipoVeiculo = document.getElementById("tipoVeiculo").value;
    const via = document.getElementById("via").value;
    let mensagem = "";

    // Verificar se o dia é domingo ou sábado
    if (diaSemana === 0 || diaSemana === 6) {
        mensagem = "Aos domingos e sábados não há rodízio. Você pode circular normalmente. ";
    } else {
        // Verificar o dia de rodízio conforme o número final da placa e o dia da semana
        const restricoes = [
            [1, 2], // Segunda-feira
            [4, 5], // Terça-feira
            [5, 6], // Quarta-feira
            [7, 8], // Quinta-feira
            [9, 0]  // Sexta-feira
        ];

        if (restricoes[diaSemana - 1].includes(parseInt(placa[placa.length - 1]))) {
            mensagem = `Hoje é dia de rodízio para veículos com placa final ${placa[placa.length - 1]}. `;
        } else {
            mensagem = `Hoje não é dia de rodízio para veículos com placa final ${placa[placa.length - 1]}. `;
        }

        // Verificar o horário disponível para circulação
        const horaAtual = new Date().getHours();
        if (horaAtual >= 10 && horaAtual < 17) {
            mensagem += `O horário atual (${horaAtual}h) está disponível para circulação. `;
        } else {
            mensagem += `O horário atual (${horaAtual}h) não está disponível para circulação. `;
        }

        // Verificar se a via desejada está liberada
        if (tipoVeiculo === "carro") {
            if (via === "vermelhas") {
                mensagem += `Neste horário, a circulação de carros nas vias ${via} está proibida. `;
            } else if (via === "limitrofes") {
                mensagem += `Neste horário, a circulação de carros nas vias ${via} está liberada. `;
            }
        } else if (tipoVeiculo === "caminhao") {
            mensagem += "Seu caminhão pode circular normalmente em qualquer horário. ";
        }
    }

    const resultado = document.getElementById("resultado");
    resultado.textContent = mensagem;
}