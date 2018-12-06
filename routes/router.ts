import { Router, Request, Response } from 'express';
import Server from '../classes/server';

export const router = Router();

router.get('/messages', ( req: Request, res: Response ) => {
  res.json({
    ok: true,
    message: 'All is fine!!'
  });
});

router.post('/messages', ( req: Request, res: Response ) => {
  
  const body = req.body.body;
  const from = req.body.from;

  const server = Server.instance;

  const payload = {
    from,
    body
  }

  server.io.emit('new-message', payload);

  res.json({
    ok: true,
    message: `Post Ready`,
    body,
    from
  })
});

router.post('/messages/:id', ( req: Request, res: Response ) => {
  
  const body = req.body.body;
  const from = req.body.from;
  const id = req.params.id;
  
  const server = Server.instance;

  const payload = {
    from,
    body
  }

  server.io.in( id ).emit('private-message', payload);

  res.json({
    ok: true,
    message: `Post Ready`,
    body,
    from,
    id
  });
});