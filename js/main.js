document.addEventListener('DOMContentLoaded', () => {
  /*
   * 1. Preferência por movimento reduzido.
   */
  const preferenciaMovimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  function obterComportamentoRolagem() {
    return preferenciaMovimentoReduzido.matches
      ? 'auto'
      : 'smooth';
  }

  /*
   * 2. Retornar ao topo da página.
   */
  const linkVoltarTopo = document.querySelector(
    '#voltar-topo'
  );

  if (linkVoltarTopo) {
    linkVoltarTopo.addEventListener('click', (evento) => {
      evento.preventDefault();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: obterComportamentoRolagem()
      });
    });
  }

  /*
   * 3. E-mail obrigatório quando o usuário deseja
   * receber novidades.
   */
  const checkboxNovidades = document.querySelector(
    '#novidades'
  );

  const campoEmail = document.querySelector(
    '#email'
  );

  const statusEmail = document.querySelector(
    '#status-email'
  );

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
   * 4. Contador de caracteres da motivação da jornada.
   */
  const campoMensagem = document.querySelector(
    '#mensagem'
  );

  const limiteMensagem = document.querySelector(
    '#limite-mensagem'
  );

  if (campoMensagem && limiteMensagem) {
    function atualizarContadorCaracteres() {
      const limiteCaracteres = campoMensagem.maxLength;

      const caracteresDigitados = campoMensagem.value.length;

      const caracteresRestantes =
        limiteCaracteres - caracteresDigitados;

      if (caracteresRestantes === 1) {
        limiteMensagem.textContent =
          '1 caractere restante.';

        return;
      }

      limiteMensagem.textContent =
        `${caracteresRestantes} caracteres restantes.`;
    }

    campoMensagem.addEventListener(
      'input',
      atualizarContadorCaracteres
    );

    atualizarContadorCaracteres();
  }

  /*
   * 5. Validação da data de nascimento.
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

      const mes = String(
        data.getMonth() + 1
      ).padStart(2, '0');

      const dia = String(
        data.getDate()
      ).padStart(2, '0');

      return `${ano}-${mes}-${dia}`;
    }

    function obterDataLimite(anos) {
      const data = new Date();

      data.setHours(0, 0, 0, 0);

      data.setFullYear(
        data.getFullYear() - anos
      );

      return data;
    }

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

      const idade = calcularIdade(
        dataNascimento
      );

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
   * 6. Rolagem acessível para os links do menu.
   */
  const menuLinks = document.querySelectorAll(
    'header nav a[href^="#"]'
  );

  menuLinks.forEach((link) => {
    link.addEventListener('click', (evento) => {
      evento.preventDefault();

      const destinoId = link.getAttribute(
        'href'
      );

      const destino = document.querySelector(
        destinoId
      );

      if (!destino) {
        return;
      }

      const cabecalho = document.querySelector(
        'header'
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

        behavior: obterComportamentoRolagem()
      });

      destino.setAttribute(
        'tabindex',
        '-1'
      );

      destino.focus({
        preventScroll: true
      });
    });
  });

  /*
   * 7. Elementos do carrossel.
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
     * 8. Distância de movimentação do carrossel.
     */
    function obterDistanciaRolagem() {
      return Math.max(
        200,
        carrossel.clientWidth * 0.8
      );
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
     * 9. Botões anterior e próximo.
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
     * 10. Botão para pausar ou continuar a animação.
     */
    botaoPausar.addEventListener(
      'click',
      () => {
        animacaoPausada = !animacaoPausada;

        botaoPausar.setAttribute(
          'aria-pressed',
          String(animacaoPausada)
        );

        botaoPausar.textContent = animacaoPausada
          ? 'Continuar animação'
          : 'Pausar animação';
      }
    );

    /*
     * 11. Navegação utilizando as setas do teclado.
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
     * 12. Pausa durante a navegação por teclado.
     */
    carrossel.addEventListener(
      'focusin',
      () => {
        carrosselComFoco = true;
      }
    );

    carrossel.addEventListener(
      'focusout',
      () => {
        carrosselComFoco = false;
      }
    );

    /*
     * 13. Pausa enquanto o mouse está sobre o carrossel.
     */
    carrossel.addEventListener(
      'mouseenter',
      () => {
        ponteiroSobreCarrossel = true;
      }
    );

    carrossel.addEventListener(
      'mouseleave',
      () => {
        ponteiroSobreCarrossel = false;

        estaArrastando = false;

        carrossel.classList.remove(
          'arrastando'
        );
      }
    );

    /*
     * 14. Arraste utilizando o mouse.
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

        carrossel.classList.add(
          'arrastando'
        );
      }
    );

    carrossel.addEventListener(
      'mouseup',
      () => {
        estaArrastando = false;

        carrossel.classList.remove(
          'arrastando'
        );
      }
    );

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
     * 15. Rolagem automática do carrossel.
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