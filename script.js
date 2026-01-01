// تأكد من ربط هذا الملف في نهاية الـ HTML قبل إغلاق الـ body
// <script src="script.js"></script>
        AOS.init({ duration: 1000, once: true });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تهيئة مكتبة AOS للأنيميشن
    // ضبط once: false يجعل الأنيميشن يتكرر في كل مرة تعمل سكرول للأعلى والأسفل
   AOS.init({
        duration: 500,      // سرعة الأنيميشن (جعلناه أسرع قليلاً من 1000)
        once: false,        
        mirror: true,       // يكرر الحركة عند الصعود للأعلى
        offset: 30,         // تقليل المسافة (كانت 100)، الآن سيظهر العنصر بمجرد دخوله 50 بكسل فقط
        anchorPlacement: 'top-bottom', // أهم خاصية: يبدأ الأنيميشن بمجرد وصول "أعلى" العنصر إلى "أسفل" الشاشة
        easing: 'ease-out-back', // حركة انسيابية واحترافية أكثر
        //  disable: 'mobile', // اختياري: لو المشكلة فضلت موجودة ممكن تقفل الحركات على الموبايل

    });

    // 2. تغيير شكل الهيدر عند التمرير
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. أنيميشن عداد الأرقام (Stats Counter)
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
                // إذا أردت العداد يشتغل مرة واحدة فقط اترك السطر التالي، إذا أردته يتكرر احذفه
                // observer.unobserve(target); 
            }
        });
    };
    

    const statsObserver = new IntersectionObserver(startCounter, { threshold: 1.0 });
    stats.forEach(stat => statsObserver.observe(stat));

    // 4. السكرول الناعم للروابط
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
    // إضافة كود المنيو للموبايل
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // تغيير شكل الأيقونة من 3 شرطات إلى X
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}
});
// ميزة تكبير الصور في المعرض
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

// إغلاق النافذة عند الضغط في أي مكان خارج الصورة
imageViewer.addEventListener('click', (e) => {
    if (e.target !== fullImage) {
        imageViewer.style.display = 'none';
    }
});