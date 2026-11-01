// Reveals: the parts of a section marked `data-reveal` get the class `is-in` once, when they come into view, and
// the section's own CSS does the rest (the stations of the lifecycle draw the line between them, the reading
// tiles lift into place, the closing card ripples). It is the only thing the script does: the hidden first state
// is CSS, and applies only with script and without a request for reduced motion.

export default function mount(section: HTMLElement): void {
  const watcher = new IntersectionObserver(
    (list) => {
      for (const { target, isIntersecting } of list) {
        if (!isIntersecting) continue;
        target.classList.add('is-in');
        watcher.unobserve(target);
      }
    },
    { threshold: 0.3, rootMargin: '0px 0px -6% 0px' },
  );
  for (const part of section.querySelectorAll('[data-reveal]')) watcher.observe(part);
}
