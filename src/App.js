import React from 'react';
import './App.css';
import Axios from 'axios'
import DisplayWeather from './components/DisplayWeather.js'
import Navbar from'./components/Navbar.js'
//API KEY: 5caedd04d7f8108350edd3b3ba3f124a
// 
class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      coords:{
        latitude:45,
        longtitude:60
      },
      data : {},
      inputData:""
    };
    
  }
   /*get device address*/
   componentDidMount(){ 
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
       let newCoords = { // my device location
           latitude:position.coords.latitude,
           longtitude:position.coords.longitude
       };

       this.setState({coords:newCoords});
        
       //API CALL
       Axios.get(`http://api.weatherstack.com/current?access_key=5caedd04d7f8108350edd3b3ba3f124a&query=${this.state.coords.latitude},${this.state.coords.longtitude}`)
       .then(retrievedObj=>{
       

          let weatherData = {
             location:retrievedObj.data.location.name,
             temperature: retrievedObj.data.current.temperature,
             description:retrievedObj.data.current.weather_descriptions[0],
             region: retrievedObj.data.location.region,
             country:retrievedObj.data.location.coutrny,
             wind_speed: retrievedObj.data.current.wind_speed,
             pressure:retrievedObj.data.current.pressure,
             precip:retrievedObj.data.current.precip,
             humidity: retrievedObj.data.current.humidity,
             img: retrievedObj.data.current.weather_icons
          }
          this.setState({data:weatherData});
          console.log(this.state.data);

       });// end then
        
      });//end getCurrentPosition
     
     
      
    } // end if      
    else{
      console.log("Not Supported");
    } // end else
     
   } //run whenever you refresh your browser
     //life cycle method
     //{this.state.data.humidity} +{this.state.data.temperature} 
     //  

     change=(value)=>{
       
       this.setState({
        inputData:value
       });
     }

     changeLocation =(e)=>{
          e.preventDefault();// prevent refreshing

          //api call
             Axios.get(`http://api.weatherstack.com/current?access_key=5caedd04d7f8108350edd3b3ba3f124a&query=${this.state.inputData}`)
       .then(retrievedObj=>{
       

          let weatherData = {
             location:retrievedObj.data.location.name,
             temperature: retrievedObj.data.current.temperature,
             description:retrievedObj.data.current.weather_descriptions[0],
             region: retrievedObj.data.location.region,
             country:retrievedObj.data.location.coutrny,
             wind_speed: retrievedObj.data.current.wind_speed,
             pressure:retrievedObj.data.current.pressure,
             precip:retrievedObj.data.current.precip,
             humidity: retrievedObj.data.current.humidity,
             img: retrievedObj.data.current.weather_icons
          }
          this.setState({data:weatherData});
          console.log(this.state.data);
        });
           
     }
  render(){
      return (
      <div className="App">
           
           <Navbar changeLocation = {this.changeLocation} changeRegion = {this.change}/>
           <DisplayWeather weatherData={this.state.data} />
       </div>
     );
  }
}

export default App;
