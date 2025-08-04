class AuthService {
    static userExists(email) {
        const users = StorageService.get('users') || [];
        return users.some(user => user.email === email);
    }

    static register(name, email, password) {
        if (this.userExists(email)) {
            return false;
        }
        
        const users = StorageService.get('users') || [];
        const newUser = {
            id: CryptoService.generateId(),
            name,
            email,
            password: CryptoService.hashPassword(password),
            createdAt: new Date().toISOString(),
            verified: false,
            twoFactorEnabled: false
        };
        
        users.push(newUser);
        StorageService.set('users', users);
        
        return newUser;
    }

    static login(email, password) {
        const users = StorageService.get('users') || [];
        const user = users.find(u => u.email === email);
        
        if (!user) return false;
        
        const passwordMatch = CryptoService.verifyPassword(password, user.password);
        if (!passwordMatch) return false;
        
        return user;
    }

    static requestPasswordReset(email) {
        const users = StorageService.get('users') || [];
        const user = users.find(u => u.email === email);
        
        if (!user) return false;
        
        const token = CryptoService.generateToken();
        const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour
        
        StorageService.set(`resetToken_${user.id}`, { token, expiresAt });
        
        return token;
    }

    static resetPassword(token, newPassword) {
        const resetTokens = StorageService.getAllKeys()
            .filter(key => key.startsWith('resetToken_'))
            .map(key => ({
                userId: key.replace('resetToken_', ''),
                ...StorageService.get(key)
            }));
        
        const validToken = resetTokens.find(t => 
            t.token === token && new Date(t.expiresAt) > new Date()
        );
        
        if (!validToken) return false;
        
        const users = StorageService.get('users') || [];
        const userIndex = users.findIndex(u => u.id === validToken.userId);
        
        if (userIndex === -1) return false;
        
        users[userIndex].password = CryptoService.hashPassword(newPassword);
        StorageService.set('users', users);
        StorageService.remove(`resetToken_${validToken.userId}`);
        
        return true;
    }
}
