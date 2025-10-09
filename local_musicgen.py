#!/usr/bin/env python3
"""
Local MusicGen Script
Simplified version for testing - returns mock audio data
"""

import argparse
import json
import base64
import io
import sys
import traceback
import numpy as np

def generate_mock_music(prompt, duration=10, model_size='small'):
    """Generate mock music data for testing"""
    try:
        # Create a simple sine wave as mock audio data
        sample_rate = 44100
        frequency = 440  # A4 note
        t = np.linspace(0, duration, int(sample_rate * duration), False)

        # Generate a simple sine wave
        audio_data = np.sin(frequency * 2 * np.pi * t)

        # Convert to 16-bit PCM
        audio_data = (audio_data * 32767).astype(np.int16)

        # Create WAV header (simplified)
        # RIFF header
        riff = b'RIFF'
        file_size = 36 + len(audio_data) * 2  # 36 + data size
        wave = b'WAVE'

        # Format chunk
        fmt = b'fmt '
        fmt_size = 16
        audio_format = 1  # PCM
        num_channels = 1  # Mono
        sample_rate_bytes = sample_rate.to_bytes(4, 'little')
        byte_rate = (sample_rate * num_channels * 2).to_bytes(4, 'little')  # sample_rate * channels * bytes_per_sample
        block_align = (num_channels * 2).to_bytes(2, 'little')  # channels * bytes_per_sample
        bits_per_sample = 16
        bits_per_sample_bytes = bits_per_sample.to_bytes(2, 'little')

        # Data chunk
        data = b'data'
        data_size = (len(audio_data) * 2).to_bytes(4, 'little')  # data size in bytes
        audio_bytes = audio_data.tobytes()

        # Combine all parts
        wav_data = (riff + file_size.to_bytes(4, 'little') + wave +
                   fmt + fmt_size.to_bytes(4, 'little') + audio_format.to_bytes(2, 'little') +
                   num_channels.to_bytes(2, 'little') + sample_rate_bytes + byte_rate +
                   block_align + bits_per_sample_bytes +
                   data + data_size + audio_bytes)

        # Convert to base64
        audio_base64 = base64.b64encode(wav_data).decode('utf-8')

        return {
            'success': True,
            'audio_base64': audio_base64,
            'prompt': prompt,
            'duration': duration,
            'model': model_size,
            'note': 'This is mock audio data - replace with actual MusicGen implementation'
        }

    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        }

def main():
    parser = argparse.ArgumentParser(description='Generate music using local MusicGen')
    parser.add_argument('--prompt', required=True, help='Text prompt for music generation')
    parser.add_argument('--duration', type=int, default=10, help='Duration in seconds (max 30)')
    parser.add_argument('--model', default='small', choices=['small', 'medium', 'large'], help='Model size')

    args = parser.parse_args()

    # Validate duration
    duration = min(max(args.duration, 1), 30)

    # Generate music
    result = generate_mock_music(args.prompt, duration, args.model)

    # Output JSON result
    print(json.dumps(result))

if __name__ == '__main__':
    main()