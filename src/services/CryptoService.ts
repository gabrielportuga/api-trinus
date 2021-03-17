import { compare, hash } from 'bcryptjs';

class CryptoService {

    async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
}

export { CryptoService };
