import { Hono } from "hono";
import { Env } from "./core-utils";
export function imageGenRoutes(app: Hono<{ Bindings: Env }>) {
  app.post('/api/generate-image', async (c) => {
    try {
      const { prompt } = await c.req.json();
      const aiPrompt = prompt || 'Futuristic healthcare ambient room with clinical technology 8k';
      // Attempt to use Cloudflare Workers AI if available via binding
      // Note: In some environments c.env.AI might be undefined if not bound
      if ((c.env as any).AI) {
        const response = await (c.env as any).AI.run('@cf/bytedance/stable-diffusion-xl-lightning', {
          prompt: aiPrompt,
          num_steps: 4
        });
        // Convert Buffer to Base64
        const base64 = btoa(String.fromCharCode(...new Uint8Array(response)));
        return c.json({ 
          success: true, 
          url: `data:image/png;base64,${base64}` 
        });
      }
      // Fallback to high-quality Unsplash placeholder if AI is not available
      return c.json({ 
        success: true, 
        url: `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200` 
      });
    } catch (error) {
      console.error('Image generation error:', error);
      return c.json({ 
        success: false, 
        error: 'Failed to generate image',
        url: `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200`
      }, { status: 200 }); // Returning 200 with fallback URL for better UX
    }
  });
}