
# Node version

In order to stay on the free tier of Firebase, we must use Node version 8.  That requires installing slightly older dependencies, for instance jest and ts-jest cannot be newer than 25.

# Firebase Credentials

Get service account key from Firebase Console -> Project Settings -> Service
Accounts and copy it to the .keys directory.  Call it `serviceAccountKey.json`

## Testing

### Backend
```
cd functions
npm test
```

### Frontend
```
cd client
npm test
```

## Links
https://h-malik144.medium.com/jest-testing-for-firebase-functions-a51ce1094d38
https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/


