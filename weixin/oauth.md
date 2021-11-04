# weixin oauth 2.0

<https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html>

关于网页授权的两种scope的区别说明

1、以snsapi_base为scope发起的网页授权，是用来获取进入页面的用户的`openid`的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）

2、以snsapi_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

## 授权步骤

（A）用户访问客户端，后者将前者导向认证服务器。

（B）用户选择是否给予客户端授权。

（C）假设用户给予授权，认证服务器将用户导向客户端事先指定的"重定向URI"（redirection URI），同时附上一个授权码。

（D）客户端收到授权码，附上早先的"重定向URI"，向认证服务器申请令牌。这一步是在客户端的后台的服务器上完成的，对用户不可见。

（E）认证服务器核对了授权码和重定向URI，确认无误后，向客户端发送访问令牌（access token）和更新令牌（refresh token）。

## code

```js
// 检查是否是 weixin 环境
const isWechat = exports.isWechat = function (ctx) {
    return ctx.get('User-Agent').indexOf('MicroMessenger/') > -1;
};

const mktUrl = encodeURIComponent(ctx.href);
const oauthUrl = `https://xxx.biz/oauth/api/v2/users/current?authType=weixinServicePlatform&mktUrl=${mktUrl}`;

const bindUrl = `https://xxx.biz/oauth/api/v2/users/current/bind?authType=weixinServicePlatform`


// 请求 oauth，获取微信认证信息
const data = await fetch(oauthUrl, {
    headers: {
        'Cookie': ctx.get('Cookie'),
        'User-Agent': ctx.get('User-Agent'),
        'X-Forwarded-For': ctx.get('X-Forwarded-For'),
    }
});

/* 
fetch request oauthUrl

response content:

// unauthorized
{
    authResultType: 'unauthorized',
    redirectUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx82a3ae66e5937a38&redirect_uri=https%3A%2F%2Fm.xxx.biz%2Foauth%2Fapi%2Fv2%2Fcallback%3FmktUrl%3Dhttps%253A%252F%252Flocal.xxx.biz%252Flessons%252Frenewals%252F%253Fkeyfrom%253DrenewLesson%26authType%3DweixinServicePlatform%26useSnsapiUserinfo%3Dfalse&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect',
    oauthId: 0,
    userId: 0,
    nickname: null,
    avatar: null,
    openId: null,
    lastOAuthTime: 0,
    unionId: null,
    ouUniqCode: null
}

// 用户授权后返回链接：https://xxx.biz/oauth/api/v2/callback?mktUrl=https%3A%2F%2Fxxx.biz%2Flessons%2Frenewals%2F%3Fkeyfrom%3DrenewLesson&authType=weixinServicePlatform&useSnsapiUserinfo=false&code=041OK5Ha1mzS3C0E4DJa1Mkt6t4OK5Hl&state=STATE

// **从上面的返回信息可知是使用 snsapi_base 静默授权**

// bound
{
  authResultType: 'bound',
  redirectUrl: null,
  oauthId: 123456,
  userId: 123456789,
  nickname: null, // 用户昵称
  avatar: '',
  openId: 'ojF0C1m49bUsy5jv9F8p9xWrPd4j4', // 用户的唯一标识
  lastOAuthTime: 1636008164900,
  unionId: '',
  ouUniqCode: 'Dsx2p9Ow5%2FP2gc12b36E2n5SJqq%2F%2F59O4OjPf9%2BFgzXc%3D'
}

// bound 时的 set-cookie

test_oauthsess="6NsmCDm4T9bLC6Pao2Z0U5X7Zgb5z9IgetYuTlwEoZ79FgnUAZCMSgZD6R8pjbWY3MnQ8eMollASBGoixpBzl3mt7jQU080erLSlYknI9veew+UC6b3ybQTNvOF6M38m";domain=.xxx.biz;path=/, 
test_oauthid=Dsx2p9Ow5%2FP2gc12b36E2n5SJqq%2F%2F59O4OjPf9%2BFgzXc%3D;domain=.xxx.biz;path=/

*/

switch (data.authResultType) {
    // 未微信授权
    case 'unauthorized':
        // 跳转微信验证地址
        ctx.redirect(data.redirectUrl);
        break;
    
    // 已微信授权，并绑定微信账号
    case 'bound': { 
        // 把 test_oauthsess、test_oauthid 这两个 cookie 塞进 cookie 返回给客户端
        // ctx.set('set-cookie', headers);

        // 记录返回值, 后面请求用户资源处于微信环境时会用来检查是否微信授权绑定
        // ctx.state.GLOBAL.setCookieHeader = setCookieHeader;
        // ctx.state.GLOBAL.boundData = data;
        await next();
        break;
    }

    // 已微信授权（能拿到用户的openId），但没有绑定 app 帐号
    case 'login': {
        // 用户此时可能已经登录了
        const data = await ServerRequest.postByUser(ctx, bindUrl, {
            headers: {
                // oauth 认证返回的 cookie 扔到这里
            }
        });

        // 把 test_oauthsess、test_oauthid 这两个 cookie 塞进 cookie 返回给客户端
        // ctx.set('set-cookie', headers);

        // 记录返回值, 后面请求用户资源处于微信环境时会用来检查是否微信授权绑定
        // ctx.state.GLOBAL.setCookieHeader = setCookieHeader;
        // ctx.state.GLOBAL.boundData = data;
        await next();
        break;
    }

    // 用户未登录：跳转用户登录页面
    default:
        return ctx.render('u/login');
}        

```
