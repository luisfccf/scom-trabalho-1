# Mundo Pokémon — Interface Web Interativa

Projeto individual desenvolvido para a disciplina de Sistemas Computacionais (SCOM).

A ideia do projeto foi criar um site sobre o universo Pokémon utilizando HTML, CSS e JavaScript, aplicando na prática conceitos de responsividade, acessibilidade, organização do código e interação com o usuário.

## Sobre o projeto

O site reúne diferentes conteúdos relacionados ao universo Pokémon, como Pokémon iniciais, tipos, história da franquia, Pokédex e um quiz interativo.

Durante o desenvolvimento também foram adicionados recursos de acessibilidade, responsividade e algumas interações feitas com JavaScript.

## Principais funcionalidades

- Menu de navegação entre as principais áreas do site.
- Carrossel com Pokémon iniciais de diferentes regiões.
- Botões para avançar, voltar e pausar o carrossel.
- Seção sobre a história de Pokémon.
- Informações sobre os diferentes tipos Pokémon.
- Exemplos de vantagens e fraquezas entre os tipos.
- Página de Pokédex.
- Quiz Pokémon.
- Formulário de cadastro de treinadores.
- Validações de formulário com JavaScript.
- Alternância de tema da interface.
- Link para retornar ao topo da página.

## Tecnologias utilizadas

O projeto foi desenvolvido principalmente com:

- HTML5;
- CSS3;
- JavaScript;
- Git e GitHub.

Também foram utilizadas algumas ferramentas para testar e avaliar o projeto:

- Google Lighthouse;
- W3C Nu HTML Checker;
- W3C CSS Validator;
- Chrome DevTools.

Não foram utilizados frameworks ou bibliotecas externas obrigatórias.

## Como executar

O projeto pode ser executado diretamente pelo navegador.

### Opção 1 — Abrir normalmente

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências.

### Opção 2 — Clonar pelo Git

```bash
git clone https://github.com/luisfccf/scom-trabalho-1.git
```

Depois entre na pasta:

```bash
cd scom-trabalho-1
```

E abra o arquivo:

```text
index.html
```

### Opção 3 — Live Server

Também é possível utilizar a extensão Live Server no Visual Studio Code.

Nesse caso:

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

O uso do Live Server é opcional.

## Estrutura do projeto

```text
scom-trabalho-1/
├── assets/
├── css/
│   └── styles.css
├── evidencias/
├── js/
│   ├── main.js
│   └── quiz.js
├── Prints e Versões/
├── index.html
├── pokedex.html
├── Quiz.html
├── processar-cadastro.php
└── README.md
```

## Responsividade

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela.

Foram realizados testes nas seguintes resoluções:

- Mobile: 390 × 844;
- Tablet: 768 × 1024;
- Desktop: 1440 × 900.

Para isso foram utilizados recursos como CSS Grid, Flexbox, unidades relativas e media queries.

As capturas dos testes estão disponíveis na pasta `evidencias`.

## Acessibilidade

Durante o desenvolvimento foram aplicadas algumas práticas de acessibilidade, entre elas:

- uso de elementos HTML semânticos;
- organização dos níveis de títulos;
- navegação por teclado;
- foco visível nos elementos interativos;
- textos alternativos nas imagens;
- associação de `label` aos campos do formulário;
- utilização de atributos ARIA quando necessário;
- controles acessíveis no carrossel;
- suporte a `prefers-reduced-motion`;
- preocupação com contraste e legibilidade.

A navegação por teclado também foi testada manualmente.

## Formulário

O projeto possui um formulário de cadastro de treinador com diferentes tipos de campos.

Entre eles estão:

- nome;
- senha;
- idade;
- e-mail;
- URL;
- data;
- horário;
- seleção de cor;
- opções de escolha;
- área para comentários.

Também foram implementadas validações com JavaScript, como limite de idade, contador de caracteres e validações relacionadas ao preenchimento dos campos.

## Quiz Pokémon

O projeto também possui uma página de Quiz Pokémon.

O quiz apresenta perguntas de múltipla escolha e utiliza JavaScript para controlar as respostas, a pontuação e o andamento das perguntas.

## Compatibilidade

A versão final foi testada nos seguintes navegadores:

- Google Chrome;
- Mozilla Firefox;
- Microsoft Edge.

Nos testes realizados, o projeto manteve seu funcionamento e organização visual nos três navegadores.

As evidências dos testes estão disponíveis no projeto.

## Validação do código

Os principais arquivos HTML foram testados utilizando o W3C Nu HTML Checker:

- `index.html`;
- `pokedex.html`;
- `Quiz.html`.

Após as correções realizadas, os três arquivos foram validados sem erros ou avisos.

O arquivo:

```text
css/styles.css
```

também foi validado utilizando o W3C CSS Validator.

As capturas dessas validações estão disponíveis na pasta `evidencias`.

## Desempenho

A versão final do projeto foi avaliada com o Google Lighthouse no modo mobile.

Os resultados finais foram:

- Performance: 98;
- Accessibility: 100;
- Best Practices: 100;
- SEO: 100.

Também foi realizada uma medição de interação utilizando o Chrome DevTools, com resultado de INP de 67 ms.

As capturas dos testes estão disponíveis na pasta `evidencias`.

## Uso de inteligência artificial

Durante o desenvolvimento utilizei o ChatGPT como ferramenta de apoio em alguns momentos do projeto.

A ferramenta foi utilizada principalmente para:

- esclarecer dúvidas sobre HTML, CSS, JavaScript e Git;
- analisar problemas encontrados nos testes do Lighthouse;
- sugerir alternativas para melhorar o desempenho do carrossel;
- ajudar a interpretar mensagens dos validadores do W3C;
- revisar alguns pontos de acessibilidade;
- auxiliar na organização do README e do relatório;
- auxiliar na criação dos wireframes utilizados como documentação da interface.

As sugestões não foram aplicadas automaticamente. Elas foram analisadas e, quando necessário, modificadas ou descartadas de acordo com os testes realizados no projeto.

O uso de inteligência artificial e a avaliação das sugestões estão detalhados no relatório do trabalho.

## Imagens e conteúdo

As imagens dos Pokémon utilizadas no projeto são carregadas a partir de recursos disponibilizados pela PokéAPI.

Pokémon e seus personagens pertencem aos seus respectivos detentores de direitos.

Este projeto foi desenvolvido apenas para fins acadêmicos e não possui finalidade comercial.

Como algumas imagens e conteúdos são carregados externamente, é necessário acesso à internet para que todos os elementos sejam exibidos corretamente.

## Repositório

https://github.com/luisfccf/scom-trabalho-1

## Autor

Luís Felipe Cunha Canno Ferreira  
Engenharia de Controle e Automação — UNESP
