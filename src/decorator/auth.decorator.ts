import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.gurad";

export function Auth(...permissions: string[]) {
    return applyDecorators(SetMetadata("permissions", permissions), UseGuards(AuthGuard));
}