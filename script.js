        AOS.init({ duration: 1000, once: true });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
document.addEventListener('DOMContentLoaded', () => {
    
   AOS.init({
        duration: 500,     
        once: false,        
        mirror: true,       
        offset: 30,         
        anchorPlacement: 'top-bottom', 
        easing: 'ease-out-back',

    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const stats = document.querySelectorAll('.stat-item h3');
    const speed = 200;

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = +target.innerText.replace('+', '').replace('%', '');
                const updateCount = () => {
                    const current = +target.innerText.replace('+', '').replace('%', '');
                    const increment = Math.ceil(count / speed);
                    if (current < count) {
                        target.innerText = (target.innerText.includes('%') ? (current + increment) + '%' : '+' + (current + increment));
                        setTimeout(updateCount, 10);
                    } else {
                        target.innerText = (target.innerText.includes('%') ? count + '%' : '+' + count);
                    }
                };
                updateCount();
            }
        });
    };
    

    const statsObserver = new IntersectionObserver(startCounter, { threshold: 1.0 });
    stats.forEach(stat => statsObserver.observe(stat));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}
});
const galleryItems = document.querySelectorAll('.gallery-item');
const imageViewer = document.getElementById('image-viewer');
const fullImage = document.getElementById('full-image');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        fullImage.src = img.src;
        imageViewer.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    imageViewer.style.display = 'none';
});

imageViewer.addEventListener('click', (e) => {
    if (e.target !== fullImage) {
        imageViewer.style.display = 'none';
    }
});