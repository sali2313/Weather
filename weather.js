let x = null;
let y = null;
let name = document.querySelector('.cityname');
let temp = document.querySelector('.citytemp');
let describe = document.querySelector('.citydes');


$(document).ready(function(){

    $('#form').submit((e)=> {
        e.preventDefault();
        name.innerHTML="City Name";
        temp.innerHTML="Tempeture";
        describe.innerHTML="Discribe Weather";
        $('p#paragraph1').empty()
        x = null;

        let finalname = ($('#city').val()).toLowerCase();
        
        console.log(finalname);
        
        $.get("worldcities.csv",(data)=>{
            let info = $.csv.toArrays(data);
             console.log(info[180][1])
            // console.log(info)
            $.each(info,function(i){
                if(finalname === (info[i][1]).toLowerCase()){
                    x = info[i][2];
                    y = info[i][3];
                    let cityname = info[i][1];
                    name.innerHTML = `<a href="https://www.google.com/search?q=${cityname}">${cityname}</a>`;
                    console.log(`X = ${x}, Y = ${y}`);
                    let apikey = '1e3101e3cc03399db4a9c7d1043fd62f'
                    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${apikey}`;
                    fetch(api)
                        .then(response=> response.json())
                            .then(jesresponse => {
                                let finaltemp = jesresponse.main.temp;
                                finaltemp = finaltemp - 273.15;
                                temp.innerHTML = finaltemp.toFixed(2) + " &#8451;";

                                let finaldesc = jesresponse.weather[0].main;
                                describe.innerHTML = finaldesc;

                                if (finaldesc === 'Clouds'){
                                    $('body').css('background-image', 'url("rain.jpg")')
                                    }
                                // console.log(finaldesc)
                                // console.log(jesresponse.weather)
                            //  $('p#paragraph1').html(jesresponse.weather);
                        })
                    $('p#paragraph1').text('Successed');
                    console.log("sucsess");
                    console.log(api);
                    return false;
                }
                
            })
            if (x == null){
                    $('p#paragraph1').html('<h2>Invalid city name</h2>')
                }
         })
        })
    })
    
