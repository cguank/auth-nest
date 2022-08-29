import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; // 注意这里应该用passport-jwt.Strategy
import { Role } from "src/common/roles.decorator";
import { UsersService } from "src/users/users.service";
// import { Strategy } from "passport-local";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(private usersService:UsersService) {
    console.log('JwtStrategy constructor');
    
    super({
      secretOrKey: 'cgktest',
      ignoreExpiration:false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }
  async validate(payload: any) {
    Logger.debug(`JwtStrategy validate`)
    //It's also worth pointing out that this approach leaves us room ('hooks' as it were) to inject other business logic into the process. For example, we could do a database lookup in our validate() method to extract more information about the user, resulting in a more enriched user object being available in our Request. This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation. The model we've implemented here in our sample code is a fast, "stateless JWT" model, where each API call is immediately authorized based on the presence of a valid JWT, and a small bit of information about the requester (its userId and username) is available in our Request pipeline.
    const user = this.usersService.findOne(payload.username)
    return user
  }
}