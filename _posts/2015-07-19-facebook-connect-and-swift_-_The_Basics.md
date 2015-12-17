---
layout: post
title: "Facebook connect SDK and Swift - The basics"
---

There's heaps of blog posts out there for doing several things, but not too much on integrating the facebook SDK on Swift.

I think Swift is a powerful language and any new projects should start using it. Recently, Lyft shipped an iOS app which is built in pure Swift to demonstrate to the world that yes its possible.

Anyway, lets get down to the nitty gritty

## First things first

Lets make sure we got the latest version of the Facebook SDK installed, and do install it to the ~/Documents folder.

Then link the framework using the frameworks section in Xcode.

## Next up, lets link the framework.

Because the Facebook SDK is still Objective-C we will need to link an objective-C library.

The way we do this is through a bridging header file (ugh), which exposes all the functions from the Facebook SDK library to Swift.

For this project, we'll include both Core and Login.

~~~ objectivec
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
~~~



## Now lets go to the ViewController.swift file

Now lets go into the Login Viewcontroller swift file and make sure it first conforms with the FBSDKLoginButtonDelegate

~~~ swift
class ViewController: UIViewController, FBSDKLoginButtonDelegate {

// ...
// Insert your awesome class implementation here

}
~~~

### Delegate functions

And here are the delegate functions in the class.

~~~ swift
    func loginButton(loginButton: FBSDKLoginButton!, didCompleteWithResult result: FBSDKLoginManagerLoginResult!, error: NSError!) {
        // Show the access token, maybe send it to the server?
        println("User Logged In. Access token: \(FBSDKAccessToken.currentAccessToken().tokenString)")


        if ((error) != nil)
        {
            // Handle errors like a boss. UX Matters
        }
        else if result.isCancelled {
            // What happens when the user presses the cancel button. It's not an error. We should handle it.
            // UX matters.
        }
        else {
            // If you ask for multiple permissions at once, you
            // should check if specific permissions missing
            if result.grantedPermissions.contains("email, public_profile")
            {
                // Do something awesome here once we confirm we got all the permissions
            }
        }
    }

    func loginButtonDidLogOut(loginButton: FBSDKLoginButton!) {
        println("User Logged Out")
    }
~~~

### Display the login button

At the very basics, we'll put it in the center. And we won't customize the view

~~~ swift
    override func viewDidLoad() {
        super.viewDidLoad()
        if (FBSDKAccessToken.currentAccessToken() != nil)
        {
          // We think the user is logged in, lets validate this. and do something.
          // Added the Access token for the sake of validating it
          println("Access token: \(FBSDKAccessToken.currentAccessToken().tokenString)")
        }
        else
        {
          // Show login button. Basics.
          let loginView : FBSDKLoginButton = FBSDKLoginButton()
          self.view.addSubview(loginView)
          loginView.center = self.view.center
          // Keep in mind that some permissions requires approval
          loginView.readPermissions = ["public_profile", "email", "user_friends"]
          loginView.delegate = self
        }

    }
~~~

## Lets edit the Application delegate file

### Edit the application entrypoint

~~~ swift
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.

        return FBSDKApplicationDelegate.sharedInstance().application(application, didFinishLaunchingWithOptions: launchOptions)
    }
~~~

### Handle the login callback

After login or cancellation (or error?!), the control goes back to the application through app switching.

We need to handle this by setting up a URL scheme and handling that URL scheme.

#### The Swift code for URL handling

Here is the code:

~~~ swift
    func application(application: UIApplication,
        openURL url: NSURL,
        sourceApplication: String?,
        annotation: AnyObject?) -> Bool {
          return FBSDKApplicationDelegate.sharedInstance().application(
            application,
            openURL: url,
            sourceApplication: sourceApplication,
            annotation: annotation)
    }
~~~

#### Adding the URL handler

In "Info.plist" add the following:

* "FacebookAppID" key with your app ID as the string value
* "FacebookDisplayName" with your app name as the string value
* "URL Types" main key
* Expand "URL Types" (It should be an array). Add another key called "Document Role" = "Editor" (String) in the first array entry. And add a key called "URL Schemes" which should be another array. The first key should be called "fb<appid>" (where <appid> is you application id)



## Conclusion

After this, you should be all set to test the very basics and be able to customize the above boilerplate to suit your application logic.

Last but not least, the code examples in this post can be found on a [GitHub Repository](https://github.com/nolim1t/swift-and-facebook-sdk) that I set up.
