import { Track } from '../../types';

export const JAVA_TRACK: Track = {
  id: 'java',
  name: 'Java',
  icon: '☕',
  color: 'sky',
  accentColor: '#0284c7',
  tagline: 'Robustez empresarial, tipagem estática e a espinha dorsal de sistemas corporativos globais e Android.',
  units: [
    {
      id: 'java-u1',
      title: 'Unidade 1: Orientação a Objetos & Estrutura',
      description: 'Tudo é classe! Entenda a anatomia canônica do Java, o método main e tipos primitivos.',
      trackId: 'java',
      color: '#0284c7',
      badgeReward: {
        title: 'Arquiteto Java I',
        icon: '☕',
      },
      lessons: [
        {
          id: 'java-l1',
          unitId: 'java-u1',
          trackId: 'java',
          title: 'A Estrutura da Classe & o Método main',
          description: 'Por que todo programa Java começa com public static void main(String[] args).',
          xpReward: 25,
          gemReward: 10,
          icon: '🏛️',
          exercises: [
            {
              id: 'java-l1-ex1',
              type: 'theory',
              title: 'O Ponto de Entrada da JVM',
              instruction: 'Compreenda a anatomia de um arquivo Java:',
              language: 'java',
              theoryContent: {
                summary: 'Em Java, todo código reside dentro de uma classe. O ponto de entrada da Máquina Virtual Java (JVM) é o método sagrado "public static void main(String[] args)".',
                keyPoints: [
                  'public: Acessível pela JVM de qualquer lugar',
                  'static: Executa sem precisar instanciar a classe',
                  'void: Não devolve valor',
                  'System.out.println(): Comando padrão para imprimir no console com quebra de linha',
                ],
                codeSnippet: `public class Principal {
    public static void main(String[] args) {
        System.out.println("Olá, Java!");
    }
}`,
                proTip: 'Todas as instruções dentro de métodos Java PRECISAM terminar com ponto e vírgula (;)!',
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
              explanation: 'System.out.println("...") é a chamada de saída padrão canônica em Java.',
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
        System.out.println("Dev Java Concluído!");
    }
}`,
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
        {
          id: 'java-l2',
          unitId: 'java-u1',
          trackId: 'java',
          title: 'Tipos Primitivos vs Wrappers',
          description: 'Diferença entre int e Integer, boolean e Boolean, double e String.',
          xpReward: 25,
          gemReward: 10,
          icon: '🏷️',
          exercises: [
            {
              id: 'java-l2-ex1',
              type: 'theory',
              title: 'Tipagem Estática em Java',
              instruction: 'Entenda os 8 tipos primitivos e suas classes Wrapper:',
              language: 'java',
              theoryContent: {
                summary: 'Java divide dados em Tipos Primitivos (armazenados diretamente na Stack: int, double, boolean, char, etc.) e Wrappers de Objetos (Integer, Double, Boolean) que oferecem métodos utilitários e suportam coleções genéricas.',
                keyPoints: [
                  'int idade = 25; // Primitivo de alta velocidade',
                  'String nome = "Carlos"; // Objeto na Heap',
                  'Integer.parseInt("150"): Converte texto para número inteiro',
                ],
                codeSnippet: `int a = 10;
double b = 2.5;
double total = a * b; // 25.0`,
                proTip: 'Primitivos não podem ser null, o que previne surpresas; Wrappers podem ser null!',
              },
              explanation: 'A clareza dos tipos em Java permite que o compilador otimize o código de máquina.',
              hint: 'Primitivos começam com letra minúscula (int), classes com maiúscula (Integer).',
            },
            {
              id: 'java-l2-ex2',
              type: 'predict_output',
              title: 'Qual valor será exibido?',
              instruction: 'Calcule a divisão inteira em Java:',
              language: 'java',
              codeSnippet: `public class Main {
    public static void main(String[] args) {
        int resultado = 7 / 2;
        System.out.println(resultado);
    }
}`,
              options: ['3', '3.5', '4', '3.0'],
              correctAnswer: '3',
              explanation: 'A divisão entre dois inteiros em Java descarta a fração decimal e retorna o quociente inteiro 3!',
              hint: 'Divisão de inteiros trunca as casas decimais.',
            },
          ],
        },
      ],
    },
    {
      id: 'java-u2',
      title: 'Unidade 2: Controle de Fluxo, Loops & Arrays',
      description: 'Controle decisões com if/else, switch moderno, loops for-each e vetores.',
      trackId: 'java',
      color: '#0369a1',
      badgeReward: {
        title: 'Mestre do Fluxo Java',
        icon: '🔀',
      },
      lessons: [
        {
          id: 'java-l3',
          unitId: 'java-u2',
          trackId: 'java',
          title: 'Decisões com if / else e switch',
          description: 'Crie ramificações condicionais e avaliações de opções múltiplas.',
          xpReward: 25,
          gemReward: 15,
          icon: '🚦',
          exercises: [
            {
              id: 'java-l3-ex1',
              type: 'theory',
              title: 'Condicionais e Switch em Java',
              instruction: 'Aprenda as estruturas de controle:',
              language: 'java',
              theoryContent: {
                summary: 'Em Java, a expressão do if DEVE avaliar estritamente para um booleano (não há "truthy" implícito como em JS). Para verificar valores categóricos, o switch é elegante e veloz.',
                keyPoints: [
                  'if (pontos >= 100) { ... } else { ... }',
                  'Para comparar textos (Strings) NUNCA use ==; use sempre .equals(): nome.equals("admin")',
                  'Switch moderno com setas -> dispensa o break!',
                ],
                codeSnippet: `String cargo = "Dev";
if (cargo.equals("Dev")) {
    System.out.println("Acesso ao repositório liberado!");
}`,
                proTip: 'Sempre compare Strings com .equals() para comparar o conteúdo real e não o endereço de memória!',
              },
              explanation: 'A precisão lógica em Java evita comportamentos ambíguos.',
              hint: 'Use .equals() para verificar igualdade de textos em Java.',
            },
            {
              id: 'java-l3-ex2',
              type: 'spot_bug',
              title: 'O Erro Clássico de Comparação de String',
              instruction: 'Toque na linha que compara Strings usando == em vez de .equals():',
              language: 'java',
              codeLines: [
                'String status = new String("OK");',
                'if (status == "OK") {',
                '    System.out.println("Aprovado");',
                '}',
              ],
              bugLineIndex: 1,
              explanation: 'Comparar Strings com == compara referências de memória e falhará quando forem instâncias diferentes. O correto é if (status.equals("OK"))!',
              hint: 'Qual linha usou o operador == em um objeto String?',
            },
          ],
        },
        {
          id: 'java-l4',
          unitId: 'java-u2',
          trackId: 'java',
          title: 'Loops for, while & Enhanced For (For-Each)',
          description: 'Itere com elegância sobre sequências e coleções usando for (Tipo item : lista).',
          xpReward: 30,
          gemReward: 15,
          icon: '🔁',
          exercises: [
            {
              id: 'java-l4-ex1',
              type: 'theory',
              title: 'O For-Each Moderno do Java',
              instruction: 'Diga adeus ao controle manual de índices:',
              language: 'java',
              theoryContent: {
                summary: 'O Enhanced For (for-each) itera diretamente sobre cada elemento de um array ou coleção sem necessidade de gerenciar contadores ou tamanho manual.',
                keyPoints: [
                  'for (Tipo item : colecao) { ... }',
                  'Mais limpo e imune a erros de IndexOutOfBoundsException',
                  'Para repetições condicionais abertas, continue usando while (condicao)',
                ],
                codeSnippet: `String[] linguagens = {"Java", "Python", "Rust"};
for (String lang : linguagens) {
    System.out.println("Linguagem: " + lang);
}`,
                proTip: 'Use for-each sempre que você só precisar ler os itens sem alterar o índice.',
              },
              explanation: 'O loop for-each torna o código limpo, seguro e expressivo.',
              hint: 'Dois-pontos (:) separam a variável declarada da coleção iterada.',
            },
            {
              id: 'java-l4-ex2',
              type: 'predict_output',
              title: 'Qual a soma final exibida pelo loop?',
              instruction: 'Acompanhe a acumulação no for-each:',
              language: 'java',
              codeSnippet: `public class Main {
    public static void main(String[] args) {
        int[] notas = {10, 20, 30};
        int soma = 0;
        for (int n : notas) {
            soma += n;
        }
        System.out.println(soma);
    }
}`,
              options: ['60', '30', '50', '0'],
              correctAnswer: '60',
              explanation: '10 + 20 + 30 = 60!',
              hint: 'Some todos os itens do vetor notas.',
            },
          ],
        },
        {
          id: 'java-l5',
          unitId: 'java-u2',
          trackId: 'java',
          title: 'Arrays & Vetores em Java',
          description: 'Coleções contíguas de tamanho fixo com verificação estrita de limites.',
          xpReward: 30,
          gemReward: 15,
          icon: '📊',
          exercises: [
            {
              id: 'java-l5-ex1',
              type: 'theory',
              title: 'Vetores de Tamanho Fixo',
              instruction: 'Entenda como arrays operam na JVM:',
              language: 'java',
              theoryContent: {
                summary: 'Arrays em Java possuem tamanho fixo determinado no momento de sua criação. A propriedade .length nos dá a contagem exata de posições alocadas.',
                keyPoints: [
                  'int[] numeros = new int[5]; // Cria array com 5 zeros',
                  'numeros.length: Retorna o tamanho total',
                  'Acessar índice fora do limite lança ArrayIndexOutOfBoundsException',
                ],
                codeSnippet: `int[] vidas = {5, 5, 4};
System.out.println("Tamanho: " + vidas.length); // 3`,
                proTip: 'Arrays primitivos têm alta performance de cache e baixa pegada de memória.',
              },
              explanation: 'Arrays formam a estrutura básica de suporte para buffers e estruturas de dados de alta velocidade.',
              hint: 'A propriedade é .length sem parênteses em arrays.',
            },
          ],
        },
      ],
    },
    {
      id: 'java-u3',
      title: 'Unidade 3: Encapsulamento, Construtores & Métodos',
      description: 'Proteja seus dados com modificadores private/public e orquestre instâncias com this.',
      trackId: 'java',
      color: '#075985',
      badgeReward: {
        title: 'Mestre do Encapsulamento',
        icon: '🔐',
      },
      lessons: [
        {
          id: 'java-l6',
          unitId: 'java-u3',
          trackId: 'java',
          title: 'Modificadores de Acesso & Getters/Setters',
          description: 'O princípio fundamental do encapsulamento em linguagens orientadas a objetos.',
          xpReward: 35,
          gemReward: 15,
          icon: '🛡️',
          exercises: [
            {
              id: 'java-l6-ex1',
              type: 'theory',
              title: 'O Pilar do Encapsulamento',
              instruction: 'Aprenda a blindar as variáveis internas de uma classe:',
              language: 'java',
              theoryContent: {
                summary: 'Encapsulamento significa esconder os detalhes internos e o estado de um objeto, expondo apenas operações seguras. Campos são marcados como private e acessados via métodos get (leitura) e set (modificação com validação).',
                keyPoints: [
                  'private: Acessível apenas dentro da própria classe',
                  'public: Acessível por qualquer classe externa',
                  'Setters permitem validar regras de negócio antes de alterar os campos',
                ],
                codeSnippet: `public class Conta {
    private double saldo;

    public double getSaldo() {
        return this.saldo;
    }

    public void depositar(double valor) {
        if (valor > 0) this.saldo += valor;
    }
}`,
                proTip: 'Manter campos como private protege seu sistema contra alterações acidentais de estado por terceiros.',
              },
              explanation: 'Encapsulamento garante integridade e facilita a manutenção do software corporativo.',
              hint: 'private esconde, public expõe.',
            },
            {
              id: 'java-l6-ex2',
              type: 'predict_output',
              title: 'Qual saldo o método getSaldo() retornará?',
              instruction: 'Acompanhe o método de depósito encapsulado:',
              language: 'java',
              codeSnippet: `public class Main {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.depositar(100);
        c.depositar(-50); // Inválido!
        System.out.println((int) c.getSaldo());
    }
}`,
              options: ['100', '50', '150', '0'],
              correctAnswer: '100',
              explanation: 'O depósito de -50 foi rejeitado pela validação interna do setter (if valor > 0), mantendo o saldo seguro em 100!',
              hint: 'Depósitos negativos são ignorados pela regra.',
            },
          ],
        },
        {
          id: 'java-l7',
          unitId: 'java-u3',
          trackId: 'java',
          title: 'Construtores & a Palavra-Chave this',
          description: 'Inicialize objetos com estado válido e diferencie campos de parâmetros.',
          xpReward: 35,
          gemReward: 20,
          icon: '🏗️',
          exercises: [
            {
              id: 'java-l7-ex1',
              type: 'theory',
              title: 'Construtores em Java',
              instruction: 'Entenda como novos objetos ganham vida na memória Heap:',
              language: 'java',
              theoryContent: {
                summary: 'O construtor possui exatamente o mesmo nome da classe e NÃO possui tipo de retorno. Ele é executado no instante em que o operador "new" é invocado. A palavra "this" se refere à instância atual para diferenciar atributos de argumentos de mesmo nome.',
                keyPoints: [
                  'public Jogador(String nome, int nivel) { this.nome = nome; this.nivel = nivel; }',
                  'new Jogador("Larissa", 5): Chama o construtor com os valores iniciais',
                  'Sobrecarga de construtores: Uma classe pode ter múltiplos construtores com assinaturas diferentes',
                ],
                codeSnippet: `public class Dev {
    private String nome;

    public Dev(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return this.nome;
    }
}`,
                proTip: 'Use this.campo para eliminar qualquer ambiguidade entre o atributo da classe e o argumento recebido.',
              },
              explanation: 'Construtores garantem que nenhum objeto seja instanciado com estado nulo ou corrompido.',
              hint: 'this aponta para o próprio objeto.',
            },
          ],
        },
      ],
    },
    {
      id: 'java-u4',
      title: 'Unidade 4: Herança, Polimorfismo & Interfaces',
      description: 'Reutilize código com extends, garanta contratos com implements e use @Override.',
      trackId: 'java',
      color: '#0c4a6e',
      badgeReward: {
        title: 'Mestre da Herança',
        icon: '👑',
      },
      lessons: [
        {
          id: 'java-l8',
          unitId: 'java-u4',
          trackId: 'java',
          title: 'Herança com extends & Sobrescrita (@Override)',
          description: 'Estenda classes base e especifique comportamentos especializados em subclasses.',
          xpReward: 35,
          gemReward: 20,
          icon: '🌳',
          exercises: [
            {
              id: 'java-l8-ex1',
              type: 'theory',
              title: 'Herança em Java',
              instruction: 'Veja como compartilhar código entre classes mãe e filha:',
              language: 'java',
              theoryContent: {
                summary: 'Com a palavra-chave extends, uma classe herda todos os métodos e atributos não-privados de sua superclasse. Para alterar o comportamento herdado, usamos a anotação @Override.',
                keyPoints: [
                  'public class Gerente extends Funcionario { ... }',
                  'super(): Invoca o construtor da superclasse mãe',
                  '@Override: Garante em tempo de compilação que o método está sobrescrevendo um método existente',
                ],
                codeSnippet: `public class Animal {
    public void emitirSom() {
        System.out.println("Som genérico");
    }
}

public class Carcara extends Animal {
    @Override
    public void emitirSom() {
        System.out.println("Cri-cri-iii!");
    }
}`,
                proTip: 'Sempre adicione @Override para que o compilador te alerte caso você erre uma letra no nome do método!',
              },
              explanation: 'Herança e polimorfismo são os motores dos grandes frameworks como Spring Boot.',
              hint: 'extends herda; @Override substitui a implementação.',
            },
            {
              id: 'java-l8-ex2',
              type: 'predict_output',
              title: 'Qual som o Carcará emitirá?',
              instruction: 'Acompanhe a invocação polimórfica:',
              language: 'java',
              codeSnippet: `public class Main {
    public static void main(String[] args) {
        Animal mascote = new Carcara();
        mascote.emitirSom();
    }
}`,
              options: ['Cri-cri-iii!', 'Som genérico', 'Erro de tipo', 'null'],
              correctAnswer: 'Cri-cri-iii!',
              explanation: 'Polimorfismo em ação! Mesmo a variável sendo do tipo Animal, o objeto real na memória é Carcara, disparando a versão sobrescrita!',
              hint: 'O objeto em tempo de execução determina o método executado.',
            },
          ],
        },
        {
          id: 'java-l9',
          unitId: 'java-u4',
          trackId: 'java',
          title: 'Interfaces & Contratos de Arquitetura',
          description: 'Defina padrões obrigatórios com a palavra-chave implements e desacople sistemas.',
          xpReward: 40,
          gemReward: 20,
          icon: '📜',
          exercises: [
            {
              id: 'java-l9-ex1',
              type: 'theory',
              title: 'O Poder das Interfaces',
              instruction: 'Aprenda a arquitetar sistemas desacoplados:',
              language: 'java',
              theoryContent: {
                summary: 'Uma interface é um contrato que especifica QUAIS métodos uma classe deve ter, sem ditar COMO ela deve implementá-los. Uma classe pode implementar múltiplas interfaces usando a palavra "implements".',
                keyPoints: [
                  'public interface Autenticavel { boolean login(String senha); }',
                  'public class Usuario implements Autenticavel { ... }',
                  'Injeção de Dependências depende 100% de interfaces!',
                ],
                codeSnippet: `public interface Notificador {
    void enviarMensagem(String msg);
}

public class EmailNotificador implements Notificador {
    public void enviarMensagem(String msg) {
        System.out.println("Email enviado: " + msg);
    }
}`,
                proTip: 'Programe voltado para interfaces e não para implementações concretas!',
              },
              explanation: 'Interfaces permitem trocar módulos e bancos de dados sem mexer no restante da aplicação.',
              hint: 'implements estabelece o cumprimento do contrato.',
            },
          ],
        },
      ],
    },
    {
      id: 'java-u5',
      title: 'Unidade 5: Coleções Modernas & Java Streams API',
      description: 'Domine a Java Collections Framework (ArrayList, HashMap) e pipelines funcionais com Streams.',
      trackId: 'java',
      color: '#1e1b4b',
      badgeReward: {
        title: 'Mestre Arquiteto Java',
        icon: '🏆',
      },
      lessons: [
        {
          id: 'java-l10',
          unitId: 'java-u5',
          trackId: 'java',
          title: 'ArrayList & HashMap (JCF)',
          description: 'Listas dinâmicas redimensionáveis e mapas chave-valor O(1) com Generics.',
          xpReward: 40,
          gemReward: 20,
          icon: '📦',
          exercises: [
            {
              id: 'java-l10-ex1',
              type: 'theory',
              title: 'Java Collections Framework',
              instruction: 'Aprenda a manipular coleções flexíveis:',
              language: 'java',
              theoryContent: {
                summary: 'Diferente dos arrays com tamanho estático, o ArrayList cresce automaticamente na memória conforme novos itens são inseridos via .add(). Já o HashMap permite busca quase instantânea através de pares de chave e valor via .put() e .get().',
                keyPoints: [
                  'List<String> nomes = new ArrayList<>();',
                  'nomes.add("ByteLingo"); nomes.size();',
                  'Map<String, Integer> xp = new HashMap<>();',
                  'xp.put("Larissa", 450); xp.get("Larissa");',
                ],
                codeSnippet: `List<String> tarefas = new ArrayList<>();
tarefas.add("Praticar Java");
tarefas.add("Fazer testes");
System.out.println("Tarefas: " + tarefas.size()); // 2`,
                proTip: 'Sempre declare a variável com a Interface genérica (List em vez de ArrayList, Map em vez de HashMap).',
              },
              explanation: 'A JCF é a base do armazenamento em memória de qualquer aplicação corporativa.',
              hint: 'add() insere na lista, size() retorna o total.',
            },
            {
              id: 'java-l10-ex2',
              type: 'predict_output',
              title: 'Qual valor o HashMap retornará?',
              instruction: 'Acompanhe o método .getOrDefault() no HashMap:',
              language: 'java',
              codeSnippet: `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> pontuacao = new HashMap<>();
        pontuacao.put("Python", 80);
        int javaXp = pontuacao.getOrDefault("Java", 0);
        System.out.println(javaXp);
    }
}`,
              options: ['0', '80', 'null', 'Erro'],
              correctAnswer: '0',
              explanation: 'A chave "Java" ainda não existia no mapa, então o método seguro .getOrDefault() retornou o fallback 0.',
              hint: 'getOrDefault retorna o segundo parâmetro caso a chave não exista.',
            },
          ],
        },
        {
          id: 'java-l11',
          unitId: 'java-u5',
          trackId: 'java',
          title: 'Streams API, Lambdas & Métodos Funcionais',
          description: 'Filtre, transforme e colete dados com o poder funcional das Streams do Java moderno.',
          xpReward: 45,
          gemReward: 25,
          icon: '⚡',
          exercises: [
            {
              id: 'java-l11-ex1',
              type: 'theory',
              title: 'Java Moderno com Streams',
              instruction: 'Descubra a revolução do Java 8 e versões recentes:',
              language: 'java',
              theoryContent: {
                summary: 'A Streams API permite processar coleções de dados de forma declarativa e paralelizável através de pipelines encadeados: filtragem (.filter()), transformação (.map()) e redução ou coleta (.toList()).',
                keyPoints: [
                  'Expressões Lambda: (x) -> x * 2',
                  '.filter(n -> n % 2 == 0): Mantém apenas itens que satisfazem a condição',
                  '.map(String::toUpperCase): Transforma os valores',
                  '.toList(): Converte o fluxo resultante de volta para uma lista imutável',
                ],
                codeSnippet: `List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6);
List<Integer> pares = numeros.stream()
    .filter(n -> n % 2 == 0)
    .toList();
// pares = [2, 4, 6]`,
                proTip: 'Streams não modificam a coleção de origem; elas produzem novos resultados com segurança e imutabilidade!',
              },
              explanation: 'Streams API é o padrão ouro na escrita de código limpo e de alta legibilidade em Java corporativo.',
              hint: 'filter() filtra; map() transforma; toList() recolhe.',
            },
            {
              id: 'java-l11-ex2',
              type: 'code_editor',
              title: 'Prática: Pipeline de Streams em Java',
              instruction: 'Complete a instrução dentro do método main para contar quantos nomes na lista possuem mais de 4 letras usando .stream().filter(s -> s.length() > 4).count().',
              language: 'java',
              starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> devs = List.of("Ana", "Carlos", "Beatriz", "Leo");
        long total = devs.stream().filter(s -> s.length() > 4).count();
        System.out.println("Maiores que 4 letras: " + total);
    }
}`,
              solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> devs = List.of("Ana", "Carlos", "Beatriz", "Leo");
        long total = devs.stream().filter(s -> s.length() > 4).count();
        System.out.println("Maiores que 4 letras: " + total);
    }
}`,
              testCases: [
                {
                  inputDescription: 'Contagem de strings > 4 caracteres',
                  expectedOutput: 'Maiores que 4 letras: 2',
                },
              ],
              explanation: 'Sensacional! "Carlos" e "Beatriz" possuem mais de 4 letras, resultando em 2.',
              hint: 'Use devs.stream().filter(s -> s.length() > 4).count();',
            },
          ],
        },
      ],
    },
  ],
};
