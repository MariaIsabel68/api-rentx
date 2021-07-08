import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const autenthicateRoutes = Router();

const authenticateUserControler = new AuthenticateUserController();
const refreshTokenControler = new RefreshTokenController();

autenthicateRoutes.post("/sessions", authenticateUserControler.handle);

autenthicateRoutes.post("/refresh-token", refreshTokenControler.handle);

export { autenthicateRoutes };
