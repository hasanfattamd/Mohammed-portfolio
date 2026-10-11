document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });

// Process: pointing at, focusing or tapping a phase marks the path up to it.
// Without JavaScript all five phases stay neutral and fully readable.
const phases = [...document.querySelectorAll('#partner-process .phase')];
if (phases.length) {
  const activate = (selected) => {
    phases.forEach((phase, index) => {
      phase.dataset.state = index < selected ? 'done' : index === selected ? 'active' : 'next';
      phase.querySelector('.phase-num').setAttribute('aria-pressed', String(index === selected));
    });
  };

  phases.forEach((phase, index) => {
    const number = phase.querySelector('.phase-num');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = number.className;
    button.textContent = number.textContent;
    button.setAttribute('aria-label', `Explore phase ${index + 1}: ${phase.querySelector('h3').textContent.trim()}`);
    number.replaceWith(button);
    button.addEventListener('focus', () => activate(index));
    phase.addEventListener('pointerenter', () => activate(index));
    phase.addEventListener('click', () => activate(index));
  });

  activate(0);
}

// The work index previews a project on hover or focus without JavaScript; this keeps the last one showing.
const workIndex = document.querySelector('#partner-work .work-index');
if (workIndex) {
  const rows = [...workIndex.querySelectorAll('.work-row')];
  const activate = (selected) => rows.forEach((row) => { row.dataset.active = String(row === selected); });
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => activate(row));
    row.addEventListener('focus', () => activate(row));
  });
}
