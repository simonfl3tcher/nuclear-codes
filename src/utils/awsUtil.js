import 'aws-sdk/dist/aws-sdk';
import aws_config from '../../aws_config.json';

const AWS = window.AWS;
AWS.config.update(aws_config);

var AWSUtil = (function() {
  const bucket      = 'rekognitionnn';
  const sourceImage = 'nuclear-codes/potential_imposter.jpg';
  const targetImage = 'nuclear-codes/president.jpg';

  let S3          = new AWS.S3( { params: { Bucket: bucket } } );
  let rekognition = new AWS.Rekognition();
  let polly       = new AWS.Polly();

  const compareFacesWithRekognition = () => {
    let compareFacePromise = rekognition.compareFaces(
      {
        SimilarityThreshold: 90,
        SourceImage: {
          S3Object: {
            Bucket: bucket,
            Name: sourceImage
          }
        },
        TargetImage: {
          S3Object: {
            Bucket: bucket,
            Name: targetImage
          }
        }
      }
    ).promise();

    return compareFacePromise
      .then((data) => {
        return data.FaceMatches[0] ? true : false;
      }).catch((err) => {
        return false;
      });
  }

  const getPollyMP3Url = (string) => {
    let pollySpeechPromise = polly.synthesizeSpeech(
      {
        OutputFormat: 'mp3', 
        SampleRate: '8000', 
        Text: string, 
        TextType: 'text',
        VoiceId: 'Salli'
      }
    ).promise();

    return pollySpeechPromise
      .then((data) => {
        let arrayBuffer  = new Uint8Array(data.AudioStream).buffer;
        let blob         = new Blob([arrayBuffer]);

        return URL.createObjectURL(blob);
      }).catch((err) => {
        console.log('Something went wrong with polly!');
      });
  }

  const compareFaces = (buffer) => {
    let putObjectPromise = S3.putObject(
      {
        Key: sourceImage,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      }
    ).promise();

    return putObjectPromise
      .then((data) => {
        return compareFacesWithRekognition();
      }).catch((err) => {
        return false;
      });
  }

  return {
    getPollyMP3Url,
    compareFaces
  }
})();

module.exports = AWSUtil;
