import { NextApiRequest, NextApiResponse } from 'next';


const users = new Map<string, string>();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    if (!users.has(email) || users.get(email) !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    
    const token = `token-${email}`;
    return res.status(200).json({ message: 'Login bem-sucedido.', token });
  }

  return res.status(405).json({ message: 'Método não permitido.' });
}
