# Chat App
This is a simple React Native Chat app.

## Features
- Start screen
  - Enter your name
  - Choose a background color for your chat screen
  - Go to Chat screen
- Chat screen
  - Display conversation
  - Add to conversation using a text box and button
  - Ability to add images and location data
  - Chat stored online and offline

## Development
We use [Expo](https://expo.dev/) to run dev versions on our phones and [Android Studio](https://developer.android.com/studio) to run an emulator.

Before you start create an [Expo account](https://expo.dev/signup).  


### Install
Run `npm install -g expo-cli` to install the expo-cli

Run `npm install` from the project directory.

Run `expo login` to login to Expo from the cli.

### Run it

Run `npm run start` from the project directory to start Expo.

#### Use your Andriod Phone
Install "Expo Go" on your Android device.  Open Expo Go and login.  As long as you're on the same network as your computer, you should be able to use Expo Go on your phone to connect to Expo on you computer and run the chat app on your phone.

#### Use Android Studio
Launch a device using Android Studio.  Make sure it has plenty of resources so it doesn't crash.  Install Expo Go?  All you need to do to get the chat app running is press `a` for Android in the command line where Expo is running.  Expo should detect the device in Android Studio and launch the Chat app.