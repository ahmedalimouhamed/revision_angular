export const localStorageUtil = {
    save<T>(key: string, value: T): void{
        localStorage.setItem(key, JSON.stringify(value));
    },

    load<T>(key: string): T | null{
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
}