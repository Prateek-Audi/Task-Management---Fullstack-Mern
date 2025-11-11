import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Orders endpoint placeholder' });
});

export default router;

