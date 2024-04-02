import { GqlExceptionFilter } from '@nestjs/graphql';
import {
  Catch,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EMAIL_EXIST } from '@src/config/constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002': {
        throw new ConflictException(EMAIL_EXIST);
      }
      case 'P2003': {
        throw new UnprocessableEntityException('Entity does not exist.');
      }
      case 'P2025': {
        throw new NotFoundException();
      }
      default:
        break;
    }
    return exception;
  }
}
