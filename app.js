window.stadiums = [];

window.addEventListener('load', () => {
  Papa.parse('stadiums.csv', {
    download: true,
    header: true,
    complete: (results) => {
      window.stadiums = results.data;
      renderStadiumList();
      attachCheckboxEvents();
    },
    error: (err) => {
      console.error('CSV読み込みエラー:', err);
    }
  });
});

function renderStadiumList() {
  const list = document.getElementById('stadiumList');
  list.innerHTML = '';

  window.stadiums.forEach((stadium, index) => {
    const label = document.createElement('label');
    label.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.index = index;
    checkbox.id = `stadium-checkbox-${index}`;

    const text = document.createTextNode(` ${stadium.name} (${stadium.team})`);

    label.appendChild(checkbox);
    label.appendChild(text);
    list.appendChild(label);
  });
}

function attachCheckboxEvents() {
  const checkboxes = document.querySelectorAll('#stadiumList input[type=checkbox]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selectedIndexes = [...checkboxes]
        .filter(c => c.checked)
        .map(c => Number(c.dataset.index));
      window.updateMarkers(selectedIndexes, window.stadiums);
    });
  });
}
