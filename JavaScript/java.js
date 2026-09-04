function cebPortalApp() {
    return {
        page: 'login',         userRole: 'Estudiante',
        searchQuery: '',
        mobileMenuOpen: false,
        
        user: {
            name: 'Evan',
            email: 'evan@educacionbogota.edu.com'
        },

        announcements: [
            { id: 1, type: 'academico', date: 'HOY', title: 'Actualización de Bitácoras', desc: 'Subir bitácoras antes del viernes.' },
            { id: 2, type: 'institucional', date: '12 ABR', title: 'Reglamento 2026', desc: 'Manual de convivencia 2026 disponible. Revisar cambios.' },
            { id: 3, type: 'academico', date: '05 ABR', title: 'Biblioteca Virtual', desc: 'Nuevos recursos disponibles en la biblioteca virtual.' }
        ],

        get filteredAnnouncements() {
            if (this.searchQuery === '') return this.announcements;
            return this.announcements.filter(a => 
                a.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                a.desc.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },

        isAdminOrProf() {
            return this.userRole === 'Administrador' || this.userRole === 'Profesor';
        },

        navigate(targetPage) {
            this.page = targetPage;
            this.searchQuery = ''; 
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
