## Nuclear Codes

#### What is nuclear codes?

Nuclear Codes is a simple facial recognition mac app. Heavily inspired
by Donald Trump taking office in 2017 and him gaining access to the nuclear codes.
The app takes a snapshot of the person in front of the screen,
compares it with an image that is allowed to access the nuclear codes, either lets them view the codes or not.

This was a simple task to develop further skills in React and a chance to try out the AWS AI services.

#### What is the stack?

- [ElectronJS](http://electron.atom.io/) - Used for the mac interface.
- [React](https://facebook.github.io/react/) - My JS framework of choice.
- [AWS Rekognition](https://aws.amazon.com/de/rekognition/) - used for comparing the given face with the "presidents" face.
- [AWS Polly](https://aws.amazon.com/polly/) - used for the voice prompts.

#### How can I try it out?

1. Create an AWS account and make sure your user has S3, Rekognition and Polly read and write access. See [this](https://aws.amazon.com/account/) and [this](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_permissions.html) if you are unsure how to get this set up.

2. In the AWS console create an S3 bucket with the name of `rekognitionnn-mysecret`. Change `mysecret` to be unique to your account.

3. Upload your "president" image. Make sure you change the `president.jpg` file in the repo to be a clear picture of your face.
Then from the root directory, run:
```
s3 cp ./president.jpg s3://{your_bucket_name}/nuclear-codes/president.jpg
```
- Make sure your CLI is using the details for the account you are using for this application. I use [Named Profiles](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles) to do this.
- Also make sure you change `{your_bucket_name}` to be the bucket name you set up on point two.

4. Copy the `aws_config.json.example` into `aws_config.json` and update the details to be the security credential of the user you are using in the `aws_config.json` file.

```
cp aws_config.json.example aws_config.json
```

5. The bucket name is kept as a constant in our `AWSUtil` module. So go over there and make sure you update [this](https://github.com/simonfl3tcher/nuclear-codes/blob/master/src/utils/awsUtil.js#L8) line with the bucket name you created in point two.

6. That should be everything, lets install the dependencies and spin up the app.
```
npm install && npm build && npm run app
```
