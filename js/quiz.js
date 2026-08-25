document.addEventListener('DOMContentLoaded', () => {
  /*
   * 1. Alternância entre tema claro e escuro.
   */
  const botaoAlternarTema = document.querySelector(
    '#alternar-tema'
  );

  function atualizarBotaoTema(temaEscuroAtivo) {
    if (!botaoAlternarTema) {
      return;
    }

    botaoAlternarTema.textContent = temaEscuroAtivo
      ? '☀️ Tema claro'
      : '🌙 Tema escuro';

    botaoAlternarTema.setAttribute(
      'aria-pressed',
      String(temaEscuroAtivo)
    );
  }

  /*
   * Recupera o tema salvo na página principal
   * ou durante uma visita anterior ao quiz.
   */
  let temaSalvo = null;

  try {
    temaSalvo = localStorage.getItem(
      'tema-mundo-pokemon'
    );
  } catch (erro) {
    /*
     * Mantém o funcionamento da página quando o navegador
     * restringe o armazenamento local.
     */
    temaSalvo = null;
  }

  const temaEscuroSalvo = temaSalvo === 'escuro';

  document.body.classList.toggle(
    'tema-escuro',
    temaEscuroSalvo
  );

  atualizarBotaoTema(
    temaEscuroSalvo
  );

  if (botaoAlternarTema) {
    botaoAlternarTema.addEventListener(
      'click',
      () => {
        const temaEscuroAtivo = document.body.classList.toggle(
          'tema-escuro'
        );

        atualizarBotaoTema(
          temaEscuroAtivo
        );

        try {
          localStorage.setItem(
            'tema-mundo-pokemon',
            temaEscuroAtivo
              ? 'escuro'
              : 'claro'
          );
        } catch (erro) {
          /*
           * A alternância continua funcionando mesmo
           * sem acesso ao armazenamento local.
           */
        }
      }
    );
  }

  /*
   * 2. Identificação das perguntas e dos
   * componentes responsáveis pelo resultado.
   */
  const perguntas = document.querySelectorAll(
    '.pergunta-quiz'
  );

  const progressoQuiz = document.querySelector(
    '#progresso-quiz'
  );

  const resultadoQuiz = document.querySelector(
    '#resultado-quiz'
  );

  const pontuacaoQuiz = document.querySelector(
    '#pontuacao-quiz'
  );

  const mensagemResultado = document.querySelector(
    '#mensagem-resultado'
  );

  const botaoReiniciar = document.querySelector(
    '#reiniciar-quiz'
  );

  const preferenciaMovimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let perguntasRespondidas = 0;

  let respostasCorretas = 0;

  /*
   * Define a rolagem de acordo com as preferências
   * de acessibilidade do usuário.
   */
  function obterComportamentoRolagem() {
    return preferenciaMovimentoReduzido.matches
      ? 'auto'
      : 'smooth';
  }

  /*
   * 3. Atualização do progresso do quiz.
   */
  function atualizarProgresso() {
    if (!progressoQuiz) {
      return;
    }

    progressoQuiz.textContent =
      `Perguntas respondidas: ${perguntasRespondidas} de ${perguntas.length}.`;
  }

  /*
   * 4. Exibição do resultado final.
   */
  function mostrarResultado() {
    if (
      !resultadoQuiz ||
      !pontuacaoQuiz ||
      !mensagemResultado
    ) {
      return;
    }

    resultadoQuiz.hidden = false;

    pontuacaoQuiz.textContent =
      `Você acertou ${respostasCorretas} de ${perguntas.length} perguntas.`;

    if (respostasCorretas === perguntas.length) {
      mensagemResultado.textContent =
        'Excelente! Você demonstrou conhecimento de Mestre Pokémon.';
    } else if (respostasCorretas >= 3) {
      mensagemResultado.textContent =
        'Muito bem! Você conhece bastante o universo Pokémon.';
    } else {
      mensagemResultado.textContent =
        'Continue estudando os tipos e as regiões Pokémon para melhorar sua pontuação.';
    }

    resultadoQuiz.setAttribute(
      'tabindex',
      '-1'
    );

    resultadoQuiz.focus({
      preventScroll: true
    });

    resultadoQuiz.scrollIntoView({
      behavior: obterComportamentoRolagem(),
      block: 'start'
    });
  }

  /*
   * 5. Correção imediata das alternativas.
   */
  perguntas.forEach((pergunta) => {
    const alternativas = pergunta.querySelectorAll(
      '.alternativa-quiz'
    );

    const feedback = pergunta.querySelector(
      '.feedback-quiz'
    );

    const respostaCorreta = pergunta.dataset.correta;

    const explicacao = pergunta.dataset.explicacao;

    alternativas.forEach((alternativa) => {
      alternativa.addEventListener(
        'click',
        () => {
          /*
           * Impede que uma pergunta seja
           * contabilizada mais de uma vez.
           */
          if (
            pergunta.dataset.respondidaida === 'true'
          ) {
            return;
          }

          pergunta.dataset.respondida = 'true';

          perguntasRespondidas += 1;

          const respostaSelecionada =
            alternativa.dataset.resposta;

          const acertou =
            respostaSelecionada === respostaCorreta;

          if (acertou) {
            respostasCorretas += 1;

            alternativa.classList.add(
              'alternativa-correta'
            );

            if (feedback) {
              feedback.textContent =
                `Resposta correta! ${explicacao}`;

              feedback.classList.add(
                'feedback-correto'
              );
            }
          } else {
            alternativa.classList.add(
              'alternativa-incorreta'
            );

            const alternativaCorreta = pergunta.querySelector(
              `.alternativa-quiz[data-resposta="${respostaCorreta}"]`
            );

            if (alternativaCorreta) {
              alternativaCorreta.classList.add(
                'alternativa-correta'
              );
            }

            if (feedback) {
              feedback.textContent =
                `Resposta incorreta. ${explicacao}`;

              feedback.classList.add(
                'feedback-incorreto'
              );
            }
          }

          alternativas.forEach((botao) => {
            botao.disabled = true;
          });

          atualizarProgresso();

          if (
            perguntasRespondidas === perguntas.length
          ) {
            mostrarResultado();
          }
        }
      );
    });
  });

  /*
   * 6. Reinício do quiz.
   */
  if (botaoReiniciar) {
    botaoReiniciar.addEventListener(
      'click',
      () => {
        perguntasRespondidas = 0;

        respostasCorretas = 0;

        perguntas.forEach((pergunta) => {
          delete pergunta.dataset.respondida;

          const alternativas = pergunta.querySelectorAll(
            '.alternativa-quiz'
          );

          const feedback = pergunta.querySelector(
            '.feedback-quiz'
          );

          alternativas.forEach((alternativa) => {
            alternativa.disabled = false;

            alternativa.classList.remove(
              'alternativa-correta',
              'alternativa-incorreta'
            );
          });

          if (feedback) {
            feedback.textContent = '';

            feedback.classList.remove(
              'feedback-correto',
              'feedback-incorreto'
            );
          }
        });

        if (resultadoQuiz) {
          resultadoQuiz.hidden = true;
        }

        atualizarProgresso();

        const primeiraAlternativa = document.querySelector(
          '.alternativa-quiz'
        );

        if (primeiraAlternativa) {
          primeiraAlternativa.focus({
            preventScroll: true
          });
        }

        window.scrollTo({
          top: 0,
          behavior: obterComportamentoRolagem()
        });
      }
    );
  }

  atualizarProgresso();
});