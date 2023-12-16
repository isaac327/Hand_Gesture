Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ssQKEAh__/model.json',modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!')
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('capture_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        gesture=results[0].label;
        toSpeak="";
        if(gesture=="rock"){
            toSpeak="The rock breaks the scissors"
            document.getElementById("update_emoji1").innerHTML="&#9994;";
        }
        if(gesture=="paper"){
            toSpeak="The paper covers the rock"
            document.getElementById("update_emoji1").innerHTML="&#9995;";
        }
        if(gesture=="scissors"){
            toSpeak="The scissors cut the paper"
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
        speak();
        
            }
 
    }