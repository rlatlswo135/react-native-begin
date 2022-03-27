import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Dimensions ,View,TouchableOpacity,TextInput,ScrollView,TouchableHighlight,Modal,Pressable} from 'react-native';
import { theme } from './colors';
import {useState} from 'react'
import {styles} from './style'

const {height:SCREEN_HEIGHT,width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const PLAN_TEMP = {
    'TodoList':[]
  }
  const EAT_TEMP = {
    아침:[],
    점심:[],
    저녁:[],
    간식:[]
  }
  const [working, setWorking] = useState(true)
  const [text,setText] = useState("")
  const [foodCategory,setFoodCategory] = useState("")
  const [modalVisible,setModalVisible] = useState(false)
  const [modalFood,setModalFood] = useState(false)
  const [todoList, setTodoList] = useState(PLAN_TEMP)
  const [eatList, setEatList] = useState(EAT_TEMP)
  const DAY = ['일','월','화','수','목','금','토']
  const DATE = new Date()
  const headerEat = () => setWorking(false)
  const headerWork = () => setWorking(true)
  const clearAll = () => {
    working?setTodoList(PLAN_TEMP):setEatList(EAT_TEMP)
  }
  const clearPlan = (index) => {
    let copy = {...todoList}
    copy['TodoList'].splice(index,1)
    setTodoList(copy)
  }
  const renderList = (state) => {
    const category = working ? 'todoList' : 'eatList'
    if(Array.isArray(state) === false){
      const stateKeys = Object.keys(state)
      return stateKeys.map((list,index) => {
        return(
          <View key={`${category}-${index}`} style={styles.category}>
            <Text style={styles.categoryText}>{list}</Text>
            <ScrollView
            style={styles.categoryChild}
            >
            {renderList(state[list])}
            </ScrollView>
          </View>
        )
      })
    }else{
      return state.map((list,index)=>{
        if(working === true){
          return(
            <Pressable onPress={()=>textPressEvent(index)} onLongPress={()=>clearPlan(index)}>
              <Text 
              style={{
                ...styles.categoryChildText,
                textDecorationLine:list.clear?"line-through":"none"
              }}
              >{list.text}</Text>
            </Pressable>
          ) 
        }else{
          return <Text style={styles.categoryChildText}>{list}</Text>
        }
      })
    }
  }
  const textPressEvent = (index) => {
    let copy = {...todoList}
    copy['TodoList'][index]['clear'] = !copy['TodoList'][index]['clear']
    setTodoList(copy)
  }
  const setTextChange = (payload) => setText(payload)
  const addToDo = () => {
    if(text === ""){
      setModalVisible(!modalVisible)
      return
    }else{
      if(working === true){
        let copy = {...todoList}
        copy['TodoList'].push({
          text:text,
          clear:false
        })
        setTodoList(copy)
      }else{
        let copy = {...eatList}
        copy[foodCategory].push(text)
        setEatList(copy)
        setModalVisible(!modalVisible)
      }
    }
    // save to Do
    setText("")
  }
  return (
    //HTML이 아니다 => 그러니까 우리가 아는 input태그 이딴거 쓸생각 ㄴㄴ함진짜로
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={headerWork}>
          {/* 컴포넌트는 항상 공식문서 */}
          <Text style={{...styles.btnText, color: working?"white":theme.gray}}>Todo</Text>
        </TouchableOpacity>
        <View style={styles.todayBox}>
          <Text style={styles.today}>{`${DATE.getMonth()+1}월 ${DATE.getDate()}일 (${DAY[DATE.getDay()]})`}</Text>
        </View>
        <TouchableOpacity onPress={headerEat}>
          <Text style={{...styles.btnText, color:!working?"white":theme.gray}}>Eat</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}>
          <Pressable style={styles.modalBox}
            onPress={()=>setModalVisible(!modalVisible)}>
              <TextInput
              style={styles.textInput}
              placeholder={working?'Add to Do':`What's your Meal`}
              keyboardType="url"
              autoCapitalize='none'
              onChangeText={setTextChange}
              onSubmitEditing={addToDo}
              returnKeyType="done"
              value={text}
              />
            </Pressable>

        </Modal>
        <Modal
        animationType='slide'
        transparent={true}
        visible={modalFood}
        >
          <Pressable style={styles.modalBox} onPress={()=>setModalFood(!modalFood)}>
               <View style={styles.selectFood}>
               {Object.keys(eatList).map(food => {
                   return(
                     <Pressable style={styles.foodBox} onPress={()=>{
                      setModalFood(!modalFood)
                      setModalVisible(!modalVisible)
                      setFoodCategory(food)
                     }}>
                       <Text style={styles.food}>{food}</Text>
                     </Pressable>
                   )
                 })}
               </View>
          </Pressable>
        </Modal>
        <View style={styles.inputBox}>
          {
            working?
            <TextInput
            style={styles.input}
            placeholder='Add to do'
            keyboardType="url"
            autoCapitalize='none'
            onChangeText={setTextChange}
            onSubmitEditing={()=>addToDo(true)}
            returnKeyType="done"
            value={text}/>
            :
          <Pressable style={styles.input} onPress={()=>{
            working?setModalVisible(!modalVisible):setModalFood(!modalFood)
          }}>
            <Text style={styles.inputText}>{working?'Add to Do':`What's your Meal`}</Text>
          </Pressable>
          }
          <Pressable style={{...styles.input,width:SCREEN_WIDTH/5}} onPress={clearAll}>
            <Text style={styles.inputText}>Clear All</Text>
          </Pressable>
        </View>
      </View>


      <View style={styles.todoList}>
        {working?renderList(todoList):renderList(eatList)}
      </View>
    </View>
  );
}


