document.addEventListener('DOMContentLoaded', function() {
            // ========== MENU MOBILE ==========
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.addEventListener('click', function() {
                    document.querySelector('.nav-links').classList.toggle('active');
                });
            }
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    document.querySelector('.nav-links').classList.remove('active');
                });
            });
            
            // ========== FILTRO PORTFÓLIO ==========
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // ========== CARROSSEL DOS ITENS ==========
            function initializePortfolioCarousels() {
                const carousels = document.querySelectorAll('.portfolio-carousel');
                
                carousels.forEach(carousel => {
                    const slides = carousel.querySelector('.carousel-slides');
                    const slideCount = slides.children.length;
                    const prevBtn = carousel.querySelector('.carousel-prev');
                    const nextBtn = carousel.querySelector('.carousel-next');
                    const dots = carousel.querySelectorAll('.carousel-dot');
                    
                    let currentSlide = 0;
                    
                    // Atualizar a posição do carrossel
                    function updateCarousel() {
                        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
                        
                        // Atualizar dots
                        dots.forEach((dot, index) => {
                            dot.classList.toggle('active', index === currentSlide);
                        });
                    }
                    
                    // Event listeners para os botões
                    prevBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Impede que abra o modal
                        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slideCount - 1;
                        updateCarousel();
                    });
                    
                    nextBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Impede que abra o modal
                        currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
                        updateCarousel();
                    });
                    
                    // Event listeners para os dots
                    dots.forEach((dot, index) => {
                        dot.addEventListener('click', (e) => {
                            e.stopPropagation(); // Impede que abra o modal
                            currentSlide = index;
                            updateCarousel();
                        });
                    });
                    
                    // Inicializar carrossel
                    updateCarousel();
                });
            }
            
            // Inicializar carrosséis
            initializePortfolioCarousels();
            
            // ========== MODAL ==========
            const modal = document.getElementById('projectModal');
            const closeModal = document.querySelector('.close-modal');
            
            // Adicionar evento de clique para cada item do portfólio
            portfolioItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Se o clique foi no carrossel (botões ou dots), não abre modal
                    if (e.target.closest('.carousel-prev') || 
                        e.target.closest('.carousel-next') || 
                        e.target.closest('.carousel-dot')) {
                        return;
                    }
                    openProjectModal(this);
                });
            });
            
            // Fecha o modal
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // Fecha o modal ao clicar fora dele
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Função para abrir o modal com as imagens do projeto
            function openProjectModal(projectItem) {
                const carousel = projectItem.querySelector('.portfolio-carousel');
                const slides = carousel.querySelectorAll('.carousel-slide');
                const title = projectItem.querySelector('h3').textContent;
                const description = projectItem.querySelector('p').textContent;
                
                // Configurar o modal
                document.getElementById('modalImg').src = slides[0].querySelector('img').src;
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDescription').textContent = description;
                
                // Configurar as tags
                const tags = Array.from(projectItem.querySelectorAll('.tag')).map(tag => tag.textContent);
                const modalTags = document.getElementById('modalTags');
                modalTags.innerHTML = '';
                tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });
                
                // Set WhatsApp link
                const whatsappBtn = document.getElementById('modalWhatsapp');
                const whatsappText = `Olá! Gostaria de orçamento para um projeto similar ao: ${title}`;
                whatsappBtn.href = `https://wa.me/351963269781?text=${encodeURIComponent(whatsappText)}`;
                
                // Mostrar modal
                modal.style.display = 'block';
            }
            
            // ========== FORMULÁRIO DE CONTACTO ==========
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const name = document.getElementById('name').value;
                    const phone = document.getElementById('phone').value;
                    const email = document.getElementById('email').value;
                    const service = document.getElementById('service').value;
                    const location = document.getElementById('location').value;
                    const message = document.getElementById('message').value;
                    
                    // Create WhatsApp message
                    const whatsappMessage = `*NOVA SOLICITAÇÃO DE ORÇAMENTO*%0A%0A
*Nome:* ${name}%0A
*Telemóvel:* ${phone}%0A
*E-mail:* ${email || 'Não fornecido'}%0A
*Serviço:* ${service}%0A
*Localização:* ${location}%0A%0A
*Descrição do Projeto:*%0A${message}%0A%0A
*Data:* ${new Date().toLocaleDateString('pt-PT')}`;
                    
                    // Open WhatsApp - SUBSTITUA PELO NÚMERO REAL
                    window.open(`https://wa.me/351963269781?text=${whatsappMessage}`, '_blank');
                    
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    alert('Obrigado! Será redirecionado para o WhatsApp para finalizar o orçamento.');
                });
            }
            
            // ========== SCROLL SUAVE ==========
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // ========== ATUALIZAR NÚMERO WHATSAPP ==========
            const whatsappNumber = '351963269781'; // SUBSTITUA PELO NÚMERO REAL
            document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
                const currentHref = link.getAttribute('href');
                link.setAttribute('href', currentHref.replace('351963269781', whatsappNumber));
            });
        });

