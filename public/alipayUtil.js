const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const alipaySdk =  new  AlipaySdk({
  appId: '2021000118638070', // 开放平台上创建应用时生成的 appId
  format:"json",
  signType: 'RSA2', // 签名算法,默认 RSA2
//   https://openapi.alipaydev.com/gateway.do
  gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4plus1aaxEY//VI326hFg9O38f0Fngr15C/h2T4kCtywgJHHE0uA43+sHV9IVl+0Hb5paiJVcZqv0JQcXGYK843Toz/IhmwkydA17ISUVYzaXyjKKQO5wQFzaRcO16N7DcWwYklW5bRxO78iemR+ZHTXtL1OcXyiVl565rkdl04L7BAibjtU4SUZULZBXyvgto8U0XnTcPwkPhZMFooablnh1uoR9cYVbiXJAH77kRabtXFWBlg1/QqKG+eGTdDHr12PEwc6WIZRAV6K6uDMrRidf9QNEa7YxHtAMMCJA/GprkmWsEinLxcPOgsOVV+xzEIaZGWBDPAe8LwKSi937wIDAQAB', // 支付宝公钥，需要对结果验签时候必填
  privateKey: 'MIIEowIBAAKCAQEAjpakPfpswrqE61FVKojYqX9PJees0ZEapQVuSXWWiHvhtnIYT00qIebN0Gi4MqgS50leHuAqK33wvKCpDbLGlnKiSmlPvZPpCkZojkZNnBxEIyhhkjiIQ2MPMi8xHPXFEDsTvoZXOdq5HXocTGiwxZitVYQoDVOX/DcYZpndKLyjKTavQzf1QnQkeBOcH2TrvQSrFwsPTmjmmIdqZaA+GAAxFERJn0uw6k05LM6EwrdakETYCRizgQ+ASof5Xs2twh8YjFCLGMxKaGZCHN7a2vejNC/yaaorQ4u6yG95+SBKH0Ipm5gFOrxKMbHZ4XK5sSlejISovSUAysThuANw1QIDAQABAoIBABHygh/O+ouUIJDh/t9ItES5YoP54jXKltj4kwYqB9WMCkAFomuw4cG8pGE8HRs7Lo3wHSmzu3sX8go8CqtPulFLgoPtN308NdP2QsjNro0cvbLTLVzTQsuAl3QQnpTvlmtRlE2h6S6+Chjcut0fPEjSy9Z8uPHceL/lS2v2p/CthVmo/xmMCpA0QPSfuXu27FBrie1PSV9xwKMFzvgzRWz3xlRfWoRyNXnk5qN1cqg861Kq8Cwt/6MYT1l5CzJx2squFfL7nMiIdzz4xqOY/k3Fg1NZJo11KOcsavfAlRLqNSbiJ4zm2gZaEwh90aQBEilPKugtjOn2p/QE7YX3w4ECgYEA1HqVQAAIAZfUV9ia1JIj74yOEZt4KE7TFmJJOrJeWH+cCq2WH7/qdg0B0HjSM1hDQh2ZXlNyxGe/bIZPA++k2jtkdplc/5ySX6WNvcHGeE3az+zxMCsLgjAB5PhtGFe0XuY39HSQr10+XBKXYNk4OO6TcnSsjaIYkueUBoi3w/UCgYEAq8tTi+vKf3+V7O7l3GSeHhFfKHYa7zsS2NipUO/7zXF/0rqLUNOYaTHxnGUIQzZEcNiD+VlY+aXGTZ7oR8iRJ8xXnUqywMQnzNyaheVdCQ5n/J63JJqNNUcjWzkC8gRBngnL6KbYcfnKuj764EHGTmk6dUi1aC2mu7MvUZU7zWECgYA70gNBEIEwiaFz1fzJShep8qVw2Zd7qa2OSL+bMeqT+eFhtDtm1u5YrBLNsaZkZD4TWCf8wXu3RgpDsJCAaDC+bCg9p7HiGR+wo/iC6xJIforTLT8+M3A7B+8QmsyEJPUYHrK0NTki1hqfa3CJCL7mcGy8tZJ7EZ7fhSlMqaMrHQKBgQCR+WARSZa0Ra4YOFqareho9ivcTpbOZmy6U0dznadhRyrs3VOZp2IfKK/7SyH9MnRvSprBWnkvD/xzYi5PKI6muYxM+/btsv96pIysb1thYZtcXWSTNrv75GmXjtcA3DsBVaOtGXBbUHxBS1iTC3C8mc9xbwmt7vR5E2WGtf6toQKBgF6vFIyU3Zib8Y0lslXOqGEbWWV0XxY9XNmIl8OEAIu7A+umiwQzY87a5Kn8sQ5bFYYNFwwJeoC8lggbnvYaHfh6bou5veirXseqcsu9ft/00ixwE6TVTd0KyypDSfeuEYa2gGFflm91jrpKYdcmpzUztTUJQNWSWdtKfCQWdTs6', // 应用私钥字符串
});
module.exports = alipaySdk;

//正式环境只要把上述换成正式的就可以了