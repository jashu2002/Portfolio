/**
 * Client FAQ Accordion Controller
 */
import { sound } from './audio.js';

export function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open FAQ items for a clean accordion experience
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      item.classList.toggle('open', !isOpen);
      questionBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      sound.playClick();
    });
  });
}
