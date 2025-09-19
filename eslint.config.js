// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
    {
        files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: true,
                        tsconfigRootDir: import.meta.dirname,
                    },
                },
            },
        ],
        plugins: {
            react,
            'react-hooks': reactHooks
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-expressions': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unsafe-assignment': 0,
            '@typescript-eslint/no-unused-vars': 0,
            '@typescript-eslint/no-base-to-string': 0,
            '@typescript-eslint/no-unsafe-member-access': 0,
            '@typescript-eslint/ no-floating-promises': 0
        },
    }
);