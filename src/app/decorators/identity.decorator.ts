import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @name Identity
 * @description Custom decorator to extract the identity from the request.
 * @param data - Optional data passed to the decorator.
 * @param ctx - ExecutionContext containing information about the request.
 * @returns The identity object extracted from the request.
 */
export const Identity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.employee;
  },
);
