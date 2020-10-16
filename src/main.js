let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel;

let angle = [];
let trainer = [];

let state = 'waiting';

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: './pose classfier/model/model.json',
    metadata: './pose classfier/model/model_meta.json',
    weights: './pose classfier/model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyReady() {
  if (pose) {
    let nose = pose.keypoints[0].score;
    let ankleR = pose.keypoints[16].score;
    if ((nose > 0.5) && (ankleR > 0.5)) {
      //console.log('detect');
      poseLabel = 'detect';
      state = 'detect';
    } else {
      state = 'waiting';
      poseLabel = 'waiting'
      //console.log('waiting');
    }
  }
}

function classifyPose() {
  classifyReady();
  if (pose && (state == 'detect')) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {

  if (results[0].score > 0.8) {
    poseLabel = results[0].label;
  }
  console.log(results[0].confidence);
  console.log(results[0].label);
  // 5초 후 자세 측정을 시작합니다.
  setTimeout(savePose, 5000);

}

function gotPoses(poses) {
  // console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
    }
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
}

function savePose() {
  console.log(pose);
  let inputs = [];
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    inputs.push(x);
    inputs.push(y);
  }
  calcAngle();
}

function calcAngle() {
  angle[0] = (Math.abs((Math.atan2(input[31] - input[27], input[30] - input[26])) + Math.abs(Math.atan2(input[23] - input[27], input[22] - input[26])))) * (180 / Math.PI);
  angle[1] = 360 - (Math.abs((Math.atan2(input[33] - input[29], input[32] - input[28])) + Math.abs(Math.atan2(input[25] - input[29], input[24] - input[28])))) * (180 / Math.PI);

  angle[2] = (Math.abs(Math.atan2(input[27] - input[23], input[26] - input[22])) + Math.abs(Math.atan2(input[11] - input[23], input[10] - input[22]))) * (180 / Math.PI);
  angle[3] = 360 - (Math.abs(Math.atan2(input[29] - input[25], input[28] - input[24])) + Math.abs(Math.atan2(input[13] - input[25], input[12] - input[24]))) * (180 / Math.PI);

  angle[4] = (Math.abs(Math.atan2(input[19] - input[15], input[18] - input[14])) + Math.abs(Math.atan2(input[11] - input[15], input[10] - input[14]))) * (180 / Math.PI);
  angle[5] = 360 - (Math.abs(Math.atan2(input[21] - input[17], input[20] - input[16])) + Math.abs(Math.atan2(input[13] - input[17], input[12] - input[16]))) * (180 / Math.PI);

  angle[6] = (Math.abs(Math.atan2(input[23] - input[11], input[22] - input[10])) + Math.abs(Math.atan2(input[15] - input[11], input[14] - input[10]))) * (180 / Math.PI);
  angle[7] = 360 - (Math.abs(Math.atan2(input[17] - input[13], input[16] - input[12])) + Math.abs(Math.atan2(input[25] - input[13], input[24] - input[12]))) * (180 / Math.PI);
  cmpAngle();
}

$.getJSON('yoga_angle.json', function (data) {
  let n;
  switch (poseLabel) {
    case 'm':
      n = 0;
      break;
    case 't':
      n = 1;
      break;
    case 'a':
      n = 2;
      break;
    case 'w':
      n = 3;
      break;
  }

  for (let i = 0; i < 8; i++) {
    trainer[i] = data[n][i];
  }
})

function cmpAngle() {
  let cmp;
  let pass = true;
  for (let i = 0; i < 8; i++) {
    cmp = angle[i] - trainer[i];
    if (Math.abs(cmp) > 30) {
      pass = False;
      switch (i) {
        case 0: // 왼쪽 무릎을
        case 1:
      }
      if (cmp < 0) {
        // 더 구부리세요
      } else {
        //더 펴세요
      }
    }
  }
  if (pass) {
    // 5초간 유지하세요
    setTimeout(classifyPose, 5000);
  } else {
    // 3초 후 다시 측정합니다.
    setTimeout(savePose, 3000);
  }
}