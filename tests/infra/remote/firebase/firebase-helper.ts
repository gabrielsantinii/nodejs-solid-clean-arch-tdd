import { environment } from "../../../../src/main/config";
import axios from "axios";

export class FirebaseHelper {
    private constructor () {}
    
    static async generateTokenId(customToken: string): Promise<{ tokenId: string }> {
        const { data } = await axios.request<{ idToken: string }>({
            url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${environment.firebaseWebApiKey}`,
            method: "post",
            data: {
                token: customToken,
                returnSecureToken: true,
            },
        });
        return { tokenId: data.idToken };
    }
}
