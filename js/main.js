document.addEventListener('DOMContentLoaded', () => {
  const preferenciaMovimentoReduzido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  /*
   * 1. Rolagem dos links internos do menu
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

      const cabecalho = document.querySelector('header#topo');
      const alturaCabecalho = cabecalho?.offsetHeight || 70;
      const posicaoDestino =
        destino.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: posicaoDestino - alturaCabecalho - 10,
        behavior: preferenciaMovimentoReduzido.matches
          ? 'auto'
          : 'smooth'
      });

      destino.setAttribute('tabindex', '-1');
      destino.focus({ preventScroll: true });
    });
  });

  /*
   * 2. Carrossel acessível
   */
  const carrossel = document.querySelector('#carrossel-iniciais');
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
    !carrossel ||
    !botaoAnterior ||
    !botaoProximo ||
    !botaoPausar
  ) {
    return;
  }

  let estaArrastando = false;
  let posicaoInicialX = 0;
  let rolagemInicial = 0;
  let ponteiroSobreCarrossel = false;
  let carrosselComFoco = false;
  let animacaoPausada = false;

  function obterDistanciaRolagem() {
    return Math.max(200, carrossel.clientWidth * 0.8);
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
   * 3. Botões anterior, próximo e pausar
   */
  botaoAnterior.addEventListener('click', rolarParaAnterior);
  botaoProximo.addEventListener('click', rolarParaProximo);

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
   * 4. Controles pelas setas do teclado
   */
  carrossel.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      rolarParaAnterior();
    }

    if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      rolarParaProximo();
    }
  });

  /*
   * 5. Pausa automática quando o carrossel recebe foco
   */
  carrossel.addEventListener('focusin', () => {
    carrosselComFoco = true;
  });

  carrossel.addEventListener('focusout', () => {
    carrosselComFoco = false;
  });

  /*
   * 6. Pausa quando o mouse está sobre o carrossel
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
   * 7. Arraste com o mouse
   */
  carrossel.addEventListener('mousedown', (evento) => {
    estaArrastando = true;
    posicaoInicialX = evento.pageX - carrossel.offsetLeft;
    rolagemInicial = carrossel.scrollLeft;

    carrossel.classList.add('arrastando');
  });

  carrossel.addEventListener('mouseup', () => {
    estaArrastando = false;
    carrossel.classList.remove('arrastando');
  });

  carrossel.addEventListener('mousemove', (evento) => {
    if (!estaArrastando) {
      return;
    }

    evento.preventDefault();

    const posicaoAtualX =
      evento.pageX - carrossel.offsetLeft;

    const deslocamento =
      (posicaoAtualX - posicaoInicialX) * 1.5;

    carrossel.scrollLeft =
      rolagemInicial - deslocamento;
  });

  /*
   * 8. Rolagem automática
   */
  function executarRolagemAutomatica() {
    const limiteMaximo =
      carrossel.scrollWidth - carrossel.clientWidth;

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
});