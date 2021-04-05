var prediction1=""

Webcam.set({
    height:300,
    width:350,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capturedImage'src='" +data_uri+"'>";
    });
}

console.log("ml5 version= ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JSjW8hwAX/model.json",modelLoaded)

function modelLoaded(){
    console.log("model Loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
    var speakData="The gesture prediction is "+ prediction1;
    var utterThis=new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis)
    
}
function check(){
    img=document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("predictionMeaning").innerHTML=results[0].label;
    prediction1=results[0].label;

    if(prediction1=="Amazing"){
        document.getElementById("predictionEmoji").innerHTML="&#128076;";
    }
    if(prediction1=="Victory"){
        document.getElementById("predictionEmoji").innerHTML="&#x270c;";
    }
    if(prediction1=="Best"){
        document.getElementById("predictionEmoji").innerHTML="&#128077;";
    }
    speak();
    }
}

