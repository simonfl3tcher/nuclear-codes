## Nuclear Codes

#### What is nuclear codes?

Nuclear Codes is a simple facial recognition mac app. Heavily inspired
by Donald Trump taking office in 2017. The app takes a snapshot of the person
in front of the screen, compares it with an image that is allowed to access
the nuclear codes, either lets them view the codes or not.

This was a simple task to develop further skills in React and test out the AWS AI services.

#### What is the stack?

- [ElectronJS](http://electron.atom.io/) - Used for the mac interface.
- [React](https://facebook.github.io/react/) - My JS framework of choice.
- [AWS Rekognition](https://aws.amazon.com/de/rekognition/) - used for comparing the given face with the "presidents" face.
- [AWS Polly](https://aws.amazon.com/polly/) - used for the voice prompts.

#### How can I try it out?

1. Create an AWS account and make sure your user has S3, Rekognition and Polly read and write access. See [this](https://aws.amazon.com/account/) and [this](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_permissions.html) if you are unsure how to get this set up.

2. In the AWS console create an S3 bucket with the name of `rekognitionnn`.

3. Upload your "presidents" image. Make sure you change the `president.jpg` file in the repo to be a clear picture of your face.
Then from the root directory, run:
```
s3 cp ./president.jpg s3://rekognitionnn/nuclear-codes/president.jpg
```

4. Spin up the app and give it ago.
```
npm build && npm run app
```
