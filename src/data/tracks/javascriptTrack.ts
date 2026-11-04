import { Track } from '../../types';

export const JAVASCRIPT_TRACK: Track = {
  id: 'javascript',
  name: 'JavaScript',
  icon: '⚡',
  color: 'yellow',
  accentColor: '#eab308',
  tagline: 'A linguagem onipresente da Web moderna, APIs, Node.js e ecossistema front-end.',
  units: [
    {
      id: 'js-u1',
      title: 'Unidade 1: Modern JavaScript & ES6+',
      description: 'Domine Arrow Functions, template literals, operador ternário e métodos funcionais de array.',
      trackId: 'javascript',
      color: '#eab308',
      badgeReward: {
        title: 'Arquiteto Web I',
        icon: '⚡',
      },
      lessons: [
        {
          id: 'js-l1',
          unitId: 'js-u1',
          trackId: 'javascript',
          title: 'Arrow Functions & Métodos de Array',
          description: 'Diga adeus ao "function" verboso e use .map() e .filter() como um profissional.',
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
}`,
              solutionCode: `function filtrarMaiores(arr) {
  return arr.filter(num => num > 10);
}`,
              testCases: [
                {
                  inputDescription: 'filtrarMaiores([5, 12, 8, 130, 44])',
                  expectedOutput: '[12,130,44]',
                  assertionCode: 'JSON.stringify(filtrarMaiores([5, 12, 8, 130, 44]))',
                },
              ],
              explanation: 'O método .filter cria um novo array com todos os elementos que passam no teste implementado pela função fornecida.',
              hint: 'Use return arr.filter(x => x > 10);',
            },
          ],
        },
        {
          id: 'js-l2',
          unitId: 'js-u1',
          trackId: 'javascript',
          title: 'Template Literals & Operador Ternário',
          description: 'Interpolação de strings elegantes com crases e decisões rápidas de uma linha.',
          xpReward: 25,
          gemReward: 10,
          icon: '✨',
          exercises: [
            {
              id: 'js-l2-ex1',
              type: 'theory',
              title: 'Interpolação com Template Strings',
              instruction: 'Aprenda a construir strings dinâmicas modernas:',
              language: 'javascript',
              theoryContent: {
                summary: 'Com Template Literals usando crases (` `), você pode interpolar variáveis e expressões diretamente dentro da string com a sintaxe ${expressao}, além de suportar quebras de linha automáticas.',
                keyPoints: [
                  '`Olá, ${nome}! Você tem ${vidas} vidas.`',
                  'Suporta expressões: `Total: R$ ${(preco * 0.9).toFixed(2)}`',
                  'Operador ternário: condicao ? valorSeTrue : valorSeFalse',
                ],
                codeSnippet: `const status = ativo ? "Online" : "Offline";
console.log(\`O servidor está \${status}!\`);`,
                proTip: 'Dê adeus à concatenação arcaica com o operador de soma ("a" + b + "c").',
              },
              explanation: 'Template literals aumentam drasticamente a legibilidade de mensagens, HTML templates e logs.',
              hint: 'Use crases ` e não aspas simples ou duplas.',
            },
            {
              id: 'js-l2-ex2',
              type: 'predict_output',
              title: 'Qual string será exibida?',
              instruction: 'Calcule a expressão dentro da interpolação:',
              language: 'javascript',
              codeSnippet: `const xp = 150;
const msg = \`Nível: \${xp >= 100 ? "Pro" : "Iniciante"}\`;
console.log(msg);`,
              options: ['Nível: Pro', 'Nível: Iniciante', 'Nível: 150', 'Erro'],
              correctAnswer: 'Nível: Pro',
              explanation: '150 >= 100 é verdadeiro, portanto o operador ternário avalia para "Pro", gerando "Nível: Pro".',
              hint: 'O ternário avalia a condição antes do ponto de interrogação.',
            },
          ],
        },
      ],
    },
    {
      id: 'js-u2',
      title: 'Unidade 2: Objetos, Desestruturação & Spread/Rest',
      description: 'Manipule estruturas chave-valor complexas e extraia propriedades com elegância.',
      trackId: 'javascript',
      color: '#d97706',
      badgeReward: {
        title: 'Mestre dos Objetos',
        icon: '🗂️',
      },
      lessons: [
        {
          id: 'js-l3',
          unitId: 'js-u2',
          trackId: 'javascript',
          title: 'Objetos Literais & Object.entries()',
          description: 'A anatomia dos objetos em JavaScript e iteração de chaves e valores.',
          xpReward: 25,
          gemReward: 15,
          icon: '📦',
          exercises: [
            {
              id: 'js-l3-ex1',
              type: 'theory',
              title: 'Objetos em JavaScript',
              instruction: 'Compreenda a principal estrutura de dados do ecossistema JS:',
              language: 'javascript',
              theoryContent: {
                summary: 'Objetos literais são coleções de propriedades chave-valor delimitadas por {}. O JavaScript oferece utilitários poderosos como Object.keys(), Object.values() e Object.entries().',
                keyPoints: [
                  'const dev = { nome: "Larissa", role: "Tech Lead" };',
                  'Acesso por ponto: dev.nome ou colchetes: dev["role"]',
                  'Object.keys(dev): Retorna array com os nomes das chaves',
                ],
                codeSnippet: `const config = { tema: "dark", som: true };
console.log(Object.keys(config)); // ["tema", "som"]`,
                proTip: 'Property Shorthand: Se a variável tiver o mesmo nome da chave, use { nome, idade } em vez de { nome: nome, idade: idade }!',
              },
              explanation: 'Praticamente tudo em JavaScript deriva do protótipo Object.',
              hint: 'Chaves e valores são separados por dois-pontos.',
            },
            {
              id: 'js-l3-ex2',
              type: 'predict_output',
              title: 'O que Object.values retornará?',
              instruction: 'Analise os valores do objeto:',
              language: 'javascript',
              codeSnippet: `const placar = { timeA: 3, timeB: 1 };
const valores = Object.values(placar);
console.log(valores[0]);`,
              options: ['3', '1', 'timeA', 'undefined'],
              correctAnswer: '3',
              explanation: 'Object.values() retorna os valores [3, 1]. O primeiro índice 0 é 3.',
              hint: 'Object.values extrai apenas os dados, não as chaves.',
            },
          ],
        },
        {
          id: 'js-l4',
          unitId: 'js-u2',
          trackId: 'javascript',
          title: 'Desestruturação (Destructuring Assignment)',
          description: 'Extraia propriedades de objetos e posições de arrays em variáveis diretas.',
          xpReward: 30,
          gemReward: 15,
          icon: '✂️',
          exercises: [
            {
              id: 'js-l4-ex1',
              type: 'theory',
              title: 'A Sintaxe de Desestruturação',
              instruction: 'Aprenda o padrão mais utilizado em React e Node.js:',
              language: 'javascript',
              theoryContent: {
                summary: 'A desestruturação permite extrair campos de objetos ou itens de arrays diretamente para variáveis isoladas com valores default se necessário.',
                keyPoints: [
                  'const { nome, xp = 0 } = jogador;',
                  'const [primeiro, segundo] = listaDeCores;',
                  'Renomear durante extração: const { nome: apelido } = perfil;',
                ],
                codeSnippet: `const usuario = { id: 42, username: "carcara_dev" };
const { username } = usuario;
console.log(username); // "carcara_dev"`,
                proTip: 'Muitos desenvolvedores desestruturam parâmetros direto na assinatura da função: ({ nome, xp }) => ...',
              },
              explanation: 'Desestruturação evita repetições excessivas de referências a objetos.',
              hint: 'As chaves {} extraem propriedades de objetos.',
            },
            {
              id: 'js-l4-ex2',
              type: 'predict_output',
              title: 'Qual valor foi extraído do array?',
              instruction: 'Acompanhe a desestruturação posicional:',
              language: 'javascript',
              codeSnippet: `const ranking = ["Ouro", "Prata", "Bronze"];
const [, segundoLugar] = ranking;
console.log(segundoLugar);`,
              options: ['Prata', 'Ouro', 'Bronze', 'undefined'],
              correctAnswer: 'Prata',
              explanation: 'A vírgula inicial pula o primeiro elemento (índice 0) e atribui "Prata" à variável segundoLugar.',
              hint: 'A vírgula sem nome pula o índice 0.',
            },
          ],
        },
        {
          id: 'js-l5',
          unitId: 'js-u2',
          trackId: 'javascript',
          title: 'Operador Spread (...) e Rest Parameters',
          description: 'Clone objetos sem mutação e agrupe múltiplos argumentos em arrays.',
          xpReward: 30,
          gemReward: 15,
          icon: '🧬',
          exercises: [
            {
              id: 'js-l5-ex1',
              type: 'theory',
              title: 'O Operador de Três Pontos (...)',
              instruction: 'Entenda os dois usos do spread/rest:',
              language: 'javascript',
              theoryContent: {
                summary: 'O operador ... tem duas funções: 1) Spread (espalhar): copia propriedades para criar clones imutáveis; 2) Rest (recolher): agrupa o restante dos argumentos em uma função.',
                keyPoints: [
                  'Clone de objeto: const novo = { ...antigo, status: "atualizado" };',
                  'Fusão de arrays: const todos = [...listaA, ...listaB];',
                  'Rest parameter: function somar(...numeros)',
                ],
                codeSnippet: `const perfil = { vidas: 5 };
const atualizado = { ...perfil, vidas: 4, cristais: 50 };
console.log(atualizado.vidas); // 4`,
                proTip: 'Em React, o Spread é a técnica padrão para atualizar estados imutáveis sem gerar efeitos colaterais.',
              },
              explanation: 'Spread e Rest são os pilares da programação imutável em JavaScript.',
              hint: 'Três pontos consecutivos (...)',
            },
            {
              id: 'js-l5-ex2',
              type: 'code_editor',
              title: 'Prática: Função com Rest Parameters',
              instruction: 'Crie uma função "somarTodos(...valores)" que use o método .reduce() para somar todos os argumentos passados.',
              language: 'javascript',
              starterCode: `function somarTodos(...valores) {
  return valores.reduce((acc, curr) => acc + curr, 0);
}`,
              solutionCode: `function somarTodos(...valores) {
  return valores.reduce((acc, curr) => acc + curr, 0);
}`,
              testCases: [
                {
                  inputDescription: 'somarTodos(10, 20, 30, 40)',
                  expectedOutput: '100',
                  assertionCode: 'somarTodos(10, 20, 30, 40)',
                },
              ],
              explanation: 'Perfeito! Os três pontos recolhem todos os argumentos em um array e .reduce calcula a soma.',
              hint: 'Use valores.reduce((acc, curr) => acc + curr, 0);',
            },
          ],
        },
      ],
    },
    {
      id: 'js-u3',
      title: 'Unidade 3: Programação Assíncrona & APIs',
      description: 'Entenda o Event Loop, Promises, async/await e consumo moderno de APIs.',
      trackId: 'javascript',
      color: '#0284c7',
      badgeReward: {
        title: 'Mestre Assíncrono',
        icon: '⏳',
      },
      lessons: [
        {
          id: 'js-l6',
          unitId: 'js-u3',
          trackId: 'javascript',
          title: 'Promises & Ciclo de Vida Assíncrono',
          description: 'Aprenda os três estados de uma Promise: pending, fulfilled e rejected.',
          xpReward: 30,
          gemReward: 15,
          icon: '🤝',
          exercises: [
            {
              id: 'js-l6-ex1',
              type: 'theory',
              title: 'O que é uma Promise?',
              instruction: 'Entenda como o JavaScript lida com operações não-bloqueantes:',
              language: 'javascript',
              theoryContent: {
                summary: 'Uma Promise é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona. Ela nos livra do "Callback Hell" através do encadeamento com .then() e .catch().',
                keyPoints: [
                  'Pending: Estado inicial, aguardando resposta',
                  'Fulfilled: Operação concluída com sucesso (dispara .then)',
                  'Rejected: Ocorreu um erro ou rejeição (dispara .catch)',
                ],
                codeSnippet: `fetchUser()
  .then(user => console.log(user.name))
  .catch(err => console.error("Falha na requisição:", err));`,
                proTip: 'Sempre adicione um bloco .catch() para capturar falhas de rede e evitar UnhandledPromiseRejection.',
              },
              explanation: 'Promises permitem que o navegador continue responsivo enquanto espera respostas da rede.',
              hint: 'then recebe o sucesso; catch recebe o erro.',
            },
            {
              id: 'js-l6-ex2',
              type: 'predict_output',
              title: 'Qual método é chamado na rejeição?',
              instruction: 'Se uma Promise chama reject("Erro de Conexão"), qual método recebe a mensagem?',
              language: 'javascript',
              codeSnippet: `// Promise.reject("Falha")
// .then(...) ou .catch(...) ?`,
              options: ['.catch()', '.then()', '.finally()', '.map()'],
              correctAnswer: '.catch()',
              explanation: 'O método .catch() registra a função de tratamento de rejeições e erros da Promise.',
              hint: 'O método que captura exceções e falhas.',
            },
          ],
        },
        {
          id: 'js-l7',
          unitId: 'js-u3',
          trackId: 'javascript',
          title: 'async / await & Tratamento de Erros',
          description: 'Escreva código assíncrono tão legível e sequencial quanto código síncrono.',
          xpReward: 35,
          gemReward: 20,
          icon: '⚡',
          exercises: [
            {
              id: 'js-l7-ex1',
              type: 'theory',
              title: 'A Elegância de async / await',
              instruction: 'Veja como a sintaxe ES2017 revolucionou o JS:',
              language: 'javascript',
              theoryContent: {
                summary: 'Adicionar "async" antes de uma função faz com que ela retorne uma Promise automaticamente. Dentro dela, a palavra "await" pausa a execução até a Promise resolver, permitindo usar blocos try/catch normais.',
                keyPoints: [
                  'async function carregarDados() { ... }',
                  'const resposta = await fetch(url);',
                  'const json = await resposta.json();',
                  'Erros são capturados naturalmente com try { ... } catch (err) { ... }',
                ],
                codeSnippet: `async function buscarPerfil() {
  try {
    const res = await api.get("/perfil");
    return res.data;
  } catch (erro) {
    console.error("Não foi possível carregar:", erro);
  }
}`,
                proTip: 'Você só pode usar await dentro de funções marcadas com a palavra async!',
              },
              explanation: 'async/await é o padrão definitivo para lidar com APIs em React e Node.js.',
              hint: 'Use try/catch ao redor do await para capturar exceções.',
            },
            {
              id: 'js-l7-ex2',
              type: 'spot_bug',
              title: 'Onde o compilador acusará erro de sintaxe?',
              instruction: 'Toque na linha que usa await ilegalmente fora de uma função assíncrona:',
              language: 'javascript',
              codeLines: [
                'function salvarProgresso(dados) {',
                '  const payload = JSON.stringify(dados);',
                '  const res = await banco.salvar(payload);',
                '  return res.ok;',
                '}',
              ],
              bugLineIndex: 2,
              explanation: 'A palavra-chave "await" foi usada na linha 2, mas a função na linha 0 foi declarada como "function" comum em vez de "async function".',
              hint: 'Verifique se a função foi declarada com async.',
            },
          ],
        },
      ],
    },
    {
      id: 'js-u4',
      title: 'Unidade 4: Manipulação de DOM & Eventos Web',
      description: 'Conecte código aos elementos da tela: seletores, classes e event listeners.',
      trackId: 'javascript',
      color: '#16a34a',
      badgeReward: {
        title: 'Mestre do DOM',
        icon: '🌐',
      },
      lessons: [
        {
          id: 'js-l8',
          unitId: 'js-u4',
          trackId: 'javascript',
          title: 'Seletores DOM & Estilos Dinâmicos',
          description: 'Acesse nós HTML com querySelector e manipule o classList.',
          xpReward: 30,
          gemReward: 15,
          icon: '🎯',
          exercises: [
            {
              id: 'js-l8-ex1',
              type: 'theory',
              title: 'O Document Object Model (DOM)',
              instruction: 'Entenda como o JavaScript altera a página em tempo real:',
              language: 'javascript',
              theoryContent: {
                summary: 'O DOM é a árvore de nós HTML que o navegador cria na memória. Usando document.querySelector() e a API de classList, podemos alternar temas, exibir modais e alterar textos dinamicamente.',
                keyPoints: [
                  'document.querySelector(".btn-salvar"): Seleciona por classe CSS',
                  'elemento.textContent = "Novo Texto": Atualiza o texto com segurança',
                  'elemento.classList.toggle("dark"): Alterna classes CSS dinamicamente',
                ],
                codeSnippet: `const botao = document.querySelector("#btnTema");
botao.classList.add("ativo");
botao.textContent = "Modo Escuro Ativado";`,
                proTip: 'Prefira usar classList.add/remove em vez de modificar inline styles diretamente.',
              },
              explanation: 'A manipulação do DOM é a ponte que transforma código lógico em interfaces visuais.',
              hint: 'querySelector usa seletores CSS como classes (.) e IDs (#).',
            },
            {
              id: 'js-l8-ex2',
              type: 'predict_output',
              title: 'Qual método verifica se uma classe existe?',
              instruction: 'Qual método do classList retorna true/false se o elemento possui a classe "ativa"?',
              language: 'javascript',
              codeSnippet: `// elemento.classList.?( "ativa" )`,
              options: ['classList.contains()', 'classList.has()', 'classList.includes()', 'classList.find()'],
              correctAnswer: 'classList.contains()',
              explanation: 'O método oficial do DOM é classList.contains("nomeDaClasse"), retornando um valor booleano.',
              hint: 'Lembre-se da palavra em inglês para "contém".',
            },
          ],
        },
        {
          id: 'js-l9',
          unitId: 'js-u4',
          trackId: 'javascript',
          title: 'Event Listeners & Prevenção de Default',
          description: 'Reaja a cliques, digitação no teclado e submissões de formulário com addEventListener.',
          xpReward: 30,
          gemReward: 15,
          icon: '🖱️',
          exercises: [
            {
              id: 'js-l9-ex1',
              type: 'theory',
              title: 'Escutando Eventos do Usuário',
              instruction: 'Aprenda a tratar ações do usuário no navegador:',
              language: 'javascript',
              theoryContent: {
                summary: 'O método addEventListener() registra um callback que é acionado sempre que um evento especificado ocorre (como "click", "keydown" ou "submit"). O objeto de evento (e) nos permite inspecionar detalhes e chamar e.preventDefault().',
                keyPoints: [
                  'elemento.addEventListener("click", () => { ... })',
                  'e.preventDefault(): Impede recarregamento indesejado da página em formulários',
                  'e.target: O elemento exato que originou o evento',
                ],
                codeSnippet: `form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede o reload da página
  console.log("Enviando dados via Fetch...");
});`,
                proTip: 'Em Single Page Applications (SPAs), e.preventDefault() é crucial para tratar o submit via JavaScript assíncrono.',
              },
              explanation: 'A programação orientada a eventos é a espinha dorsal de qualquer aplicação web interativa.',
              hint: 'Use preventDefault() para evitar o comportamento padrão de formulários.',
            },
          ],
        },
      ],
    },
    {
      id: 'js-u5',
      title: 'Unidade 5: Closures, Escopo Léxico & Algoritmos Práticos',
      description: 'Explore o motor V8 do JavaScript: closures, currying, localStorage e busca eficiente.',
      trackId: 'javascript',
      color: '#7c3aed',
      badgeReward: {
        title: 'Mestre Ninja JavaScript',
        icon: '🧙‍♂️',
      },
      lessons: [
        {
          id: 'js-l10',
          unitId: 'js-u5',
          trackId: 'javascript',
          title: 'Closures & Escopo Léxico',
          description: 'Descubra como funções lembram do escopo onde foram criadas para criar variáveis privadas.',
          xpReward: 35,
          gemReward: 20,
          icon: '🔒',
          exercises: [
            {
              id: 'js-l10-ex1',
              type: 'theory',
              title: 'O que é uma Closure?',
              instruction: 'Desvende um dos conceitos mais perguntados em entrevistas sênior:',
              language: 'javascript',
              theoryContent: {
                summary: 'Uma closure é a combinação de uma função agrupada com referências ao seu estado circundante (o ambiente léxico). Em termos simples: uma função interior sempre tem acesso ao escopo da função exterior, mesmo após a exterior já ter terminado sua execução!',
                keyPoints: [
                  'Permite criar dados e variáveis privadas em JavaScript',
                  'Funções geradoras e factories tiram proveito de closures',
                  'Preserva variáveis vivas na memória sem poluir o escopo global',
                ],
                codeSnippet: `function criarContador() {
  let count = 0; // Privada
  return () => ++count;
}
const proximo = criarContador();
console.log(proximo()); // 1
console.log(proximo()); // 2`,
                proTip: 'Hooks do React como useState() usam internamente os princípios de closures para lembrar do estado entre renderizações!',
              },
              explanation: 'Closures são essenciais para entender encapsulamento e programação funcional em JavaScript.',
              hint: 'A função interna mantém viva a referência à variável da função externa.',
            },
            {
              id: 'js-l10-ex2',
              type: 'predict_output',
              title: 'Qual valor será exibido?',
              instruction: 'Acompanhe as chamadas da closure do multiplicador:',
              language: 'javascript',
              codeSnippet: `function multiplicador(fator) {
  return (n) => n * fator;
}
const dobrar = multiplicador(2);
const triplicar = multiplicador(3);
console.log(dobrar(5) + triplicar(4));`,
              options: ['22', '20', '25', '14'],
              correctAnswer: '22',
              explanation: 'dobrar(5) = 10. triplicar(4) = 12. 10 + 12 = 22!',
              hint: 'Calcule dobrar(5) e some com triplicar(4).',
            },
          ],
        },
        {
          id: 'js-l11',
          unitId: 'js-u5',
          trackId: 'javascript',
          title: 'Persistência no Navegador & Algoritmos Práticos',
          description: 'Persista preferências com localStorage e implemente algoritmos de busca veloz.',
          xpReward: 40,
          gemReward: 25,
          icon: '💾',
          exercises: [
            {
              id: 'js-l11-ex1',
              type: 'theory',
              title: 'Persistência Local com localStorage',
              instruction: 'Guarde dados mesmo quando o usuário fechar ou recarregar a aba:',
              language: 'javascript',
              theoryContent: {
                summary: 'O objeto nativo localStorage permite salvar pares de chave-valor em formato texto no navegador do usuário. Para armazenar objetos ou arrays complexos, usamos JSON.stringify() e recuperamos com JSON.parse().',
                keyPoints: [
                  'Salvar: localStorage.setItem("tema", "dark")',
                  'Recuperar: localStorage.getItem("tema")',
                  'Objetos complexos: localStorage.setItem("user", JSON.stringify(dados))',
                  'De volta a objeto: const dados = JSON.parse(localStorage.getItem("user"))',
                ],
                codeSnippet: `const config = { vidas: 5, xp: 450 };
localStorage.setItem("jogo_save", JSON.stringify(config));
const salvo = JSON.parse(localStorage.getItem("jogo_save"));
console.log(salvo.xp); // 450`,
                proTip: 'Sempre envolva JSON.parse em um bloco try/catch para se proteger de dados corrompidos no storage.',
              },
              explanation: 'O localStorage garante que o progresso do usuário persista sem necessidade de chamadas constantes ao servidor.',
              hint: 'Use JSON.stringify para salvar e JSON.parse para ler.',
            },
            {
              id: 'js-l11-ex2',
              type: 'code_editor',
              title: 'Prática: Agrupar Itens por Categoria',
              instruction: 'Crie uma função "contarPorCategoria(itens)" que receba um array de objetos [{ categoria: "A" }, ...] e retorne um objeto com a contagem de cada uma.',
              language: 'javascript',
              starterCode: `function contarPorCategoria(itens) {
  const contagem = {};
  for (const item of itens) {
    contagem[item.categoria] = (contagem[item.categoria] || 0) + 1;
  }
  return contagem;
}`,
              solutionCode: `function contarPorCategoria(itens) {
  const contagem = {};
  for (const item of itens) {
    contagem[item.categoria] = (contagem[item.categoria] || 0) + 1;
  }
  return contagem;
}`,
              testCases: [
                {
                  inputDescription: 'contarPorCategoria([{categoria: "dev"}, {categoria: "dev"}, {categoria: "design"}])',
                  expectedOutput: '{"dev":2,"design":1}',
                  assertionCode: 'JSON.stringify(contarPorCategoria([{categoria: "dev"}, {categoria: "dev"}, {categoria: "design"}]))',
                },
              ],
              explanation: 'Excelente! O operador || inicializa a chave caso seja a primeira ocorrência, criando uma tabela hash de frequência O(N).',
              hint: 'Use contagem[cat] = (contagem[cat] || 0) + 1;',
            },
          ],
        },
      ],
    },
  ],
};
