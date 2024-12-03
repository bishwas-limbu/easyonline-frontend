import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config';

export default defineConfig({
  plugins: [react()],

})
