
const url = 'https://raw.githubusercontent.com/f4nyellf/api/refs/heads/main/preferencias.json';

const ctx = document.getElementById('grafico').getContext('2d');


let rotulosX = ["Era uma Vez um Coração Partido", "Maze Runner", "A Balada dos Felizes para Nunca", "O Principe Cruel", "A Rainha do Nada", "Coraline", "Saboroso Cadáver"];
let valores = [0, 0, 0, 0, 0, 0, 0];

// Criação do gráfico usando Chart.js
let grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: rotulosX,
        datasets: [{
            label: '#Livros',
            data: valores,
            backgroundColor: [ // Cores para cada barra
                         
'#AFDDF0', 
'#BDD1F0',
'#B1F0EE',
'#A9F5F2',
'#B1F0D8',
'#A5F0BB',
'#96F0AC'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' // Posiciona a legenda no lado direito
            },
            tooltip: {
                enabled: true // Habilita a exibição de tooltips
            },
            datalabels: {
                anchor: 'end', // Posiciona o valor no topo da barra
                align: 'top',
                color: '#fff', // Define a cor do valor exibido
                font: {
                    weight: 'bold' // Define a fonte como negrito
                },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percent = ((value / total) * 100).toFixed(2); // Calcula a porcentagem
                    return `${value}\n(${percent}%)`; // Exibe o valor e a porcentagem em linhas separadas
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true, // Exibe o título do eixo X
                    text: 'Livros', // Texto do título do eixo X
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    color:'#fff',
                }
            },
            y: {
                beginAtZero: true, // Começa o eixo Y no zero
                max: 18,
                title: {
                    display: true, // Exibe o título do eixo Y
                    text: 'Quantidade de Votos', // Texto do título do eixo Y
                    color: '#FFE31A', // Cor do título
                    font: {
                        size: 14, // Tamanho da fonte
                        weight: 'bold'
                    }
                },
                ticks: {
                    stepSize: 1 // Incremento de 1 no eixo Y
                }
            }
        }
    },
    plugins: [ChartDataLabels] // Plugin para exibir valores acima das colunas
});

// Função para buscar dados e atualizar o gráfico
function atualizarGrafico() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            valores[0] = resp.Era_uma_Vez_uma_Coração_Partido;
            valores[1] = resp.Maze_Runner_Correr_ou_Morrer;
            valores[2] = resp.A_Balada_dos_Felizes_para_Nunca;
            valores[3] = resp.O_Principe_Cruel; 
            valores[4] = resp.A_Rainha_do_Nada;
            valores[5] = resp.Coraline;
            valores[6] = resp.Saboroso_Cadáver;

            // Atualiza o gráfico com os novos valores
            grafico.update();
            exibirFraseInformativa(valores);
        })
        .catch(erro => {
            alert("ERRO: " + erro); // Exibe um alerta em caso de erro
        });
}

// Chama a função de atualização a cada 5 segundos
setInterval(atualizarGrafico, 3000);

// Função para exibir frase informativa
function exibirFraseInformativa(url) {
    const informacaoDiv = document.getElementById('informacao');
    informacaoDiv.innerHTML = `
 <p><strong>${valores[0]}</strong>: Este livro é uma narrativa sensível que mergulha nas complexidades do amor e da dor.</p> <p> Com personagens bem desenvolvidos e situações emocionais intensas, ele explora o processo de cura após uma desilusão amorosa, ressoando com qualquer um que já teve o coração partido.</p>


<p><strong>${valores[1]}</strong>: Neste emocionante livro, um grupo de adolescentes acorda em um labirinto sem lembranças de suas vidas anteriores.</p> <p>À medida que tentam desvendar os mistérios do labirinto e encontrar uma saída, enfrentam perigos inimagináveis.</p> <p> A história é repleta de ação, suspense e reviravoltas que garantem a atenção do leitor até a última página.</p>


<p><strong>${valores[2]}</strong>: Esta obra nos apresenta uma visão única sobre a busca pela felicidade em um mundo que parece estar sempre em busca de padrões.</p> <p> Através de uma narrativa cativante, o autor mistura humor e crítica social para questionar o que realmente significa ser feliz e o custo dessa felicidade.</p>


<p><strong>${valores[3]}</strong>: Este é um romance de fantasia que nos transporta para um mundo de intrigas políticas e reinos encantados.</p> <p> A protagonista, Jude, se vê no meio de um jogo perigoso de poder e traição, onde precisa lutar por seu lugar em um mundo que a despreza.</p> <p> Com uma trama envolvente e personagens complexos, o livro oferece uma nova perspectiva sobre amor e vingança.</p>


<p><strong>${valores[4]}</strong>: Continuação da série, este livro aprofunda a história de Jude enquanto ela navega pelos desafios de liderar e lidar com rivalidades familiares.</p> <p> A trama é rica em emoção e repleta de dilemas morais, envolvendo o leitor em um universo onde nada é o que parece e alianças podem mudar a qualquer momento.</p>


<p><strong>${valores[5]}</strong>: Uma história de suspense e fantasia, "Coraline" é sobre uma menina que descobre um mundo paralelo onde coisas estranhas e inquietantes acontecem.</p> <p> A narrativa é sombria e cheia de simbolismo, explorando temas de coragem e a importância da família.</p> <p> É um conto que combina diversão e terror, perfeito para leitores mais jovens e adultos.</p>


<p><strong>${valores[6]}</strong>: Este é um livro singular que mistura horror e humor de forma envolvente.</p> <p> Através de sua narrativa instigante, o autor provoca reflexões sobre a vida, a morte e a sociedade ao mesmo tempo em que entretém com uma história excêntrica e surpreendente.</p>
   `;


}