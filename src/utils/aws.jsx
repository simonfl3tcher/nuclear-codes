import 'aws-sdk/dist/aws-sdk';
import aws_config from '../../aws_config.json';

const AWS = window.AWS;
AWS.config.update(aws_config);

var AWSUtil = (function() {
  const bucket = 'rekognitionnn';
  const sourceImage = 'nuclear/potential_imposter.jpg';
  const targetImage = 'nuclear/president.jpg';

  let S3 = new AWS.S3( { params: {Bucket: bucket} } );
  let rekognition = new AWS.Rekognition();
  let polly = new AWS.Polly();

  const getPollyMP3Url = (string) => {
    return getPollyObject(string).then(function(data) {
       var uInt8Array = new Uint8Array(data.AudioStream);
       var arrayBuffer = uInt8Array.buffer;
       var blob = new Blob([arrayBuffer]);
       return URL.createObjectURL(blob);
    }).catch(function(err) {
      console.log("Error!");
    });
  }

  const getPollyObject = (string) => {
    return polly.synthesizeSpeech(
      {
        OutputFormat: "mp3", 
        SampleRate: "8000", 
        Text: string, 
        TextType: "text",
        VoiceId: "Salli"
      }
    ).promise();
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

    return putObjectPromise.then(function(data) {
      return compareFacesWithRekognition();
    }).catch(function(err) {
      return false;
    });
  }

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

    return compareFacePromise.then(function(data) {
      if(data.FaceMatches[0]){
        return true;
      } else {
        return false;
      }
    }).catch(function(err) {
      return false;
    });
  }

  return {
    getPollyMP3Url,
    compareFaces
  }
})();

module.exports = AWSUtil;
