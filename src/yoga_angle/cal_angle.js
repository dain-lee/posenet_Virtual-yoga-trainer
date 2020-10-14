let img;
let poseNet;
let poses = [];

let maxKneeFlexion = 180;
let kneeL, kneeR, hipL, hipR, ankleL, ankleR, kneeFlexionL, kneeFelxionR, dorsiflexionL, dorsiflexionR, hipFlexionL, hipFlextionR, shoulderL, shoulderR, anKneeL, anKneeR, sHipL, shipR, trunkLeanL, trunkLeanR, elbowL, elbowR, elbowFlextionL, elbowFlextionR, wristL, wristR, shoulderFlextionL, shoulderFlextionR;
function setup() {
    createCanvas(640, 360);

    // create an image using the p5 dom library
    // call modelReady() when it is loaded
    img = createImg('../images/mountain.jpg', imageReady);
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
          kneeL = poses[0].pose.leftKnee;
          kneeR = poses[0].pose.rightKnee;
          hipL = poses[0].pose.leftHip;
          hipR = poses[0].pose.rightHip;
          ankleL = poses[0].pose.leftAnkle;
          ankleR = poses[0].pose.rightAnkle;
          shoulderL = poses[0].pose.leftShoulder;
          shoulderR = poses[0].pose.rightShoulder;
          elbowL=poses[0].pose.leftElbow;
          elbowR=poses[0].pose.rightElbow;
          wristL=poses[0].pose.leftWrist;
          wristR=poses[0].pose.rightWrist;
        //   anKneeL = { x: kneeL.x, y: ankleL.y };
        //   sHipL = { x: shoulderL.x, y: hipL.y };

        //   inside angle
          kneeFlexionL = 360-(Math.atan2(ankleL.y - kneeL.y, ankleL.x - kneeL.x) - Math.atan2(hipL.y - kneeL.y, hipL.x - kneeL.x)) * (180 / Math.PI);
          kneeFlexionR = (Math.atan2(ankleR.y - kneeR.y, ankleR.x - kneeR.x) - Math.atan2(hipR.y - kneeR.y, hipR.x - kneeR.x)) * (180 / Math.PI);

          hipFlexionL = 360 -(Math.atan2(kneeL.y - hipL.y, kneeL.x - hipL.x) - Math.atan2(shoulderL.y - hipL.y, shoulderL.x - hipL.x)) *(180 / Math.PI);
          hipFlexionR = 360 -(Math.atan2(kneeR.y - hipR.y, kneeR.x - hipR.x) - Math.atan2(shoulderR.y - hipR.y, shoulderR.x - hipR.x)) *(180 / Math.PI);
          
          elbowFlextionL=360+(Math.atan2(wristL.y - elbowL.y, wristL.x - elbowL.x) - Math.atan2(shoulderL.y - elbowL.y, shoulderL.x - elbowL.x)) *(180 / Math.PI);
          elbowFlextionR=-(Math.atan2(wristR.y - elbowR.y, wristR.x - elbowR.x) - Math.atan2(shoulderR.y - elbowR.y, shoulderR.x - elbowR.x)) *(180 / Math.PI);

          shoulderFlextionL=(Math.atan2(hipL.y - shoulderL.y, hipL.x - shoulderL.x) - Math.atan2(elbowL.y - shoulderL.y, elbowL.x - shoulderL.x))*(180/Math.PI);
          shoulderFlextionR=360 + (Math.atan2(elbowR.y - shoulderR.y, elbowR.x - shoulderR.x) - Math.atan2(hipR.y - shoulderR.y, hipR.x - shoulderR.x))*(180/Math.PI);
		//   dorsiflexionL =360 -(Math.atan2(anKneeL.y - ankleL.y, anKneeL.x - ankleL.x) - Math.atan2(kneeL.y - ankleL.y, kneeL.x - ankleL.x)) *(180 / Math.PI);
		//   trunkLeanL =360 -(Math.atan2(sHipL.y - hipL.y, sHipL.x - hipL.x) - Math.atan2(shoulderL.y - hipL.y, shoulderL.x - hipL.x)) * (180 / Math.PI);
        }

          console.log("kneeflexionLeft: %d",kneeFlexionL);
          console.log("kneeflexionRight: %d",kneeFlexionR);          
          console.log("hipflexionLeft: %d",hipFlexionL);
          console.log("hipflexionRight: %d",hipFlexionR);
          console.log("elbowflexionLeft: %d",elbowFlextionL);
          console.log("elbowflexionRight: %d",elbowFlextionR);
          console.log("shoulderflexionLeft: %d",shoulderFlextionL);
          console.log("shoulderflexionRight: %d",shoulderFlextionR);



        //   console.log("shin angle: %d", dorsiflexionL);
        //   console.log("trunklean: %d",trunkLeanL);
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
