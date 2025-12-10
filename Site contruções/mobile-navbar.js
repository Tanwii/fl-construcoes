  // JavaScript simplificado para o menu mobile
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            const navbarItems = document.querySelector('.navbar-items');
            
            console.log('Script carregado!'); // Isso deve aparecer no console
            
            if (mobileMenu) {
                mobileMenu.addEventListener('click', function() {
                    console.log('Menu clicado!'); // Isso deve aparecer no console quando clicar
                    navbarItems.classList.toggle('active');
                    
                    // Animação do menu hamburguer para X
                    const bars = document.querySelectorAll('.mobile-menu div');
                    bars.forEach(bar => bar.classList.toggle('active'));
                });
            } else {
                console.error('Elemento .mobile-menu não encontrado');
            }
        });