import { Router, Request, Response } from 'express';
import {systems, codes} from './systems';

const router = Router();

let damagedSystem: string | null = null;

router.get('/status', (_req: Request, res: Response) => {
  if (!damagedSystem) {
    const randomIndex = Math.floor(Math.random() * systems.length);
    damagedSystem = systems[randomIndex] ?? null;
  }
  res.json({ damaged_system: damagedSystem });
});

router.get('/repair-bay', (_req: Request, res: Response) => {
  if (!damagedSystem) {
    return res.status(400).send('No damaged system registered');
  }

  const code = codes[damagedSystem];
  const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Repair</title></head>
    <body>
      <div class="anchor-point">${code}</div>
    </body>
    </html>
  `;
  damagedSystem=null;
  res.send(html);
});


router.post('/teapot', (_req: Request, res: Response) => {
  res.status(418).send("I'm a teapot");
});

export default router;