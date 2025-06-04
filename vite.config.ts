
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/ai-survival-sim/',
    plugins: [react()],
    server: {
        port: 3000,
    },
});
