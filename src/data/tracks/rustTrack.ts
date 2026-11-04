import { Track } from '../../types';

export const RUST_TRACK: Track = {
  id: 'rust',
  name: 'Rust',
  icon: '🦀',
  color: 'orange',
  accentColor: '#ea580c',
  tagline: 'Velocidade extrema e segurança de memória garantida em compilação sem garbage collector.',
  units: [
    {
      id: 'rust-u1',
      title: 'Unidade 1: O Guardião de Memória',
      description: 'Conheça a imutabilidade por padrão, let mut, expressões e a macro println!.',
      trackId: 'rust',
      color: '#ea580c',
      badgeReward: {
        title: 'Caranguejo de Ferro I',
        icon: '🦀',
      },
      lessons: [
        {
          id: 'rust-l1',
          unitId: 'rust-u1',
          trackId: 'rust',
          title: 'Imutabilidade por Padrão & `let mut`',
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
    println!("Rust é incrível!");
}`,
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
        {
          id: 'rust-l2',
          unitId: 'rust-u1',
          trackId: 'rust',
          title: 'Tipos Escalares & Expressões',
          description: 'Aprenda tipos primitivos (i32, f64, bool) e por que blocos em Rust retornam valores.',
          xpReward: 30,
          gemReward: 10,
          icon: '💎',
          exercises: [
            {
              id: 'rust-l2-ex1',
              type: 'theory',
              title: 'Declarações vs Expressões',
              instruction: 'Descubra por que quase tudo em Rust é uma expressão:',
              language: 'rust',
              theoryContent: {
                summary: 'Em Rust, blocos entre chaves { } avaliam para uma expressão final caso a última linha NÃO termine com ponto e vírgula (;). Isso permite atribuir o resultado de if/else diretamente a variáveis!',
                keyPoints: [
                  'Tipos inteiros com tamanho exato: i32, u64, usize',
                  'Sem ponto e vírgula no final da linha = retorno da expressão',
                  'let resultado = if ok { 10 } else { 0 };',
                ],
                codeSnippet: `let bonus = if nivel >= 5 {
    100
} else {
    20
};
println!("Bônus: {}", bonus);`,
                proTip: 'Se colocar ponto e vírgula (;) na última linha, a expressão retorna a tupla vazia () (unit type)!',
              },
              explanation: 'A natureza expressiva do Rust elimina variáveis temporárias mutáveis desnecessárias.',
              hint: 'A última linha sem ponto e vírgula é o retorno da expressão.',
            },
            {
              id: 'rust-l2-ex2',
              type: 'predict_output',
              title: 'Qual valor a expressão atribuirá?',
              instruction: 'Analise o retorno do bloco sem ponto e vírgula:',
              language: 'rust',
              codeSnippet: `fn main() {
    let x = {
        let y = 3;
        y + 2
    };
    println!("{}", x);
}`,
              options: ['5', '3', '2', '()'],
              correctAnswer: '5',
              explanation: 'A linha "y + 2" não possui ponto e vírgula, logo avalia para 5 e é atribuída a x.',
              hint: 'Some y (3) com 2.',
            },
          ],
        },
      ],
    },
    {
      id: 'rust-u2',
      title: 'Unidade 2: Ownership & Borrowing',
      description: 'O conceito mais revolucionário da computação: gerencie memória com precisão cirúrgica.',
      trackId: 'rust',
      color: '#c2410c',
      badgeReward: {
        title: 'Mestre da Posse',
        icon: '🔑',
      },
      lessons: [
        {
          id: 'rust-l3',
          unitId: 'rust-u2',
          trackId: 'rust',
          title: 'Ownership & Movimentação (Move vs Clone)',
          description: 'Apenas um proprietário por recurso na memória Heap. Entenda o Move semântico.',
          xpReward: 35,
          gemReward: 15,
          icon: '📦',
          exercises: [
            {
              id: 'rust-l3-ex1',
              type: 'theory',
              title: 'As 3 Leis do Ownership',
              instruction: 'Memorize as regras de ouro do Rust:',
              language: 'rust',
              theoryContent: {
                summary: '1. Cada valor em Rust tem um proprietário (owner);\n2. Só pode haver um único proprietário por vez;\n3. Quando o proprietário sai de escopo, o valor é desalocado automaticamente (drop) da memória.',
                keyPoints: [
                  'Atribuição de dados na Heap faz MOVE: a variável antiga fica inválida!',
                  'Para duplicar dados na Heap explicitamente, use .clone()',
                  'Tipos simples da Stack (como inteiros) implementam a trait Copy',
                ],
                codeSnippet: `let s1 = String::from("Rust");
let s2 = s1; // MOVE! s1 agora é inválida
// println!("{}", s1); // ERRO DE COMPILAÇÃO!
println!("{}", s2); // "Rust"`,
                proTip: 'Isso previne "Double Free" e "Use-After-Free" sem precisar de Garbage Collector em tempo de execução!',
              },
              explanation: 'Ownership garante performance de C com a segurança de linguagens de alto nível.',
              hint: 'Após o move, a variável original deixa de existir para o compilador.',
            },
            {
              id: 'rust-l3-ex2',
              type: 'spot_bug',
              title: 'Identifique o Uso Ilegal Após o Move',
              instruction: 'Toque na linha onde a variável movida é acessada ilegalmente:',
              language: 'rust',
              codeLines: [
                'fn main() {',
                '    let original = String::from("ByteLingo");',
                '    let transferido = original;',
                '    println!("{}", original);',
                '}',
              ],
              bugLineIndex: 3,
              explanation: 'error[E0382]: borrow of moved value: `original`. A posse da String foi transferida para `transferido` na linha 2!',
              hint: 'Não podemos ler `original` após ter sido movida.',
            },
          ],
        },
        {
          id: 'rust-l4',
          unitId: 'rust-u2',
          trackId: 'rust',
          title: 'Borrowing com Referências Imutáveis (&T)',
          description: 'Empreste dados para leitura sem transferir a propriedade de memória.',
          xpReward: 30,
          gemReward: 15,
          icon: '📖',
          exercises: [
            {
              id: 'rust-l4-ex1',
              type: 'theory',
              title: 'Emprestando Referências com &',
              instruction: 'Entenda como o Borrowing evita clones caros:',
              language: 'rust',
              theoryContent: {
                summary: 'Em vez de transferir o ownership para uma função, podemos criar uma referência imutável usando o caractere &. A função apenas "pega emprestado" (borrowing) para leitura e devolve quando termina.',
                keyPoints: [
                  'fn calcular_tamanho(s: &String) -> usize',
                  'Você pode ter infinitas referências imutáveis (&) simultâneas',
                  'O proprietário continua dono do dado e pode reutilizá-lo depois',
                ],
                codeSnippet: `fn exibir(texto: &String) {
    println!("{}", texto);
}

fn main() {
    let msg = String::from("Carcará");
    exibir(&msg); // Passando por referência!
    println!("Ainda tenho: {}", msg); // Válido!
}`,
                proTip: 'Prefira receber &str nos argumentos de funções em vez de &String para máxima flexibilidade.',
              },
              explanation: 'O borrowing permite passar estruturas pesadas por ponteiros seguros e livres de null pointer.',
              hint: 'O prefixo & cria uma referência emprestada.',
            },
            {
              id: 'rust-l4-ex2',
              type: 'predict_output',
              title: 'A variável original continua válida?',
              instruction: 'Observe a passagem por referência (&):',
              language: 'rust',
              codeSnippet: `fn calcular(dado: &String) -> usize {
    dado.len()
}
fn main() {
    let s = String::from("Rust");
    let tam = calcular(&s);
    println!("{}: {}", s, tam);
}`,
              options: ['Rust: 4', 'Erro de compilação', '4: 4', 'None'],
              correctAnswer: 'Rust: 4',
              explanation: 'Como passamos &s por referência imutável, s continua perfeitamente viva no main!',
              hint: 'A referência não consumiu a posse de s.',
            },
          ],
        },
        {
          id: 'rust-l5',
          unitId: 'rust-u2',
          trackId: 'rust',
          title: 'Referências Mutáveis (&mut T) & Regras',
          description: 'A regra de ouro: apenas UMA referência mutável por vez, ou várias imutáveis.',
          xpReward: 35,
          gemReward: 20,
          icon: '⚖️',
          exercises: [
            {
              id: 'rust-l5-ex1',
              type: 'theory',
              title: 'A Lei Anti-Data-Race do Borrow Checker',
              instruction: 'Compreenda a garantia mais famosa do Rust:',
              language: 'rust',
              theoryContent: {
                summary: 'Para alterar um dado emprestado usamos &mut T. No entanto, o Rust impõe uma regra rígida: em um dado momento, você só pode ter UMA referência mutável OU qualquer quantidade de imutáveis. NUNCA as duas juntas!',
                keyPoints: [
                  '&mut T permite alterar o conteúdo sem tomar a posse',
                  'Evita Data Races (condições de corrida de leitura e escrita simultâneas)',
                  'Verificado 100% em tempo de compilação sem custo de runtime',
                ],
                codeSnippet: `fn adicionar_exclamacao(texto: &mut String) {
    texto.push_str("!");
}

fn main() {
    let mut msg = String::from("Olá");
    adicionar_exclamacao(&mut msg);
    println!("{}", msg); // "Olá!"
}`,
                proTip: 'Se o compilador reclamar de conflito de borrows, reduza o escopo das referências mutáveis!',
              },
              explanation: 'Essa restrição elimina bugs de concorrência e ponteiros corrompidos.',
              hint: '&mut permite mutação controlada.',
            },
          ],
        },
      ],
    },
    {
      id: 'rust-u3',
      title: 'Unidade 3: Structs, Enums & Pattern Matching',
      description: 'Modele dados reais com tipagem estrita e casamento de padrões exaustivo com match.',
      trackId: 'rust',
      color: '#9a3412',
      badgeReward: {
        title: 'Arquiteto Rustacean',
        icon: '🏗️',
      },
      lessons: [
        {
          id: 'rust-l6',
          unitId: 'rust-u3',
          trackId: 'rust',
          title: 'Structs & Métodos com impl',
          description: 'Crie tipos personalizados e adicione comportamentos com blocos de implementação.',
          xpReward: 35,
          gemReward: 15,
          icon: '📐',
          exercises: [
            {
              id: 'rust-l6-ex1',
              type: 'theory',
              title: 'Estruturas de Dados em Rust',
              instruction: 'Aprenda a definir e instanciar Structs:',
              language: 'rust',
              theoryContent: {
                summary: 'Structs agrupam campos nomeados. Para associar funções e métodos a essa estrutura, usamos um bloco "impl NomeDaStruct", onde métodos recebem &self como primeiro argumento.',
                keyPoints: [
                  'struct Jogador { nome: String, xp: u32, vidas: u8 }',
                  'impl Jogador { fn novo(...) -> Self { ... } }',
                  '&self dá acesso aos campos da própria instância',
                ],
                codeSnippet: `struct Retangulo {
    largura: u32,
    altura: u32,
}

impl Retangulo {
    fn area(&self) -> u32 {
        self.largura * self.altura
    }
}`,
                proTip: 'Funções associadas sem &self (como novo()) funcionam como os construtores estáticos em outras linguagens!',
              },
              explanation: 'Structs e blocos impl formam a base da modelagem de domínio em Rust.',
              hint: '&self representa a própria instância.',
            },
            {
              id: 'rust-l6-ex2',
              type: 'predict_output',
              title: 'Qual área será calculada?',
              instruction: 'Acompanhe a invocação do método na struct:',
              language: 'rust',
              codeSnippet: `struct Ponto { x: i32, y: i32 }
fn main() {
    let p = Ponto { x: 4, y: 5 };
    println!("{}", p.x * p.y);
}`,
              options: ['20', '9', '4', '5'],
              correctAnswer: '20',
              explanation: 'p.x vale 4 e p.y vale 5. 4 * 5 = 20!',
              hint: 'Multiplique x por y.',
            },
          ],
        },
        {
          id: 'rust-l7',
          unitId: 'rust-u3',
          trackId: 'rust',
          title: 'Enums Poderosos & Pattern Matching (match)',
          description: 'Enums que carregam dados e casamento de padrões que obriga cobrir todos os casos.',
          xpReward: 35,
          gemReward: 20,
          icon: '🎯',
          exercises: [
            {
              id: 'rust-l7-ex1',
              type: 'theory',
              title: 'Enums com Valores em Rust',
              instruction: 'Esqueça os enums simples de outras linguagens:',
              language: 'rust',
              theoryContent: {
                summary: 'Em Rust, cada variante de um enum pode carregar dados de tipos diferentes! O operador "match" é exaustivo: o compilador não compila se você esquecer de tratar qualquer variante!',
                keyPoints: [
                  'enum Mensagem { Mover { x: i32, y: i32 }, Escrever(String), Sair }',
                  'match msg { Mensagem::Escrever(t) => ..., Mensagem::Sair => ... }',
                  '_ funciona como o caso padrão (fallback default)',
                ],
                codeSnippet: `enum Moeda {
    Bronze,
    Prata,
    Ouro,
}

fn valor(m: Moeda) -> u32 {
    match m {
        Moeda::Bronze => 1,
        Moeda::Prata => 5,
        Moeda::Ouro => 20,
    }
}`,
                proTip: 'O compilador do Rust sempre garante que você nunca esqueça de tratar uma variante adicionada recentemente!',
              },
              explanation: 'Enums + match substituem hierarquias de herança complexas com elegância e robustez.',
              hint: 'match precisa ser exaustivo.',
            },
          ],
        },
      ],
    },
    {
      id: 'rust-u4',
      title: 'Unidade 4: Tratamento de Erros sem Null',
      description: 'Diga adeus ao NullPointerException! Conheça Option, Result e o operador ?.',
      trackId: 'rust',
      color: '#b91c1c',
      badgeReward: {
        title: 'Mestre da Resiliência',
        icon: '🛡️',
      },
      lessons: [
        {
          id: 'rust-l8',
          unitId: 'rust-u4',
          trackId: 'rust',
          title: 'O Enum Option<T>: Some ou None',
          description: 'Como o Rust representa a ausência de valor de forma 100% segura.',
          xpReward: 35,
          gemReward: 15,
          icon: '🎁',
          exercises: [
            {
              id: 'rust-l8-ex1',
              type: 'theory',
              title: 'Rust não possui Null!',
              instruction: 'Entenda por que Tony Hoare chamou o Null de "erro de um bilhão de dólares":',
              language: 'rust',
              theoryContent: {
                summary: 'Rust não tem ponteiros nulos (null). Quando um valor pode ou não estar presente, usamos o enum nativo Option<T>, que possui duas variantes: Some(T) (quando tem valor) e None (quando está ausente).',
                keyPoints: [
                  'Option<T> = Some(valor) | None',
                  'O compilador OBRIGA você a verificar se é Some antes de usar',
                  'Métodos convenientes: .unwrap_or(default), .is_some()',
                ],
                codeSnippet: `fn buscar_usuario(id: u32) -> Option<String> {
    if id == 1 {
        Some(String::from("Larissa"))
    } else {
        None
    }
}`,
                proTip: 'Evite usar .unwrap() desprotegido em código de produção, pois ele causa panic caso o valor seja None!',
              },
              explanation: 'Option<T> impede travamentos inesperados em tempo de execução.',
              hint: 'Some tem valor, None é vazio.',
            },
            {
              id: 'rust-l8-ex2',
              type: 'predict_output',
              title: 'Qual fallback será retornado?',
              instruction: 'Acompanhe o método .unwrap_or():',
              language: 'rust',
              codeSnippet: `fn main() {
    let talvez_nome: Option<&str> = None;
    let nome = talvez_nome.unwrap_or("Visitante");
    println!("{}", nome);
}`,
              options: ['Visitante', 'None', 'Erro (Panic)', '""'],
              correctAnswer: 'Visitante',
              explanation: 'Como o valor era None, o método .unwrap_or("Visitante") forneceu o valor padrão com segurança.',
              hint: 'unwrap_or usa o fallback quando encontra None.',
            },
          ],
        },
        {
          id: 'rust-l9',
          unitId: 'rust-u4',
          trackId: 'rust',
          title: 'O Enum Result<T, E> & Operador de Propagação ?',
          description: 'Trate erros recuperáveis e propague falhas de forma concisa e elegante.',
          xpReward: 40,
          gemReward: 20,
          icon: '❓',
          exercises: [
            {
              id: 'rust-l9-ex1',
              type: 'theory',
              title: 'Result<T, E> para Erros Recuperáveis',
              instruction: 'Veja como o Rust substitui exceções tradicionais:',
              language: 'rust',
              theoryContent: {
                summary: 'Funções que podem falhar retornam Result<T, E>, onde Ok(T) indica sucesso e Err(E) descreve o erro. O operador ? (interrogação) desempacota o valor se Ok, ou retorna o Err imediatamente da função circundante!',
                keyPoints: [
                  'Result<T, E> = Ok(T) | Err(E)',
                  'Operador ?: Substitui verificações verbosas de erro em uma única letra',
                  'Exemplo: let arquivo = File::open("dados.txt")?;',
                ],
                codeSnippet: `fn dividir(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Divisão por zero!"))
    } else {
        Ok(a / b)
    }
}`,
                proTip: 'O operador ? só pode ser usado dentro de funções cujo tipo de retorno seja compatível com Result ou Option.',
              },
              explanation: 'O tratamento explícito de erros torna os sistemas Rust extremamente estáveis e livres de surpresas.',
              hint: 'Ok para sucesso, Err para erro.',
            },
          ],
        },
      ],
    },
    {
      id: 'rust-u5',
      title: 'Unidade 5: Coleções, Iteradores & Concorrência Segura',
      description: 'Explore vetores dinâmicos, HashMaps, iteradores funcionais de alta performance e threads.',
      trackId: 'rust',
      color: '#7f1d1d',
      badgeReward: {
        title: 'Lenda Rustacean',
        icon: '👑',
      },
      lessons: [
        {
          id: 'rust-l10',
          unitId: 'rust-u5',
          trackId: 'rust',
          title: 'Vetores Dinâmicos Vec<T> & Strings',
          description: 'Gerencie listas redimensionáveis na Heap e entenda a diferença entre String e &str.',
          xpReward: 40,
          gemReward: 20,
          icon: '📊',
          exercises: [
            {
              id: 'rust-l10-ex1',
              type: 'theory',
              title: 'Vetores e a Macro vec!',
              instruction: 'Aprenda a criar e manipular listas dinâmicas:',
              language: 'rust',
              theoryContent: {
                summary: 'Vec<T> guarda múltiplos valores contíguos na memória Heap. A macro vec! facilita a criação de vetores literais. Strings em Rust são vetores UTF-8 validados internamente.',
                keyPoints: [
                  'let mut v = vec![1, 2, 3];',
                  'v.push(4); (Adiciona no final)',
                  'String: Possui buffer na Heap; &str: Fatia (slice) imutável em qualquer memória',
                ],
                codeSnippet: `let mut notas = vec![85, 90, 78];
notas.push(95);
println!("Total de avaliações: {}", notas.len());`,
                proTip: 'Ao iterar em um vetor com for item in &v, use a referência (&) para não mover o vetor inteiro!',
              },
              explanation: 'Vec<T> é a estrutura de dados dinâmica mais usada em toda a linguagem Rust.',
              hint: 'vec![...] cria um vetor inicializado.',
            },
            {
              id: 'rust-l10-ex2',
              type: 'predict_output',
              title: 'Qual o tamanho final do vetor?',
              instruction: 'Acompanhe as operações de push e pop no Vec:',
              language: 'rust',
              codeSnippet: `fn main() {
    let mut v = vec![10, 20];
    v.push(30);
    v.pop();
    v.push(40);
    println!("{}", v.len());
}`,
              options: ['3', '2', '4', '1'],
              correctAnswer: '3',
              explanation: 'Inicial: 2 itens. push(30) -> 3 itens. pop() -> 2 itens. push(40) -> 3 itens totais!',
              hint: 'pop() remove o último elemento adicionado.',
            },
          ],
        },
        {
          id: 'rust-l11',
          unitId: 'rust-u5',
          trackId: 'rust',
          title: 'Iteradores Funcionais & HashMaps',
          description: 'Use map, filter e collect com abstrações de custo zero (Zero-Cost Abstractions).',
          xpReward: 45,
          gemReward: 25,
          icon: '⚡',
          exercises: [
            {
              id: 'rust-l11-ex1',
              type: 'theory',
              title: 'Zero-Cost Abstractions em Iteradores',
              instruction: 'Entenda como os iteradores do Rust são compilados em código tão rápido quanto laços manuais C:',
              language: 'rust',
              theoryContent: {
                summary: 'Em Rust, iteradores são "preguiçosos" (lazy): nada é calculado até você consumir o iterador com um método como .collect(), .sum() ou um for. O compilador otimiza chamadas encadeadas em código de máquina ultra-eficiente.',
                keyPoints: [
                  '.iter(): Empresta cada elemento',
                  '.map(|x| x * 2): Transforma cada elemento',
                  '.filter(|&x| x > 10): Filtra por predicado',
                  '.collect(): Recolhe os resultados de volta para uma coleção',
                ],
                codeSnippet: `let numeros = vec![1, 2, 3, 4, 5];
let pares: Vec<i32> = numeros
    .into_iter()
    .filter(|n| n % 2 == 0)
    .collect();
// pares = [2, 4]`,
                proTip: 'Abstrações de Custo Zero: o código funcional gera exatamente o mesmo assembly otimizado que um loop for manual!',
              },
              explanation: 'Iteradores funcionais combinam alta expressividade com velocidade máxima.',
              hint: 'collect() converte o iterador de volta em vetor.',
            },
            {
              id: 'rust-l11-ex2',
              type: 'code_editor',
              title: 'Prática: Somar com Iteradores',
              instruction: 'Complete a função somar_positivos(nums: &[i32]) -> i32 para filtrar números maiores que 0 e somá-los usando .iter().filter().sum().',
              language: 'rust',
              starterCode: `fn somar_positivos(nums: &[i32]) -> i32 {
    nums.iter().filter(|&&n| n > 0).sum()
}`,
              solutionCode: `fn somar_positivos(nums: &[i32]) -> i32 {
    nums.iter().filter(|&&n| n > 0).sum()
}`,
              testCases: [
                {
                  inputDescription: 'somar_positivos(&[-5, 10, -2, 20])',
                  expectedOutput: '30',
                },
              ],
              explanation: 'Excelente! Os números positivos 10 e 20 foram filtrados e somados totalizando 30.',
              hint: 'Use nums.iter().filter(|&&n| n > 0).sum()',
            },
          ],
        },
      ],
    },
  ],
};
