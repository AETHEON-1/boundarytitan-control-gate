// Development specimen. Owner-controlled setup, NOT a production authority service.
// Separate signing key: only issuer receives private key. Resource receives public key.
import {generateKeyPairSync,sign,verify,randomUUID} from 'node:crypto';
export function makeTestKeys(){
 const {privateKey,publicKey}=generateKeyPairSync('ed25519');
 return {privatePem:privateKey.export({type:'pkcs8',format:'pem'}),
 publicPem:publicKey.export({type:'spki',format:'pem'})};
}
const encode=x=>Buffer.from(JSON.stringify(x)).toString('base64url');
export function issueGrant(privatePem,claims){
 const body=encode({...claims,jti:randomUUID()});
 const sig=sign(null,Buffer.from(body),privatePem).toString('base64url');
 return body+'.'+sig;
}
export function verifyGrant(publicPem,token){
 if(typeof token!=='string')throw Error('TOKEN_INVALID');
 const parts=token.split('.');
 if(parts.length!==2||!parts.every(Boolean))throw Error('TOKEN_INVALID');
 const ok=verify(null,Buffer.from(parts[0]),publicPem,Buffer.from(parts[1],'base64url'));
 if(!ok)throw Error('SIGNATURE_INVALID');
 const claims=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
 if(!claims||typeof claims!=='object'||!claims.jti)throw Error('CLAIMS_INVALID');
 return claims;
}
