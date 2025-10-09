#!/usr/bin/env node

/**
 * Local MusicGen API Server
 * Provides a REST API for music generation using local AudioCraft
 */

import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Local MusicGen API' });
});

// Music generation endpoint
app.post('/generate', async (req, res) => {
  try {
    const { prompt, duration = 10, model = 'small' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`Generating music for prompt: "${prompt}" (duration: ${duration}s, model: ${model})`);

    // Path to the Python script
    const scriptPath = path.join(__dirname, 'local_musicgen.py');

    // Spawn Python process
    const pythonProcess = spawn('python', [
      scriptPath,
      '--prompt', prompt,
      '--duration', Math.min(duration, 30).toString(),
      '--model', model
    ], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    pythonProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderr += data.toString();
      console.log('Python stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python process failed:', stderr);
        return res.status(500).json({
          error: 'Music generation failed',
          details: stderr
        });
      }

      try {
        const result = JSON.parse(stdout.trim());

        if (result.success) {
          // Convert base64 to buffer for proper response
          const audioBuffer = Buffer.from(result.audio_base64, 'base64');

          res.set({
            'Content-Type': 'audio/wav',
            'Content-Length': audioBuffer.length,
            'X-Prompt': encodeURIComponent(prompt),
            'X-Duration': duration,
            'X-Model': model
          });

          res.send(audioBuffer);
        } else {
          res.status(500).json({
            error: 'Music generation failed',
            details: result.error
          });
        }
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        res.status(500).json({
          error: 'Invalid response from music generator',
          details: stdout
        });
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      res.status(500).json({
        error: 'Failed to start music generator',
        details: error.message
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Local MusicGen API Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Generate music: POST http://localhost:${PORT}/generate`);
});