import { Track } from '../../types';

export const PYTHON_TRACK: Track =   {
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
      {
        id: 'py-u2',
        title: 'Unidade 2: Controle de Fluxo, Loops & Dicionários',
        description: 'Domine if/elif/else, loops for/while com range() e mapeamentos estruturados com dicts.',
        trackId: 'python',
        color: '#f59e0b',
        badgeReward: {
          title: 'Mestre dos Loops Python',
          icon: '🔄',
        },
        lessons: [
          {
            id: 'py-l3',
            unitId: 'py-u2',
            trackId: 'python',
            title: 'Condicionais e Lógica Booleana',
            description: 'Tome decisões no seu código com if, elif, else e os operadores and, or, not.',
            xpReward: 20,
            gemReward: 10,
            icon: '🔀',
            exercises: [
              {
                id: 'py-l3-ex1',
                type: 'theory',
                title: 'Decisões com if, elif e else',
                instruction: 'Veja como Python lida com bifurcações de fluxo:',
                language: 'python',
                theoryContent: {
                  summary: 'O comando if avalia uma expressão booleana (True ou False). Se for verdadeira, executa o bloco indentado. Caso contrário, passa para o próximo elif ou else.',
                  keyPoints: [
                    'Operadores de comparação: == (igual), != (diferente), > (maior), < (menor)',
                    'Operadores lógicos: and (ambos verdadeiros), or (pelo menos um verdadeiro), not (inversão)',
                    'Sintaxe clara com dois-pontos: if condicao:',
                  ],
                  codeSnippet: `nivel = 5
if nivel >= 10:
    print("Mestre")
elif nivel >= 5:
    print("Avançado")
else:
    print("Iniciante")`,
                  proTip: 'Dica: elif é a contração de "else if", permitindo encadear múltiplas checagens de forma limpa.',
                },
                explanation: 'Condicionais são a alma dos jogos e algoritmos interativos.',
                hint: 'Lembre-se que cada if, elif e else precisa de dois-pontos no final.',
              },
              {
                id: 'py-l3-ex2',
                type: 'predict_output',
                title: 'Qual status será exibido?',
                instruction: 'Analise os operadores relacionais e lógicos:',
                language: 'python',
                codeSnippet: `pontos = 85
tem_chave = True

if pontos >= 80 and tem_chave:
    print("Porta Secreta Aberta!")
else:
    print("Acesso Negado")`,
                options: ['Porta Secreta Aberta!', 'Acesso Negado', 'True', 'Erro de Sintaxe'],
                correctAnswer: 'Porta Secreta Aberta!',
                explanation: 'Ambas as condições são verdadeiras: pontos >= 80 (85 >= 80 é True) e tem_chave é True. Com o operador and, o bloco do if é acionado.',
                hint: 'O operador "and" exige que ambas as partes sejam verdadeiras.',
              },
              {
                id: 'py-l3-ex3',
                type: 'code_editor',
                title: 'Prática: Classificador de Pontuação',
                instruction: 'Complete a função "verificar_aprovacao(nota)" para retornar "Aprovado" se nota for maior ou igual a 70, e "Reprovado" caso contrário.',
                language: 'python',
                starterCode: `def verificar_aprovacao(nota):
    if nota >= 70:
        return "Aprovado"
    else:
        return "Reprovado"
`,
                solutionCode: `def verificar_aprovacao(nota):
    if nota >= 70:
        return "Aprovado"
    else:
        return "Reprovado"`,
                testCases: [
                  {
                    inputDescription: 'verificar_aprovacao(75)',
                    expectedOutput: 'Aprovado',
                    assertionCode: 'verificar_aprovacao(75)',
                  },
                ],
                explanation: 'Muito bem! Condicionais simples com retorno direto deixam seu código pythônico e elegante.',
                hint: 'Use if nota >= 70: return "Aprovado" else: return "Reprovado".',
              },
            ],
          },
          {
            id: 'py-l4',
            unitId: 'py-u2',
            trackId: 'python',
            title: 'Loops com range() e enumerate()',
            description: 'Repita instruções com facilidade e itere sobre coleções com índices elegantes.',
            xpReward: 25,
            gemReward: 10,
            icon: '🔁',
            exercises: [
              {
                id: 'py-l4-ex1',
                type: 'theory',
                title: 'Iteração Pythônica com for e range()',
                instruction: 'Descubra como os loops em Python são poderosos e intuitivos:',
                language: 'python',
                theoryContent: {
                  summary: 'Em Python, o loop for itera diretamente sobre os itens de qualquer sequência. Para repetir um bloco N vezes, usamos a função geradora range(inicio, fim, passo).',
                  keyPoints: [
                    'for item in lista: Itera elemento a elemento',
                    'range(5): Gera a sequência 0, 1, 2, 3, 4 (o 5 não entra)',
                    'enumerate(lista): Retorna o índice e o valor simultaneamente: for i, item in enumerate(lista):',
                  ],
                  codeSnippet: `skills = ["Python", "Docker", "Git"]
for i, s in enumerate(skills, start=1):
    print(f"{i}. {s}")`,
                  proTip: 'Evite o padrão for i in range(len(lista)) quando não precisar de índices manuais; iterar diretamente nos itens é muito mais pythônico.',
                },
                explanation: 'Loops limpos facilitam o processamento em massa de dados e cálculos numéricos.',
                hint: 'range(a, b) gera números a partir de a até b - 1.',
              },
              {
                id: 'py-l4-ex2',
                type: 'predict_output',
                title: 'O que o acumulador exibirá?',
                instruction: 'Acompanhe a soma gerada pelo loop:',
                language: 'python',
                codeSnippet: `total = 0
for n in range(1, 5):
    total += n
print(total)`,
                options: ['10', '15', '4', '6'],
                correctAnswer: '10',
                explanation: 'range(1, 5) gera os números 1, 2, 3 e 4. A soma é: 1 + 2 + 3 + 4 = 10!',
                hint: 'Some os números 1 + 2 + 3 + 4.',
              },
              {
                id: 'py-l4-ex3',
                type: 'code_editor',
                title: 'Prática: Somar Números Pares',
                instruction: 'Crie uma função "somar_pares(numeros)" que receba uma lista e retorne a soma apenas dos números pares (onde n % 2 == 0).',
                language: 'python',
                starterCode: `def somar_pares(numeros):
    soma = 0
    for n in numeros:
        if n % 2 == 0:
            soma += n
    return soma
`,
                solutionCode: `def somar_pares(numeros):
    soma = 0
    for n in numeros:
        if n % 2 == 0:
            soma += n
    return soma`,
                testCases: [
                  {
                    inputDescription: 'somar_pares([1, 2, 3, 4, 5, 6])',
                    expectedOutput: '12',
                    assertionCode: 'somar_pares([1, 2, 3, 4, 5, 6])',
                  },
                ],
                explanation: 'Perfeito! O operador % calcula o resto da divisão. Se n % 2 == 0, o número é par.',
                hint: 'Use if n % 2 == 0: soma += n dentro do for.',
              },
            ],
          },
          {
            id: 'py-l5',
            unitId: 'py-u2',
            trackId: 'python',
            title: 'Dicionários & Mapeamentos Chave-Valor',
            description: 'Armazene e consulte dados estruturados com busca instantânea O(1).',
            xpReward: 25,
            gemReward: 15,
            icon: '🗂️',
            exercises: [
              {
                id: 'py-l5-ex1',
                type: 'theory',
                title: 'Dicionários (dict) em Python',
                instruction: 'Entenda os mapeamentos associativos em Python:',
                language: 'python',
                theoryContent: {
                  summary: 'Dicionários guardam pares de chave e valor entre chaves {}. A busca por chave é ultrarrápida (tabela hash O(1)). Você pode acessar com colchetes ou de forma segura com .get().',
                  keyPoints: [
                    'aluno = {"nome": "Lucas", "xp": 450, "ativo": True}',
                    'aluno["xp"] += 50 (Modifica o valor associado)',
                    '.get("cargo", "Estagiário") (Retorna valor default sem quebrar se a chave faltar)',
                    'Iterar pares: for k, v in aluno.items():',
                  ],
                  codeSnippet: `config = {"tema": "dark", "som": True}
config["nivel"] = 3
print(config.get("idioma", "pt-BR")) # pt-BR`,
                  proTip: 'Use sempre .get() quando não tiver certeza se a chave existe para evitar o temido KeyError.',
                },
                explanation: 'Dicionários são a base para lidar com APIs, bancos de dados e JSON em Python.',
                hint: 'Chaves são associadas a valores com dois-pontos (chave: valor).',
              },
              {
                id: 'py-l5-ex2',
                type: 'predict_output',
                title: 'Qual valor será recuperado?',
                instruction: 'Analise o uso de .get() com valor padrão:',
                language: 'python',
                codeSnippet: `carcara = {"especie": "Caracara plancus", "bioma": "Cerrado"}
dieta = carcara.get("dieta", "Onívoro Oportunista")
print(dieta)`,
                options: ['None', 'Onívoro Oportunista', 'KeyError', 'Cerrado'],
                correctAnswer: 'Onívoro Oportunista',
                explanation: 'A chave "dieta" não está no dicionário, então .get() retornou o fallback seguro "Onívoro Oportunista".',
                hint: 'A chave "dieta" não existe, então o fallback é usado.',
              },
              {
                id: 'py-l5-ex3',
                type: 'code_editor',
                title: 'Prática: Atualize e Retorne Dados do Jogador',
                instruction: 'Crie uma função "subir_nivel(perfil)" que incremente perfil["nivel"] em 1 e retorne o novo valor.',
                language: 'python',
                starterCode: `def subir_nivel(perfil):
    perfil["nivel"] = perfil.get("nivel", 1) + 1
    return perfil["nivel"]
`,
                solutionCode: `def subir_nivel(perfil):
    perfil["nivel"] = perfil.get("nivel", 1) + 1
    return perfil["nivel"]`,
                testCases: [
                  {
                    inputDescription: 'subir_nivel({"nome": "Dev", "nivel": 1})',
                    expectedOutput: '2',
                    assertionCode: 'subir_nivel({"nome": "Dev", "nivel": 1})',
                  },
                ],
                explanation: 'Excelente! Você atualizou o dicionário com facilidade.',
                hint: 'perfil["nivel"] = perfil.get("nivel", 1) + 1',
              },
            ],
          },
        ],
      },
      {
        id: 'py-u3',
        title: 'Unidade 3: Funções Avançadas & Tratamento de Erros',
        description: 'Construa funções profissionais com *args/**kwargs e proteja seu código com try/except.',
        trackId: 'python',
        color: '#f59e0b',
        badgeReward: {
          title: 'Engenheiro Resiliente',
          icon: '🛡️',
        },
        lessons: [
          {
            id: 'py-l6',
            unitId: 'py-u3',
            trackId: 'python',
            title: 'Parâmetros Nomeados e *args/**kwargs',
            description: 'Receba número flexível de argumentos e valores padrão inteligentes.',
            xpReward: 30,
            gemReward: 15,
            icon: '⚙️',
            exercises: [
              {
                id: 'py-l6-ex1',
                type: 'theory',
                title: 'Flexibilidade Máxima com *args e **kwargs',
                instruction: 'Entenda como construir funções verdadeiramente reutilizáveis:',
                language: 'python',
                theoryContent: {
                  summary: '*args agrupa argumentos posicionais em uma tupla, enquanto **kwargs agrupa argumentos nomeados em um dicionário. Isso permite que sua função aceite qualquer quantidade de parâmetros.',
                  keyPoints: [
                    'def somar(*args): args é uma tupla de valores (1, 2, 3...)',
                    'def configurar(**kwargs): kwargs é um dict {"cor": "azul", "tamanho": 10}',
                    'Parâmetros com padrão default: def saudar(nome, pontuacao=100)',
                  ],
                  codeSnippet: `def registrar_evento(tipo, *tags, **metadados):
    print(f"Evento: {tipo}")
    print(f"Tags: {tags}")
    print(f"Metadados: {metadados}")`,
                  proTip: 'A ordem padrão dos parâmetros é sempre: posicionais normais -> *args -> parâmetros nomeados -> **kwargs.',
                },
                explanation: 'Essa flexibilidade é o segredo de frameworks famosos como FastAPI e Flask.',
                hint: '* para tuplas posicionais, ** para dicionários nomeados.',
              },
              {
                id: 'py-l6-ex2',
                type: 'predict_output',
                title: 'O que será somado por *args?',
                instruction: 'Acompanhe a chamada da função:',
                language: 'python',
                codeSnippet: `def multiplicar_todos(*nums):
    res = 1
    for n in nums:
        res *= n
    return res

print(multiplicar_todos(2, 3, 4))`,
                options: ['24', '9', '12', 'Erro de Sintaxe'],
                correctAnswer: '24',
                explanation: '*nums empacota (2, 3, 4). O loop calcula 1 * 2 * 3 * 4 = 24!',
                hint: 'Multiplique 2 * 3 * 4.',
              },
              {
                id: 'py-l6-ex3',
                type: 'code_editor',
                title: 'Prática: Criador de Saudação Personalizada',
                instruction: 'Escreva a função "criar_mensagem(nome, prefixo=\\"Dev\\")" que retorne f"{prefixo} {nome} conectado!".',
                language: 'python',
                starterCode: `def criar_mensagem(nome, prefixo="Dev"):
    return f"{prefixo} {nome} conectado!"
`,
                solutionCode: `def criar_mensagem(nome, prefixo="Dev"):
    return f"{prefixo} {nome} conectado!"`,
                testCases: [
                  {
                    inputDescription: 'criar_mensagem("Larissa")',
                    expectedOutput: 'Dev Larissa conectado!',
                    assertionCode: 'criar_mensagem("Larissa")',
                  },
                ],
                explanation: 'Show! Os valores padrão oferecem conveniência e legibilidade ao chamador da função.',
                hint: 'Defina o parâmetro default prefixo="Dev".',
              },
            ],
          },
          {
            id: 'py-l7',
            unitId: 'py-u3',
            trackId: 'python',
            title: 'Manipulação de Erros com try/except/finally',
            description: 'Nunca deixe seu app quebrar: capture exceções de forma elegante e controlada.',
            xpReward: 30,
            gemReward: 15,
            icon: '🧯',
            exercises: [
              {
                id: 'py-l7-ex1',
                type: 'theory',
                title: 'Tratamento de Exceções em Python',
                instruction: 'Aprenda a lidar com imprevistos sem encerrar o programa:',
                language: 'python',
                theoryContent: {
                  summary: 'Erros em tempo de execução são chamados de Exceções. Com o bloco try...except, você intercepta o erro e executa uma ação de contingência segura.',
                  keyPoints: [
                    'try: Código arriscado que pode falhar',
                    'except NomeDaExcecao: O que fazer se falhar',
                    'finally: Bloco que SEMPRE roda (mesmo que haja erro ou return)',
                  ],
                  codeSnippet: `try:
    num = int("123")
    res = 10 / num
except ValueError:
    print("Texto inválido!")
except ZeroDivisionError:
    print("Divisão por zero proibida!")
finally:
    print("Operação finalizada.")`,
                  proTip: 'Nunca use um except: vazio sem especificar o tipo de erro, pois isso esconde bugs e captura até o Ctrl+C do usuário.',
                },
                explanation: 'A resiliência é a marca de um software pronto para produção.',
                hint: 'try testa, except captura e trata.',
              },
              {
                id: 'py-l7-ex2',
                type: 'predict_output',
                title: 'O que será retornado no bloco seguro?',
                instruction: 'Analise o fluxo com try e except:',
                language: 'python',
                codeSnippet: `def conversao_segura(valor):
    try:
        return int(valor) * 2
    except ValueError:
        return 0

print(conversao_segura("abc"))`,
                options: ['0', 'None', 'ValueError', 'abcabc'],
                correctAnswer: '0',
                explanation: 'A conversão int("abc") dispara ValueError. O bloco except captura e retorna o fallback 0.',
                hint: '"abc" não pode ser convertido para número inteiro.',
              },
              {
                id: 'py-l7-ex3',
                type: 'code_editor',
                title: 'Prática: Divisão Segura',
                instruction: 'Complete a função "dividir_seguro(a, b)" para retornar a / b dentro de um try, e retornar 0 caso ocorra ZeroDivisionError.',
                language: 'python',
                starterCode: `def dividir_seguro(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return 0
`,
                solutionCode: `def dividir_seguro(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return 0`,
                testCases: [
                  {
                    inputDescription: 'dividir_seguro(10, 0)',
                    expectedOutput: '0',
                    assertionCode: 'dividir_seguro(10, 0)',
                  },
                ],
                explanation: 'Excelente! Sua função nunca travará por causa de uma divisão por zero.',
                hint: 'Use try: return a / b except ZeroDivisionError: return 0.',
              },
            ],
          },
        ],
      },
      {
        id: 'py-u4',
        title: 'Unidade 4: Programação Orientada a Objetos (POO)',
        description: 'Modele o mundo real em código com Classes, instâncias, atributos, métodos e herança.',
        trackId: 'python',
        color: '#f59e0b',
        badgeReward: {
          title: 'Arquiteto de Classes',
          icon: '🏛️',
        },
        lessons: [
          {
            id: 'py-l8',
            unitId: 'py-u4',
            trackId: 'python',
            title: 'Classes, Objetos e o Método __init__',
            description: 'Como criar moldes para gerar objetos com estado próprio e métodos de ação.',
            xpReward: 35,
            gemReward: 20,
            icon: '📦',
            exercises: [
              {
                id: 'py-l8-ex1',
                type: 'theory',
                title: 'O Construtor __init__ e a palavra-chave self',
                instruction: 'Entenda os alicerces da Orientação a Objetos em Python:',
                language: 'python',
                theoryContent: {
                  summary: 'Uma classe é como a planta de uma casa; o objeto é a casa construída. O método especial __init__ é o construtor executado na criação de cada objeto. O parâmetro "self" representa a instância individual.',
                  keyPoints: [
                    'class Personagem: Cria a classe',
                    'def __init__(self, nome, vidas=3): Inicializa os atributos',
                    'self.nome = nome (Armazena no objeto)',
                    'hero = Personagem("Carcará") (Instancia o objeto)',
                  ],
                  codeSnippet: `class Robô:
    def __init__(self, nome, versao="1.0"):
        self.nome = nome
        self.versao = versao
    
    def saudar(self):
        return f"Beep-boop! Sou {self.nome} v{self.versao}"`,
                  proTip: 'Todo método dentro de uma classe DEVE receber "self" como primeiro parâmetro!',
                },
                explanation: 'POO organiza sistemas complexos em componentes reutilizáveis e coesos.',
                hint: 'self aponta para o próprio objeto que foi instanciado.',
              },
              {
                id: 'py-l8-ex2',
                type: 'predict_output',
                title: 'Qual atributo será exibido?',
                instruction: 'Analise a criação e leitura da instância:',
                language: 'python',
                codeSnippet: `class Guerreiro:
    def __init__(self, nome, ataque=50):
        self.nome = nome
        self.ataque = ataque

g = Guerreiro("Carcará", 95)
print(f"{g.nome}: {g.ataque} ATQ")`,
                options: ['Carcará: 95 ATQ', 'Guerreiro: 50 ATQ', 'Carcará: 50 ATQ', 'AttributeError'],
                correctAnswer: 'Carcará: 95 ATQ',
                explanation: 'O objeto g foi inicializado com nome "Carcará" e ataque 95.',
                hint: 'Veja os valores passados ao instanciar o Guerreiro.',
              },
              {
                id: 'py-l8-ex3',
                type: 'code_editor',
                title: 'Prática: Crie a Classe ItemMagico',
                instruction: 'Complete a classe "ItemMagico" com __init__(self, nome, poder) e método "descricao(self)" que retorne f"{self.nome} (+{self.poder} poder)".',
                language: 'python',
                starterCode: `class ItemMagico:
    def __init__(self, nome, poder):
        self.nome = nome
        self.poder = poder
    
    def descricao(self):
        return f"{self.nome} (+{self.poder} poder)"
`,
                solutionCode: `class ItemMagico:
    def __init__(self, nome, poder):
        self.nome = nome
        self.poder = poder
    
    def descricao(self):
        return f"{self.nome} (+{self.poder} poder)"`,
                testCases: [
                  {
                    inputDescription: 'ItemMagico("Espada de Fogo", 40).descricao()',
                    expectedOutput: 'Espada de Fogo (+40 poder)',
                    assertionCode: 'ItemMagico("Espada de Fogo", 40).descricao()',
                  },
                ],
                explanation: 'Parabéns! Você construiu sua primeira classe com métodos de instância em Python.',
                hint: 'Defina o método def descricao(self): return f"{self.nome} (+{self.poder} poder)".',
              },
            ],
          },
          {
            id: 'py-l9',
            unitId: 'py-u4',
            trackId: 'python',
            title: 'Herança & Polimorfismo',
            description: 'Especialize classes filhas reaproveitando a classe mãe com super().',
            xpReward: 35,
            gemReward: 20,
            icon: '🧬',
            exercises: [
              {
                id: 'py-l9-ex1',
                type: 'theory',
                title: 'Herança com super() e Sobrescrita de Métodos',
                instruction: 'Veja como classes filhas herdam características de suas mães:',
                language: 'python',
                theoryContent: {
                  summary: 'Herança permite que uma classe filha herde todos os atributos e métodos de uma classe base. Com super().__init__(), a classe filha chama o construtor pai e pode adicionar novos comportamentos.',
                  keyPoints: [
                    'class DevPython(Programador): Herda da classe Programador',
                    'super().__init__(nome): Inicializa a classe base',
                    'Sobrescrita (Override): Reimplementar um método para ter comportamento específico',
                  ],
                  codeSnippet: `class Veiculo:
    def buzinar(self):
        return "Bip bip!"

class Caminhao(Veiculo):
    def buzinar(self):
        return "Fom fom!" # Sobrescreveu!`,
                  proTip: 'Herança é ideal quando existe uma relação de "é um" (ex: Caminhão É UM Veículo).',
                },
                explanation: 'Herança elimina duplicação de código em grandes projetos.',
                hint: 'Coloque a classe mãe entre parênteses na definição da classe filha.',
              },
              {
                id: 'py-l9-ex2',
                type: 'predict_output',
                title: 'O que o método polimórfico retornará?',
                instruction: 'Analise a herança e sobrescrita abaixo:',
                language: 'python',
                codeSnippet: `class Notificador:
    def enviar(self, msg):
        return f"Notificação: {msg}"

class NotificadorUrgente(Notificador):
    def enviar(self, msg):
        return f"🚨 URGENTE: {msg}"

n = NotificadorUrgente()
print(n.enviar("Ofensiva em risco!"))`,
                options: ['🚨 URGENTE: Ofensiva em risco!', 'Notificação: Ofensiva em risco!', 'None', 'Erro de Execução'],
                correctAnswer: '🚨 URGENTE: Ofensiva em risco!',
                explanation: 'A instância de NotificadorUrgente executa seu método sobrescrito, inserindo o prefixo de alerta.',
                hint: 'A classe filha define sua própria versão do método enviar().',
              },
              {
                id: 'py-l9-ex3',
                type: 'code_editor',
                title: 'Prática: Subclasse Especializada',
                instruction: 'Defina a classe "ContaBonus" herdando de "ContaBancaria" (que já tem self.saldo) e crie o método "render_bonus(self)" adicionando +10 ao self.saldo.',
                language: 'python',
                starterCode: `class ContaBancaria:
    def __init__(self, saldo=100):
        self.saldo = saldo

class ContaBonus(ContaBancaria):
    def render_bonus(self):
        self.saldo += 10
        return self.saldo
`,
                solutionCode: `class ContaBancaria:
    def __init__(self, saldo=100):
        self.saldo = saldo

class ContaBonus(ContaBancaria):
    def render_bonus(self):
        self.saldo += 10
        return self.saldo`,
                testCases: [
                  {
                    inputDescription: 'ContaBonus(100).render_bonus()',
                    expectedOutput: '110',
                    assertionCode: 'ContaBonus(100).render_bonus()',
                  },
                ],
                explanation: 'Excelente! Você usou herança para estender funcionalidades com elegância.',
                hint: 'Na classe ContaBonus, defina def render_bonus(self): self.saldo += 10 return self.saldo.',
              },
            ],
          },
        ],
      },
      {
        id: 'py-u5',
        title: 'Unidade 5: Python no Mundo Real & Algoritmos Práticos',
        description: 'Manipule dados JSON, formatos modernos e implemente algoritmos fundamentais de busca.',
        trackId: 'python',
        color: '#f59e0b',
        badgeReward: {
          title: 'Lenda do Python',
          icon: '👑',
        },
        lessons: [
          {
            id: 'py-l10',
            unitId: 'py-u5',
            trackId: 'python',
            title: 'Manipulação de Dados e JSON',
            description: 'Conecte seu código com o mundo das APIs e formatos universais da web.',
            xpReward: 40,
            gemReward: 25,
            icon: '🌐',
            exercises: [
              {
                id: 'py-l10-ex1',
                type: 'theory',
                title: 'Serialização e Desserialização com o módulo json',
                instruction: 'Aprenda a ponte entre Python e a Web:',
                language: 'python',
                theoryContent: {
                  summary: 'O módulo nativo "json" permite converter objetos Python (dicionários e listas) em texto JSON (json.dumps) e decodificar strings JSON de volta para estruturas nativas (json.loads).',
                  keyPoints: [
                    'import json',
                    'json.dumps(dict) -> Retorna string JSON formatada',
                    'json.loads(string) -> Converte para dict ou list Python',
                  ],
                  codeSnippet: `import json
dados = {"usuario": "Carcará", "xp": 1000}
json_str = json.dumps(dados)
print(json_str) # '{"usuario": "Carcará", "xp": 1000}'`,
                  proTip: 'A letra "s" em dumps e loads significa "string" (opera sobre texto na memória).',
                },
                explanation: 'Praticamente toda API moderna e banco NoSQL comunica dados via JSON.',
                hint: 'dumps = dump to string, loads = load from string.',
              },
              {
                id: 'py-l10-ex2',
                type: 'predict_output',
                title: 'O que json.loads() retorna?',
                instruction: 'Qual tipo de dado é produzido ao fazer o parse de um objeto JSON?',
                language: 'python',
                codeSnippet: `import json
texto = '{"status": "online", "ping": 18}'
objeto = json.loads(texto)
print(objeto["status"])`,
                options: ['online', '18', '{"status": "online"}', 'Erro de Sintaxe'],
                correctAnswer: 'online',
                explanation: 'json.loads() converte a string no dicionário Python {"status": "online", "ping": 18}, e o acesso por chave ["status"] retorna "online".',
                hint: 'Acesse o valor correspondente à chave "status".',
              },
              {
                id: 'py-l10-ex3',
                type: 'code_editor',
                title: 'Prática: Extraia Chaves de um Payload',
                instruction: 'Crie uma função "obter_xp_json(json_str)" que use json.loads(json_str) e retorne o valor da chave "xp".',
                language: 'python',
                starterCode: `import json

def obter_xp_json(json_str):
    dados = json.loads(json_str)
    return dados.get("xp", 0)
`,
                solutionCode: `import json

def obter_xp_json(json_str):
    dados = json.loads(json_str)
    return dados.get("xp", 0)`,
                testCases: [
                  {
                    inputDescription: 'obter_xp_json(\'{"xp": 250}\')',
                    expectedOutput: '250',
                    assertionCode: 'obter_xp_json(\'{"xp": 250}\')',
                  },
                ],
                explanation: 'Sensacional! Você já sabe processar payloads de APIs reais em Python.',
                hint: 'Use dados = json.loads(json_str) e retorne dados.get("xp", 0).',
              },
            ],
          },
          {
            id: 'py-l11',
            unitId: 'py-u5',
            trackId: 'python',
            title: 'Algoritmos de Busca e Otimização',
            description: 'Entenda como computadores encontram dados rapidamente com busca linear e binária.',
            xpReward: 40,
            gemReward: 25,
            icon: '⚡',
            exercises: [
              {
                id: 'py-l11-ex1',
                type: 'theory',
                title: 'Busca Linear vs Busca Binária',
                instruction: 'Como a eficiência de algoritmos transforma seu código:',
                language: 'python',
                theoryContent: {
                  summary: 'Na busca linear, você examina elemento por elemento (O(N)). Na busca binária, em uma lista já ordenada, você descarta metade dos elementos a cada comparação (O(log N)).',
                  keyPoints: [
                    'Busca linear: Funciona em qualquer lista desordenada',
                    'Busca binária: EXIGE que a lista esteja ordenada',
                    'Com 1.000.000 de itens: a busca linear faz até 1.000.000 de passos; a binária faz no máximo 20 passos!',
                  ],
                  codeSnippet: `def busca_linear(lista, alvo):
    for i, item in enumerate(lista):
        if item == alvo:
            return i
    return -1`,
                  proTip: 'Python tem o módulo nativo "bisect" otimizado em C para busca binária instantânea.',
                },
                explanation: 'A compreensão de algoritmos e complexidade é o diferencial de programadores experientes.',
                hint: 'A busca binária divide a busca ao meio a cada iteração.',
              },
              {
                id: 'py-l11-ex2',
                type: 'predict_output',
                title: 'Qual índice será retornado?',
                instruction: 'Analise o algoritmo de busca:',
                language: 'python',
                codeSnippet: `elementos = ["python", "javascript", "rust", "java"]
alvo = "rust"

def localizar(lista, item):
    if item in lista:
        return lista.index(item)
    return -1

print(localizar(elementos, alvo))`,
                options: ['2', '1', '3', '-1'],
                correctAnswer: '2',
                explanation: '"rust" está na posição de índice 2 da lista (índices 0: python, 1: javascript, 2: rust).',
                hint: 'Lembre-se que índices começam em 0.',
              },
              {
                id: 'py-l11-ex3',
                type: 'code_editor',
                title: 'Prática: Implemente a Busca Linear',
                instruction: 'Complete a função "encontrar_indice(lista, item)" para retornar o índice do item ou -1 se não existir.',
                language: 'python',
                starterCode: `def encontrar_indice(lista, item):
    for i, val in enumerate(lista):
        if val == item:
            return i
    return -1
`,
                solutionCode: `def encontrar_indice(lista, item):
    for i, val in enumerate(lista):
        if val == item:
            return i
    return -1`,
                testCases: [
                  {
                    inputDescription: 'encontrar_indice([10, 20, 30], 30)',
                    expectedOutput: '2',
                    assertionCode: 'encontrar_indice([10, 20, 30], 30)',
                  },
                ],
                explanation: 'Parabéns! Você completou a jornada de Python do ByteLingo com maestria!',
                hint: 'Use for i, val in enumerate(lista): if val == item: return i, e no final return -1.',
              },
            ],
          },
        ],
      },
    ],
  };
