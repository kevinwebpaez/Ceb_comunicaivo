import Alpine from 'alpinejs';

window.Alpine = Alpine;

const STORAGE_KEY = 'ceb_events';

const DEFAULT_EVENTS = [
  { id: 1, year: 2026, monthId: 8, day: 25, title: 'SIRS: Entrega Final', desc: 'Documentación técnica y prototipo de software.' },
  { id: 2, year: 2026, monthId: 8, day: 28, title: 'Prueba Trimestral', desc: 'Evaluación presencial de bases de datos.' },
  { id: 3, year: 2026, monthId: 9, day: 15, title: 'Día de la Ciencia', desc: 'Muestra de proyectos tecnológicos y laboratorios.' },
  { id: 4, year: 2026, monthId: 9, day: 22, title: 'Intercolegiados', desc: 'Apertura del campeonato regional de fútbol.' },
];

function loadEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (e) {
    /* localStorage no disponible o dato dañado: usamos los eventos por defecto */
  }
  return DEFAULT_EVENTS;
}

// Lógica del calendario (antes estaba en cebPortalApp() dentro de index.html)
Alpine.data('calendario', () => {
  const today = new Date();

  return {
    selectedDay: null,
    modalOpen: false,
    isEditing: false,
    eventForm: {
      id: null,
      title: '',
      day: today.getDate(),
      monthId: today.getMonth(),
      year: today.getFullYear(),
      desc: '',
    },
    currentMonth: today.getMonth(),
    currentYear: today.getFullYear(),
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    eventsData: loadEvents(),

    get daysInMonth() {
      const total = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: total }, (_, i) => i + 1);
    },

    get blankDays() {
      const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
      return Array.from({ length: offset }, (_, i) => i);
    },

    get filteredEvents() {
      let list = this.eventsData.filter(
        (e) => e.year === this.currentYear && e.monthId === this.currentMonth
      );
      if (this.selectedDay !== null) {
        list = list.filter((e) => e.day === this.selectedDay);
      }
      return list;
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.eventsData));
      } catch (e) {
        /* sin almacenamiento disponible */
      }
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.selectedDay = null;
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.selectedDay = null;
    },

    selectDay(day) {
      this.selectedDay = this.selectedDay === day ? null : day;
    },

    hasEvent(day) {
      return this.eventsData.some(
        (e) => e.year === this.currentYear && e.monthId === this.currentMonth && e.day === day
      );
    },

    openAddModal() {
      this.isEditing = false;
      this.eventForm = {
        id: Date.now(),
        title: '',
        day: this.selectedDay || today.getDate(),
        monthId: this.currentMonth,
        year: this.currentYear,
        desc: '',
      };
      this.modalOpen = true;
    },

    openEditModal(event) {
      this.isEditing = true;
      this.eventForm = { ...event };
      this.modalOpen = true;
    },

    saveEvent() {
      if (this.isEditing) {
        const index = this.eventsData.findIndex((e) => e.id === this.eventForm.id);
        if (index !== -1) this.eventsData[index] = { ...this.eventForm };
      } else {
        this.eventsData.push({ ...this.eventForm, id: Date.now() });
      }
      this.saveToLocalStorage();
      this.modalOpen = false;
    },

    deleteEvent(id) {
      if (confirm('¿Estás seguro de eliminar este evento?')) {
        this.eventsData = this.eventsData.filter((e) => e.id !== id);
        this.saveToLocalStorage();
      }
    },
  };
});

Alpine.start();
