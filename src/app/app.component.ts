import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test2';
  dataLayer: { event: number; ciudad: string; temperatura: number; }[];
  constructor(router: Router){
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    navEndEvents.subscribe((event: NavigationEnd) => {

    })
  }
  ciudad: any;
  inputValue: any;
  nameCity: any;
  weather: any;
  temp: any;
  temp_min: any;
  temp_max: any;
  country: any;
  wind_speed: any;
  humidity: any;
  pressure: any;
  sunrise: any;
  sunset: any;
  unixTime_sunrise: any;
  unixTime_sunset: any;


    

  ngOnInit(): void {
    // this.dataLayer = [{
    //   'event': 'temperatura_actual',
    //   'ciudad': 'Nombre Ciudad',
    //   'temperatura': 'Temperatura día actual' 
    // }];
    this.inputValue = '';
    this.nameCity = '';
    this.weather = '';
    this.temp = '';
    this.temp_min = '';
    this.temp_max = '';
    this.country = '';

    this.wind_speed = '';
    this.humidity = '';
    this.pressure = '';
    this.sunrise = '';
    this.sunset = '';
    
  }

  addValue(e){
    this.ngOnInit();
    console.log("event: ", e)
    this.inputValue = document.querySelector('.inputValue');
    console.log(this.inputValue.value);
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.inputValue.value+'&appid=9dcec5ca2cd9e1eced35f03a57e1e9cd')
    .then(response => response.json())
    .then(data => {
      this.nameCity = data['name'];
      this.weather = data['weather'][0].description;
      this.temp = Math.round(data['main']['temp'] - 273.15);
      this.temp_min = Math.round(data['main']['temp_min'] - 273.15);
      this.temp_max = Math.round(data['main']['temp_max'] - 273.15);
      this.country = data['sys']['country'];
      console.log(data);
    })    
    .catch(err => alert('Error en el nombre de la Ciudad¡'))
    this.dataLayer.push({
      'event': this.temp,
      'ciudad': this.nameCity,
      'temperatura': this.temp_max
    })

  }

  addValue2(){ 
    this.inputValue = document.querySelector('.inputValue');
    console.log(this.inputValue.value);
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.inputValue.value+'&appid=9dcec5ca2cd9e1eced35f03a57e1e9cd')
    .then(response => response.json())
    .then(data => {
      this.wind_speed = data['wind']['speed'];
      this.humidity = data['main']['humidity'];
      this.pressure = data['main']['pressure'];
      this.unixTime_sunrise = data['sys']['sunrise'];
      this.unixTime_sunset = data['sys']['sunset'];
      var date_sunrise = new Date(this.unixTime_sunrise * 1000)
      var date_sunset = new Date(this.unixTime_sunset * 1000)
      this.sunrise = date_sunrise.getHours() + ':' + date_sunrise.getMinutes() + ':' + date_sunrise.getSeconds();
      this.sunset = date_sunset.getHours() + ':' + date_sunset.getMinutes() + ':' + date_sunset.getSeconds();
      console.log(data);
    })

    
    .catch(err => alert('Error en el nombre de la Ciudad¡'))
  }

}
