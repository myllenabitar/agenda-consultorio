    interface User {
        email: string;
        senha: string;
    }

const mockDatabase: User[] = [];

import { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
    message: string;
}

interface SuccessResponse {
    message: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponse | SuccessResponse>) {
    if (req.method === 'POST') {
        const { email, senha }: User = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const userExists = mockDatabase.some((user) => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já cadastrado.' });
        }

        mockDatabase.push({ email, senha });
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } else {
        return res.status(405).json({ message: 'Método não permitido.' });
    }
}

