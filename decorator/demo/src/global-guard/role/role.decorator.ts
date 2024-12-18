import { SetMetadata } from '@nestjs/common';

export const Role = (...args: string[]) => {
    console.log(args, 'args')
    return SetMetadata('role', args)
};
