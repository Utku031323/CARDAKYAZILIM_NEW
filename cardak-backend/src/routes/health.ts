import express, { Request, Response } from 'express';

const router = express.Router();

// Health check endpoint
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    },
    message: 'Server is running'
  });
});

export default router;

