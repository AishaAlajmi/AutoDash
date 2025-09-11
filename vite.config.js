import { defineConfig } from 'vite'; 
import path from 'path'; 
export default 
defineConfig({ root: '.', publicDir: 'public', server: { port: 5173 }, build: { outDir: 'dist' }, resolve: { alias: { '@': path.resolve(__dirname, 'src/renderer') } } });