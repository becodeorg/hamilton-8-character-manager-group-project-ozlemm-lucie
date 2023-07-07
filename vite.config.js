import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                creation: resolve(__dirname, 'pages/creation.html'),
                update: resolve(__dirname, 'pages/update.html'),  
                single: resolve(__dirname, 'pages/single.html'),     
            }
        }
    }
}


