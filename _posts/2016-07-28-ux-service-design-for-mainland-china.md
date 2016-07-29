---
layout: post
title: "UX/Service design For Mainland China"
---

![Great Wall](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160728/greatwall.png)

This century most of the economic booms and busts is controlled by mainland China.

1 Billion people slowly being introduced into the global economy tends to do that.

Still it's quite a lucrative market to crack into if you know how to deal with all of it. But it's a lot harder to innovate because you can't simply just do it and ask for permission later or you'll incur the wrath of the great firewall.

![牛市中國](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160728/%E7%89%9B%E5%B8%82%E4%B8%AD%E5%9C%8B.png)

But service design for the China Mainland doesn’t just work the same way as you would for the rest of the world.

I know from experience because I’m often in the mainland and I know what things works and what things don’t. Also have attempted to launch apps there before.

## Here are some things you should consider.

### Localization
 All good services should support the language that the person set their system too. Refer to my previous UX posts about this titled “UX for APIs”. It’s basically the same principle, but extend it further to the user interface too.

### CDN support
Amazon Cloudfront is the best, it seems to support the mainland the best.  Avoid using Google and Facebook CDNs as they may not work (that means don’t host your React and Angular JS libraries on Facebook/Google).

Cloudflare may have issues too because it is a shared IP, so you might be unlucky enough to share your IP with a blocked site. Although with Cloudflare you can pay them a lot of money not to have a shared IP. I’d personally avoid them though if you are a startup as the paid plan costs quite a bit.

You can also use a China hosted CDN, but you will need to register a Chinese business, then apply for an Internet Control License (china bureaucracy!)

### Site Analytics
If you have to, place google analytics code down the bottom so it doesn’t slow the whole site from loading. You may also want to use another analytics.

### Social Sign On
Avoid using Facebook and/or Google only sign on. Support at least phone number sign in is the recommended course of action.  You may be able to use WeChat for single sign, but I haven’t found any useful documentation for it yet.

### Social Media Links
Avoid having links to Facebook/Twitter/Google+ (or any western service). They are all blocked in the mainland. Replace it with a local equivalent. You can detect where the user is coming from either from your application, or you can use your CDN such as Amazon Cloudfront to do a conditional redirect to a different origin server. Or maybe a combination of both.

### Payments
If you're to run your service as a sustainable business, you probably need to start collecting money.

Like social media in the west, payments is usually done with UnionPay or AliPay rather than Visa/Mastercard/AMEX.

But the most common payment method for online payments is AliPay. You should probably considering support ApplePay too which seems to implement what China supports elegantly (that is UnionPay). Apple, despite all the haters cares very much about UX so you don’t need to do anything extra if you use the Apple Platform.

For websites, I recommend using Stripe as it supports AliPay out of the box, and the fees are a lot less than AliPay.

### Mapping
Because mapping is restricted to local companies due to national security, avoid using Google Maps. Not to mention your users can't get to it. Even if they can its a poor user experience because Google doesn't have the offset data that is needed on the mainland.

 Not only that, Android handsets on the mainland don’t have it. A good alternative for web, is something that implements open street maps. For iOS, just use the standard maps. It just works. Android, maybe Baidu. I don’t have much experience using Baidu’s mapping SDK though (I have to wonder if the API documentation is actually in english).

### Mobile Push notification Services
 If you're building an app, you probably already know that push notifications is a good way of engaging users. But the rules may change depending on which platform you are targetting (or not at all).

 For Apple iOS devices, it will just work - no changes needed.

 For Android devices, you can’t use Google Cloud to do it because Google servers are mostly blocked. You can use Baidu for push notifications instead. But you can also use pushy, igetui, or jpush. The best is to use Amazon Simple Notification service to aggregate them all and then use a single API to manage the push services.

### App Stores
On Android, you will need to list your apps on the local markets (Baidu and MI Marketplace), rather than Google Play. As Google Play does not work on the mainland. Also Android phones do not come with Google Play. In the mainland there are 9 app stores you need to register on - Baidu, Tencent, Xiaomi, Huawei, Qihoo 360, Wandoujia, 91 Mobile Assistant, HiMarket, and D.cn.

For iOS its straightforward. The same app store can be used.

## In Summary
Building Android apps for mainland China, you’ll be in a world of pain because of company politics (i.e. Google / China shenanigans)). So try to take advantage of all the tools to make things easier (i.e. Amazon SNS). But iOS apps in mainland China, you won’t even need to do anything special (thanks again for Apple’s partnerships in China) if you follow all the Human Interface Guidelines set by Apple (which you should!). Websites is a bit more easier because you don’t need to do push notifications, as long as you host it properly.
