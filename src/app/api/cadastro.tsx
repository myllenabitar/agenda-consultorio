import { NextApiRequest, NextApiResponse } from 'next';


const users = new Map<string, string>(); 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    if (users.has(email)) {
      return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    users.set(email, senha);
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  }

  return res.status(405).json({ message: 'Método não permitido.' });
}
