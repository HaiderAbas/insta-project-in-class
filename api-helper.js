export class ApiHelper {
  constructor() {
    this.baseUrl = "https://api-im.chatdaddy.tech";
  }
  async fetchFromPortal(url, headers, body) {
    const respose = await fetch(this.baseUrl + url, {
      ...(headers && ({
        'Authorization': `bearer ${respose.access_token}`,
        'Content-Type': 'application/json'
      })),
      ...(body && ({ 'Content-type': 'application/json; charset=UTF-8' })),
      ...(body && ({
        body: JSON.stringify({
          "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
          "teamId": "a001994b-918b-4939-8518-3377732e4e88"
        })
      }))
    });
    const res = respose.json();
    console.log(res, "jjsn")
  }
  // }
  //   async fetchFromPortal(url,body) {
  //     const respose =await fetch(this.baseUrl + url, {
  //       body: JSON.stringify({
  //         "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
  //         "teamId": "a001994b-918b-4939-8518-3377732e4e88"
  //       })
  //     });
  //     const ApiTokan = await respose.json()
  //     console.log(ApiTokan,"api")
  //     // const Apirespose = fetch(this.baseUrl + url, {
  //     //   headers: {
  //     //     'Authorization': `bearer ${ApiTokan.access_token}`,
  //     //     'Content-Type': 'application/json'
  //     //   }
  //     //   })
  //     // return await Apirespose.json()
  //   }
}
