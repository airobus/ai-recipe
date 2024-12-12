module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif']
      },
      colors: {
        'apple-blue': '#007AFF',
        'apple-purple': '#5856D6',
        'apple-text': '#1D1D1F',
        'apple-gray': '#86868B',
        'apple-light-gray': '#F5F5F7'
      },
      borderRadius: {
        'apple': '980px',
      },
      letterSpacing: {
        'apple': '-0.022em',
        'apple-tight': '-0.003em',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
} 