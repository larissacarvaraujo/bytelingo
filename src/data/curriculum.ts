import { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'logic',
    name: 'Lógica & Algoritmos',
    icon: '🧠',
    color: 'emerald',
    accentColor: '#10b981',
    tagline: 'O alicerce fundamental para pensar como um programador sênior.',
    units: [
      {
        id: 'logic-u1',
        title: 'Unidade 1: Fundamentos & Tomada de Decisão',
        description: 'Entenda como o computador armazena dados e toma decisões lógicas.',
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
                  codeSnippet: `// Exemplo conceitual:
let vidas = 3;
let nome = "Dev";
let jogoAtivo = true;`,
                  proTip: 'Dica de Ouro: Bons programadores usam nomes descritivos em vez de letras soltas como x ou y.',
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
`,
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
                type: 'match_pairs',
                title: 'Associe os Operadores Lógicos',
                instruction: 'Ligue cada operador ao seu significado correspondente:',
                language: 'logic',
                pairMatches: [
                  { left: '===', right: 'Igualdade estrita' },
                  { left: '!==', right: 'Diferente de' },
                  { left: '&&', right: 'E lógico (ambos verdadeiros)' },
                  { left: '||', right: 'OU lógico (ao menos um)' },
                ],
                explanation: 'Operadores lógicos e relacionais são o coração da lógica booleana.',
                hint: 'Lembre-se que "&&" exige que ambas as partes sejam válidas.',
              },
              {
                id: 'logic-l2-ex4',
                type: 'code_editor',
                title: 'Prática: Verificador de Maioridade',
                instruction: 'Complete a função "podeDirigir(idade)" para retornar true se a idade for 18 ou mais, e false caso contrário.',
                language: 'logic',
                starterCode: `function podeDirigir(idade) {
  // Escreva a verificação if / else ou retorne a expressão lógica direta:
  
}
`,
                solutionCode: `function podeDirigir(idade) {
  return idade >= 18;
}`,
                testCases: [
                  {
                    inputDescription: 'podeDirigir(18)',
                    expectedOutput: 'true',
                    assertionCode: 'podeDirigir(18)',
                  },
                  {
                    inputDescription: 'podeDirigir(15)',
                    expectedOutput: 'false',
                    assertionCode: 'podeDirigir(15)',
                  },
                ],
                explanation: 'A expressão idade >= 18 avalia para true quando a idade for igual ou superior a 18.',
                hint: 'Use return idade >= 18;',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: 'amber',
    accentColor: '#f59e0b',
    tagline: 'Sintaxe limpa, poderosa e a favorita absoluta para automação, IA e ciência de dados.',
    units: [
      {
        id: 'py-u1',
        title: 'Unidade 1: Primeiros Passos em Python',
        description: 'Descubra a elegância da indentação, listas dinâmicas e strings formatadas.',
        trackId: 'python',
        color: '#f59e0b',
        badgeReward: {
          title: 'Cobra Mestre',
          icon: '🐍',
        },
        lessons: [
          {
            id: 'py-l1',
            unitId: 'py-u1',
            trackId: 'python',
            title: 'Sintaxe Limpa & Indentação',
            description: 'Sem chaves, sem ponto e vírgula! O poder da indentação pura do Python.',
            xpReward: 20,
            gemReward: 10,
            icon: '✨',
            exercises: [
              {
                id: 'py-l1-ex1',
                type: 'theory',
                title: 'O Zen do Python e Indentação',
                instruction: 'Entenda por que Python é tão adorado:',
                language: 'python',
                theoryContent: {
                  summary: 'Em Python, a estrutura do seu código é definida por espaços em branco (indentação), e não por chaves {}. Cada bloco dentro de um if, loop ou função deve ter 4 espaços de recuo.',
                  keyPoints: [
                    'print(): Função nativa para imprimir no terminal',
                    'Sem ponto e vírgula no final das linhas',
                    'Dois-pontos (:): Obrigatório ao final de declarações def, if, for, while',
                  ],
                  codeSnippet: `def saudar(nome):
    mensagem = f"Olá, {nome}!"
    print(mensagem)

saudar("Byte")`,
                  proTip: 'Nunca misture Tabs com Espaços! O padrão da comunidade é 4 espaços por nível.',
                },
                explanation: 'A indentação é sintaxe ativa em Python, garantindo legibilidade inigualável.',
                hint: 'Preste atenção nos dois pontos ao final das linhas de cabeçalho.',
              },
              {
                id: 'py-l1-ex2',
                type: 'blocks',
                title: 'Monte a Função Python',
                instruction: 'Ordene os blocos para definir uma função chamada "dobro" que recebe x e retorna x * 2:',
                language: 'python',
                tokenBlocks: ['x * 2', 'def dobro(x):', 'return'],
                orderedSolution: ['def dobro(x):', 'return', 'x * 2'],
                explanation: 'Em Python, declaramos funções com def nome(param): seguido pela instrução de retorno.',
                hint: 'Comece com def dobro(x):',
              },
              {
                id: 'py-l1-ex3',
                type: 'predict_output',
                title: 'O que o print() exibirá?',
                instruction: 'Analise o f-string e responda:',
                language: 'python',
                codeSnippet: `linguagem = "Python"
nivel = 1
print(f"{linguagem} Nível {nivel + 2}")`,
                options: ['Python Nível 1', 'Python Nível 3', 'linguagem Nível nivel+2', 'Erro de Sintaxe'],
                correctAnswer: 'Python Nível 3',
                explanation: 'Dentro do f-string, as chaves {} executam expressões dinâmicas: nivel + 2 resulta em 3!',
                hint: 'Calcule a expressão 1 + 2 dentro das chaves.',
              },
              {
                id: 'py-l1-ex4',
                type: 'code_editor',
                title: 'Prática: List Comprehension em Ação',
                instruction: 'Escreva uma função "quadrados(lista)" que receba uma lista de números e retorne uma nova lista com cada número elevado ao quadrado usando list comprehension.',
                language: 'python',
                starterCode: `def quadrados(lista):
    # Dica: [x ** 2 for x in lista]
    return [n * n for n in lista]
`,
                solutionCode: `def quadrados(lista):
    return [n * n for n in lista]`,
                testCases: [
                  {
                    inputDescription: 'quadrados([1, 2, 3])',
                    expectedOutput: '[1,4,9]',
                    assertionCode: 'quadrados([1, 2, 3])',
                  },
                ],
                explanation: 'List comprehension é uma forma concisa e pythônica de transformar listas!',
                hint: 'Use a fórmula: [n * n for n in lista]',
              },
            ],
          },
          {
            id: 'py-l2',
            unitId: 'py-u1',
            trackId: 'python',
            title: 'Listas e Fatiamento (Slicing)',
            description: 'Como manipular coleções dinâmicas, índices negativos e append().',
            xpReward: 25,
            gemReward: 15,
            icon: '📚',
            exercises: [
              {
                id: 'py-l2-ex1',
                type: 'theory',
                title: 'Listas Dinâmicas em Python',
                instruction: 'Entenda como as listas funcionam em Python:',
                language: 'python',
                theoryContent: {
                  summary: 'Listas em Python são ordenadas e mutáveis. Você pode adicionar elementos com .append(), acessar de trás para frente com índices negativos (-1 é o último item) e fatiar com [inicio:fim].',
                  keyPoints: [
                    'linguagens = ["Python", "Rust", "JS"]',
                    'linguagens.append("Java") # Adiciona ao final',
                    'linguagens[-1] # Retorna o último elemento',
                  ],
                  codeSnippet: `frutas = ["Maçã", "Banana", "Uva"]
frutas.append("Laranja")
print(frutas[0]) # Maçã
print(frutas[-1]) # Laranja`,
                  proTip: 'O fatiamento frutas[0:2] pega os itens de índice 0 e 1 (o fim é exclusivo).',
                },
                explanation: 'Listas são a estrutura de dados mais usada no dia a dia com Python.',
                hint: 'Lembre-se que índices começam em 0 e -1 é o último.',
              },
              {
                id: 'py-l2-ex2',
                type: 'predict_output',
                title: 'Qual é o último elemento?',
                instruction: 'Analise o código de fatiamento e índice negativo:',
                language: 'python',
                codeSnippet: `cores = ["azul", "verde", "vermelho", "amarelo"]
print(cores[-1])`,
                options: ['azul', 'verde', 'vermelho', 'amarelo'],
                correctAnswer: 'amarelo',
                explanation: 'O índice -1 em Python sempre acessa o último elemento da lista, que neste caso é "amarelo"!',
                hint: 'Índice negativo percorre do fim para o começo.',
              },
              {
                id: 'py-l2-ex3',
                type: 'code_editor',
                title: 'Prática: Adicione e Retorne o Tamanho',
                instruction: 'Complete a função "adicionar_item(lista, item)" para fazer append do item e retornar o tamanho len(lista).',
                language: 'python',
                starterCode: `def adicionar_item(lista, item):
    # Use lista.append(item) e retorne len(lista)
    lista.append(item)
    return len(lista)
`,
                solutionCode: `def adicionar_item(lista, item):
    lista.append(item)
    return len(lista)`,
                testCases: [
                  {
                    inputDescription: 'adicionar_item([1, 2], 3)',
                    expectedOutput: '3',
                    assertionCode: 'adicionar_item([1, 2], 3)',
                  },
                ],
                explanation: 'O método .append() insere no fim da lista e len() retorna o número de elementos.',
                hint: 'Chame lista.append(item) e depois retorne len(lista).',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    color: 'yellow',
    accentColor: '#eab308',
    tagline: 'A linguagem onipresente da Web moderna, APIs e ecossistema Node.js.',
    units: [
      {
        id: 'js-u1',
        title: 'Unidade 1: Modern JavaScript & ES6+',
        description: 'Domine Arrow Functions, desestruturação e manipulação funcional de arrays.',
        trackId: 'javascript',
        color: '#eab308',
        badgeReward: {
          title: 'Arquiteto Web',
          icon: '⚡',
        },
        lessons: [
          {
            id: 'js-l1',
            unitId: 'js-u1',
            trackId: 'javascript',
            title: 'Arrow Functions & Métodos de Array',
            description: 'Diga adeus ao "function" verboso e use map/filter como um profissional.',
            xpReward: 25,
            gemReward: 10,
            icon: '🏹',
            exercises: [
              {
                id: 'js-l1-ex1',
                type: 'theory',
                title: 'A Revolução das Arrow Functions',
                instruction: 'Veja como o ES6 transformou a sintaxe do JavaScript:',
                language: 'javascript',
                theoryContent: {
                  summary: 'Arrow functions (=>) oferecem uma sintaxe concisa para criar funções e preservam o escopo léxico do "this". Quando a função tem apenas uma linha, o retorno é implícito!',
                  keyPoints: [
                    'const dobro = x => x * 2; (Retorno implícito sem chaves)',
                    'const soma = (a, b) => a + b;',
                    'Excelente para passar como callback em .map(), .filter(), .reduce()',
                  ],
                  codeSnippet: `const precos = [10, 20, 30];
const comDesconto = precos.map(p => p * 0.9);
console.log(comDesconto); // [9, 18, 27]`,
                  proTip: 'Se abrir chaves { }, o return passa a ser obrigatório!',
                },
                explanation: 'Arrow functions tornam o código mais legível e declarativo.',
                hint: 'Observe a seta => entre parâmetros e corpo.',
              },
              {
                id: 'js-l1-ex2',
                type: 'spot_bug',
                title: 'Encontre o Erro na Reatribuição',
                instruction: 'Toque na linha que causa um TypeError em tempo de execução:',
                language: 'javascript',
                codeLines: [
                  'const usuario = "Larissa";',
                  'let pontos = 100;',
                  'usuario = "DevSênior";',
                  'pontos += 50;',
                ],
                bugLineIndex: 2,
                explanation: 'Variáveis declaradas com "const" são imutáveis em sua referência. Não é permitido reatribuir um novo valor!',
                hint: 'Qual palavra-chave impede reatribuição de valor?',
              },
              {
                id: 'js-l1-ex3',
                type: 'predict_output',
                title: 'Qual será o resultado do .filter()?',
                instruction: 'Analise a filtragem no array abaixo:',
                language: 'javascript',
                codeSnippet: `const nums = [1, 4, 7, 10, 15];
const pares = nums.filter(n => n % 2 === 0);
console.log(pares.length);`,
                options: ['2', '3', '5', '0'],
                correctAnswer: '2',
                explanation: 'Apenas 4 e 10 são pares (divisíveis por 2). Portanto, o array resultante tem tamanho 2.',
                hint: 'Conte quantos números da lista são pares.',
              },
              {
                id: 'js-l1-ex4',
                type: 'code_editor',
                title: 'Prática: Filtre Números Maiores que 10',
                instruction: 'Escreva a função "filtrarMaiores(arr)" que retorne apenas os números estritamente maiores que 10 usando .filter().',
                language: 'javascript',
                starterCode: `function filtrarMaiores(arr) {
  // Use arr.filter(...)
  return arr.filter(num => num > 10);
}
`,
                solutionCode: `function filtrarMaiores(arr) {
  return arr.filter(num => num > 10);
}`,
                testCases: [
                  {
                    inputDescription: 'filtrarMaiores([5, 12, 8, 130, 44])',
                    expectedOutput: '[12,130,44]',
                    assertionCode: 'filtrarMaiores([5, 12, 8, 130, 44])',
                  },
                ],
                explanation: 'O método .filter cria um novo array com todos os elementos que passam no teste implementado pela função fornecida.',
                hint: 'Use return arr.filter(x => x > 10);',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    color: 'orange',
    accentColor: '#ea580c',
    tagline: 'Velocidade extrema e segurança de memória sem garbage collector. A linguagem mais amada do mundo.',
    units: [
      {
        id: 'rust-u1',
        title: 'Unidade 1: O Guardião de Memória',
        description: 'Conheça o Borrow Checker, imutabilidade por padrão e o poder de let mut.',
        trackId: 'rust',
        color: '#ea580c',
        badgeReward: {
          title: 'Caranguejo de Ferro',
          icon: '🦀',
        },
        lessons: [
          {
            id: 'rust-l1',
            unitId: 'rust-u1',
            trackId: 'rust',
            title: 'Imutabilidade & `let mut`',
            description: 'Por que o compilador do Rust te protege de bugs antes mesmo de rodar o código.',
            xpReward: 30,
            gemReward: 15,
            icon: '🛡️',
            exercises: [
              {
                id: 'rust-l1-ex1',
                type: 'theory',
                title: 'Imutabilidade por Padrão em Rust',
                instruction: 'Entenda a filosofia de segurança do Rust:',
                language: 'rust',
                theoryContent: {
                  summary: 'Em Rust, toda variável declarada com "let" é IMUTÁVEL por padrão. Para permitir que ela mude de valor ao longo do tempo, você DEVE declarar explicitamente "let mut".',
                  keyPoints: [
                    'let x = 5; // x NUNCA poderá ser modificado',
                    'let mut y = 5; // y é mutável: y = 10 é permitido',
                    'O compilador garante segurança contra concorrência e corridas de dados',
                  ],
                  codeSnippet: `fn main() {
    let mut contador = 0;
    contador += 1;
    println!("Contador: {}", contador);
}`,
                  proTip: 'Se não precisa mudar, deixe imutável! Isso otimiza o binário gerado pelo rustc.',
                },
                explanation: 'Imutabilidade previne efeitos colaterais indesejados em sistemas de alta performance.',
                hint: 'Lembre-se da palavra-chave "mut" para mutabilidade.',
              },
              {
                id: 'rust-l1-ex2',
                type: 'blocks',
                title: 'Declare a Variável Mutável em Rust',
                instruction: 'Ordene os blocos para declarar a variável mutável "saldo" com valor 50:',
                language: 'rust',
                tokenBlocks: ['let', 'mut', 'saldo = 50;', 'i32'],
                orderedSolution: ['let', 'mut', 'saldo = 50;'],
                explanation: 'A sintaxe clássica do Rust é: let mut nome_variavel = valor;',
                hint: 'Comece com "let", depois "mut".',
              },
              {
                id: 'rust-l1-ex3',
                type: 'spot_bug',
                title: 'Onde o Compilador do Rust vai Reclamar?',
                instruction: 'Toque na linha que violará a regra de imutabilidade:',
                language: 'rust',
                codeLines: [
                  'fn main() {',
                  '    let vidas = 3;',
                  '    vidas -= 1;',
                  '    println!("Vidas: {}", vidas);',
                  '}',
                ],
                bugLineIndex: 2,
                explanation: 'error[E0384]: cannot assign twice to immutable variable `vidas`. Faltou declarar "let mut vidas = 3;" na linha anterior!',
                hint: 'A variável vidas foi declarada sem a palavra-chave mut.',
              },
              {
                id: 'rust-l1-ex4',
                type: 'code_editor',
                title: 'Prática: O Print Clássico do Rust',
                instruction: 'Complete a função main() em Rust para imprimir "Rust é incrível!" usando a macro println!(). Não se esqueça do ponto e vírgula (;)!',
                language: 'rust',
                starterCode: `fn main() {
    // Use println!("...");
    println!("Rust é incrível!");
}
`,
                solutionCode: `fn main() {
    println!("Rust é incrível!");
}`,
                testCases: [
                  {
                    inputDescription: 'Execução do main()',
                    expectedOutput: 'Rust é incrível!',
                  },
                ],
                explanation: 'Em Rust, println!() é uma macro (indicada pelo !) que formata e imprime texto no terminal com quebra de linha.',
                hint: 'Digite println!("Rust é incrível!");',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: 'sky',
    accentColor: '#0284c7',
    tagline: 'Robustez empresarial, tipagem forte e a espinha dorsal de sistemas corporativos e Android.',
    units: [
      {
        id: 'java-u1',
        title: 'Unidade 1: Orientação a Objetos & Estrutura',
        description: 'Tudo é classe! Entenda a estrutura canônica do Java e seu compilador rigoroso.',
        trackId: 'java',
        color: '#0284c7',
        badgeReward: {
          title: 'Arquiteto Java',
          icon: '☕',
        },
        lessons: [
          {
            id: 'java-l1',
            unitId: 'java-u1',
            trackId: 'java',
            title: 'A Estrutura da Classe & `main`',
            description: 'Por que todo programa Java começa com public static void main(String[] args).',
            xpReward: 25,
            gemReward: 10,
            icon: '🏛️',
            exercises: [
              {
                id: 'java-l1-ex1',
                type: 'theory',
                title: 'O Ponto de Entrada do Java',
                instruction: 'Compreenda a anatomia de um arquivo Java:',
                language: 'java',
                theoryContent: {
                  summary: 'Em Java, todo código reside dentro de uma classe. O ponto de entrada da Máquina Virtual Java (JVM) é o método sagrado "public static void main(String[] args)".',
                  keyPoints: [
                    'public: Acessível por qualquer parte do sistema',
                    'static: Não precisa instanciar um objeto para executar',
                    'void: Não retorna nenhum valor',
                    'System.out.println(): Comando padrão para imprimir no terminal',
                  ],
                  codeSnippet: `public class Principal {
    public static void main(String[] args) {
        System.out.println("Olá, Java!");
    }
}`,
                  proTip: 'Todas as instruções dentro do Java PRECISAM terminar com ponto e vírgula (;)!',
                },
                explanation: 'A tipagem forte e estrutura estrita do Java garantem estabilidade em grande escala.',
                hint: 'Observe cada palavra-chave da assinatura do método main.',
              },
              {
                id: 'java-l1-ex2',
                type: 'blocks',
                title: 'Monte a Chamada de Impressão em Java',
                instruction: 'Ordene os blocos para imprimir no console em Java:',
                language: 'java',
                tokenBlocks: ['System.out', '.println(', '"ByteLingo");'],
                orderedSolution: ['System.out', '.println(', '"ByteLingo");'],
                explanation: 'System.out.println("...") é a chamada padrão de saída padrão em Java.',
                hint: 'Comece com System.out.',
              },
              {
                id: 'java-l1-ex3',
                type: 'spot_bug',
                title: 'Encontre o Ponto e Vírgula Faltante',
                instruction: 'Toque na linha que causará erro de compilação no javac:',
                language: 'java',
                codeLines: [
                  'public class Main {',
                  '    public static void main(String[] args) {',
                  '        int pontuacao = 100',
                  '        System.out.println(pontuacao);',
                  '    }',
                  '}',
                ],
                bugLineIndex: 2,
                explanation: 'javac Error: ";" expected. A linha de atribuição "int pontuacao = 100" esqueceu o ponto e vírgula final!',
                hint: 'Procure por uma linha que não termina com ponto e vírgula (;).',
              },
              {
                id: 'java-l1-ex4',
                type: 'code_editor',
                title: 'Prática: Exiba a Mensagem no Console',
                instruction: 'Escreva a instrução System.out.println("Dev Java Concluído!"); dentro do método main.',
                language: 'java',
                starterCode: `public class Main {
    public static void main(String[] args) {
        // Escreva seu comando System.out.println aqui:
        System.out.println("Dev Java Concluído!");
    }
}
`,
                solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Dev Java Concluído!");
    }
}`,
                testCases: [
                  {
                    inputDescription: 'Execução JVM',
                    expectedOutput: 'Dev Java Concluído!',
                  },
                ],
                explanation: 'Excelente! A JVM executou seu código e imprimiu a saída perfeitamente.',
                hint: 'Use System.out.println("Dev Java Concluído!"); com ponto e vírgula.',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const INITIAL_DAILY_QUESTS = [
  {
    id: 'quest-1',
    title: 'Codificador do Dia',
    description: 'Complete 1 lição interativa em qualquer trilha',
    progress: 0,
    target: 1,
    rewardGems: 15,
    completed: false,
  },
  {
    id: 'quest-2',
    title: 'Precisão Impecável',
    description: 'Acerte 3 exercícios seguidos sem perder vidas',
    progress: 0,
    target: 3,
    rewardGems: 25,
    completed: false,
  },
  {
    id: 'quest-3',
    title: 'Maratona de XP',
    description: 'Acumule 40 pontos de XP hoje',
    progress: 0,
    target: 40,
    rewardGems: 30,
    completed: false,
  },
];

export const SHOP_ITEMS = [
  {
    id: 'heart_refill',
    title: 'Recarga Total de Vidas',
    description: 'Restaure imediatamente seus 5 corações para continuar praticando sem parar.',
    costGems: 50,
    icon: '❤️',
    type: 'hearts',
  },
  {
    id: 'streak_freeze',
    title: 'Bloqueio de Ofensiva',
    description: 'Protege seus dias consecutivos de ofensiva se você não puder praticar amanhã.',
    costGems: 100,
    icon: '🧊',
    type: 'freeze',
  },
  {
    id: 'double_xp',
    title: 'Poção de XP em Dobro',
    description: 'Dobra todo o XP ganho em lições pelos próximos 30 minutos!',
    costGems: 80,
    icon: '🧪',
    type: 'potion',
  },
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'Lucas "Rustacean"', xp: 840, league: 'Ouro', isCurrentUser: false, avatar: '🦀' },
  { rank: 2, name: 'Larissa Dev (Você)', xp: 0, league: 'Ouro', isCurrentUser: true, avatar: '🦉' },
  { rank: 3, name: 'Carlos Python', xp: 520, league: 'Ouro', isCurrentUser: false, avatar: '🐍' },
  { rank: 4, name: 'Beatriz FullStack', xp: 480, league: 'Ouro', isCurrentUser: false, avatar: '⚡' },
  { rank: 5, name: 'Rafael Java JVM', xp: 390, league: 'Ouro', isCurrentUser: false, avatar: '☕' },
  { rank: 6, name: 'Mariana Algoritmos', xp: 310, league: 'Ouro', isCurrentUser: false, avatar: '🧠' },
];
