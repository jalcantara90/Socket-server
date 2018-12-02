import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/messages', ( req: Request, res: Response ) => {
  res.json({
    ok: true,
    message: 'All is fine!!'
  });
});

router.post('/messages', ( req: Request, res: Response ) => {
  
  const body = req.body.body;
  const by = req.body.by;

  res.json({
    ok: true,
    message: `Post Ready`,
    body,
    by
  })
});

router.post('/messages/:id', ( req: Request, res: Response ) => {
  
  const body = req.body.body;
  const by = req.body.by;
  const id = req.params.id;

  res.json({
    ok: true,
    message: `Post Ready`,
    body,
    by,
    id
  })
});