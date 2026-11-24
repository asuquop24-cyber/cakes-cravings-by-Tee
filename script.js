    const phone = '2347087793941';
    const toast = document.getElementById('toast');
    let toastTimer;

    document.getElementById('bookingForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const details = new FormData(form);
      const message = [
        'Hello Cakes & Cravings by Tee! I would like to make an order / booking.',
        `Name: ${details.get('name')}`,
        `Phone: ${details.get('phone')}`,
        `Date: ${details.get('date')}`,
        `Occasion: ${details.get('occasion')}`,
        `Treats: ${details.get('treats')}`,
        `Approximate quantity: ${details.get('quantity')}`,
        `Details: ${details.get('notes') || 'None'}`
      ].join('\n');
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });

    document.querySelectorAll('.menu-photo img, .hero-photo img, .story-photo img').forEach(image => {
      image.addEventListener('error', () => {
        image.classList.add('image-unavailable');
        image.alt = `${image.alt} (photo unavailable)`;
      }, { once: true });
    });

    document.getElementById('date').min = new Date().toISOString().split('T')[0];
    document.getElementById('year').textContent = new Date().getFullYear();

    const revealWords = document.querySelectorAll('.reveal-word');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealWords.forEach(word => word.classList.add('active'));
    } else if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealWords.forEach((word, index) => {
              window.setTimeout(() => word.classList.add('active'), index * 120);
            });
            revealObserver.disconnect();
          }
        });
      }, { threshold: 0.55 });
      revealObserver.observe(document.getElementById('tagline'));
    } else {
      revealWords.forEach(word => word.classList.add('active'));
    }