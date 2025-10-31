'use client';

import { useState } from 'react';

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const naturePresets = [
    '🌲 Forest',
    '🏔️ Mountains',
    '🌊 Ocean',
    '🌅 Sunset',
    '🌸 Flowers',
    '🦋 Butterflies',
    '🌙 Night Sky',
    '🍃 Rainforest',
    '❄️ Snow',
    '🏞️ Landscape'
  ];

  const handlePresetClick = (preset: string) => {
    const presetPrompts: { [key: string]: string } = {
      '🌲 Forest': 'mystical ancient forest with sunbeams, lush green trees, magical atmosphere',
      '🏔️ Mountains': 'majestic snow-capped mountains at dawn, dramatic peaks, cinematic landscape',
      '🌊 Ocean': 'crystal clear turquoise ocean waves, tropical paradise, serene seascape',
      '🌅 Sunset': 'breathtaking sunset over rolling hills, golden hour, vibrant colors',
      '🌸 Flowers': 'field of wildflowers in bloom, colorful meadow, spring scenery',
      '🦋 Butterflies': 'magical butterfly garden, colorful butterflies, enchanted flowers',
      '🌙 Night Sky': 'starry night sky with milky way, aurora borealis, cosmic beauty',
      '🍃 Rainforest': 'dense tropical rainforest with waterfalls, exotic plants, vibrant nature',
      '❄️ Snow': 'peaceful winter wonderland, snow-covered pine trees, serene white landscape',
      '🏞️ Landscape': 'epic natural landscape vista, dramatic scenery, photorealistic nature'
    };
    setPrompt(presetPrompts[preset]);
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    const enhancedPrompt = `${prompt}, high quality, detailed, beautiful nature photography, 8k resolution`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=1024&height=1024&seed=${Date.now()}`;

    const newImage: GeneratedImage = {
      url: imageUrl,
      prompt: prompt,
      timestamp: Date.now()
    };

    setImages(prev => [newImage, ...prev]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      generateImage();
    }
  };

  const downloadImage = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `nature-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🌿 Nature AI Image Generator</h1>
        <p>Create stunning nature-inspired images with AI</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Describe your nature scene... (e.g., 'peaceful lake at sunrise with mountains')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div className="preset-buttons">
            {naturePresets.map((preset) => (
              <button
                key={preset}
                className="preset-btn"
                onClick={() => handlePresetClick(preset)}
                disabled={loading}
              >
                {preset}
              </button>
            ))}
          </div>

          <button
            className="generate-btn"
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
          >
            {loading ? 'Generating...' : '✨ Generate Image'}
          </button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Creating your nature masterpiece...</p>
          </div>
        )}

        <div className="gallery">
          {images.map((image, index) => (
            <div key={image.timestamp} className="image-card">
              <img
                src={image.url}
                alt={image.prompt}
                loading="lazy"
              />
              <div className="image-info">
                <p className="image-prompt">{image.prompt}</p>
                <button
                  className="download-btn"
                  onClick={() => downloadImage(image.url, image.prompt)}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
