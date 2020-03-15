import { get } from 'config'
import { randomBytes, pbkdf2Sync } from 'crypto'

export const generateHash = (string: string): { salt: string; hash: string } => {
  const salt = randomBytes(get('crypto.hash.length')).toString('base64')

  const hash = pbkdf2Sync(string, salt, 12000, get('crypto.hash.length'), 'sha256').toString('base64')
  return {
    salt,
    hash,
  }
}

export const compareHashes = (income: string, hash: string, salt: string): boolean => {
  const hashResult = pbkdf2Sync(income, salt, 12000, get('crypto.hash.length'), 'sha256').toString('base64')
  return hash === hashResult
}

export const generateSid = (): string => randomBytes(get('crypto.hash.length')).toString('base64')
