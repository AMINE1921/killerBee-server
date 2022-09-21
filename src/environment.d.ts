namespace NodeJS {
  interface ProcessEnv {
    PORT: int,
    DB_CONNECTION: string,
    JWT_SECRET: string,
    GOOGLE_DISTANCE_MATRIX_KEY: string,
  }
}

namespace Express {
  interface Request {
    userId?: string,
    userFirstname?: string,
    userLastname?: string,
    userRoles?: Array<string>
  }
}

namespace Jwt {
  interface JwtPayload {
    id: string,
    firstname: string,
    lastname: string,
    role: Array<string>
  }
}
