$.getJSON('yoga.json', function (param) {
    let kneeL, kneeR, hipL, hipR, ankleL, ankleR, kneeFlexionL, kneeFlexionR, dorsiflexionL, dorsiflexionR, hipFlexionL, hipFlexionR, shoulderL, shoulderR, anKneeL, anKneeR, sHipL, shipR, trunkLeanL, trunkLeanR, elbowL, elbowR, elbowFlexionL, elbowFlexionR, wristL, wristR, shoulderFlextionL, shoulderFlextionR;
    let JsonArray=new Array();

    for(let num=0;num<4;num++){
        // console.log(param[num].xs);
        let JsonObject=new Object();

        kneeL = param[num].xs[13];
        kneeR = param[num].xs[14];
        hipL = param[num].xs[11];
        hipR = param[num].xs[12];
        ankleL = param[num].xs[15];
        ankleR = param[num].xs[16];
        shoulderL = param[num].xs[5];
        shoulderR = param[num].xs[6];
        elbowL = param[num].xs[7];
        elbowR = param[num].xs[8];
        wristL = param[num].xs[9];
        wristR = param[num].xs[10];
    
        kneeFlexionL = (Math.abs((Math.atan2(ankleL.y - kneeL.y, ankleL.x - kneeL.x)) + Math.abs(Math.atan2(hipL.y - kneeL.y, hipL.x - kneeL.x)))) * (180 / Math.PI);
        kneeFlexionR = 360 - (Math.abs((Math.atan2(ankleR.y - kneeR.y, ankleR.x - kneeR.x)) + Math.abs(Math.atan2(hipR.y - kneeR.y, hipR.x - kneeR.x)))) * (180 / Math.PI);
    
        hipFlexionL = (Math.abs(Math.atan2(kneeL.y - hipL.y, kneeL.x - hipL.x)) + Math.abs(Math.atan2(shoulderL.y - hipL.y, shoulderL.x - hipL.x))) * (180 / Math.PI);
        hipFlexionR = 360 - (Math.abs(Math.atan2(kneeR.y - hipR.y, kneeR.x - hipR.x)) + Math.abs(Math.atan2(shoulderR.y - hipR.y, shoulderR.x - hipR.x))) * (180 / Math.PI);
    
        elbowFlexionL = (Math.abs(Math.atan2(wristL.y - elbowL.y, wristL.x - elbowL.x)) + Math.abs(Math.atan2(shoulderL.y - elbowL.y, shoulderL.x - elbowL.x))) * (180 / Math.PI);
        elbowFlexionR = 360 - (Math.abs(Math.atan2(wristR.y - elbowR.y, wristR.x - elbowR.x)) + Math.abs(Math.atan2(shoulderR.y - elbowR.y, shoulderR.x - elbowR.x))) * (180 / Math.PI);
    
        shoulderFlexionL = (Math.abs(Math.atan2(hipL.y - shoulderL.y, hipL.x - shoulderL.x)) + Math.abs(Math.atan2(elbowL.y - shoulderL.y, elbowL.x - shoulderL.x))) * (180 / Math.PI);
        shoulderFlexionR = 360 - (Math.abs(Math.atan2(elbowR.y - shoulderR.y, elbowR.x - shoulderR.x)) + Math.abs(Math.atan2(hipR.y - shoulderR.y, hipR.x - shoulderR.x))) * (180 / Math.PI);
    
        flexionArray = [kneeFlexionL, kneeFlexionR, hipFlexionL, hipFlexionR, elbowFlexionL, elbowFlexionR, shoulderFlexionL, shoulderFlexionR];
    
        // console.log(Math.abs((Math.atan2(kneeL.y - hipL.y, kneeL.x - hipL.x)))*(180 / Math.PI));
        // console.log(Math.abs((Math.atan2(shoulderL.y - hipL.y, shoulderL.x - hipL.x)))*(180 / Math.PI));
    
        // console.log("kneeflexionLeft: %d", kneeFlexionL);
        // console.log("kneeflexionRight: %d", kneeFlexionR);
        // console.log("hipflexionLeft: %d", hipFlexionL);
        // console.log("hipflexionRight: %d", hipFlexionR);
        // console.log("elbowflexionLeft: %d", elbowFlexionL);
        // console.log("elbowflexionRight: %d", elbowFlexionR);
        // console.log("shoulderflexionLeft: %d", shoulderFlexionL);
        // console.log("shoulderflexionRight: %d", shoulderFlexionR);
        for(let i=0;i<8;i++){
            JsonObject[i]=flexionArray[i];
            // console.log(JsonObject[i]);

        }
    }

    console.log(JsonArray);
    // $(document).ready(function(){
    //     var dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(JsonArray);
    //     var link = $("#link").attr("href", dataUri);

    // });

    // var fs = require('fs'); 
    // fs.writeFile('new.json', JsonArray, 'utf8', function(error){ console.log('write end') });
    
    
    // document.write(JsonArray);

    // console.log(JsonArray[0][0]);
    // const fs = require('fs');
    
    // fs.writeFile('myjsonfile.json',JsonArray);
    // fs.readFile('new.json', (err, data) => {
    //     if (err) throw err;
    //     let student = JSON.parse(data);
    //     console.log(student);
    // });

})

// var param={"data":[{"xs":{"0":306.7920867741456,"1":116.1664639300073,"2":314.3033895808586,"0":110.40195755094115,"4":299.7205585345887,"5":108.58261019165752,"6":319.3536787981178,"7":116.27275106270179,"8":288.1555978875411,"9":117.55791201228982,"10":330.16240170127463,"11":141.0184850562618,"12":275.6240065427784,"13":138.4792069106074,"14":350.0935265613578,"15":100.17783955059087,"16":250.34977784630846,"17":93.60519557900827,"18":357.36314130340634,"19":51.33652120073404,"20":247.2980378803454,"21":53.0282795034189,"22":330.38379453543797,"23":252.43786549707602,"24":282.7211191872639,"25":256.6731723242568,"26":321.97453489545256,"27":365.43803670485346,"28":285.49972444947,"29":366.35219700387574,"30":312.46143779791817,"31":443.82569578888354,"32":300.4161805716174,"33":444.1552996124208},"ys":{"0":"m"}},{"xs":{"0":262.03561675014083,"1":146.3474932516295,"2":269.29926762571574,"0":136.96566159729835,"4":253.5750622963115,"5":138.9683498508981,"6":282.2102742631998,"7":145.8551156265229,"8":243.12952082524288,"9":149.58054927357455,"10":316.65527908890334,"11":190.13966104905273,"12":216.72307540566368,"13":192.72547374227122,"14":363.5292481539542,"15":193.1984967980933,"16":167.97154536256548,"17":192.68397637975147,"18":407.58631061159844,"19":190.06470321447063,"20":129.25359833774974,"21":182.64192666691412,"22":296.61571748075426,"23":311.93947894299004,"24":235.05216483251857,"25":302.26819817318085,"26":318.5620844433879,"27":361.0582199245401,"28":178.5934620758711,"29":353.46827516314113,"30":386.9329816137838,"31":440.6873236762152,"32":192.5016781693546,"33":416.1565707022683},"ys":{"0":"w"}},{"xs":{"0":339.53975062156513,"1":67.41139313398511,"2":348.5315203155458,"0":58.65899842617338,"4":331.314147592288,"5":60.472181889048784,"6":360.00491367213675,"7":68.90662120796782,"8":322.1676736872563,"9":72.49754729094329,"10":374.3985746803804,"11":121.79091767725654,"12":306.3438793279042,"13":119.69456455163788,"14":407.71361590826024,"15":151.14602012708636,"16":283.7978673864294,"17":163.92169974700747,"18":355.065796612299,"19":120.68129928023725,"20":331.2466424715217,"21":122.53274304127831,"22":355.98188998871143,"23":234.20140376100295,"24":310.74879369308144,"25":224.66771651894493,"26":342.15808355320263,"27":325.20107574165445,"28":229.42168416103192,"29":273.8532190155565,"30":330.11031598840304,"31":438.1183063588876,"32":306.31182516295075,"33":320.4946346171418},"ys":{"0":"t"}},{"xs":{"0":309.11629184180066,"1":255.066803156981,"2":318.0411883497331,"0":247.1119788097359,"4":300.82567999469836,"5":247.9478909676535,"6":331.8860993561921,"7":256.2562424211706,"8":292.51644260934455,"9":259.89821086385325,"10":354.57271791573385,"11":306.3030363384046,"12":277.5928373875906,"13":306.3589727390579,"14":372.84604970474686,"15":376.506152534113,"16":253.50559167694627,"17":371.3214408770407,"18":389.8984758105659,"19":415.21366260669845,"20":227.31308489050315,"21":398.83024539166723,"22":339.0938619609929,"23":435.3568215769866,"24":285.2652542679398,"25":432.0884362531219,"26":337.7529367368821,"27":475.5405115198206,"28":240.2821393226787,"29":449.5648871527777,"30":334.5024888185497,"31":538.4848903075994,"32":257.5597930372807,"33":521.4693288821691},"ys":{"0":"z"}}]}
// console.log(param.data[0].xs[0]);