import { loginUser, registerUser } from './auth.service.js';

export async function register(request, response, next) {
  try { response.status(201).json(await registerUser(request.body)); } catch (error) { next(error); }
}

export async function login(request, response, next) {
  try { response.json(await loginUser(request.body)); } catch (error) { next(error); }
}
