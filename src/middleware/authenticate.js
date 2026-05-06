// Middleware authenticate виконує роль «охоронця» приватних даних.
// Він перевіряє токени, сесію та користувача.
// Якщо перевірка успішна — доступ до колекції студентів відкривається.
// Якщо ні — користувач отримує відповідь з 401 Unauthorized.
// модуль 4 Middleware аутентифікації


// v Middleware аутентифікації

// V Зв'язок між моделями

// v Приватні дані

// Матеріали

// Уроки

// Домашнє завдання

// 5. Модуль 5. Пошта та
// зображен
// ження

import createHttpError from "http-errors";
import { Session } from "../models/Session.js";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await Session.findOne({ _id: sessionId, accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
};