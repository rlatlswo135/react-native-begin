import { StatusBar } from 'expo-status-bar';
/*
  StatusBar는 뭔데 react-native에서 import안하지? => 3rd party 패키지라그럼(제3자 패키지)
  근데 react-native공식 문서에는 StatusBar 컴포넌트가 있고 import도 할수있다 => 그럼위에  Import한건 뭐고 아래는 뭘까?
  =>공식문서에 API부분이 자바스크립ㅊ트코드
*/
import { StyleSheet, Text, View } from 'react-native';

/*
React-Native는 웹사이트용이 아니다. => 그러니 div태그 등 우리가 기존에알던 html태그는 못쓴다는거지. 중요!!!!!!
그래서. RN은 웹사이트용이 아니기때문에 기존의 브라우저가 있다고 가정한형태의 코딩과 다른 Rule이 있다.

1. View = Container(div의 대체라고 생각하면 되겟지?) => 항상 import해야지.

2. React-Native의 모든 text는 Text컴포넌트 안에 들어가야한다. => 마찬가지로 html이 아니기때문에 p span h1등 텍스트 관련 스타일은 못쓴다
  => View안에 text를 써주면 즉시오류난다. 항상 Text컴포넌트 안에 text를 적도록. => 마찬가지로 항상 import해야지

3. style은 View에 props에 담긴걸 보면 대충 이해할수있겟지만 Web에서 쓰던 모든 스타일을 쓸수는 없다.!
  => ex) border 등.. 거의 대부분은 쓸수있지만 못쓰는것도 있다는것을 알도록!


  **
  과거에는 React-Native가 많은 컴포넌를 지원했지만, 범용성이 넓고 빠른 지원을위해 대부분은 중단하고.
  다른 컴포넌트는 패키지처럼 유저끼리 주고받을수있게 된느낌이다 npm처럼 (=> 커뮤니티 패키지)
  그래서 검색으로 다른 패키지를 찾아서 우리가 원하는기능을 꽃아서 써야하는 느낌.
  근데 오픈소스는 개인프로젝트라 개인의 사정에따라 유지보수가 안될수있다;;
  ====>
  그래서, 이런 패키지가 중요할텐데 React-Native가 범용성을 이유로 많은 컴포넌트를 지원하지않다보니
  expo팀이 컴포넌트를 만들엇다 그것도 아주 다양하게 많이;; => Expo SDK
  -> 그래서 Expo apis에 가서 패키지를 찾아서 설치하고 import해서 쓰면된다 무려 RN팀이 제공하는게아닌 Expo에서 제공하는거
  -> 위에 react-native에서 제공하는 statusbar, expo에서 제공하는 statusbar가 있는 이유다. => 각 사용법은 각자의 공식문서에있겟지?
  
  지원하는 양의차이는 압도적으로 Expo가 많으니 Expo로 통일하는게 나을듯? => 근데 Expo에서 지원하지 않는걸 쓰려면 우짜지;
  **
*/
export default function App() {
  return (
    <>
      {/* // View가 이미 flex display다. block, inline-block grid이런거없다 only flex. 그리고 default가 row가아닌 column(웹은 row) */}
      <View style={styles.container}>
        {/* 꼭 이렇게안하고 style프롭스 안에 직접 obj형태로 넣어도 된다. */}
        <Text style={styles.text}>React Native 배우기</Text>
        {/* 와 폰에서 바로보임;; */}
        <StatusBar style="auto" />
        {/* 우리가 web에서 개발하는게 아니라는 증거. (평소의 react라면 Text컴포넌트 밑에 렌더 되야할텐데?)
        => Text컴포넌트 아래에 적혓지만 Text아래에 있지않고 스테이터스바 그자리에 있다 . 즉 운영체제에 어떻게 해주세요~ 라고 전달만하는거라는거지,
        => 그니까 해당 컴포넌트를 지워도 실제 상태바는 남아있다 왜? RN이 렌더를해주는게 아니니까
        => 즉 모든 컴포넌트가 화면에 렌더되지 않는다는거다.(statusbar는 원래 폰에있는건데 그걸 바꿔달라고 전달만해주는 컴포넌트인거고) = 일부컴포넌트는 운영체제와 소통만한다는 소리.
        **StatusBar 컴포넌트는 폰 위에 시계 와이파이 배터리 상태 그 줄 그거다. 그부분을 커스텀해주세요~ 라고 React-Native가 전달만 해주는거지
        */}
        <View style={{flex:1,backgroundColor:'green'}}></View>
        <View style={{flex:2,backgroundColor:'teal'}}></View>
        <View style={{flex:1,backgroundColor:'tomato'}}></View>
      </View>
      <View style={{flex:1}}> 
        <View style={{flex:1,backgroundColor:'green'}}></View>
        <View style={{flex:2,backgroundColor:'teal'}}></View>
        <View style={{flex:1,backgroundColor:'tomato'}}></View>
      </View>
      </>
  );
}

//StyleSheet.create는 style OBJ를 만든다고 보면되는데 자동완성기능이 매력적이다
const styles = StyleSheet.create({
  //create안에 인자로 obj가 들어갔지? => 객체니까 결국 keyName도 내 커스텀일거다
  container: {
    backgroundColor: '#fff',
    flex:1
  },
  text:{
    //css가 아니기때문에 font-size같은건 안한다. javascript처럼 camelcase
    fontSize:28,
    color: 'blue'
  },
  box:{
    /*
    반응형때문에 width height를 정하는건 거의안쓰긴한다 => flexgrow로 만든다. => !비율! 로
    =>flex grow는 부모의 크기에따라 결정되기때문에 부모의 사이즈가 정해져있지않으면 작동을 안한다. => 그래서 부모의 컨테이너에도 flex grow가 적용되어있어야.
    */
    flex:1,
    backgroundColor:'green'
  }
});

/*
  style이 컴포넌트 프롭스안에 obj형태로 들어가기때문에 전역으로 선언된 객체안에 스타일내용들을 키밸류로 넣어도 잘 작동하지만
  StyleSheet.create로 obj를 만들어주는이유는 전역객체는 스타일관련 자동완성기능이 '당연히'지원되지 않을거기때문에; (그냥객체니까)
  하지만 전자는 stylesheet전용 obj를 만들어주는 느낌이라 매력적인 style관련 자동완성기능을 지원해줄거다
  => 그러니 마찬가지로 StyleSheet obj역시 항상 import 해주는게 좋겠다.
*/


/*
    expo 프로젝트를 만들고, 폰과 연동하고(로그인) 실시간 테스트, snack이용도 가능. => native방식은 아님
    native방식을 해봐야하는데..
*/