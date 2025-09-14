import React, { useState } from 'react';

// =================================================================
// ARCHITECTURE: A SINGLE FILE MODULAR IMPLEMENTATION
// This file mimics a modular architecture within a single file
// by separating concerns into logical components and hooks.
// =================================================================
const API_BASE_URL = import.meta.env.VITE_API_URL

const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión.');
      }

      // Devuelve la respuesta completa de la API, incluyendo el token o los datos del usuario
      return { success: true, user: data.usuario, token: data.token };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Ocurrió un error inesperado.' };
    }
  },
  register: async (identificacion, nombres, apellidos, correo, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identificacion,
          nombres,
          apellidos,
          correo,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro.');
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: error.message || 'Ocurrió un error inesperado.' };
    }
  },
};

export default authService;