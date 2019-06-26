import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {map} from 'rxjs/operators';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
// @Pipe({name: 'userIdToNickname'})
// export class UserIdToNicknamePipe implements PipeTransform {
//   userService: UserService;
//   transform(id: any): string {
//     this.userService.getUserById(id).subscribe(map(val => val))
//
//   }
// }
