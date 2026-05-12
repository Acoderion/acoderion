document.addEventListener("DOMContentLoaded", function() {
    // Hero bölümündeki slaytı seçip manuel olarak başlatıyoruz
    var myCarousel = document.querySelector('#heroCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 4000, // Resimlerin 4 saniyede bir (4000ms) değişmesini sağlar
        ride: 'carousel'
    });

    // Navbar saydamlık (scroll) efekti
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animasyonu (Intersection Observer)
    var fadeElements = document.querySelectorAll('.fade-in-up');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(function(el) {
        observer.observe(el);
    });
});
(function() {
    emailjs.init("oLOrV3BZ9Wrne5Zub"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const btn = this.querySelector('button');
    const status = document.getElementById('status-text');
    const originalText = btn.innerText;
    
    // Seçili dili kontrol et (hata ve başarı mesajlarını İngilizce ise İngilizce vermek için)
    const currentLang = document.documentElement.lang || 'tr';
    const sendingText = currentLang === 'en' ? 'SENDING...' : 'GÖNDERİLİYOR...';
    const sentText = currentLang === 'en' ? 'SENT ✓' : 'GÖNDERİLDİ ✓';
    const successMsg = currentLang === 'en' ? 'Your message has been sent successfully.' : 'Mesajınız başarıyla iletildi.';
    const errorBtnText = currentLang === 'en' ? 'ERROR' : 'HATA';
    const errorMsg = currentLang === 'en' ? 'An error occurred.' : 'Bir hata oluştu.';
    
    btn.innerText = sendingText; btn.disabled = true;

    emailjs.sendForm('service_097revx', 'template_k0g89n8', this)
        .then(function() {
            btn.innerText = sentText; btn.style.backgroundColor = '#22c55e';
            status.innerText = successMsg; status.style.display = 'block'; status.style.color = '#22c55e';
            document.getElementById('contact-form').reset();
            setTimeout(() => { btn.innerText = originalText; btn.disabled = false; btn.style.backgroundColor = ''; status.style.display = 'none'; }, 5000);
        }, function(error) {
            btn.innerText = errorBtnText; btn.style.backgroundColor = '#ef4444';
            status.innerText = errorMsg; status.style.display = 'block'; status.style.color = '#ef4444';
            btn.disabled = false;
        });
});