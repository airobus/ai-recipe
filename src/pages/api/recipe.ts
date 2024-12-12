import type { APIRoute } from 'astro';
import AiRecipeService from '../../services/aiService';

export const GET: APIRoute = async ({ url }) => {
  const preferences = url.searchParams.get('preferences') || '健康、低脂、快速';
  
  try {
    const recipe = await AiRecipeService.generateRecipeRecommendation(preferences);
    return new Response(JSON.stringify({ recipe }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '生成菜谱失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 