import { UsersDao } from "./UsersDao.js";
import { UsersRouter } from "./UsersRouter.js";
import { UsersService } from "./UsersService.js";

export const usersService = new UsersService({
  dao: new UsersDao(),
});

export const usersRouter = new UsersRouter({
  service: usersService,
}).router;