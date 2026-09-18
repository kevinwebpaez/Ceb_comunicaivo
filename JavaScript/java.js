function cebPortalApp() {
    const todayObj = new Date();

    return {
        page: 'login',
        userRole: 'Estudiante',
        searchQuery: '',
        mobileMenuOpen: false,
        darkMode: false,
        selectedSport: null,
        selectedDay: null, // <-- ¡FALTABA ESTE! (Para el filtro de días en el calendario)

        user: {
            name: 'Evan',
            email: 'evan@educacionbogota.edu.com',
            tipoDoc: 'Cédula de Ciudadanía',
            numDoc: '1000000000',
            telefono: '+57 300 000 0000'
        },

        announcements: [
            { id: 1, type: 'academico', date: 'HOY', title: 'Actualización de Bitácoras', desc: 'Subir bitácoras antes del viernes.' },
            { id: 2, type: 'institucional', date: '12 ABR', title: 'Reglamento 2026', desc: 'Manual de convivencia 2026 disponible. Revisar cambios.' },
            { id: 3, type: 'academico', date: '05 ABR', title: 'Biblioteca Virtual', desc: 'Nuevos recursos disponibles en la biblioteca virtual.' }
        ],

        // --- PROPIEDADES Y DATOS DEL CALENDARIO (FALTABAN) ---
        currentMonth: todayObj.getMonth(),
        currentYear: todayObj.getFullYear(),
        realTodayDay: todayObj.getDate(),
        realTodayMonth: todayObj.getMonth(),
        realTodayYear: todayObj.getFullYear(),

        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

        eventsData: [
            { id: 1, year: 2026, monthId: 3, day: 25, title: 'SIRS: Entrega Final', desc: 'Documentación técnica y prototipo de software.' },
            { id: 2, year: 2026, monthId: 3, day: 28, title: 'Prueba Trimestral', desc: 'Evaluación presencial de bases de datos.' },
            { id: 3, year: 2026, monthId: 4, day: 15, title: 'Día de la Ciencia', desc: 'Muestra de proyectos tecnológicos y laboratorios.' },
            { id: 4, year: 2026, monthId: 5, day: 10, title: 'Intercolegiados', desc: 'Apertura del campeonato regional de fútbol.' }
        ],

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
        // --------------------------------------------------

        get filteredAnnouncements() {
            if (this.searchQuery === '') return this.announcements;
            return this.announcements.filter(a => 
                a.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                a.desc.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },

        // --- MÉTODOS DEL CALENDARIO (FALTABAN) ---
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
            let list = this.eventsData.filter(e => e.year === this.currentYear && e.monthId === this.currentMonth);
            if (this.selectedDay !== null) {
                list = list.filter(e => e.day === this.selectedDay);
            }
            return list;
        },
        // ----------------------------------------

        isAdminOrProf() {
            return this.userRole === 'Administrador' || this.userRole === 'Profesor';
        },

        navigate(targetPage) {
            this.page = targetPage;
            this.searchQuery = ''; 
            this.selectedDay = null; // Limpiar filtro de calendario al navegar
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        login() {
            if (this.userRole === 'Profesor') {
                this.user.name = 'Prof. Martínez';
                this.user.email = 'prof.martinez@institucion.edu';
            } else if (this.userRole === 'Administrador') {
                this.user.name = 'Admin Sistema';
                this.user.email = 'admin@institucion.edu';
            } else {
                this.user.name = 'Evan';
                this.user.email = 'evan@educacionbogota.edu.com';
            }
            this.navigate('inicio');
        },

        logout() {
            this.userRole = 'Estudiante';
            this.page = 'login';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}
