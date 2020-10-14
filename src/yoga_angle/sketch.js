let img;
let poseNet;
let poses = [];

let maxKneeFlexion = 180;
let knee, hip, ankle, kneeFlexion, dorsiflexion, hipFlexion, shoulder, anKnee, sHip, trunkLean;
function setup() {
    createCanvas(640, 360);

    // create an image using the p5 dom library
    // call modelReady() when it is loaded
    img = createImg('data/warrior pose.jpg', imageReady);
    // set the image size to the size of the canvas
    img.size(width, height);

    img.hide(); // hide the image in the browser
    frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
}

// when the image is ready, then load up poseNet
function imageReady(){
    // set some options
    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }
    
    // assign poseNet
    poseNet = ml5.poseNet(modelReady, options);
    // This sets up an event that listens to 'pose' events
    poseNet.on('pose', function (results) {
        poses = results;
        if(poses.length>0){
          knee = poses[0].pose.leftKnee;
          hip = poses[0].pose.leftHip;
          ankle = poses[0].pose.leftAnkle;
          shoulder = poses[0].pose.leftShoulder;
          anKnee = { x: knee.x, y: ankle.y };
          sHip = { x: shoulder.x, y: hip.y };
          kneeFlexion = (Math.atan2(ankle.y - knee.y, ankle.x - knee.x) - Math.atan2(hip.y - knee.y, hip.x - knee.x)) * (180 / Math.PI);
          hipFlexion = 360 -(Math.atan2(knee.y - hip.y, knee.x - hip.x) - Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) *(180 / Math.PI);
		  dorsiflexion =360 -(Math.atan2(anKnee.y - ankle.y, anKnee.x - ankle.x) - Math.atan2(knee.y - ankle.y, knee.x - ankle.x)) *(180 / Math.PI);
		  trunkLean =360 -(Math.atan2(sHip.y - hip.y, sHip.x - hip.x) - Math.atan2(shoulder.y - hip.y, shoulder.x - hip.x)) * (180 / Math.PI);
        }

          console.log("kneeflexion: %d",kneeFlexion);
          console.log("hipflexion: %d",hipFlexion);
          console.log("shin angle: %d", dorsiflexion);
          console.log("trunklean: %d",trunkLean);
    });
}

// when poseNet is ready, do the detection
function modelReady() {
    select('#status').html('Model Loaded');
     
    // When the model is ready, run the singlePose() function...
    // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
    // in the draw() loop, if there are any poses, then carry out the draw commands
    poseNet.singlePose(img)
}

// draw() will not show anything until poses are found
function draw() {

    if (poses.length > 0) {
        drawSkeleton(poses);
        drawKeypoints(poses);
        noLoop(); // stop looping when the poses are estimated
    }

}

// The following comes from https://ml5js.org/docs/posenet-webcam
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(255);
                stroke(20);
                strokeWeight(4);
                ellipse(round(keypoint.position.x), round(keypoint.position.y), 8, 8);
            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(0);
            strokeWeight(1);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
