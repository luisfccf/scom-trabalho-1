document.addEventListener('DOMContentLoaded', () => {
  // 1. Rolagem suave para links internos do menu
  const menuLinks = document.querySelectorAll('header nav a[href^="#"]');
  menuLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 2. Carrossel com Limites Físicos (Início e Fim travam) + Arraste
  const slider = document.querySelector('.carrossel-container');

  if (slider) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let isHovered = false;

    // Rolagem automática linear suave até bater no fim
    function autoScroll() {
      if (!isDown && !isHovered) {
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        
        // Rola até o limite final à direita e para
        if (slider.scrollLeft < maxScrollLeft) {
          slider.scrollLeft += 1;
        }
      }
      requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);

    // Pausa a rolagem automática se o mouse estiver sobre o carrossel
    slider.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    slider.addEventListener('mouseleave', () => {
      isHovered = false;
      isDown = false;
      slider.classList.remove('arrastando');
    });

    // Clique e Arraste com limites rígidos nas duas pontas
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('arrastando');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('arrastando');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      
      // Atualiza a posição respeitando os limites naturais (0 e maxScroll)
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});