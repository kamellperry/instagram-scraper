import { generateNonce } from "~/lib/server/nonce";

export function useNonce() {
    const nonce = generateNonce();

    return nonce;
}