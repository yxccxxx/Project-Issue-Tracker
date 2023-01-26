/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-../script/sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "../html/add_firebase.html",
    "revision": "640f0359f9f69ffe9102584fa558f164"
  },
  {
    "url": "add_firebase.js",
    "revision": "7a00d54a95910675c8a22d81959d3e45"
  },
  {
    "url": "add_local.js",
    "revision": "fcdc62fe874f84c929ae4fb28db13154"
  },
  {
    "url": "../html/add_template.html",
    "revision": "aa4ab637aa2afa18a311f6b3398e74d2"
  },
  {
    "url": "../css/add.css",
    "revision": "2f190fad5d1015fdcd356105e9362821"
  },
  {
    "url": "../img/applet_error.png",
    "revision": "dd191f887c80600817fd70ac12edc229"
  },
  {
    "url": "../font/CoconLight/CoconLight-bg.png",
    "revision": "ad50188641add64ac33859ebc0a543d9"
  },
  {
    "url": "../font/CoconLight/CoconLight-thumb.png",
    "revision": "6411e1915c9d496771c2645472703d50"
  },
  {
    "url": "../font/CoconLight/CoconLight.eot",
    "revision": "5ec560b00ebe1a9b8aed61cdfc30fb65"
  },
  {
    "url": "../font/CoconLight/CoconLight.png",
    "revision": "8b288516c1080626e6f0b1146364eb7d"
  },
  {
    "url": "../font/CoconLight/CoconLight.ttf",
    "revision": "11a13a061d0adb13c39969f1fc4ae684"
  },
  {
    "url": "../font/CoconLight/CoconLight.woff",
    "revision": "3502f68b5ac447f6dfd32ffb6f85239c"
  },
  {
    "url": "../font/CoconLight/font.css",
    "revision": "32d0a3870bbea0b0ad05b764daa53103"
  },
  {
    "url": "../font/CoconLight/index.html",
    "revision": "9ea2211b3a221db501c1e67d87ae24cc"
  },
  {
    "url": "../font/CoconLight/readme.txt",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "../html/edit_firebase.html",
    "revision": "27dbda9c8c880ebd78988cf9e941da62"
  },
  {
    "url": "edit_firebase.js",
    "revision": "7741900372928b4899ef9aa3a0d673f1"
  },
  {
    "url": "edit_local.js",
    "revision": "5cc466e9e4689c8b18a46c0229cb22d1"
  },
  {
    "url": "../css/edit.css",
    "revision": "c47a26a5bd409f8c29f3637e804465ac"
  },
  {
    "url": "../html/edit.html",
    "revision": "02022601132edb0a4c247ac057be81e7"
  },
  {
    "url": "../img/error.gif",
    "revision": "428c81149b29094c26b56475db55a07c"
  },
  {
    "url": "firebase_init.js",
    "revision": "a688d7f814bc5fadc1401e1378084e89"
  },
  {
    "url": "firebase_list_actions.js",
    "revision": "26d780713190ebb42b558d47650aca0f"
  },
  {
    "url": "../html/forget_password_firebase.html",
    "revision": "98120adcdfb2c0e95799f7be4364bce7"
  },
  {
    "url": "../html/forget_password.html",
    "revision": "88bc52ec4065080c1225ecd3538b7adf"
  },
  {
    "url": "../font/GeosansLight/font.css",
    "revision": "f4bd7c10f134940e8284d8d4ff7182a6"
  },
  {
    "url": "../font/GeosansLight/GeosansLight-bg.png",
    "revision": "2f081eb9405e44416aa084b1ff0a06ab"
  },
  {
    "url": "../font/GeosansLight/GeosansLight-thumb.png",
    "revision": "7a61fb2aed868be42ac835aa78cb8ece"
  },
  {
    "url": "../font/GeosansLight/GeosansLight.eot",
    "revision": "247246086e80f95201620e5bd08f1e59"
  },
  {
    "url": "../font/GeosansLight/GeosansLight.png",
    "revision": "2d712e17558c04c9c6e092547c1b0a14"
  },
  {
    "url": "../font/GeosansLight/GeosansLight.ttf",
    "revision": "e3117d44f853e234eb2fdb41a9f5c80b"
  },
  {
    "url": "../font/GeosansLight/GeosansLight.woff",
    "revision": "329ee3c36976474d8824f5060367fa51"
  },
  {
    "url": "../font/GeosansLight/index.html",
    "revision": "fbe10fa3086d85294ddfdd14decb38e9"
  },
  {
    "url": "../font/GeosansLight/readme.txt",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "../font/gothic/font.css",
    "revision": "dc85bcdace47d7e5ead966d0695a8088"
  },
  {
    "url": "../font/gothic/gothic-bg.png",
    "revision": "8468872a5fb3056dd382c54bb02a7cef"
  },
  {
    "url": "../font/gothic/gothic-thumb.png",
    "revision": "1198350b7e14a7a61d0d72b594231226"
  },
  {
    "url": "../font/gothic/gothic.eot",
    "revision": "9a7bcf3c1eb7e01e00b68fb984bc2f2f"
  },
  {
    "url": "../font/gothic/gothic.png",
    "revision": "0f8c6b752cd42733ac21a5d5764abc11"
  },
  {
    "url": "../font/gothic/gothic.ttf",
    "revision": "34cc487b3cb7d06dc0233644b2fd40da"
  },
  {
    "url": "../font/gothic/gothic.woff",
    "revision": "151c4696847a325b6f5a672ec0c426bc"
  },
  {
    "url": "../font/gothic/index.html",
    "revision": "f7673d35f139957cc75503fd395bffa5"
  },
  {
    "url": "../font/gothic/readme.txt",
    "revision": "aa2d6e4f578eb0cfaba23beef76c2194"
  },
  {
    "url": "../img/icon.png",
    "revision": "b30f3112cee098cddc63fb6bab4124df"
  },
  {
    "url": "../img/icon.svg",
    "revision": "962d2601069ff584abc1af20005220c1"
  },
  {
    "url": "index.html",
    "revision": "7f4d27410df29afdaaefb0549c009a17"
  },
  {
    "url": "issue_actions.js",
    "revision": "fcc48300701e31d94a5e1618ebaff466"
  },
  {
    "url": "../html/issue_firebase.html",
    "revision": "ffe24834cdba30ff16c3f589592cbe38"
  },
  {
    "url": "issue_firebase.js",
    "revision": "47887437fc79ca701e0c634f49631465"
  },
  {
    "url": "../html/issue_template.html",
    "revision": "f3c74118f951523cee58bbb71999f4f2"
  },
  {
    "url": "../css/issue.css",
    "revision": "5eaaec2e880063c93720c3011613ba33"
  },
  {
    "url": "../html/issues_list_firebase.html",
    "revision": "164c8f03576e79b998ab3bef9041f3dd"
  },
  {
    "url": "../html/issues_list.html",
    "revision": "87811e0bfa26ff2b054c9cce08016651"
  },
  {
    "url": "../img/jpg_emoji.jpg",
    "revision": "c42882d5d7c2afa1fdbb9df3304dcba2"
  },
  {
    "url": "json-server/db_copy.json",
    "revision": "2fc30d1ca7341f73c729c4e445de1057"
  },
  {
    "url": "json-server/db.json",
    "revision": "b30e54d000383477cb8c23a8abd1c39c"
  },
  {
    "url": "list_actions.js",
    "revision": "90e3940499756711f2f96857d8aa0e05"
  },
  {
    "url": "list_mem_data/data.json",
    "revision": "ca2ad7a9132555d014d6a5c0f945a5e2"
  },
  {
    "url": "list_mem_data/init.js",
    "revision": "70bab57ac84a5416d6b11dc70b9a2673"
  },
  {
    "url": "list_mem_data/issue1.json",
    "revision": "aff4feef08afd188a723ce7f4364c1f6"
  },
  {
    "url": "../css/list.css",
    "revision": "a83a8570cbea3dc73a1e92b00847f5fc"
  },
  {
    "url": "../css/loading.css",
    "revision": "6b26a27c7e2aa842d9211a9058e2d630"
  },
  {
    "url": "../img/loading.gif",
    "revision": "b5496ec36d58fa7b7ee856498a9d5c0f"
  },
  {
    "url": "../css/login.css",
    "revision": "3e389edfbeb3beb6036a7e343b3c4c07"
  },
  {
    "url": "login.js",
    "revision": "fa58a4a9fa70fcc74bc52f495a31db50"
  },
  {
    "url": "/manifest.json",
    "revision": "3d9accb854c0de7d1f57a20f97236c22"
  },
  {
    "url": "../img/marquee_error.jpg",
    "revision": "378c9a9a3f40821ca2a2cb60e37a17d3"
  },
  {
    "url": "/my-icons-collection/backup.txt",
    "revision": "61e14d98d69b128b2127ff8a201ac8f4"
  },
  {
    "url": "/my-icons-collection/font/_flaticon.scss",
    "revision": "0a2dd02c7031b3f4b02eeb59e3da20bc"
  },
  {
    "url": "/my-icons-collection/font/flaticon.css",
    "revision": "76e8f2a346476b6e13c034470a3cc12a"
  },
  {
    "url": "/my-icons-collection/font/Flaticon.eot",
    "revision": "2bc91a5659cff08691bcb25df1a2fc22"
  },
  {
    "url": "/my-icons-collection/font/flaticon.html",
    "revision": "a86da7fc170eb9acb90db26d9d9b92cb"
  },
  {
    "url": "/my-icons-collection/font/Flaticon.svg",
    "revision": "38acf862e90e26be7c36e61556d047e3"
  },
  {
    "url": "/my-icons-collection/font/Flaticon.ttf",
    "revision": "3ffd9cceee2d8ff7c0b2716e0ac8291b"
  },
  {
    "url": "/my-icons-collection/font/Flaticon.woff",
    "revision": "14bc3e2242bcb4cd6066b92fd51c1572"
  },
  {
    "url": "/my-icons-collection/license/license.html",
    "revision": "e21d6e49592db2155f2ba9b6fe9621d5"
  },
  {
    "url": "../html/reset_password.html",
    "revision": "a840f653b4abbb06bdaa000367144bd3"
  },
  {
    "url": "/robots.txt",
    "revision": "f67f22f9cb56aaf1cd0009f321a5605c"
  },
  {
    "url": "../html/sign_up_firebase.html",
    "revision": "ca96cf183feac8d06040545a0038f70b"
  },
  {
    "url": "../html/sign_up.html",
    "revision": "0ae0be3680499939ae404f6951c152db"
  },
  {
    "url": "../img/success.gif",
    "revision": "ae209d04b11545dbafdc8f00355dfef0"
  },
  {
    "url": "../img/svg_emoji.svg",
    "revision": "94fd36bae9eb00ed9718c96486f2da37"
  },
  {
    "url": "user_permission.js",
    "revision": "d79df291e6f3a3f26b988ac5f5b85ca6"
  },
  {
    "url": "util.js",
    "revision": "bbc2967d7ec9cae6dfdd85a553de2f11"
  },
  {
    "url": "../img/webp.jpg",
    "revision": "d4a63031f57bdcafb86ca02100fdd6d2"
  },
  {
    "url": "../img/webp.webp",
    "revision": "0e2687e3a6c95084e6ce912aa45d3803"
  },
  {
    "url": "webpack.config.js",
    "revision": "900ae95a1a322fca75ebc7437470757c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
