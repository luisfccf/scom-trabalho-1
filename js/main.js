document.addEventListener('DOMContentLoaded', () => {
  /*
   * 1. Preferência por movimento reduzido
   */
  const preferenciaMovimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /*
   * 2. E-mail obrigatório quando o usuário
   * solicita o recebimento de novidades
   */
  const checkboxNovidades = document.querySelector('#novidades');
  const campoEmail = document.querySelector('#email');
  const statusEmail = document.querySelector('#status-email');

  if (checkboxNovidades && campoEmail && statusEmail) {
    function atualizarObrigatoriedadeEmail() {
      const desejaNovidades = checkboxNovidades.checked;

      campoEmail.required = desejaNovidades;

      statusEmail.textContent = desejaNovidades
        ? 'O e-mail agora é obrigatório.'
        : 'O e-mail é opcional.';
    }

    checkboxNovidades.addEventListener(
      'change',
      atualizarObrigatoriedadeEmail
    );

    atualizarObrigatoriedadeEmail();
  }

  /*
   * 3. Validação da data de nascimento
   */
  const campoDataNascimento = document.querySelector(
    '#data-nascimento'
  );

  const statusDataNascimento = document.querySelector(
    '#status-data-nascimento'
  );

  if (campoDataNascimento && statusDataNascimento) {
    const idadeMinima = 10;
    const idadeMaxima = 120;

    function formatarDataParaInput(data) {
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');

      return `${ano}-${mes}-${dia}`;
    }

    function obterDataLimite(anos) {
      const data = new Date();

      data.setHours(0, 0, 0, 0);
      data.setFullYear(data.getFullYear() - anos);

      return data;
    }

    /*
     * Data máxima: hoje menos 10 anos.
     * Data mínima: hoje menos 120 anos.
     */
    const dataMaximaNascimento = obterDataLimite(
      idadeMinima
    );

    const dataMinimaNascimento = obterDataLimite(
      idadeMaxima
    );

    campoDataNascimento.min = formatarDataParaInput(
      dataMinimaNascimento
    );

    campoDataNascimento.max = formatarDataParaInput(
      dataMaximaNascimento
    );

    function calcularIdade(dataNascimento) {
      const hoje = new Date();

      let idade =
        hoje.getFullYear() -
        dataNascimento.getFullYear();

      const diferencaMes =
        hoje.getMonth() -
        dataNascimento.getMonth();

      const aindaNaoFezAniversario =
        diferencaMes < 0 ||
        (
          diferencaMes === 0 &&
          hoje.getDate() < dataNascimento.getDate()
        );

      if (aindaNaoFezAniversario) {
        idade -= 1;
      }

      return idade;
    }

    function validarDataNascimento() {
      /*
       * Remove mensagens anteriores antes de validar.
       */
      campoDataNascimento.setCustomValidity('');

      if (!campoDataNascimento.value) {
        statusDataNascimento.textContent =
          'Informe a data de nascimento.';

        return;
      }

      const dataNascimento = new Date(
        `${campoDataNascimento.value}T00:00:00`
      );

      if (Number.isNaN(dataNascimento.getTime())) {
        campoDataNascimento.setCustomValidity(
          'Informe uma data de nascimento válida.'
        );

        statusDataNascimento.textContent =
          'Data inválida. Verifique o valor informado.';

        return;
      }

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      if (dataNascimento > hoje) {
        campoDataNascimento.setCustomValidity(
          'A data de nascimento não pode estar no futuro.'
        );

        statusDataNascimento.textContent =
          'Data inválida: a data não pode estar no futuro.';

        return;
      }

      const idade = calcularIdade(dataNascimento);

      if (idade < idadeMinima) {
        campoDataNascimento.setCustomValidity(
          `O treinador deve ter pelo menos ${idadeMinima} anos.`
        );

        statusDataNascimento.textContent =
          `Data inválida: idade mínima de ${idadeMinima} anos.`;

        return;
      }

      if (idade > idadeMaxima) {
        campoDataNascimento.setCustomValidity(
          `A idade não pode ser superior a ${idadeMaxima} anos.`
        );

        statusDataNascimento.textContent =
          `Data inválida: idade máxima de ${idadeMaxima} anos.`;

        return;
      }

      statusDataNascimento.textContent =
        `Data válida. Idade calculada: ${idade} anos.`;
    }

    campoDataNascimento.addEventListener(
      'input',
      validarDataNascimento
    );

    campoDataNascimento.addEventListener(
      'change',
      validarDataNascimento
    );

    campoDataNascimento.addEventListener(
      'blur',
      validarDataNascimento
    );
  }

  /*
   * 4. Rolagem acessível dos links internos do menu
   */
  const menuLinks = document.querySelectorAll(
    'header nav a[href^="#"]'
  );

  menuLinks.forEach((link) => {
    link.addEventListener('click', (evento) => {
      evento.preventDefault();

      const destinoId = link.getAttribute('href');
      const destino = document.querySelector(destinoId);

      if (!destino) {
        return;
      }

      const cabecalho = document.querySelector(
        'header#topo'
      );

      const alturaCabecalho =
        cabecalho?.offsetHeight || 70;

      const posicaoDestino =
        destino.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top:
          posicaoDestino -
          alturaCabecalho -
          10,

        behavior: preferenciaMovimentoReduzido.matches
          ? 'auto'
          : 'smooth'
      });

      destino.setAttribute('tabindex', '-1');
      destino.focus({ preventScroll: true });
    });
  });

  /*
   * 5. Elementos do carrossel
   */
  const carrossel = document.querySelector(
    '#carrossel-iniciais'
  );

  const botaoAnterior = document.querySelector(
    '#carrossel-anterior'
  );

  const botaoProximo = document.querySelector(
    '#carrossel-proximo'
  );

  const botaoPausar = document.querySelector(
    '#carrossel-pausar'
  );

  /*
   * Executa o carrossel somente quando todos
   * os elementos necessários existem.
   */
  if (
    carrossel &&
    botaoAnterior &&
    botaoProximo &&
    botaoPausar
  ) {
    let estaArrastando = false;
    let posicaoInicialX = 0;
    let rolagemInicial = 0;
    let ponteiroSobreCarrossel = false;
    let carrosselComFoco = false;
    let animacaoPausada = false;

    /*
     * 6. Funções de rolagem
     */
    function obterDistanciaRolagem() {
      return Math.max(
        200,
        carrossel.clientWidth * 0.8
      );
    }

    function obterComportamentoRolagem() {
      return preferenciaMovimentoReduzido.matches
        ? 'auto'
        : 'smooth';
    }

    function rolarParaAnterior() {
      carrossel.scrollBy({
        left: -obterDistanciaRolagem(),
        behavior: obterComportamentoRolagem()
      });
    }

    function rolarParaProximo() {
      carrossel.scrollBy({
        left: obterDistanciaRolagem(),
        behavior: obterComportamentoRolagem()
      });
    }

    /*
     * 7. Botões anterior e próximo
     */
    botaoAnterior.addEventListener(
      'click',
      rolarParaAnterior
    );

    botaoProximo.addEventListener(
      'click',
      rolarParaProximo
    );

    /*
     * 8. Botão de pausa
     */
    botaoPausar.addEventListener('click', () => {
      animacaoPausada = !animacaoPausada;

      botaoPausar.setAttribute(
        'aria-pressed',
        String(animacaoPausada)
      );

      botaoPausar.textContent = animacaoPausada
        ? 'Continuar animação'
        : 'Pausar animação';
    });

    /*
     * 9. Controles pelas setas do teclado
     */
    carrossel.addEventListener(
      'keydown',
      (evento) => {
        if (evento.key === 'ArrowLeft') {
          evento.preventDefault();
          rolarParaAnterior();
        }

        if (evento.key === 'ArrowRight') {
          evento.preventDefault();
          rolarParaProximo();
        }
      }
    );

    /*
     * 10. Pausa quando o carrossel recebe foco
     */
    carrossel.addEventListener('focusin', () => {
      carrosselComFoco = true;
    });

    carrossel.addEventListener('focusout', () => {
      carrosselComFoco = false;
    });

    /*
     * 11. Pausa quando o mouse está sobre o carrossel
     */
    carrossel.addEventListener('mouseenter', () => {
      ponteiroSobreCarrossel = true;
    });

    carrossel.addEventListener('mouseleave', () => {
      ponteiroSobreCarrossel = false;
      estaArrastando = false;

      carrossel.classList.remove('arrastando');
    });

    /*
     * 12. Arraste com o mouse
     */
    carrossel.addEventListener(
      'mousedown',
      (evento) => {
        estaArrastando = true;

        posicaoInicialX =
          evento.pageX -
          carrossel.offsetLeft;

        rolagemInicial =
          carrossel.scrollLeft;

        carrossel.classList.add('arrastando');
      }
    );

    carrossel.addEventListener('mouseup', () => {
      estaArrastando = false;

      carrossel.classList.remove('arrastando');
    });

    carrossel.addEventListener(
      'mousemove',
      (evento) => {
        if (!estaArrastando) {
          return;
        }

        evento.preventDefault();

        const posicaoAtualX =
          evento.pageX -
          carrossel.offsetLeft;

        const deslocamento =
          (
            posicaoAtualX -
            posicaoInicialX
          ) * 1.5;

        carrossel.scrollLeft =
          rolagemInicial -
          deslocamento;
      }
    );

    /*
     * 13. Rolagem automática
     */
    function executarRolagemAutomatica() {
      const limiteMaximo =
        carrossel.scrollWidth -
        carrossel.clientWidth;

      const podeMovimentar =
        !preferenciaMovimentoReduzido.matches &&
        !animacaoPausada &&
        !estaArrastando &&
        !ponteiroSobreCarrossel &&
        !carrosselComFoco;

      if (
        podeMovimentar &&
        carrossel.scrollLeft < limiteMaximo
      ) {
        carrossel.scrollLeft += 1;
      }

      window.requestAnimationFrame(
        executarRolagemAutomatica
      );
    }

    window.requestAnimationFrame(
      executarRolagemAutomatica
    );
  }
});