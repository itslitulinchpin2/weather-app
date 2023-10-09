import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import WeatherBox from './component/weatherBox';
import WeatherButton from './component/weatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

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
  const [loading,setLoading]=useState(true);

  const getCurrentLocation = () =>{
    setLoading(true)
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat,lon)
    })
  }
  
  const getWeatherByCurrentLocation = async (lat,lon) => {
    
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e59c97f8ad9f843a63a40588ff11b1df&units=metric`
    
    let response = await fetch(url)
    //윗줄이 비동기.
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const cities=['paris','new york', 'tokyo', 'seoul']

  const [city,setCity]=useState('');

  const getWeatherBycity = async() =>{
      setLoading(true);
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e59c97f8ad9f843a63a40588ff11b1df&units=metric`
      
      let response = await fetch(url)
      let data = await response.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
  }

  // useEffect(()=>{
  //   getCurrentLocation();
  // },[]) //초기 렌더링 이후, componentDidMount기능. 
  //맨 처음에 실행된다.



  useEffect(()=>{
    if (city==""){
    getCurrentLocation();
    } else {
    getWeatherBycity();
    }
  },[city])
  //여기서 초반에 city가 ""이기 때문에 값을 읽어오지 못하면서 api호출에서 시티이름이 없어 에러 발생.
  //즉, 앱 최초 실행시에는 이 useEffect가 실행되면 안되기 때문에 useEffect를 합쳐줘야한다.
  //케이스 분류해서 useEffect실행하기.
  

  return (
  <div>
    {loading ? 
      <div className="container">
        <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={100}
          /> 
        </div> :
       <div className="container">
        <WeatherBox weather={weather}></WeatherBox>
        <WeatherButton cities = {cities} setCity={setCity}></WeatherButton>
        </div>}
    
    </div>
  );
}

export default App;
