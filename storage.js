class StorageService {
    static get(key) {
        const item = localStorage.getItem(key);
        try {
            return item ? JSON.parse(item) : null;
        } catch {
            return item;
        }
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static getAllKeys() {
        return Object.keys(localStorage);
    }
}
