// SDK 2.10.0 has a Node ESM/CommonJS lodash interop issue at its top-level entry.
// Use its supported CommonJS entry in Node; Vite resolves the browser ESM build.
export const {PrivateData}=typeof process!=='undefined'&&process.versions?.node
 ? (await import('node:module')).createRequire(import.meta.url)('@ethereum-attestation-service/eas-sdk')
 : await import('@ethereum-attestation-service/eas-sdk');
