This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Project Description - News App

1) Set up a new React Native project using either Expo or React Native CLI.
2) For Fetching and Storing Headlines:
      - Implement a background task to fetch the top 100 news headlines from a news API of your choice. for e.g. https://newsapi.org/
      - Store these headlines in local storage for offline access.
3) Splash Screen and Initial View:
      - On app load, display a splash logo of your choice.
      - After the splash screen, then show a list view with the first 10 headlines.
4) Dynamic List Update:
      - Set up a timer that introduces a new batch of up to 5 random headlines to the top of the list every 10 seconds.
      - Allow users to manually trigger fetching the next batch from local storage and resetting the drip timer.
5) Handling Exhaustion of Headlines:
      - When all headlines from the current batch have been displayed, reset local storage.
      - Fetch the next batch of headlines and populate the list view.
6) User Interaction:
      - Allow users to swipe a headline to delete it or pin it to the top of the view.
      - A pinned headline should stay in view when the list updates, whether manually or automatically.
7) Deleting a headline should remove it from view, with the next headline appearing at the top of the list.

## Steps to set  up Project

## Step1: Create api key

      1) Create api key on https://newsapi.org/
      2) Create .env in the root folder and
            ```bash
                  API_KEY="Add your key here"
            ```
## Step2: Install all dependencies

   ```bash
      # using npm
      npm start
   ```

## Step3: Link libraries with pod for IOS

   ```bash
      cd ios && pod install && cd ..
   ```

## Step4: Start your Application

Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```
If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
