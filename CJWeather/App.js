import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import * as Location from 'expo-location';
import {Ionicons} from '@expo/vector-icons'
import { ScrollView, StyleSheet, Text, View ,Dimensions, ActivityIndicator,Image} from 'react-native';

const {height,width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const MONTH = ["1월", "2월", "3월", "4월", "3월", "June", "July", "August", "September", "October", "November", "December"]
  const DAY = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]
  const [city,setCity] = useState("Loading...")
  const [weathers,setWeathers] = useState([])
  const [success,setSuccess] = useState(true);

  const API_KEY = '8edc63e36d80a0a3ca623f4b3cab6315' //보안을위해 원래는 서버에둬서 요청을통해 응답을받아야된다
  async function getWeathers(){
    const {granted} =  await Location.requestForegroundPermissionsAsync()
    if(!granted){
      setSuccess(false)
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
    setCity(location[0].city)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alert&appid=${API_KEY}`)
    const json = await response.json()
    setWeathers(json.daily)
  }
  useEffect(()=>{
    getWeathers()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.cityBox}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* 항상 기억하자 React-Native는 운영체제에게 전달해주는거지 브라우저가없기때문에 직접 렌더하지 않는다는걸 */}
        {/* 스크롤뷰 컴포넌트는 props로 스타일을 주면 원하는대로 안될수도있다 -> contentContainerStyle 프롭스를 써주는데.
        추가로 스크롤뷰는 우리의 뷰보다 크겟지?(스크롤이니까) 그래서 flex-grow를 해주면 원하는대로 안된다(스크롤이 짤림 flex-grow로 인해 사이즈가 정해져서)
        정~~~말 많은 props가 있으니 혼자 만지작거리면서 터득하는게 길 => 공식문서에 다있다 
        paginEnabled=> 페이징가능. 디폴트가 false인데 디폴트면 스크롤이 사용자맘대로 원하는위치에 멈춘다-> 너무미세해해보니까
        그래서 true로 하면 스크롤크기만큼으로 페이징이 제한된다(뭔가 끈적하게 페이징됨)
        */}
        {
          weathers.length === 0 
          ? 
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="white"></ActivityIndicator>
          </View>
          :
          <ScrollView
          contentContainerStyle={styles.weatherBox}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}>
            {weathers.map((day,index)=>{
              const tempConverter = parseFloat(day.temp.day).toString().substring(0,4)
              const newDay = new Date(day.dt*1000)
              const isToday = newDay.toString().substring(0,15) === new Date().toString().substring(0,15)
              return(
                <View key={index} style={styles.dayWeather}>
                  <View style={styles.date}>
                    <Text style={styles.day}>{DAY[newDay.getDay()]}</Text>
                    <Text style={styles.month}>{`${newDay.getMonth()+1}월 ${newDay.getDate()}일`}
                      {isToday ? <Text style={styles.isToday}> (Today)</Text> : null}
                    </Text>
                  </View>
                  <View style={styles.tempBox}>
                    <Text style={styles.temp}>{`${tempConverter}°`}</Text>
                    <Text style={styles.description}>{day.weather[0].main}
                    </Text>
                      <Image style={styles.icons} source={{
                        uri:`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                      }}/>
                  </View>
                  <View style={styles.footerBox}>
                    <View style={styles.tempFooterBox}>
                      <Text style={styles.tempHigh}>&uarr; : {day.temp.max}°</Text>
                      <Text style={styles.tempLow}>&darr; : {day.temp.min}°</Text>
                    </View>
                    <View>
                      <Text style={styles.tempHigh}>{`구름 : ${day.clouds}%`}</Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView> 
        }
        <View></View>
      <StatusBar style="dark"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#C69B7B",
    paddingTop:70
  },
  cityBox:{
    flex:0.5,
    justifyContent:"flex-end",
    paddingLeft:30,
    paddingBottom:15,
  },
  weatherBox:{
  },
  //픽셀로 정해주지 않는다는게 중요하지.
  cityName:{
    fontSize:35,
    fontWeight:"700"
  },
  dayWeather:{
    /*
    스크롤될때 1개씩보이고싶으니까 해당 컨테이너 사이즈의 전부를 차지해야 한개씩보이겟지?
    그럼 사이즈를 어떻게받아와? => react-native api문서(javascript)에 다~있다 => dimensions(치수)
    */
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp:{
    fontSize:120
  },
  description:{
    marginTop:20,
    fontSize:35,
    paddingLeft:20
  },
  indicator:{
    flex:1,
  },
  date:{
    paddingLeft:30,
    alignItems:"flex-start",
    width:SCREEN_WIDTH
  },
  day:{
    fontSize:20,
    fontWeight:"500"
  },
  month:{
    fontSize:15,
    paddingTop:10,
    fontWeight:"400"
  },
  tempBox:{
    marginTop:50,
    width:SCREEN_WIDTH-60,
    borderTopWidth:2,
    borderBottomWidth:2,
    alignItems:"flex-start",
    paddingTop:100,
    paddingBottom:100
  },
  footerBox:{
    width:SCREEN_WIDTH-60,
    flexDirection:"row",
    paddingTop:30,
    paddingLeft:30,
    paddingRight:30,
    justifyContent:"space-around"
  },
  tempFooterBox:{
    width:SCREEN_WIDTH-60,
  },
  tempHigh:{
    fontSize:18
  },
  tempLow:{
    paddingTop:10,
    fontSize:18
  },
  isToday:{
    fontWeight:"600"
  },
  icons:{
    width:50,
    height:50
  }
})