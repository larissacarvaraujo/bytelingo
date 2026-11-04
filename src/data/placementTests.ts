import { Language } from '../types';

export interface PlacementQuestion {
  id: string;
  type: 'predict_output' | 'multiple_choice' | 'spot_bug' | 'blocks';
  title: string;
  instruction: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | number;
  tokenBlocks?: string[];
  orderedSolution?: string[];
  codeLines?: string[];
  bugLineIndex?: number;
  explanation: string;
  hint: string;
}

export interface UnitPlacementTest {
  targetUnitId: string;
  trackId: Language;
  title: string;
  unitTitle: string;
  description: string;
  requiredScore: number; // e.g. 3 out of 4 correct
  questions: PlacementQuestion[];
}

export const PLACEMENT_TESTS: Record<string, UnitPlacementTest> = {
  // ==========================================
  // PYTHON PLACEMENT TESTS
  // ==========================================
  'py-u2': {
    targetUnitId: 'py-u2',
    trackId: 'python',
    title: 'Pular para Unidade 2: Controle de Fluxo & Dicionários',
    unitTitle: 'Unidade 2: Controle de Fluxo, Loops & Dicionários',
    description: 'Comprove que você domina a sintaxe fundamental do Python, indentação e manipulação de listas para avançar direto!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-py-u2-q1',
        type: 'predict_output',
        title: 'Fatiamento de Listas (Slicing)',
        instruction: 'Qual é a saída gerada pela expressão de fatiamento abaixo?',
        codeSnippet: `nums = [10, 20, 30, 40, 50]
print(nums[1:4])`,
        options: ['[10, 20, 30]', '[20, 30, 40]', '[20, 30, 40, 50]', '[10, 20, 30, 40]'],
        correctAnswer: '[20, 30, 40]',
        explanation: 'O fatiamento nums[1:4] inclui os índices 1, 2 e 3 (o índice final 4 é exclusivo). Portanto, os elementos são 20, 30 e 40.',
        hint: 'O índice inicial é inclusivo e o final é exclusivo.',
      },
      {
        id: 'skip-py-u2-q2',
        type: 'predict_output',
        title: 'Índice Negativo e Append',
        instruction: 'O que o print() exibirá após o append()?',
        codeSnippet: `pilha = ["Python", "Rust"]
pilha.append("JavaScript")
print(pilha[-1])`,
        options: ['Python', 'Rust', 'JavaScript', 'IndexError'],
        correctAnswer: 'JavaScript',
        explanation: 'O método .append() insere no final da lista, e pilha[-1] sempre acessa o último elemento.',
        hint: 'Índice -1 representa o último item da lista.',
      },
      {
        id: 'skip-py-u2-q3',
        type: 'spot_bug',
        title: 'Indentação Inválida',
        instruction: 'Toque na linha que causará um IndentationError no Python:',
        codeLines: [
          'def saudar(nome):',
          '    mensagem = f"Olá, {nome}!"',
          '  print(mensagem)',
          '    return True',
        ],
        bugLineIndex: 2,
        explanation: 'A linha 2 possui recuo incorreto de 2 espaços em vez do bloco padrão de 4 espaços (IndentationError: unindent does not match any outer indentation level).',
        hint: 'Python exige consistência estrita no número de espaços de indentação.',
      },
      {
        id: 'skip-py-u2-q4',
        type: 'blocks',
        title: 'Monte a F-String',
        instruction: 'Ordene os blocos para formatar a string de pontuação do jogador:',
        tokenBlocks: ['f"Jogador {nome}:', '{xp} XP"', 'print(', ')'],
        orderedSolution: ['print(', 'f"Jogador {nome}:', '{xp} XP"', ')'],
        explanation: 'F-strings em Python iniciam com a letra f antes das aspas e avaliam expressões dentro de chaves {}.',
        hint: 'Comece com a chamada print( e coloque a f-string dentro.',
      },
    ],
  },

  'py-u3': {
    targetUnitId: 'py-u3',
    trackId: 'python',
    title: 'Pular para Unidade 3: Funções Avançadas & Tratamento de Erros',
    unitTitle: 'Unidade 3: Funções Avançadas & Tratamento de Erros',
    description: 'Demonstre domínio em condicionais booleanas, loops for/enumerate e dicionários para desbloquear a Unidade 3!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-py-u3-q1',
        type: 'predict_output',
        title: 'Operação com Dicionário e .get()',
        instruction: 'Qual será o valor impresso no terminal?',
        codeSnippet: `perfil = {"login": "larissa", "xp": 350}
nivel = perfil.get("nivel", 1)
print(nivel)`,
        options: ['None', '1', 'KeyError', '350'],
        correctAnswer: '1',
        explanation: 'A chave "nivel" não existe no dicionário, portanto o método .get() retorna o valor default 1 sem lançar erro.',
        hint: 'O segundo parâmetro de .get() é o fallback.',
      },
      {
        id: 'skip-py-u3-q2',
        type: 'predict_output',
        title: 'Iteração com enumerate()',
        instruction: 'Qual tupla será desempacotada na primeira iteração com start=1?',
        codeSnippet: `linguagens = ["Python", "Rust"]
for indice, item in enumerate(linguagens, start=1):
    print(f"{indice}:{item}")
    break`,
        options: ['0:Python', '1:Python', '1:Rust', '0:Rust'],
        correctAnswer: '1:Python',
        explanation: 'Com start=1, o primeiro item recebe o índice 1 associado a "Python".',
        hint: 'O parâmetro start altera o valor inicial da contagem.',
      },
      {
        id: 'skip-py-u3-q3',
        type: 'spot_bug',
        title: 'Erro de Chave Inexistente',
        instruction: 'Toque na linha que disparará um KeyError em tempo de execução:',
        codeLines: [
          'dados = {"status": 200, "payload": "OK"}',
          'print(dados["status"])',
          'print(dados["token"])',
          'print("Concluído")',
        ],
        bugLineIndex: 2,
        explanation: 'Acessar dados["token"] com colchetes lança KeyError porque "token" não foi definida. Deveria usar dados.get("token")!',
        hint: 'Qual chave não existe no dicionário declarado na primeira linha?',
      },
      {
        id: 'skip-py-u3-q4',
        type: 'predict_output',
        title: 'Soma em List Comprehension',
        instruction: 'Qual é o resultado da soma dos números pares gerados?',
        codeSnippet: `pares = [x for x in range(6) if x % 2 == 0]
print(sum(pares))`,
        options: ['6', '12', '15', '0'],
        correctAnswer: '6',
        explanation: 'range(6) gera 0, 1, 2, 3, 4, 5. Os pares são [0, 2, 4]. A soma é 0 + 2 + 4 = 6.',
        hint: 'Some apenas 0, 2 e 4.',
      },
    ],
  },

  'py-u4': {
    targetUnitId: 'py-u4',
    trackId: 'python',
    title: 'Pular para Unidade 4: Programação Orientada a Objetos',
    unitTitle: 'Unidade 4: Programação Orientada a Objetos (POO)',
    description: 'Comprove que você domina funções com *args/**kwargs e blocos try/except/finally!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-py-u4-q1',
        type: 'predict_output',
        title: 'Desempacotamento com *args',
        instruction: 'Qual é a saída gerada por esta função variádica?',
        codeSnippet: `def somar_tudo(*args):
    return sum(args)

print(somar_tudo(5, 15, 30))`,
        options: ['50', '20', '[5, 15, 30]', 'TypeError'],
        correctAnswer: '50',
        explanation: '*args empacota os argumentos posicionais em uma tupla (5, 15, 30), e sum() soma totalizando 50.',
        hint: 'args vira uma tupla com todos os números passados.',
      },
      {
        id: 'skip-py-u4-q2',
        type: 'predict_output',
        title: 'Bloco try / except / finally',
        instruction: 'Acompanhe a ordem de execução do tratamento de exceções:',
        codeSnippet: `resultado = []
try:
    val = 10 / 0
except ZeroDivisionError:
    resultado.append("erro")
finally:
    resultado.append("fim")
print("-".join(resultado))`,
        options: ['erro-fim', 'erro', 'fim', 'ZeroDivisionError'],
        correctAnswer: 'erro-fim',
        explanation: 'A divisão por zero dispara o bloco except ("erro") e o bloco finally SEMPRE executa ("fim").',
        hint: 'O bloco finally executa independentemente de ter havido erro.',
      },
      {
        id: 'skip-py-u4-q3',
        type: 'spot_bug',
        title: 'Falta do self em Método',
        instruction: 'Toque na linha que causa erro ao chamar o método da classe:',
        codeLines: [
          'class Carcara:',
          '    def voar():',
          '        return "Voando alto sobre o sertão!"',
          'ave = Carcara()',
          'ave.voar()',
        ],
        bugLineIndex: 1,
        explanation: 'Métodos de instância em Python DEVEM receber "self" como primeiro parâmetro: def voar(self):. Sem isso, ave.voar() lança TypeError.',
        hint: 'Qual parâmetro obrigatório de instância está ausente?',
      },
      {
        id: 'skip-py-u4-q4',
        type: 'predict_output',
        title: 'Argumentos Nomeados com **kwargs',
        instruction: 'Qual chave e valor serão lidos do dicionário kwargs?',
        codeSnippet: `def criar_item(**kwargs):
    return kwargs.get("raridade", "Comum")

print(criar_item(nome="Espada", raridade="Lendária"))`,
        options: ['Lendária', 'Comum', 'Espada', 'None'],
        correctAnswer: 'Lendária',
        explanation: 'kwargs recebe o dicionário {"nome": "Espada", "raridade": "Lendária"}. O get("raridade") retorna "Lendária".',
        hint: 'kwargs empacota argumentos nomeados em um dicionário.',
      },
    ],
  },

  'py-u5': {
    targetUnitId: 'py-u5',
    trackId: 'python',
    title: 'Pular para Unidade 5: Python no Mundo Real & Algoritmos',
    unitTitle: 'Unidade 5: Python no Mundo Real & Algoritmos Práticos',
    description: 'Valide seu conhecimento em Classes, instâncias, atributos, métodos e herança para desbloquear a última unidade!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-py-u5-q1',
        type: 'predict_output',
        title: 'Qual atributo será exibido?',
        instruction: 'Acompanhe a inicialização da classe pelo método __init__:',
        codeSnippet: `class Dev:
    def __init__(self, nome, xp=0):
        self.nome = nome
        self.xp = xp

dev = Dev("Larissa", 150)
print(f"{dev.nome}: {dev.xp} XP")`,
        options: ['Larissa: 150 XP', 'Dev: 0 XP', 'Larissa: 0 XP', 'AttributeError'],
        correctAnswer: 'Larissa: 150 XP',
        explanation: 'O construtor __init__ atribui self.nome = "Larissa" e self.xp = 150.',
        hint: 'Veja os argumentos passados para o construtor.',
      },
      {
        id: 'skip-py-u5-q2',
        type: 'predict_output',
        title: 'Herança e Polimorfismo',
        instruction: 'Qual método falar() será invocado pelo Carcará?',
        codeSnippet: `class Animal:
    def falar(self):
        return "Som"

class Carcara(Animal):
    def falar(self):
        return "Cri-cri-iii!"

ave = Carcara()
print(ave.falar())`,
        options: ['Som', 'Cri-cri-iii!', 'Animal: Som', 'None'],
        correctAnswer: 'Cri-cri-iii!',
        explanation: 'A subclasse Carcara sobrescreve (override) o método falar() do Animal para retornar seu canto característico "Cri-cri-iii!".',
        hint: 'O método da classe Carcara sobrescreve o da classe mãe.',
      },
      {
        id: 'skip-py-u5-q3',
        type: 'predict_output',
        title: 'Serialização JSON em Python',
        instruction: 'Qual função nativa do módulo json converte uma string JSON em dicionário Python?',
        options: ['json.loads()', 'json.dumps()', 'json.parse()', 'json.decode()'],
        correctAnswer: 'json.loads()',
        explanation: 'json.loads() (load string) faz o parse de uma string JSON para estruturas nativas do Python (dict/list). json.dumps() faz o inverso.',
        hint: 'O sufixo "s" significa "from string".',
      },
      {
        id: 'skip-py-u5-q4',
        type: 'predict_output',
        title: 'Complexidade de Busca Binária',
        instruction: 'Qual é a complexidade temporal média da Busca Binária em uma lista ordenada de tamanho N?',
        options: ['O(log N)', 'O(N)', 'O(N²)', 'O(1)'],
        correctAnswer: 'O(log N)',
        explanation: 'A busca binária divide o espaço de busca pela metade a cada iteração, garantindo complexidade logarítmica O(log N).',
        hint: 'A lista é dividida pela metade em cada passo.',
      },
    ],
  },

  // ==========================================
  // JAVASCRIPT PLACEMENT TESTS
  // ==========================================
  'js-u2': {
    targetUnitId: 'js-u2',
    trackId: 'javascript',
    title: 'Pular para Unidade 2: Objetos, Desestruturação & Spread',
    unitTitle: 'Unidade 2: Objetos, Desestruturação & Spread',
    description: 'Comprove que domina arrow functions, arrays, .map(), .filter() e const/let para avançar!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-js-u2-q1',
        type: 'predict_output',
        title: 'Transformação com .map()',
        instruction: 'Qual será o array retornado pela operação de map?',
        codeSnippet: `const nums = [2, 4, 6];
const duplicados = nums.map(n => n * 2);
console.log(duplicados);`,
        options: ['[4, 8, 12]', '[2, 4, 6]', '[4, 6, 8]', '12'],
        correctAnswer: '[4, 8, 12]',
        explanation: 'O método .map aplica a função n * 2 a cada elemento, gerando [4, 8, 12].',
        hint: 'Multiplique cada número por 2.',
      },
      {
        id: 'skip-js-u2-q2',
        type: 'predict_output',
        title: 'Template Literals',
        instruction: 'Qual string será interpolada?',
        codeSnippet: `const user = "Dev";
const nivel = 3;
console.log(\`\${user}_v\${nivel}\`);`,
        options: ['Dev_v3', '${user}_v${nivel}', 'Dev v3', 'undefined'],
        correctAnswer: 'Dev_v3',
        explanation: 'Template literals com crases avaliam as expressões ${user} e ${nivel}, resultando em "Dev_v3".',
        hint: 'Veja a interpolação dentro das crases.',
      },
      {
        id: 'skip-js-u2-q3',
        type: 'spot_bug',
        title: 'Reatribuição de const',
        instruction: 'Toque na linha que causará um TypeError no JavaScript:',
        codeLines: [
          'const total = 100;',
          'let bonus = 10;',
          'total = total + bonus;',
          'console.log(total);',
        ],
        bugLineIndex: 2,
        explanation: 'Variáveis declaradas com const não podem sofrer reatribuição de valor.',
        hint: 'Qual variável foi declarada como constante imutável?',
      },
      {
        id: 'skip-js-u2-q4',
        type: 'predict_output',
        title: 'Filtro de Elementos',
        instruction: 'Qual é o tamanho do array resultante de .filter()?',
        codeSnippet: `const idades = [12, 18, 25, 15, 30];
const maiores = idades.filter(i => i >= 18);
console.log(maiores.length);`,
        options: ['3', '2', '5', '4'],
        correctAnswer: '3',
        explanation: 'Os números 18, 25 e 30 satisfazem i >= 18 (3 elementos no total).',
        hint: 'Conte quantos números são maiores ou iguais a 18.',
      },
    ],
  },

  'js-u3': {
    targetUnitId: 'js-u3',
    trackId: 'javascript',
    title: 'Pular para Unidade 3: Programação Assíncrona & APIs',
    unitTitle: 'Unidade 3: Programação Assíncrona & APIs',
    description: 'Valide conhecimentos em objetos literais, desestruturação e operador spread (...).',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-js-u3-q1',
        type: 'predict_output',
        title: 'Desestruturação de Objeto',
        instruction: 'Qual valor a variável "role" receberá?',
        codeSnippet: `const dev = { nome: "Larissa", role: "Arquiteta" };
const { role } = dev;
console.log(role);`,
        options: ['Arquiteta', 'Larissa', 'undefined', '{ role: "Arquiteta" }'],
        correctAnswer: 'Arquiteta',
        explanation: 'A sintaxe { role } extrai a propriedade homônima diretamente do objeto dev.',
        hint: 'A chave extraída é "role".',
      },
      {
        id: 'skip-js-u3-q2',
        type: 'predict_output',
        title: 'Clonagem com Spread (...)',
        instruction: 'Qual será o valor final da chave xp no objeto clonado?',
        codeSnippet: `const base = { xp: 50, vidas: 3 };
const atualizado = { ...base, xp: 120 };
console.log(atualizado.xp);`,
        options: ['120', '50', '170', 'undefined'],
        correctAnswer: '120',
        explanation: 'A propriedade xp: 120 sobrescreve a chave anterior trazida pelo spread (...base).',
        hint: 'A propriedade declarada depois tem precedência.',
      },
      {
        id: 'skip-js-u3-q3',
        type: 'predict_output',
        title: 'Rest Parameters',
        instruction: 'O que a função com ...args retornará?',
        codeSnippet: `function somarTudo(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
console.log(somarTudo(10, 20, 30));`,
        options: ['60', '10', '[10, 20, 30]', 'undefined'],
        correctAnswer: '60',
        explanation: 'Os argumentos são recolhidos no array nums = [10, 20, 30] e somados por reduce().',
        hint: 'Some 10 + 20 + 30.',
      },
      {
        id: 'skip-js-u3-q4',
        type: 'spot_bug',
        title: 'Chave inexistente em desestruturação',
        instruction: 'Toque na linha onde a tentativa de acesso a propriedade aninhada nula causa TypeError:',
        codeLines: [
          'const user = { perfil: null };',
          'console.log(user.perfil);',
          'console.log(user.perfil.avatar);',
          'console.log("Fim");',
        ],
        bugLineIndex: 2,
        explanation: 'Tentar acessar uma propriedade em "null" lança TypeError: Cannot read properties of null.',
        hint: 'user.perfil é null.',
      },
    ],
  },

  'js-u4': {
    targetUnitId: 'js-u4',
    trackId: 'javascript',
    title: 'Pular para Unidade 4: Manipulação de DOM & Eventos Web',
    unitTitle: 'Unidade 4: Manipulação de DOM & Eventos Web',
    description: 'Demonstre domínio em Promises, async/await e tratamento com try/catch.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-js-u4-q1',
        type: 'predict_output',
        title: 'Retorno de Função async',
        instruction: 'O que uma função declarada com a palavra-chave async sempre retorna?',
        options: ['Uma Promise', 'Um Objeto simples', 'Um Callback', 'undefined'],
        correctAnswer: 'Uma Promise',
        explanation: 'Toda função marcada com async sempre envelopa seu retorno em uma Promise resolvida.',
        hint: 'Funções async retornam Promises por definição.',
      },
      {
        id: 'skip-js-u4-q2',
        type: 'predict_output',
        title: 'Captura de Erro com try / catch',
        instruction: 'Qual mensagem será exibida se a Promise for rejeitada?',
        codeSnippet: `async function testar() {
    try {
        throw new Error("Falha na API");
    } catch (e) {
        console.log("Erro capturado");
    }
}
testar();`,
        options: ['Erro capturado', 'Falha na API', 'Uncaught Error', 'undefined'],
        correctAnswer: 'Erro capturado',
        explanation: 'O bloco catch interceptou a exceção e imprimiu "Erro capturado".',
        hint: 'O bloco catch trata o erro lançado pelo throw.',
      },
      {
        id: 'skip-js-u4-q3',
        type: 'spot_bug',
        title: 'Uso de await fora de async',
        instruction: 'Toque na linha que causa erro de sintaxe ao usar await fora de função async:',
        codeLines: [
          'function carregarDados() {',
          '    const url = "https://api.dev/dados";',
          '    const res = await fetch(url);',
          '    return res.json();',
          '}',
        ],
        bugLineIndex: 2,
        explanation: 'await só é permitido dentro de funções declaradas com "async function".',
        hint: 'Verifique se a função foi declarada com async.',
      },
      {
        id: 'skip-js-u4-q4',
        type: 'predict_output',
        title: 'Promise.all()',
        instruction: 'Quando Promise.all([p1, p2]) resolve com sucesso?',
        options: ['Quando TODAS as promises resolverem', 'Quando a primeira resolver', 'Imediatamente', 'Após 1 segundo'],
        correctAnswer: 'Quando TODAS as promises resolverem',
        explanation: 'Promise.all aguarda todas as promises resolverem para devolver um array com todos os resultados.',
        hint: 'Requer que todas sejam bem-sucedidas.',
      },
    ],
  },

  'js-u5': {
    targetUnitId: 'js-u5',
    trackId: 'javascript',
    title: 'Pular para Unidade 5: Closures & Algoritmos no Navegador',
    unitTitle: 'Unidade 5: Closures & Algoritmos no Navegador',
    description: 'Comprove que domina seletores DOM, manipulação de classes e event listeners!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-js-u5-q1',
        type: 'predict_output',
        title: 'Prevenção de Comportamento Padrão',
        instruction: 'Qual método do objeto de evento (e) impede que a página recarregue ao submeter um formulário?',
        options: ['e.preventDefault()', 'e.stopPropagation()', 'e.stop()', 'e.cancel()'],
        correctAnswer: 'e.preventDefault()',
        explanation: 'e.preventDefault() cancela o comportamento nativo de reload do formulário HTML.',
        hint: 'Prevent Default: prevenir o padrão.',
      },
      {
        id: 'skip-js-u5-q2',
        type: 'predict_output',
        title: 'Alternância de Classes no DOM',
        instruction: 'Qual método do classList adiciona a classe se ela não existir, ou a remove se existir?',
        options: ['classList.toggle()', 'classList.add()', 'classList.switch()', 'classList.change()'],
        correctAnswer: 'classList.toggle()',
        explanation: 'classList.toggle() alterna a presença da classe automaticamente.',
        hint: 'A palavra inglesa para comutador/alternância é "toggle".',
      },
      {
        id: 'skip-js-u5-q3',
        type: 'predict_output',
        title: 'Armazenamento com localStorage',
        instruction: 'Como devemos converter um objeto JavaScript antes de salvar no localStorage?',
        options: ['JSON.stringify(obj)', 'obj.toString()', 'JSON.parse(obj)', 'localStorage.save(obj)'],
        correctAnswer: 'JSON.stringify(obj)',
        explanation: 'O localStorage só armazena strings, logo usamos JSON.stringify() para serializar objetos.',
        hint: 'Converter de objeto para string JSON.',
      },
      {
        id: 'skip-js-u5-q4',
        type: 'predict_output',
        title: 'Closures e Variável Privada',
        instruction: 'Qual valor será exibido na segunda chamada da closure?',
        codeSnippet: `function criarContador() {
    let n = 0;
    return () => ++n;
}
const c = criarContador();
c();
console.log(c());`,
        options: ['2', '1', '0', 'undefined'],
        correctAnswer: '2',
        explanation: 'A primeira chamada incrementa n para 1. A segunda incrementa para 2.',
        hint: 'A variável n fica preservada no escopo léxico da closure.',
      },
    ],
  },

  // ==========================================
  // LOGIC & ALGORITHMS PLACEMENT TESTS
  // ==========================================
  'logic-u2': {
    targetUnitId: 'logic-u2',
    trackId: 'logic',
    title: 'Pular para Unidade 2: Laços de Repetição',
    unitTitle: 'Unidade 2: Laços de Repetição & Iterações',
    description: 'Demonstre domínio sobre variáveis, tipos de dados e condicionais if/else para avançar direto.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-logic-u2-q1',
        type: 'predict_output',
        title: 'Operação Condicional Simples',
        instruction: 'Qual mensagem será exibida pelo algoritmo?',
        codeSnippet: `let vidas = 3;
if (vidas > 0) {
    console.log("Continuar Jogando");
} else {
    console.log("Game Over");
}`,
        options: ['Continuar Jogando', 'Game Over', '3', 'true'],
        correctAnswer: 'Continuar Jogando',
        explanation: 'Como vidas = 3 é maior que 0, a condição é verdadeira e entra no primeiro bloco.',
        hint: 'Avalie 3 > 0.',
      },
      {
        id: 'skip-logic-u2-q2',
        type: 'predict_output',
        title: 'Operadores Lógicos (E / OU)',
        instruction: 'Qual o resultado da expressão lógica (true && false)?',
        options: ['false', 'true', 'null', 'undefined'],
        correctAnswer: 'false',
        explanation: 'O operador E (&&) exige que AMBAS as condições sejam verdadeiras. Como uma é falsa, o resultado é false.',
        hint: 'E lógico requer ambos verdadeiros.',
      },
      {
        id: 'skip-logic-u2-q3',
        type: 'spot_bug',
        title: 'Parênteses Faltando',
        instruction: 'Toque na linha com erro de sintaxe na condicional:',
        codeLines: [
          'let nivel = 5;',
          'if nivel >= 5 {',
          '    console.log("Avançado");',
          '}',
        ],
        bugLineIndex: 1,
        explanation: 'A condição do if deve estar envolvida por parênteses: if (nivel >= 5).',
        hint: 'Faltam parênteses ao redor da expressão de teste.',
      },
      {
        id: 'skip-logic-u2-q4',
        type: 'predict_output',
        title: 'Acumulador de Valores',
        instruction: 'Acompanhe a reatribuição da variável:',
        codeSnippet: `let moedas = 10;
moedas = moedas + 5;
moedas = moedas * 2;
console.log(moedas);`,
        options: ['30', '25', '20', '15'],
        correctAnswer: '30',
        explanation: '10 + 5 = 15. Depois 15 * 2 = 30!',
        hint: 'Calcule passo a passo na ordem das linhas.',
      },
    ],
  },

  'logic-u3': {
    targetUnitId: 'logic-u3',
    trackId: 'logic',
    title: 'Pular para Unidade 3: Estruturas de Dados Lineares',
    unitTitle: 'Unidade 3: Estruturas de Dados Lineares',
    description: 'Comprove que domina loops while, for, contadores e laços aninhados para desbloquear a Unidade 3!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-logic-u3-q1',
        type: 'predict_output',
        title: 'Iterações no laço for',
        instruction: 'Quantas vezes o bloco será executado?',
        codeSnippet: `let total = 0;
for (let i = 0; i < 4; i++) {
    total += 1;
}
console.log(total);`,
        options: ['4', '3', '5', '0'],
        correctAnswer: '4',
        explanation: 'i varia entre 0, 1, 2 e 3 (4 iterações no total).',
        hint: 'Conte de 0 até i < 4.',
      },
      {
        id: 'skip-logic-u3-q2',
        type: 'predict_output',
        title: 'Laço while com decremento',
        instruction: 'Qual será a saída final?',
        codeSnippet: `let n = 3;
let lista = [];
while (n > 0) {
    lista.push(n);
    n--;
}
console.log(lista.length);`,
        options: ['3', '2', '4', '0'],
        correctAnswer: '3',
        explanation: 'O laço roda para n = 3, n = 2 e n = 1, inserindo 3 números.',
        hint: 'O laço para quando n chega a 0.',
      },
      {
        id: 'skip-logic-u3-q3',
        type: 'spot_bug',
        title: 'Loop Infinito',
        instruction: 'Toque na linha que causa loop infinito sem condição de parada:',
        codeLines: [
          'let x = 0;',
          'while (x < 10) {',
          '    console.log(x);',
          '}',
        ],
        bugLineIndex: 1,
        explanation: 'A variável x nunca é incrementada dentro do laço while, gerando repetição infinita.',
        hint: 'Falta incrementar a variável de controle.',
      },
      {
        id: 'skip-logic-u3-q4',
        type: 'predict_output',
        title: 'Laços Aninhados',
        instruction: 'Qual o valor final da variável contador?',
        codeSnippet: `let contador = 0;
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
        contador++;
    }
}
console.log(contador);`,
        options: ['6', '5', '4', '8'],
        correctAnswer: '6',
        explanation: '2 laços externos * 3 laços internos = 6 iterações totais.',
        hint: 'Multiplique 2 por 3.',
      },
    ],
  },

  'logic-u4': {
    targetUnitId: 'logic-u4',
    trackId: 'logic',
    title: 'Pular para Unidade 4: Modularização & Funções',
    unitTitle: 'Unidade 4: Modularização & Funções',
    description: 'Valide conhecimentos em Vetores, indexação e estruturas de Pilha (LIFO) e Fila (FIFO).',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-logic-u4-q1',
        type: 'predict_output',
        title: 'Pilha (Stack) - LIFO',
        instruction: 'Em uma pilha LIFO onde inserimos [A, B, C], qual elemento sai primeiro no pop()?',
        options: ['C', 'A', 'B', 'Nenhum'],
        correctAnswer: 'C',
        explanation: 'Em uma pilha (Last-In First-Out), o último elemento inserido ("C") é o primeiro a ser desempilhado.',
        hint: 'O último a entrar é o primeiro a sair.',
      },
      {
        id: 'skip-logic-u4-q2',
        type: 'predict_output',
        title: 'Fila (Queue) - FIFO',
        instruction: 'Em uma fila FIFO com entrada [10, 20, 30], qual elemento é atendido primeiro?',
        options: ['10', '30', '20', 'Todos'],
        correctAnswer: '10',
        explanation: 'Em uma fila (First-In First-Out), o primeiro que chegou (10) é o primeiro atendido.',
        hint: 'First In, First Out.',
      },
      {
        id: 'skip-logic-u4-q3',
        type: 'predict_output',
        title: 'Indexação de Vetores',
        instruction: 'Qual elemento está no índice 2 do array ["Java", "Rust", "Python", "C"]?',
        options: ['Python', 'Rust', 'Java', 'C'],
        correctAnswer: 'Python',
        explanation: 'Índice 0 = "Java", índice 1 = "Rust", índice 2 = "Python".',
        hint: 'Lembre-se da contagem base-zero (0, 1, 2...).',
      },
      {
        id: 'skip-logic-u4-q4',
        type: 'spot_bug',
        title: 'Índice Fora dos Limites',
        instruction: 'Toque na linha que tenta acessar um índice além do tamanho do array:',
        codeLines: [
          'const lista = [10, 20];',
          'console.log(lista[0]);',
          'console.log(lista[1]);',
          'console.log(lista[5]);',
        ],
        bugLineIndex: 3,
        explanation: 'O array só possui índices 0 e 1. Acessar lista[5] está fora dos limites (undefined / Out of Bounds).',
        hint: 'Qual linha tenta acessar uma posição inexistente?',
      },
    ],
  },

  'logic-u5': {
    targetUnitId: 'logic-u5',
    trackId: 'logic',
    title: 'Pular para Unidade 5: Busca, Ordenação & Complexidade',
    unitTitle: 'Unidade 5: Busca, Ordenação & Complexidade Big-O',
    description: 'Comprove que domina modularização, funções puras e recursividade com caso base!',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-logic-u5-q1',
        type: 'predict_output',
        title: 'Caso Base da Recursão',
        instruction: 'Qual é a finalidade fundamental do Caso Base em uma função recursiva?',
        options: ['Encerrar a recursão e evitar estouro de pilha', 'Aumentar a velocidade', 'Imprimir mensagens', 'Criar novas variáveis'],
        correctAnswer: 'Encerrar a recursão e evitar estouro de pilha',
        explanation: 'O caso base determina quando a função deve parar de chamar a si mesma, prevenindo Stack Overflow.',
        hint: 'Sem o caso base, a função roda infinitamente.',
      },
      {
        id: 'skip-logic-u5-q2',
        type: 'predict_output',
        title: 'Fatorial Recursivo',
        instruction: 'Qual é o resultado de fatorial(3)?',
        codeSnippet: `function fat(n) {
    if (n <= 1) return 1;
    return n * fat(n - 1);
}
console.log(fat(3));`,
        options: ['6', '3', '9', '2'],
        correctAnswer: '6',
        explanation: '3 * 2 * 1 = 6.',
        hint: 'Multiplique 3 por 2 por 1.',
      },
      {
        id: 'skip-logic-u5-q3',
        type: 'predict_output',
        title: 'Complexidade de Busca Linear',
        instruction: 'Em uma lista com N elementos desordenados, qual é a complexidade no pior caso para encontrar um item?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'],
        correctAnswer: 'O(N)',
        explanation: 'Como a lista está desordenada, no pior caso precisamos inspecionar todos os N elementos um por um: O(N).',
        hint: 'Percorrer item por item até o final.',
      },
      {
        id: 'skip-logic-u5-q4',
        type: 'predict_output',
        title: 'Vantagem da Busca Binária',
        instruction: 'Qual requisito é OBRIGATÓRIO para podermos executar uma Busca Binária O(log N)?',
        options: ['A lista deve estar previamente ordenada', 'A lista deve ter números pares', 'A lista não pode ter mais de 100 itens', 'Não há requisitos'],
        correctAnswer: 'A lista deve estar previamente ordenada',
        explanation: 'A busca binária compara o elemento central e descarta metade do espaço de busca, o que só funciona se os dados estiverem ordenados.',
        hint: 'Os elementos precisam seguir uma ordem crescente ou decrescente.',
      },
    ],
  },

  // ==========================================
  // RUST PLACEMENT TESTS
  // ==========================================
  'rust-u2': {
    targetUnitId: 'rust-u2',
    trackId: 'rust',
    title: 'Pular para Unidade 2: Ownership & Borrowing',
    unitTitle: 'Unidade 2: Ownership & Borrowing',
    description: 'Valide conhecimentos em let mut, imutabilidade por padrão e expressões em Rust.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-rust-u2-q1',
        type: 'predict_output',
        title: 'Imutabilidade por padrão',
        instruction: 'Qual palavra-chave é obrigatória após "let" para permitir reatribuição de valor em Rust?',
        options: ['mut', 'var', 'change', 'pub'],
        correctAnswer: 'mut',
        explanation: 'Em Rust, variáveis são imutáveis por padrão. "let mut" declara explicitamente mutabilidade.',
        hint: 'Abreviação de "mutable".',
      },
      {
        id: 'skip-rust-u2-q2',
        type: 'spot_bug',
        title: 'Atribuição em variável imutável',
        instruction: 'Toque na linha que causará erro no compilador do Rust:',
        codeLines: [
          'fn main() {',
          '    let x = 10;',
          '    x = 20;',
          '    println!("{}", x);',
          '}',
        ],
        bugLineIndex: 2,
        explanation: 'error[E0384]: cannot assign twice to immutable variable `x`. Faltou declarar "let mut x = 10;".',
        hint: 'x foi declarada sem a palavra mut.',
      },
      {
        id: 'skip-rust-u2-q3',
        type: 'predict_output',
        title: 'Retorno de Expressão sem Ponto e Vírgula',
        instruction: 'Qual valor será atribuído à variável resultado?',
        codeSnippet: `fn main() {
    let resultado = {
        let a = 10;
        a + 5
    };
    println!("{}", resultado);
}`,
        options: ['15', '10', '5', '()'],
        correctAnswer: '15',
        explanation: 'A linha "a + 5" sem ponto e vírgula é uma expressão que avalia para 15.',
        hint: 'A última linha de um bloco sem ponto e vírgula é seu retorno.',
      },
      {
        id: 'skip-rust-u2-q4',
        type: 'predict_output',
        title: 'Macro println!',
        instruction: 'Como indicamos que println! é uma macro e não uma função comum em Rust?',
        options: ['Pelo ponto de exclamação (!)', 'Pelo prefixo macro', 'Por letras maiúsculas', 'Pelo compilador'],
        correctAnswer: 'Pelo ponto de exclamação (!)',
        explanation: 'Em Rust, macros são invocadas com um ponto de exclamação no final do nome, como println!() e vec!().',
        hint: 'Veja o caractere no final do nome da macro.',
      },
    ],
  },

  'rust-u3': {
    targetUnitId: 'rust-u3',
    trackId: 'rust',
    title: 'Pular para Unidade 3: Structs & Enums',
    unitTitle: 'Unidade 3: Structs, Enums & Pattern Matching',
    description: 'Comprove que domina as leis de Ownership, referências imutáveis (&) e referências mutáveis (&mut).',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-rust-u3-q1',
        type: 'predict_output',
        title: 'Semântica Move de Heap',
        instruction: 'O que acontece com s1 após "let s2 = s1;" onde s1 é uma String?',
        options: ['s1 é invalidada (Move)', 's1 continua válida com cópia profunda', 'Ambas apontam para o mesmo valor simultaneamente', 'Erro em runtime'],
        correctAnswer: 's1 é invalidada (Move)',
        explanation: 'Rust move a posse do buffer Heap para s2, invalidando s1 para evitar duplo free de memória.',
        hint: 'Ownership só permite um proprietário por vez.',
      },
      {
        id: 'skip-rust-u3-q2',
        type: 'predict_output',
        title: 'Passagem por Referência (&)',
        instruction: 'Qual símbolo usamos para emprestar uma variável por referência de leitura sem tomar sua posse?',
        options: ['&', '*', '%', 'ref'],
        correctAnswer: '&',
        explanation: '& cria uma referência imutável (borrowing) sem transferir o ownership.',
        hint: 'O caractere & (e comercial).',
      },
      {
        id: 'skip-rust-u3-q3',
        type: 'spot_bug',
        title: 'Múltiplas referências mutáveis',
        instruction: 'Toque na linha onde a segunda referência mutável viola a lei do Borrow Checker:',
        codeLines: [
          'let mut texto = String::from("Rust");',
          'let r1 = &mut texto;',
          'let r2 = &mut texto;',
          'println!("{}, {}", r1, r2);',
        ],
        bugLineIndex: 2,
        explanation: 'error[E0499]: cannot borrow `texto` as mutable more than once at a time. O compilador proíbe múltiplos borrows mutáveis simultâneos.',
        hint: 'Apenas um &mut pode existir no mesmo escopo.',
      },
      {
        id: 'skip-rust-u3-q4',
        type: 'predict_output',
        title: 'Clonagem Explícita',
        instruction: 'Qual método devemos chamar em uma String para duplicar seu buffer Heap explicitamente?',
        options: ['.clone()', '.copy()', '.duplicate()', '.make_copy()'],
        correctAnswer: '.clone()',
        explanation: 'O método .clone() aloca um novo buffer na Heap e duplica os dados de forma explícita.',
        hint: 'O método padrão da trait Clone.',
      },
    ],
  },

  'rust-u4': {
    targetUnitId: 'rust-u4',
    trackId: 'rust',
    title: 'Pular para Unidade 4: Tratamento de Erros sem Null',
    unitTitle: 'Unidade 4: Tratamento de Erros sem Null (Option & Result)',
    description: 'Valide conhecimentos em Structs com impl, Enums ricos e pattern matching com match.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-rust-u4-q1',
        type: 'predict_output',
        title: 'Métodos em Struct com impl',
        instruction: 'Qual primeiro parâmetro um método de struct deve receber para acessar seus próprios campos?',
        options: ['&self', 'this', 'self_val', '&mut'],
        correctAnswer: '&self',
        explanation: 'Métodos de instância em Rust recebem &self para emprestar a própria struct de forma imutável.',
        hint: 'A palavra-chave self antecedida por &.',
      },
      {
        id: 'skip-rust-u4-q2',
        type: 'predict_output',
        title: 'Exaustividade do match',
        instruction: 'O que o compilador do Rust exige ao fazer pattern matching em um enum?',
        options: ['Cobrir todas as variantes possíveis', 'Usar apenas números', 'Ter um default vazio', 'Colocar ponto e vírgula em cada linha'],
        correctAnswer: 'Cobrir todas as variantes possíveis',
        explanation: 'match em Rust é estritamente exaustivo: todas as variantes devem ser tratadas explicitamente ou através do coringa (_).',
        hint: 'Nenhuma variante pode ser esquecida.',
      },
      {
        id: 'skip-rust-u4-q3',
        type: 'spot_bug',
        title: 'Match não-exaustivo',
        instruction: 'Toque na linha que causará erro por não cobrir todas as variantes:',
        codeLines: [
          'enum Status { Ativo, Inativo, Bloqueado }',
          'let s = Status::Ativo;',
          'match s {',
          '    Status::Ativo => println!("OK"),',
          '}',
        ],
        bugLineIndex: 2,
        explanation: 'error[E0004]: non-exhaustive patterns: `Status::Inativo` and `Status::Bloqueado` not covered.',
        hint: 'Faltou cobrir Inativo e Bloqueado.',
      },
      {
        id: 'skip-rust-u4-q4',
        type: 'predict_output',
        title: 'Enums com Valores',
        instruction: 'Qual valor o enum carregará?',
        codeSnippet: `enum Resposta {
    Texto(String),
    Numero(i32),
}
let r = Resposta::Numero(42);
match r {
    Resposta::Numero(n) => println!("{}", n),
    _ => (),
}`,
        options: ['42', 'Texto', 'Numero', '()'],
        correctAnswer: '42',
        explanation: 'A variante Número(42) é combinada no match e seu valor interno 42 é desempacotado.',
        hint: 'O padrão casa com Resposta::Numero(n).',
      },
    ],
  },

  'rust-u5': {
    targetUnitId: 'rust-u5',
    trackId: 'rust',
    title: 'Pular para Unidade 5: Coleções & Iteradores Funcionais',
    unitTitle: 'Unidade 5: Coleções & Iteradores Funcionais',
    description: 'Demonstre domínio em Option (Some/None), Result (Ok/Err) e no operador de propagação ?.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-rust-u5-q1',
        type: 'predict_output',
        title: 'Variantes do Option<T>',
        instruction: 'Quais são as duas variantes do enum padrão Option<T> em Rust?',
        options: ['Some(T) e None', 'Ok(T) e Err(E)', 'True e False', 'Value e Null'],
        correctAnswer: 'Some(T) e None',
        explanation: 'Option<T> possui Some(T) (quando tem valor) e None (quando não há valor).',
        hint: 'Some para presença e None para ausência.',
      },
      {
        id: 'skip-rust-u5-q2',
        type: 'predict_output',
        title: 'Operador de Propagação ?',
        instruction: 'Qual caractere em Rust desempacota o valor se Ok, ou retorna o Err antecipadamente da função?',
        options: ['?', '!', '#', '$'],
        correctAnswer: '?',
        explanation: 'O operador ? propaga erros de forma limpa, substituindo verificações manuais.',
        hint: 'O ponto de interrogação.',
      },
      {
        id: 'skip-rust-u5-q3',
        type: 'predict_output',
        title: 'Método unwrap_or',
        instruction: 'O que a expressão None.unwrap_or(10) avaliará?',
        options: ['10', 'None', 'Panic', '0'],
        correctAnswer: '10',
        explanation: 'Como o valor era None, .unwrap_or(10) devolve o fallback seguro 10.',
        hint: 'O fallback é 10.',
      },
      {
        id: 'skip-rust-u5-q4',
        type: 'predict_output',
        title: 'Iterador Lazy e collect()',
        instruction: 'Qual método transforma um iterador preguiçoso de volta para uma coleção como Vec<T>?',
        options: ['.collect()', '.to_vec()', '.toList()', '.gather()'],
        correctAnswer: '.collect()',
        explanation: 'O método .collect() consome o iterador e recolhe os elementos para o tipo de coleção desejado.',
        hint: 'A palavra inglesa para recolher/coletar.',
      },
    ],
  },

  // ==========================================
  // JAVA PLACEMENT TESTS
  // ==========================================
  'java-u2': {
    targetUnitId: 'java-u2',
    trackId: 'java',
    title: 'Pular para Unidade 2: Controle de Fluxo & Loops',
    unitTitle: 'Unidade 2: Controle de Fluxo, Loops & Arrays',
    description: 'Valide conhecimentos na estrutura canônica do Java, método main e tipos primitivos.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-java-u2-q1',
        type: 'predict_output',
        title: 'Método Principal do Java',
        instruction: 'Qual é a assinatura correta do método de entrada executado pela JVM?',
        options: ['public static void main(String[] args)', 'void main()', 'public void start(String args)', 'static main(String args[])'],
        correctAnswer: 'public static void main(String[] args)',
        explanation: 'A JVM busca estritamente o método "public static void main(String[] args)" como ponto de entrada.',
        hint: 'Contém public static void.',
      },
      {
        id: 'skip-java-u2-q2',
        type: 'predict_output',
        title: 'Divisão de Inteiros',
        instruction: 'Qual é o valor impresso no console por 9 / 2 em Java?',
        codeSnippet: `int resultado = 9 / 2;
System.out.println(resultado);`,
        options: ['4', '4.5', '5', '4.0'],
        correctAnswer: '4',
        explanation: 'A divisão entre inteiros trunca as casas decimais, resultando em 4.',
        hint: 'A parte decimal é descartada.',
      },
      {
        id: 'skip-java-u2-q3',
        type: 'spot_bug',
        title: 'Ponto e vírgula obrigatório',
        instruction: 'Toque na linha que causará erro de compilação no javac:',
        codeLines: [
          'public class Teste {',
          '    public static void main(String[] args) {',
          '        int xp = 50',
          '        System.out.println(xp);',
          '    }',
          '}',
        ],
        bugLineIndex: 2,
        explanation: 'javac Error: ";" expected. A linha "int xp = 50" esqueceu o ponto e vírgula final.',
        hint: 'Procure uma instrução sem ponto e vírgula.',
      },
      {
        id: 'skip-java-u2-q4',
        type: 'predict_output',
        title: 'Comando de Impressão',
        instruction: 'Qual instrução imprime texto com quebra de linha no console em Java?',
        options: ['System.out.println()', 'console.log()', 'print()', 'echo()'],
        correctAnswer: 'System.out.println()',
        explanation: 'System.out.println() é o comando padrão da biblioteca Java para imprimir linhas no terminal.',
        hint: 'Começa com System.out.',
      },
    ],
  },

  'java-u3': {
    targetUnitId: 'java-u3',
    trackId: 'java',
    title: 'Pular para Unidade 3: Encapsulamento & Construtores',
    unitTitle: 'Unidade 3: Encapsulamento, Construtores & Métodos',
    description: 'Comprove que domina condicionais if/else, comparação de strings com .equals() e loops for-each.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-java-u3-q1',
        type: 'predict_output',
        title: 'Comparação de Strings em Java',
        instruction: 'Qual método devemos usar para comparar o conteúdo de duas Strings em Java?',
        options: ['.equals()', '==', '===', '.compare()'],
        correctAnswer: '.equals()',
        explanation: 'Em Java, == compara endereços de memória. Para comparar o conteúdo textual de objetos String usamos .equals().',
        hint: 'O método equals compara conteúdo.',
      },
      {
        id: 'skip-java-u3-q2',
        type: 'predict_output',
        title: 'Enhanced For (For-Each)',
        instruction: 'Qual será a soma calculada pelo loop?',
        codeSnippet: `int[] notas = {5, 10, 15};
int total = 0;
for (int n : notas) {
    total += n;
}
System.out.println(total);`,
        options: ['30', '15', '25', '0'],
        correctAnswer: '30',
        explanation: '5 + 10 + 15 = 30.',
        hint: 'Some os números do vetor.',
      },
      {
        id: 'skip-java-u3-q3',
        type: 'spot_bug',
        title: 'Comparação com == em String',
        instruction: 'Toque na linha onde a comparação de String com == gera um bug de lógica:',
        codeLines: [
          'String s1 = new String("admin");',
          'if (s1 == "admin") {',
          '    System.out.println("Acesso liberado");',
          '}',
        ],
        bugLineIndex: 1,
        explanation: 'Comparar com == verifica se são a mesma referência no Heap, falhando mesmo com textos idênticos. O correto é s1.equals("admin").',
        hint: 'Qual linha usou o operador == em vez de .equals()?',
      },
      {
        id: 'skip-java-u3-q4',
        type: 'predict_output',
        title: 'Tamanho de Arrays em Java',
        instruction: 'Qual propriedade nos dá o tamanho de um array primitivo em Java?',
        options: ['.length', '.size()', '.length()', '.count'],
        correctAnswer: '.length',
        explanation: 'Arrays primitivos em Java possuem a propriedade direta .length (sem parênteses).',
        hint: 'Propriedade length sem parênteses.',
      },
    ],
  },

  'java-u4': {
    targetUnitId: 'java-u4',
    trackId: 'java',
    title: 'Pular para Unidade 4: Herança & Interfaces',
    unitTitle: 'Unidade 4: Herança, Polimorfismo & Interfaces',
    description: 'Demonstre domínio em modificadores de acesso (private/public), Getters/Setters e na palavra this.',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-java-u4-q1',
        type: 'predict_output',
        title: 'Modificador private',
        instruction: 'Qual é a visibilidade de um atributo marcado como "private" em uma classe Java?',
        options: ['Acessível apenas dentro da própria classe', 'Acessível por qualquer classe', 'Acessível pelo mesmo pacote apenas', 'Acessível por subclasses'],
        correctAnswer: 'Acessível apenas dentro da própria classe',
        explanation: 'private restringe o acesso estritamente aos métodos da classe onde foi declarado.',
        hint: 'Encapsulamento estrito.',
      },
      {
        id: 'skip-java-u4-q2',
        type: 'predict_output',
        title: 'Construtor em Java',
        instruction: 'Qual é a regra obrigatória para o nome de um construtor de classe em Java?',
        options: ['Deve ter exatamente o mesmo nome da classe e sem tipo de retorno', 'Deve começar com init', 'Deve retornar void', 'Pode ter qualquer nome'],
        correctAnswer: 'Deve ter exatamente o mesmo nome da classe e sem tipo de retorno',
        explanation: 'Construtores em Java têm o mesmo nome da classe e não declaram nenhum tipo de retorno (nem void).',
        hint: 'Nome idêntico à classe.',
      },
      {
        id: 'skip-java-u4-q3',
        type: 'predict_output',
        title: 'A palavra-chave this',
        instruction: 'O que a palavra-chave "this" representa dentro de um método de instância?',
        options: ['A referência ao próprio objeto atual', 'A classe mãe', 'Uma variável estática', 'O método anterior'],
        correctAnswer: 'A referência ao próprio objeto atual',
        explanation: 'this aponta para a instância corrente, permitindo distinguir atributos de argumentos com o mesmo nome.',
        hint: 'O próprio objeto que está executando o método.',
      },
      {
        id: 'skip-java-u4-q4',
        type: 'spot_bug',
        title: 'Acesso direto a atributo private',
        instruction: 'Toque na linha que causará erro de compilação por tentar ler campo private fora da classe:',
        codeLines: [
          'Conta c = new Conta();',
          'c.depositar(50);',
          'System.out.println(c.saldoPrivado);',
          'System.out.println("Saldo exibido");',
        ],
        bugLineIndex: 2,
        explanation: 'c.saldoPrivado tem acesso privado na classe Conta e não pode ser lido diretamente. Deve ser usado c.getSaldo()!',
        hint: 'Tentativa de ler atributo privado diretamente com ponto.',
      },
    ],
  },

  'java-u5': {
    targetUnitId: 'java-u5',
    trackId: 'java',
    title: 'Pular para Unidade 5: Coleções & Java Streams API',
    unitTitle: 'Unidade 5: Coleções Modernas & Java Streams API',
    description: 'Valide conhecimentos em herança (extends), polimorfismo dinâmico e interfaces (implements).',
    requiredScore: 3,
    questions: [
      {
        id: 'skip-java-u5-q1',
        type: 'predict_output',
        title: 'Palavra-chave para herança',
        instruction: 'Qual palavra-chave é usada em Java para herdar de uma superclasse?',
        options: ['extends', 'implements', 'inherits', 'super'],
        correctAnswer: 'extends',
        explanation: 'A palavra-chave "extends" declara herança de classe em Java.',
        hint: 'Uma classe estende outra.',
      },
      {
        id: 'skip-java-u5-q2',
        type: 'predict_output',
        title: 'Anotação @Override',
        instruction: 'Para que serve a anotação @Override em um método de subclasse?',
        options: ['Garantir em tempo de compilação que o método sobrescreve um da classe mãe', 'Aumentar a velocidade do método', 'Tornar o método público', 'Impedir novas heranças'],
        correctAnswer: 'Garantir em tempo de compilação que o método sobrescreve um da classe mãe',
        explanation: '@Override instrui o compilador a validar que a assinatura do método coincide com a do método da superclasse.',
        hint: 'Validação de sobrescrita.',
      },
      {
        id: 'skip-java-u5-q3',
        type: 'predict_output',
        title: 'Implementando Interfaces',
        instruction: 'Qual palavra-chave uma classe usa para adotar o contrato de uma interface?',
        options: ['implements', 'extends', 'interface', 'using'],
        correctAnswer: 'implements',
        explanation: 'Classes adotam interfaces através da palavra-chave "implements".',
        hint: 'Implementa o contrato.',
      },
      {
        id: 'skip-java-u5-q4',
        type: 'predict_output',
        title: 'Java Streams API',
        instruction: 'Qual método de stream filtra os elementos com base em um predicado booleano?',
        options: ['.filter()', '.map()', '.reduce()', '.collect()'],
        correctAnswer: '.filter()',
        explanation: 'O método .filter(predicado) retém apenas os elementos que retornam true.',
        hint: 'O método que filtra elementos.',
      },
    ],
  },
};

/**
 * Returns placement test for a specific unit or creates a dynamic fallback based on track
 */
export function getPlacementTestForUnit(unitId: string, trackId: Language = 'python'): UnitPlacementTest {
  if (PLACEMENT_TESTS[unitId]) {
    return PLACEMENT_TESTS[unitId];
  }

  // Fallback to unit 2 of the specific track if available
  const trackFallbackKey = `${trackId}-u2`;
  if (PLACEMENT_TESTS[trackFallbackKey]) {
    return PLACEMENT_TESTS[trackFallbackKey];
  }

  // Universal default fallback
  return PLACEMENT_TESTS['py-u2'];
}
