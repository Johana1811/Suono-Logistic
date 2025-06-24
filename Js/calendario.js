const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  const spanishMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                         'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  monthYear.innerText = `${spanishMonths[month]} ${year}`;
  daysContainer.innerHTML = '';

  const offset = (firstDay + 6) % 7;

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    daysContainer.appendChild(empty);
  }

  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.innerText = i;
    daysContainer.appendChild(day);
  }
}

prevMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
