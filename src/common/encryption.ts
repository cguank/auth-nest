import * as bcrypt from 'bcrypt'

const saltOrRounds = 10;
const secrectKey = 'secrect_key'

export function encrypte(text:string) {
  return bcrypt.hashSync(text,saltOrRounds)
}

export function validate(password:string, encryptedText:string) {
  return bcrypt.compareSync(password,encryptedText)
}