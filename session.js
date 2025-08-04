class SessionService {
    static createSession(user, remember = false) {
        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            createdAt: new Date().toISOString(),
            expiresAt: remember 
                ? new Date(Date.now() + 30 * 24 * 3600000).toISOString() // 30 days
                : new Date(Date.now() + 8 * 3600000).toISOString() // 8 hours
        };
        
        StorageService.set('currentSession', session);
        return session;
    }

    static getCurrentSession() {
        const session = StorageService.get('currentSession');
        if (!session) return null;
        
        if (new Date(session.expiresAt) < new Date()) {
            this.destroySession();
            return null;
        }
        
        return session;
    }

    static destroySession() {
        StorageService.remove('currentSession');
    }

    static isAuthenticated() {
        return !!this.getCurrentSession();
    }

    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '../auth/login.html';
            return false;
        }
        return true;
    }
}
