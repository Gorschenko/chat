import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'
import { PIPES_ID_VALIDATION_ERROR } from './pipes.constants'

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (metadata.type !== 'param') {
      return value
    }
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(PIPES_ID_VALIDATION_ERROR)
    }
    return value
  }
}
