document.addEventListener('DOMContentLoaded', function() {
    const navBar = document.querySelector('.nav__bar');
    const header = document.querySelector('.header');
    
    document.querySelectorAll('.btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
    
    function updateNavBar() {
        // Получаем размеры и позицию родителя
        const headerRect = header.getBoundingClientRect();
        
        // Рассчитываем ширину относительно родителя
        const parentWidth = headerRect.width;
        const parentLeft = headerRect.left;
        
        // Устанавливаем ширину и позицию
        navBar.style.width = `${parentWidth - 40}px`;
        navBar.style.left = `${parentLeft}px`;
        
        // Дополнительные расчеты (например, высота)
        const shouldCompact = window.scrollY > 50;
        navBar.style.height = shouldCompact ? '100px' : '70px';
        navBar.style.background = shouldCompact 
            ? 'rgba(40, 40, 41,0.8)' 
            : '#222';
    }
    
    // Инициализация
    updateNavBar();
    
    // Обработчики событий
    window.addEventListener('scroll', function() {
        updateNavBar();
        // Дополнительные эффекты при скролле
    });
    
    window.addEventListener('resize', function() {
        updateNavBar();
    });
    
    // Оптимизация производительности
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavBar();
                ticking = false;
            });
            ticking = true;
        }
    });
});