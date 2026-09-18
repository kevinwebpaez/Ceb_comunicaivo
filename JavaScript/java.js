<script>
        function cebPortalApp() {
            const todayObj = new Date();

            return {
                page: 'inicio',
                userRole: "Estudiante",
                darkMode: false,
                notifications: true,
                showToast: false,
                searchQuery: '',
                mobileMenuOpen: false,
                selectedSport: null,
                selectedDay: null,
                modalOpen: false,
                isEditing: false,

                user: {
                    name: "Kevin Paez",
                    email: "kevinwebpaez@gmail.com",
                    tipoDoc: "Cédula de Ciudadanía",
                    numDoc: "1000000000",
                    telefono: "+57 300 000 0000"
                },

                currentMonth: todayObj.getMonth(),
                currentYear: todayObj.getFullYear(),
                realTodayDay: todayObj.getDate(),
                realTodayMonth: todayObj.getMonth(),
                realTodayYear: todayObj.getFullYear(),

                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

                eventForm: {
                    id: null,
                    title: '',
                    day: 1,
                    monthId: todayObj.getMonth(),
                    year: todayObj.getFullYear(),
                    desc: ''
                },

                get daysInMonth() {
                    const total = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
                    let arr = [];
                    for(let d = 1; d <= total; d++) { arr.push(d); }
                    return arr;
                },

                get blankDays() {
                    let firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
                    let offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
                    let blanks = [];
                    for(let b = 0; b < offset; b++) { blanks.push(b); }
                    return blanks;
                },

                eventsData: [
                    { id: 1, year: 2026, monthId: 8, day: 25, title: 'SIRS: Entrega Final', desc: 'Documentación técnica y prototipo de software.' },
                    { id: 2, year: 2026, monthId: 8, day: 28, title: 'Prueba Trimestral', desc: 'Evaluación presencial de bases de datos.' },
                    { id: 3, year: 2026, monthId: 9, day: 15, title: 'Día de la Ciencia', desc: 'Muestra de proyectos tecnológicos y laboratorios.' },
                    { id: 4, year: 2026, monthId: 9, day: 10, title: 'Intercolegiados', desc: 'Apertura del campeonato regional de fútbol.' }
                ],

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
                    return this.eventsData.some(e => e.year === this.currentYear && e.monthId === this.currentMonth && e.day === day);
                },

                isToday(day) {
                    return this.realTodayDay === day && this.realTodayMonth === this.currentMonth && this.realTodayYear === this.currentYear;
                },

                get filteredEvents() {
                    let list = this.eventsData.filter(e => Number(e.year) === Number(this.currentYear) && Number(e.monthId) === Number(this.currentMonth));
                    if (this.selectedDay !== null) {
                        list = list.filter(e => Number(e.day) === Number(this.selectedDay));
                    }
                    return list;
                },

                openAddModal() {
                    this.isEditing = false;
                    this.eventForm = {
                        id: Date.now(),
                        title: '',
                        day: this.selectedDay || 1,
                        monthId: this.currentMonth, // Sincronizado con el mes visualizado
                        year: this.currentYear,     // Sincronizado con el año visualizado
                        desc: ''
                    };
                    this.modalOpen = true;
                },

                openEditModal(event) {
                    this.isEditing = true;
                    this.eventForm = { ...event };
                    this.modalOpen = true;
                },

                saveEvent() {
                    // Asegurar tipos numéricos para evitar fallas de comparación
                    this.eventForm.day = Number(this.eventForm.day);
                    this.eventForm.monthId = Number(this.eventForm.monthId);
                    this.eventForm.year = Number(this.eventForm.year);

                    if (this.isEditing) {
                        const index = this.eventsData.findIndex(e => e.id === this.eventForm.id);
                        if (index !== -1) {
                            this.eventsData[index] = { ...this.eventForm };
                        }
                    } else {
                        this.eventsData.push({ ...this.eventForm, id: Date.now() });
                    }
                    this.modalOpen = false;
                },

                deleteEvent(id) {
                    this.eventsData = this.eventsData.filter(e => e.id !== id);
                },

                navigate(targetPage) {
                    this.page = targetPage;
                    this.searchQuery = '';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    </script>
