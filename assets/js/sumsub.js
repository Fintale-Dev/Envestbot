var myHeaders = new Headers();
myHeaders.append("source", "web");
myHeaders.append("version", "1");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

var SERVER_URL_PROD = 'https://investorportal.envescom.com/api/AppUsers/getSumsubSDKAccessToken'
var SERVER_URL_DEV = 'http://localhost:3000/api/AppUsers/getSumsubSDKAccessToken'
var SERVER_URL_UAT = 'https://eam-wwi.wealthfy.com/api/AppUsers/getSumsubSDKAccessToken'
fetch(SERVER_URL_UAT, requestOptions)
  .then(response => response.json())
  .then(result => {
    launchWebSdk(result.url, 'Investor On-boarding (WEB)', result.token);
  })
  .catch(error => console.log('error', error));


function launchWebSdk(apiUrl, flowName, accessToken, applicantEmail, applicantPhone) {
  let snsWebSdkInstance = snsWebSdk.Builder(apiUrl, flowName)
    .withAccessToken(
      accessToken,
      (newAccessTokenCallback) => {
        newAccessTokenCallback(newAccessToken)
      }
    )
    .withConf({
      lang: 'en',
      email: applicantEmail,
      phone: applicantPhone,
      onMessage: (type, payload) => {
        console.log('WebSDK onMessage', type, payload)
      },
      uiConf: {
        customCssStr: ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}"
      },
      onError: (error) => {
        console.error('WebSDK onError', error)
      },
    })
    .build();
  snsWebSdkInstance.launch('#sumsub-websdk-container')
}
