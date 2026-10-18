export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#1A2421', brand: '#0B6623', hunter: '#3F704D', sea: '#2E8B57', leaf: '#48A860', mint: '#F0FFF0', gin: '#D8E4BC', sage: '#9DC183' },
    fontFamily: { sans: ['Inter', 'system-ui', 'Segoe UI', 'Noto Sans', 'sans-serif'] },
    maxWidth: { page: '1120px' }
  } },
  plugins: []
};
