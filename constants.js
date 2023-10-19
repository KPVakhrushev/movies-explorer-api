module.exports = {
  MSG_PAGE_NOT_FOUND: 'Страница не найдена',
  MSG_SERVER_ERROR: 'На сервере произошла ошибка',
  MSG_MOVIE_NOT_FOUND: 'Фильм не найден',
  MSG_FORBIDDEN: 'Доступ запрещен',
  MSG_UNAUTHORIZED: 'Необходима авторизация',

  ERRORS: {
    BAD_CREDENTIALS: 'Вы ввели неправильный логин или пароль',
    AUTHORIZATION: 'Ошибка авторизации',
    NO_TOKEN: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
    BAD_TOKEN: 'При авторизации произошла ошибка. Переданный токен некорректен.',
    EMAIL_EXIST: 'Пользователь с таким email уже существует.',
    REGISTRATION: 'При регистрации пользователя произошла ошибка.',
    UPDATE_PROFILE: 'При обновлении профиля произошла ошибка.',
    INTERNAL_SERVER: 'На сервере произошла ошибка',
  },

  ERROR_CODES: {
    SyntaxError: 400,
    CastError: 400,
    ValidationError: 400,
  },
};
