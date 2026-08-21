# Mundo Pokémon — Interface Web Interativa

Projeto acadêmico individual desenvolvido para a disciplina SCOM, com o objetivo de criar uma interface web moderna, semântica, responsiva e acessível utilizando HTML5, CSS3 e JavaScript.

## Objetivo

Apresentar informações sobre o universo Pokémon por meio de uma interface interativa que reúne história da franquia, Pokémon iniciais, tipos elementares, vantagens em batalha e formulário de cadastro.

## Público-alvo

Estudantes, fãs da franquia Pokémon e usuários interessados em conhecer as características dos Pokémon e as relações entre seus diferentes tipos.

## Funcionalidades

- Navegação entre as principais seções da página.
- Carrossel interativo com Pokémon iniciais de diferentes regiões.
- Controles acessíveis para avançar, retornar e pausar o carrossel.
- Seção sobre a história do universo Pokémon.
- Galeria com Pokémon de diferentes gerações.
- Classificação dos Pokémon iniciais por região.
- Guia interativo com os 18 tipos Pokémon.
- Apresentação das vantagens e fraquezas de cada tipo.
- Exemplos visuais de Pokémon representantes.
- Página adicional de Pokédex.
- Formulário de cadastro de treinadores.
- Validação dinâmica de informações do formulário.
- Link para retorno ao topo da página.

## Tecnologias utilizadas

- HTML5.
- CSS3.
- JavaScript.
- Git e GitHub.
- Google Lighthouse.
- W3C Nu HTML Checker.
- W3C CSS Validator.

O projeto foi desenvolvido sem frameworks, bibliotecas externas obrigatórias ou processos de compilação.

## Como executar localmente

### Opção 1: abrir diretamente no navegador

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Clique duas vezes no arquivo `index.html`.
4. Navegue normalmente pela interface.

Não é necessário instalar dependências ou iniciar um servidor.

### Opção 2: clonar o repositório

Execute:

```bash
git clone https://github.com/luisfccf/scom-trabalho-1.git
```

Acesse a pasta:

```bash
cd scom-trabalho-1
```

Abra o arquivo:

```text
index.html
```

### Opção 3: utilizar o Live Server

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão Live Server, caso desejado.
3. Clique com o botão direito em `index.html`.
4. Selecione a opção **Open with Live Server**.

O Live Server é opcional e não é necessário para executar o projeto.

## Estrutura do projeto

```text
scom-trabalho-1/
├── assets/
├── css/
│   └── styles.css
├── evidencias/
├── js/
│   └── main.js
├── Prints e Versões/
├── index.html
├── pokedex.html
└── README.md
```

## Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela.

Os principais formatos testados foram:

- Mobile: 390 × 844.
- Tablet: 768 × 1024.
- Desktop: 1440 × 900.

O layout utiliza CSS Grid, Flexbox e media queries para reorganizar menus, formulários, galerias e cartões.

## Acessibilidade

O projeto adota práticas alinhadas à WCAG 2.2 nível AA:

- Estrutura semântica com `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure` e `figcaption`.
- Hierarquia lógica de títulos.
- Navegação por teclado.
- Foco visível em elementos interativos.
- Textos alternativos nas imagens.
- Associação entre `label` e campos do formulário.
- Uso de atributos ARIA quando necessário.
- Controles acessíveis no carrossel.
- Suporte à preferência de movimento reduzido.
- Contraste adequado entre texto e fundo.

## Formulário

O formulário de cadastro inclui diferentes tipos de campos:

- Texto.
- Senha.
- Número.
- E-mail.
- URL.
- Área de texto.
- Checkbox.
- Radio.
- Select.
- Data.
- Horário.
- Cor.

Entre as validações implementadas estão:

- E-mail obrigatório quando o usuário solicita novidades.
- Seleção exclusiva do nível de experiência.
- Validação de idade entre 10 e 120 anos.
- Bloqueio de datas de nascimento inválidas.
- Limite de 500 caracteres no campo de comentários.
- Impedimento do redimensionamento manual da área de texto.

## Compatibilidade

O projeto foi testado nos seguintes navegadores:

- Google Chrome.
- Mozilla Firefox.
- Microsoft Edge.

As capturas e versões dos navegadores utilizados encontram-se nas pastas de evidências do projeto.

## Validação de código

Os seguintes arquivos foram validados:

- `index.html`: aprovado no W3C Nu HTML Checker.
- `pokedex.html`: aprovado no W3C Nu HTML Checker.
- `css/styles.css`: aprovado no W3C CSS Validator.

As evidências estão disponíveis em:

```text
evidencias/w3c-index-html.png
evidencias/w3c-pokedex-html.png
evidencias/w3c-css.png
```

## Desempenho

O projeto foi avaliado com o Google Lighthouse nas categorias:

- Performance.
- Acessibilidade.
- Boas práticas.
- SEO.

As capturas das auditorias estão disponíveis na pasta de evidências.

Uma nova auditoria deverá ser executada após a conclusão de todas as alterações da interface.

## Uso de inteligência artificial

A ferramenta ChatGPT, da OpenAI, foi utilizada como apoio durante o desenvolvimento para:

- Esclarecimento de dúvidas sobre HTML, CSS, JavaScript e Git.
- Sugestão de estruturas semânticas.
- Organização de layouts responsivos.
- Implementação e revisão de recursos de acessibilidade.
- Apoio na criação do carrossel e de seus controles.
- Apoio na implementação das validações do formulário.
- Sugestão de melhorias visuais para a interface.
- Auxílio na interpretação de mensagens dos validadores W3C.
- Apoio na organização da documentação.

As sugestões foram revisadas, adaptadas e testadas pelo estudante antes de sua incorporação ao projeto.

O detalhamento das finalidades, trechos produzidos, alterações realizadas e avaliação crítica será apresentado no relatório técnico.

## Fontes de imagens e informações

As imagens dos Pokémon são carregadas por meio dos recursos disponibilizados pelo projeto PokéAPI.

Pokémon e os personagens associados pertencem aos seus respectivos detentores de direitos. Este projeto possui finalidade exclusivamente acadêmica e não comercial.

A execução da interface pode ser realizada localmente. Entretanto, o carregamento das imagens externas e do vídeo depende de conexão com a internet.

## Repositório

https://github.com/luisfccf/scom-trabalho-1

## Autor

Luís Felipe Cunha Canno Ferreira.