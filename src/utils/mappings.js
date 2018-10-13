import SHA1 from 'crypto-js/sha1'
import MD5 from 'crypto-js/md5'

export const saltedPassword = (password) => {
  const salt = 'csD4P1JfztUTzVFq'
  return SHA1(MD5(password + salt) + SHA1(salt)).toString()
}
