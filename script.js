// Анимация набора чисел
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats-section');

let animated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // ms
    const step = target / (duration / 16); // 60fps
    
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCounter();
  });
};

if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}

// Аккордеон услуг
function toggleService(header) {
  const item = header.parentElement;
  item.classList.toggle('active');
}

// Welcome Flow Logic
document.addEventListener('DOMContentLoaded', () => {
  const welcomeFlow = document.getElementById('welcome-flow');
  if (welcomeFlow) {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const chosenBarberSpan = document.getElementById('chosen-barber');
    const finishBtn = document.getElementById('flow-finish-btn');
    
    // Disable scrolling on body while flow is active
    document.body.style.overflow = 'hidden';

    // Transition Step 1 -> Step 2
    setTimeout(() => {
      step1.classList.remove('active');
      step2.classList.add('active');
    }, 2500); // Wait for logo animation

    // Transition Step 2 -> Step 3
    const barberCards = document.querySelectorAll('.barber-card');
    barberCards.forEach(card => {
      card.addEventListener('click', () => {
        const barberName = card.getAttribute('data-name');
        chosenBarberSpan.textContent = barberName;
        step2.classList.remove('active');
        step3.classList.add('active');
      });
    });

    // Services selection
    const serviceItems = document.querySelectorAll('.f-service-item');
    serviceItems.forEach(item => {
      item.addEventListener('click', () => {
        serviceItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });

    // Time slots selection in flow
    const timeSlots = step3.querySelectorAll('.time-slot:not(.booked)');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
      });
    });

    // Day selection in flow
    const days = step3.querySelectorAll('.day.available:not(.booked)');
    days.forEach(day => {
      day.addEventListener('click', () => {
        days.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
      });
    });

    const step4 = document.getElementById('step-4');

    // Finish flow -> show success message (step 4), then hide overlay
    finishBtn.addEventListener('click', () => {
      step3.classList.remove('active');
      step4.classList.add('active');

      setTimeout(() => {
        welcomeFlow.classList.add('hidden');
        document.body.style.overflow = ''; // restore scrolling
        
        // Clean up DOM after transition
        setTimeout(() => {
          welcomeFlow.style.display = 'none';
        }, 800);
      }, 2000); // 2 seconds delay for success message
    });
  }
});
