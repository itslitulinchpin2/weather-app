import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import WeatherBox from './component/weatherBox';
import WeatherButton from './component/weatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';

//개발 순서 큰그림 정리
//1. 앱이 실행되자 마자 현재 위치 기반 날씨를 보여준다.
// ->useEffect()가 필요하다.
//현재 위치는 언제 가져오나 ? 
//2. 날씨정보에는 도시, 섭/화씨 날씨 상태
//3. 5개의 버튼이 있다.(현재위치, 4개의 다른 도시들)
//4. 도시 버튼을 누를 때마다 해당 도시의 날씨정보가 보임.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨정보 보여줌
//6. 데이터 로딩 중일때 로딩스피너 구현



function App() {

  const [weather,setWeather]=useState(null);

  const getCurrentLocation = () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    })
  }
  
  const getWeatherByCurrentLocation = async (lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e59c97f8ad9f843a63a40588ff11b1df&units=metric`
    let response = await fetch(url)
    //윗줄이 비동기.
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation();
  },[])

  return (
  <div>
    <div className="container">
      <WeatherBox weather={weather}></WeatherBox>
      <WeatherButton></WeatherButton>
    </div>
    </div>
  );
}

export default App;
