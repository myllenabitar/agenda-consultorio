import { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest extends NextApiRequest {
    body: {
        email: string;
        senha: string;
    };
}

interface LoginResponse extends NextApiResponse {
    json: (body: { success: boolean; usuario?: { nome: string }; message?: string }) => void;
}

export default function handler(req: LoginRequest, res: LoginResponse) {
    const { email, senha } = req.body;

    // Dados fictícios de teste
    const emailValido = 'teste@dominio.com';
    const senhaValida = '123456';

    // Verificando se as credenciais são válidas
    if (email === emailValido && senha === senhaValida) {
        return res.status(200).json({
            success: true,
            usuario: {
                nome: 'John Doe'
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Credenciais inválidas'
        });
    }
}
  