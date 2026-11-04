import { Track } from '../../types';

export const LOGIC_TRACK: Track = {
  id: 'logic',
  name: 'Lógica & Algoritmos',
  icon: '🧠',
  color: 'emerald',
  accentColor: '#10b981',
  tagline: 'O alicerce fundamental para pensar como um programador sênior em qualquer linguagem.',
  units: [
    {
      id: 'logic-u1',
      title: 'Unidade 1: Fundamentos & Tomada de Decisão',
      description: 'Entenda como o computador armazena dados na memória e toma decisões lógicas.',
      trackId: 'logic',
      color: '#10b981',
      badgeReward: {
        title: 'Mestre da Lógica I',
        icon: '🛡️',
      },
      lessons: [
        {
          id: 'logic-l1',
          unitId: 'logic-u1',
          trackId: 'logic',
          title: 'Variáveis e Gavetas de Memória',
          description: 'Como computadores guardam números, textos e estados booleanos.',
          xpReward: 15,
          gemReward: 10,
          icon: '📦',
          exercises: [
            {
              id: 'logic-l1-ex1',
              type: 'theory',
              title: 'O que é uma Variável?',
              instruction: 'Leia com atenção a teoria antes de praticar:',
              language: 'logic',
              theoryContent: {
                summary: 'Uma variável é como uma gaveta etiquetada na memória RAM do computador. Você coloca um valor lá dentro e pode recuperá-lo ou alterá-lo a qualquer momento.',
                keyPoints: [
                  'Nome (Identificador): O rótulo da gaveta (ex: pontuacao, nomeUsuario)',
                  'Tipo: O formato do dado (Texto/String, Inteiro, Decimal/Float, Booleano)',
                  'Valor: O conteúdo real armazenado',
                ],
                codeSnippet: `let vidas = 3;
let nome = "Dev";
let jogoAtivo = true;`,
                proTip: 'Bons programadores usam nomes descritivos em vez de letras soltas como x ou y.',
              },
              explanation: 'Variáveis guardam dados que seu algoritmo usará para executar tarefas.',
              hint: 'Lembre-se da analogia das caixas etiquetadas.',
            },
            {
              id: 'logic-l1-ex2',
              type: 'blocks',
              title: 'Monte a Declaração de Variável',
              instruction: 'Ordene os blocos para declarar a variável "xp" com o valor inicial 100:',
              language: 'logic',
              tokenBlocks: ['xp', 'let', '=', '100;'],
              orderedSolution: ['let', 'xp', '=', '100;'],
              explanation: 'A palavra-chave "let" vem primeiro, seguida pelo nome da variável, o operador de atribuição "=" e o valor finalizado com ponto e vírgula.',
              hint: 'Comece com a palavra-chave de declaração.',
            },
            {
              id: 'logic-l1-ex3',
              type: 'predict_output',
              title: 'O que será impresso?',
              instruction: 'Analise o código abaixo e responda qual será a saída do console:',
              language: 'logic',
              codeSnippet: `let vidas = 5;
vidas = vidas - 1;
vidas = vidas + 2;
console.log(vidas);`,
              options: ['5', '6', '4', '7'],
              correctAnswer: '6',
              explanation: 'Iniciamos com 5. Depois 5 - 1 = 4. Por fim, 4 + 2 = 6!',
              hint: 'Execute as operações de cima para baixo linha a linha.',
            },
            {
              id: 'logic-l1-ex4',
              type: 'code_editor',
              title: 'Prática: Calcule o Total de Moedas',
              instruction: 'Crie uma variável chamada "total" que some as moedas coletadas nas duas fases (fase1 = 25 e fase2 = 40) e use console.log(total).',
              language: 'logic',
              starterCode: `const fase1 = 25;
const fase2 = 40;

// Escreva seu código aqui abaixo:
const total = fase1 + fase2;
console.log(total);`,
              solutionCode: `const fase1 = 25;
const fase2 = 40;
const total = fase1 + fase2;
console.log(total);`,
              testCases: [
                {
                  inputDescription: 'Soma de 25 + 40',
                  expectedOutput: '65',
                },
              ],
              explanation: 'Somamos fase1 e fase2 e exibimos o resultado 65 via console.log.',
              hint: 'Declare const total = fase1 + fase2; e depois console.log(total);',
            },
          ],
        },
        {
          id: 'logic-l2',
          unitId: 'logic-u1',
          trackId: 'logic',
          title: 'Condicionais: Se Isto, Então Aquilo',
          description: 'Aprenda operadores relacionais e como criar caminhos condicionais no código.',
          xpReward: 20,
          gemReward: 10,
          icon: '🔀',
          exercises: [
            {
              id: 'logic-l2-ex1',
              type: 'theory',
              title: 'Tomada de Decisão (if / else)',
              instruction: 'Compreenda o fluxo condicional:',
              language: 'logic',
              theoryContent: {
                summary: 'Computadores só sabem executar caminhos diferentes quando testam uma condição verdadeira (true) ou falsa (false).',
                keyPoints: [
                  'if (condição): Executa o bloco se o teste for VERDADEIRO',
                  'else: Caminho alternativo caso a condição seja FALSA',
                  'Operadores: > (maior), < (menor), >=, <=, === (igualdade)',
                ],
                codeSnippet: `if (nivel >= 10) {
  console.log("Acesso Liberado à Masmorra!");
} else {
  console.log("Suba de nível primeiro.");
}`,
                proTip: 'Toda condição dentro de um if é avaliada como um booleano simples: true ou false.',
              },
              explanation: 'Condicionais bifurcam o fluxo do programa com base em regras lógicas.',
              hint: 'Pense como um semáforo: se verde, prossiga; senão, pare.',
            },
            {
              id: 'logic-l2-ex2',
              type: 'spot_bug',
              title: 'Encontre o Bug na Condicional!',
              instruction: 'Toque na linha que contém o erro de sintaxe ou lógica:',
              language: 'logic',
              codeLines: [
                'let pontos = 85;',
                'if pontos >= 50 {',
                '  console.log("Aprovado!");',
                '}',
              ],
              bugLineIndex: 1,
              explanation: 'Na maioria das linguagens C-like (e em JS), a condição do "if" deve estar cercada por parênteses: if (pontos >= 50) {',
              hint: 'Olhe atentamente para a linha do comando if.',
            },
            {
              id: 'logic-l2-ex3',
              type: 'predict_output',
              title: 'Qual caminho será executado?',
              instruction: 'Analise o fluxo condicional:',
              language: 'logic',
              codeSnippet: `let saldo = 20;
let preco = 30;
if (saldo >= preco) {
  console.log("Compra Efetuada");
} else {
  console.log("Saldo Insuficiente");
}`,
              options: ['Compra Efetuada', 'Saldo Insuficiente', 'Erro', '20'],
              correctAnswer: 'Saldo Insuficiente',
              explanation: '20 >= 30 é falso (false), portanto o fluxo pula diretamente para o bloco do else.',
              hint: 'Compare 20 com 30.',
            },
          ],
        },
      ],
    },
    {
      id: 'logic-u2',
      title: 'Unidade 2: Laços de Repetição & Iterações',
      description: 'Automatize tarefas repetitivas com loops while, for e acumuladores.',
      trackId: 'logic',
      color: '#059669',
      badgeReward: {
        title: 'Mestre dos Loops',
        icon: '🔁',
      },
      lessons: [
        {
          id: 'logic-l3',
          unitId: 'logic-u2',
          trackId: 'logic',
          title: 'O Poder do Loop While & Parada',
          description: 'Repita blocos enquanto uma condição lógica for verdadeira.',
          xpReward: 20,
          gemReward: 10,
          icon: '🔄',
          exercises: [
            {
              id: 'logic-l3-ex1',
              type: 'theory',
              title: 'Loops com while',
              instruction: 'Entenda como funciona o loop condicional:',
              language: 'logic',
              theoryContent: {
                summary: 'O comando while repete um bloco de código enquanto sua condição for verdadeira. Se a condição nunca se tornar falsa, você terá um loop infinito!',
                keyPoints: [
                  'while (condicao) { ... }',
                  'Variável de controle: Deve ser atualizada dentro do laço',
                  'Critério de parada: Garante que o programa não trave',
                ],
                codeSnippet: `let bateria = 3;
while (bateria > 0) {
  console.log("Robô ativo...");
  bateria--;
}`,
                proTip: 'Sempre garanta que a variável testada no while mude dentro do laço para evitar congelamento!',
              },
              explanation: 'Loops while são ideais quando não sabemos previamente quantas iterações serão necessárias.',
              hint: 'O laço testa a condição antes de cada repetição.',
            },
            {
              id: 'logic-l3-ex2',
              type: 'predict_output',
              title: 'Quantas vezes o loop imprimirá?',
              instruction: 'Acompanhe a variável de controle:',
              language: 'logic',
              codeSnippet: `let i = 1;
while (i <= 3) {
  console.log(i);
  i++;
}`,
              options: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2', '3'],
              correctAnswer: '1, 2, 3',
              explanation: 'O laço imprime 1 (i vira 2), 2 (i vira 3) e 3 (i vira 4). Com i = 4, a condição i <= 3 falha e o loop termina.',
              hint: 'Observe o valor inicial 1 e o operador <= 3.',
            },
            {
              id: 'logic-l3-ex3',
              type: 'code_editor',
              title: 'Prática: Contagem Regressiva',
              instruction: 'Crie uma função "contarAteZero(inicio)" que use while para retornar uma lista decrescente de números até 0.',
              language: 'logic',
              starterCode: `function contarAteZero(inicio) {
  const lista = [];
  let n = inicio;
  while (n >= 0) {
    lista.push(n);
    n--;
  }
  return lista;
}`,
              solutionCode: `function contarAteZero(inicio) {
  const lista = [];
  let n = inicio;
  while (n >= 0) {
    lista.push(n);
    n--;
  }
  return lista;
}`,
              testCases: [
                {
                  inputDescription: 'contarAteZero(3)',
                  expectedOutput: '[3,2,1,0]',
                  assertionCode: 'JSON.stringify(contarAteZero(3))',
                },
              ],
              explanation: 'Excelente! O loop decrementa n a cada passo até alcançar o zero.',
              hint: 'Use lista.push(n) e n-- dentro do while.',
            },
          ],
        },
        {
          id: 'logic-l4',
          unitId: 'logic-u2',
          trackId: 'logic',
          title: 'Loop For, Contadores e Acumuladores',
          description: 'Itere intervalos determinados e some valores cumulativos.',
          xpReward: 25,
          gemReward: 15,
          icon: '🔢',
          exercises: [
            {
              id: 'logic-l4-ex1',
              type: 'theory',
              title: 'Anatomia do Laço for Determinado',
              instruction: 'Aprenda a estrutura do for tradicional:',
              language: 'logic',
              theoryContent: {
                summary: 'O laço for condensa três partes essenciais em uma linha só: inicialização, condição de continuidade e incremento.',
                keyPoints: [
                  'for (let i = 0; i < N; i++)',
                  'Inicialização: let i = 0 roda apenas uma vez no início',
                  'Condição: i < N é testada antes de cada ciclo',
                  'Incremento: i++ roda no final de cada ciclo',
                ],
                codeSnippet: `let totalPontos = 0;
for (let i = 1; i <= 5; i++) {
  totalPontos += i * 10;
}
console.log(totalPontos); // 150`,
                proTip: 'Use o padrão acumulador para somar subtotais dentro do laço.',
              },
              explanation: 'O laço for é o mais utilizado quando o número de iterações é pré-determinado.',
              hint: 'for (inicio; condicao; passo)',
            },
            {
              id: 'logic-l4-ex2',
              type: 'spot_bug',
              title: 'Loop Infinito Perigoso!',
              instruction: 'Toque na linha que causa um loop infinito sem fim:',
              language: 'logic',
              codeLines: [
                'let soma = 0;',
                'for (let i = 0; i < 10; ) {',
                '  soma += i;',
                '}',
              ],
              bugLineIndex: 1,
              explanation: 'A linha do for não incrementou i (faltou i++). Portanto i continuará sempre sendo 0 e a condição i < 10 nunca se tornará falsa!',
              hint: 'Veja a terceira seção do for.',
            },
          ],
        },
        {
          id: 'logic-l5',
          unitId: 'logic-u2',
          trackId: 'logic',
          title: 'Laços Aninhados & Matrizes',
          description: 'Combine repetições dentro de repetições para processar grids e tabelas 2D.',
          xpReward: 25,
          gemReward: 15,
          icon: '▦',
          exercises: [
            {
              id: 'logic-l5-ex1',
              type: 'predict_output',
              title: 'Quantas iterações no total?',
              instruction: 'Calcule o produto dos dois laços:',
              language: 'logic',
              codeSnippet: `let contador = 0;
for (let linha = 0; linha < 3; linha++) {
  for (let col = 0; col < 4; col++) {
    contador++;
  }
}
console.log(contador);`,
              options: ['7', '12', '10', '24'],
              correctAnswer: '12',
              explanation: 'Para cada uma das 3 linhas, o laço interno roda 4 vezes: 3 * 4 = 12 iterações totais!',
              hint: 'Multiplique o número de repetições externas pelo número de internas.',
            },
          ],
        },
      ],
    },
    {
      id: 'logic-u3',
      title: 'Unidade 3: Estruturas de Dados Lineares',
      description: 'Domine arrays, vetores, pilhas LIFO e filas FIFO.',
      trackId: 'logic',
      color: '#0d9488',
      badgeReward: {
        title: 'Guardião das Estruturas',
        icon: '📚',
      },
      lessons: [
        {
          id: 'logic-l6',
          unitId: 'logic-u3',
          trackId: 'logic',
          title: 'Vetores (Arrays) e Indexação Base-Zero',
          description: 'Acesse e manipule coleções ordenadas por posições na memória.',
          xpReward: 25,
          gemReward: 10,
          icon: '📇',
          exercises: [
            {
              id: 'logic-l6-ex1',
              type: 'theory',
              title: 'Vetores na Memória',
              instruction: 'Aprenda como elementos contíguos são organizados:',
              language: 'logic',
              theoryContent: {
                summary: 'Um vetor agrupa múltiplos valores em sequência. Em computação, a contagem quase sempre começa em zero (índice 0).',
                keyPoints: [
                  'vetor[0]: Primeiro elemento',
                  'vetor[vetor.length - 1]: Último elemento',
                  'Acesso por índice direto tem complexidade de tempo O(1)',
                ],
                codeSnippet: `const frutas = ["Maçã", "Banana", "Uva"];
console.log(frutas[0]); // "Maçã"
console.log(frutas.length); // 3`,
                proTip: 'Lembre-se que o índice máximo acessível é sempre o tamanho menos um.',
              },
              explanation: 'Arrays permitem processar milhares de registros de forma iterativa.',
              hint: 'Índice 0 é o primeiro elemento.',
            },
            {
              id: 'logic-l6-ex2',
              type: 'predict_output',
              title: 'Qual elemento será retornado?',
              instruction: 'Acompanhe a alteração no vetor:',
              language: 'logic',
              codeSnippet: `const cores = ["Azul", "Verde", "Amarelo"];
cores[1] = "Vermelho";
console.log(cores[1]);`,
              options: ['Verde', 'Vermelho', 'Azul', 'Amarelo'],
              correctAnswer: 'Vermelho',
              explanation: 'A atribuição cores[1] = "Vermelho" sobrescreveu o elemento no índice 1 ("Verde").',
              hint: 'O índice 1 corresponde à segunda posição.',
            },
          ],
        },
        {
          id: 'logic-l7',
          unitId: 'logic-u3',
          trackId: 'logic',
          title: 'Pilhas (LIFO) e Filas (FIFO)',
          description: 'Entenda os princípios fundamentais de Call Stack e Filas de Mensagens.',
          xpReward: 30,
          gemReward: 15,
          icon: '🥞',
          exercises: [
            {
              id: 'logic-l7-ex1',
              type: 'theory',
              title: 'LIFO vs FIFO',
              instruction: 'Compare as duas estruturas de dados essenciais:',
              language: 'logic',
              theoryContent: {
                summary: 'Pilha (Stack) opera como LIFO (Last-In, First-Out): o último a entrar é o primeiro a sair. Fila (Queue) opera como FIFO (First-In, First-Out): o primeiro que chega é o primeiro atendido.',
                keyPoints: [
                  'Pilha (LIFO): Exemplo do botão "Desfazer" (Ctrl+Z) e Call Stack de execução',
                  'Fila (FIFO): Fila de impressão, fila de requisições de servidores e filas de banco',
                  'Operações de pilha: push (empilhar) e pop (desempilhar)',
                ],
                codeSnippet: `// Pilha conceitual:
const pilha = [];
pilha.push("A");
pilha.push("B");
const topo = pilha.pop(); // "B"`,
                proTip: 'A recursão usa a pilha de execução (Call Stack) do próprio processador!',
              },
              explanation: 'Compreender pilhas e filas é vital para resolver problemas de grafos e algoritmos de sistema operacional.',
              hint: 'LIFO: Pratos empilhados. FIFO: Fila de banco.',
            },
            {
              id: 'logic-l7-ex2',
              type: 'predict_output',
              title: 'Qual elemento sai primeiro da Fila?',
              instruction: 'Em uma fila FIFO com entrada [10, 20, 30], qual é removido primeiro?',
              language: 'logic',
              codeSnippet: `// Fila FIFO
const fila = [10, 20, 30];
const atendido = fila.shift(); // remove o primeiro da fila
console.log(atendido);`,
              options: ['10', '30', '20', 'undefined'],
              correctAnswer: '10',
              explanation: 'Em uma fila FIFO (First-In First-Out), quem entrou primeiro (10) é quem sai primeiro!',
              hint: 'First In, First Out.',
            },
          ],
        },
      ],
    },
    {
      id: 'logic-u4',
      title: 'Unidade 4: Modularização, Funções & Recursão',
      description: 'Divida para conquistar: crie funções puras, escopos e recursividade.',
      trackId: 'logic',
      color: '#0891b2',
      badgeReward: {
        title: 'Mestre da Modularização',
        icon: '🧩',
      },
      lessons: [
        {
          id: 'logic-l8',
          unitId: 'logic-u4',
          trackId: 'logic',
          title: 'Funções, Parâmetros e Retornos',
          description: 'Escreva blocos de código reutilizáveis que recebem entradas e geram saídas.',
          xpReward: 30,
          gemReward: 15,
          icon: '⚙️',
          exercises: [
            {
              id: 'logic-l8-ex1',
              type: 'theory',
              title: 'O Princípio da Reutilização',
              instruction: 'Entenda como funções tornam seu código limpo:',
              language: 'logic',
              theoryContent: {
                summary: 'Funções são pequenas fábricas. Elas recebem parâmetros (entradas), executam uma lógica isolada e devolvem um resultado através da palavra-chave return.',
                keyPoints: [
                  'DRY (Don\'t Repeat Yourself): Evite duplicar código',
                  'Assinatura da função: Nome e lista de parâmetros',
                  'Retorno: O valor enviado de volta para quem chamou',
                ],
                codeSnippet: `function calcularAreaRetangulo(largura, altura) {
  return largura * altura;
}
const area = calcularAreaRetangulo(5, 10); // 50`,
                proTip: 'Funções que fazem apenas UMA coisa bem feita são muito mais fáceis de testar.',
              },
              explanation: 'Funções são a unidade básica de composição em toda a programação.',
              hint: 'Use return para devolver a resposta calculada.',
            },
            {
              id: 'logic-l8-ex2',
              type: 'code_editor',
              title: 'Prática: Função de Cálculo de Desconto',
              instruction: 'Implemente a função "aplicarDesconto(valor, pct)" que calcule o preço final subtraindo a porcentagem informada.',
              language: 'logic',
              starterCode: `function aplicarDesconto(valor, pct) {
  // Retorne valor - (valor * (pct / 100))
  return valor - (valor * (pct / 100));
}`,
              solutionCode: `function aplicarDesconto(valor, pct) {
  return valor - (valor * (pct / 100));
}`,
              testCases: [
                {
                  inputDescription: 'aplicarDesconto(100, 20)',
                  expectedOutput: '80',
                  assertionCode: 'aplicarDesconto(100, 20)',
                },
              ],
              explanation: 'Muito bem! 20% de 100 é 20, resultando em 80.',
              hint: 'Multiplique valor por (pct / 100) e subtraia do valor original.',
            },
          ],
        },
        {
          id: 'logic-l9',
          unitId: 'logic-u4',
          trackId: 'logic',
          title: 'Recursividade & Caso Base',
          description: 'Aprenda como funções que chamam a si mesmas resolvem problemas complexos.',
          xpReward: 35,
          gemReward: 20,
          icon: '🌀',
          exercises: [
            {
              id: 'logic-l9-ex1',
              type: 'theory',
              title: 'O que é Recursão?',
              instruction: 'Compreenda a mente recursiva:',
              language: 'logic',
              theoryContent: {
                summary: 'Recursão ocorre quando uma função resolve um problema chamando uma versão menor de si mesma. Para não travar a memória, ela OBRIGATORIAMENTE precisa de um caso base que encerra a repetição.',
                keyPoints: [
                  'Caso Base: A condição de parada trivial (ex: n === 1)',
                  'Passo Recursivo: A chamada diminuindo a escala do problema (ex: n * fat(n - 1))',
                  'Stack Overflow: Acontece se o caso base nunca for atingido',
                ],
                codeSnippet: `function fatorial(n) {
  if (n <= 1) return 1; // Caso base
  return n * fatorial(n - 1); // Chamada recursiva
}`,
                proTip: 'Sempre defina e teste o caso base antes de escrever a chamada recursiva.',
              },
              explanation: 'Recursão é a base para percorrer árvores binárias, grafos e algoritmos de divisão e conquista.',
              hint: 'O caso base impede o estouro de pilha.',
            },
            {
              id: 'logic-l9-ex2',
              type: 'predict_output',
              title: 'Qual o valor de fatorial(4)?',
              instruction: 'Calcule a cadeia recursiva: 4 * 3 * 2 * 1:',
              language: 'logic',
              codeSnippet: `function fat(n) {
  if (n <= 1) return 1;
  return n * fat(n - 1);
}
console.log(fat(4));`,
              options: ['24', '12', '16', '10'],
              correctAnswer: '24',
              explanation: '4 * 3 * 2 * 1 = 24!',
              hint: '4 * 3 = 12, 12 * 2 = 24, 24 * 1 = 24.',
            },
          ],
        },
      ],
    },
    {
      id: 'logic-u5',
      title: 'Unidade 5: Busca, Ordenação & Complexidade Big-O',
      description: 'Analise a eficiência de algoritmos e implemente buscas e ordenações eficientes.',
      trackId: 'logic',
      color: '#0284c7',
      badgeReward: {
        title: 'Mago dos Algoritmos',
        icon: '🏆',
      },
      lessons: [
        {
          id: 'logic-l10',
          unitId: 'logic-u5',
          trackId: 'logic',
          title: 'Busca Linear vs Busca Binária e Big-O',
          description: 'Aprenda por que O(log N) é ordens de grandeza mais rápido que O(N).',
          xpReward: 35,
          gemReward: 20,
          icon: '⚡',
          exercises: [
            {
              id: 'logic-l10-ex1',
              type: 'theory',
              title: 'A Notação Big-O',
              instruction: 'Compreenda como medimos o tempo de execução no pior cenário:',
              language: 'logic',
              theoryContent: {
                summary: 'A notação Big-O descreve como o tempo ou o uso de memória cresce à medida que os dados de entrada (N) aumentam. Busca linear precisa olhar elemento por elemento (O(N)). Busca binária divide pela metade a cada passo (O(log N)).',
                keyPoints: [
                  'O(1): Tempo constante (acesso direto a array)',
                  'O(log N): Busca binária em lista ordenada (1 milhão de itens em apenas 20 passos!)',
                  'O(N): Busca linear olhando item a item',
                  'O(N²): Laços aninhados quadráticos (lentos para grandes volumes)',
                ],
                codeSnippet: `// Em 1.000.000 de elementos:
// Busca linear: até 1.000.000 comparações
// Busca binária: no máximo 20 comparações!`,
                proTip: 'Para aplicar busca binária, a coleção PRECISA estar previamente ordenada.',
              },
              explanation: 'Saber a complexidade dos seus algoritmos diferencia juniors de seniors.',
              hint: 'Busca binária corta o espaço de busca pela metade em cada teste.',
            },
            {
              id: 'logic-l10-ex2',
              type: 'predict_output',
              title: 'Máximo de passos da busca binária',
              instruction: 'Para uma lista ordenada com 16 elementos, no pior caso, quantas divisões a busca binária realiza?',
              language: 'logic',
              codeSnippet: `// 16 -> 8 -> 4 -> 2 -> 1
// log2(16) = ?`,
              options: ['4', '16', '8', '2'],
              correctAnswer: '4',
              explanation: 'Como 2^4 = 16, são necessárias apenas 4 comparações para encontrar qualquer elemento!',
              hint: 'Quantas vezes precisamos dividir 16 por 2 até chegar em 1?',
            },
          ],
        },
        {
          id: 'logic-l11',
          unitId: 'logic-u5',
          trackId: 'logic',
          title: 'Algoritmos de Ordenação (Bubble & Insertion)',
          description: 'Entenda como organizar coleções desordenadas e os custos de troca.',
          xpReward: 40,
          gemReward: 25,
          icon: '📊',
          exercises: [
            {
              id: 'logic-l11-ex1',
              type: 'theory',
              title: 'Como Funciona a Ordenação por Bolha (Bubble Sort)?',
              instruction: 'Entenda a mecânica de comparação entre pares vizinhos:',
              language: 'logic',
              theoryContent: {
                summary: 'O Bubble Sort percorre o vetor comparando pares adjacentes: se o elemento da esquerda for maior que o da direita, eles trocam de lugar. Os maiores valores "flutuam" para o topo como bolhas!',
                keyPoints: [
                  'Comparação em pares vizinhos: se (arr[i] > arr[i+1]) trocar',
                  'Complexidade no pior caso: O(N²)',
                  'Algoritmos mais rápidos para grandes dados: MergeSort e QuickSort (O(N log N))',
                ],
                codeSnippet: `function bubbleSort(arr) {
  let trocou;
  do {
    trocou = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        trocou = true;
      }
    }
  } while (trocou);
  return arr;
}`,
                proTip: 'Para pequenas coleções o Bubble Sort é simples de implementar, mas para milhões de registros prefira ordenações O(N log N).',
              },
              explanation: 'Aprender como os dados são reorganizados na memória é fundamental para otimização.',
              hint: 'Observe a variável temporária de troca.',
            },
            {
              id: 'logic-l11-ex2',
              type: 'code_editor',
              title: 'Prática: Encontre o Menor Valor',
              instruction: 'Crie uma função "encontrarMenor(nums)" que receba um array e retorne o menor número presente nele.',
              language: 'logic',
              starterCode: `function encontrarMenor(nums) {
  let menor = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < menor) {
      menor = nums[i];
    }
  }
  return menor;
}`,
              solutionCode: `function encontrarMenor(nums) {
  let menor = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < menor) {
      menor = nums[i];
    }
  }
  return menor;
}`,
              testCases: [
                {
                  inputDescription: 'encontrarMenor([34, 12, 89, 5, 42])',
                  expectedOutput: '5',
                  assertionCode: 'encontrarMenor([34, 12, 89, 5, 42])',
                },
              ],
              explanation: 'Excelente! O algoritmo percorre a lista e atualiza o menor elemento encontrado com complexidade O(N).',
              hint: 'Inicie com nums[0] e compare cada elemento subsequente.',
            },
          ],
        },
      ],
    },
  ],
};
