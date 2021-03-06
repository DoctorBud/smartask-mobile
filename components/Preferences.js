import React, { useState } from 'react';
import { Text, View, Alert, Switch, StyleSheet } from 'react-native';
import { Button, Slider, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {DurationInput, DifficultyInput, InterestInput, PriorityInput} from './TaskDetails';
import { TaskCategoryInput } from './TaskBasics';
import { connect } from 'react-redux';
import { editPrefs, resetPrefs, defaultPrefs } from '../redux/schedulePrefsSlice';
import { editDefaultTask, resetDefaultTask, defaultTask } from '../redux/taskPrefsSlice';

const mapState = state => {
   return {
      schedulePrefs: state.schedulePrefs,
      taskPrefs: state.taskPrefs
   }
};

const mapDispatch = {
   editPrefs, 
   resetPrefs, 
   editDefaultTask, 
   resetDefaultTask
};

const Preferences = (props) => {
   const { editPrefs, resetPrefs, editDefaultTask, resetDefaultTask } = props;
   const prefs = props.schedulePrefs;
   const task = props.taskPrefs;
   // schedule preferences
   const [hours, setHours] = useState(prefs.hours);
   const [maxHard, setMaxHard] = useState(prefs.maxHard);
   const [maxTedious, setMaxTedious] = useState(prefs.maxTedious);
   const [includeFun, setIncludeFun] = useState(prefs.includeFun);
   // default task preferences
   const [category, setCategory] = useState(task.category);
   const [priority, setPriority] = useState(task.priority);
   const [difficulty, setDifficulty] = useState(task.difficulty);
   const [interest, setInterest] = useState(task.interest);
   const [duration, setDuration] = useState(task.duration);
   // value display tweaks
   let durationText = (duration/60).toFixed(1) + " hours";
   let hourText = (hours/60).toFixed(1) + " hours";
   
   // create new preferences object and update store
   const savePreferences = () => {
      const newPrefs = {
         hours: hours,
         maxHard: maxHard,
         maxTedious: maxTedious,
         includeFun: includeFun
      }
      editPrefs(newPrefs);
      return Alert.alert('Your preferences have been updated.');
   };
   // create new default task object and update store
   const saveDefaultTask = () => {
      const newTask = {
         category: category,
         priority: priority,
         difficulty: difficulty,
         interest: interest,
         duration: duration
      }
      editDefaultTask(newTask);
      return Alert.alert('Your task defaults have been updated.');
   };
   // reset prefs in store, set local state to defaults
   const resetSchedPrefs = () => {
      resetPrefs();
      setHours(defaultPrefs.hours);
      setMaxTedious(defaultPrefs.maxTedious);
      setMaxHard(defaultPrefs.maxHard);
      setIncludeFun(defaultPrefs.includeFun);
   }
   // reset task default in store, set local state to defaults
   const onTaskReset = () => {
      resetDefaultTask();
      setCategory(defaultTask.category);
      setInterest(defaultTask.interest);
      setPriority(defaultTask.priority);
      setDifficulty(defaultTask.difficulty);
      setDuration(defaultTask.duration);
   }

   return (
      <ScrollView>
         <View style={{flex: 1, margin: 10, padding: 10, backgroundColor: 'pink'}}>
            <Text style={styles.subTitle}>Schedule Preferences</Text>
            <Text>Specify the settings to use when scheduling your daily tasks.</Text>
            <Card>
               <Card.Title>How many total hours would you like to work on tasks each day?</Card.Title>
                  <Text style={{textAlign: 'center'}}>
                     {hourText}
                  </Text>
               <Slider 
                  value={hours}
                  onValueChange={value => setHours(value)}
                  minimumValue={30}
                  maximumValue={480}
                  step={30}
                  thumbTintColor='pink'
                  thumbTouchSize={{width: 25, height: 25}}
                  minimumTrackTintColor='purple'
                  animateTransitions
               />
            </Card>
            <Card>
               <Card.Title>Maximum difficult tasks to work on each day?</Card.Title>
                  <Text style={{textAlign: 'center'}}>
                     {maxHard}
                  </Text>
               <Slider 
                  value={maxHard}
                  onValueChange={value => setMaxHard(value)}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  thumbTintColor='pink'
                  thumbTouchSize={{width: 25, height: 25}}
                  minimumTrackTintColor='purple'
                  animateTransitions
               />
            </Card>
            <Card>
               <Card.Title>Maximum boring tasks to work on each day?</Card.Title>
                  <Text style={{textAlign: 'center'}}>
                     {maxTedious}
                  </Text>
               <Slider 
                  value={maxTedious}
                  onValueChange={value => setMaxTedious(value)}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  thumbTintColor='pink'
                  thumbTouchSize={{width: 25, height: 25}}
                  minimumTrackTintColor='purple'
                  animateTransitions
               />
            </Card>
            <Card >
               <Card.Title>Include a fun task each day?</Card.Title>
                  <Switch
                  style={{alignSelf: 'center'}}
                  trackColor={{ false: "#767577", true: "purple" }}
                  thumbColor={includeFun ? "pink" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setIncludeFun(!includeFun)}
                  value={includeFun}
                  />
            </Card>
            

            <View style={{margin: 5, padding: 10}}>
               <Button 
               title="SAVE SETTINGS"
               buttonStyle={{backgroundColor: 'indigo'}}
               onPress={() => savePreferences()}
               accessibilityLabel='Tap to save scheduling settings'
               />
               <Button 
               containerStyle={{marginTop: 10}}
               title="RESET SETTINGS"
               onPress={() => resetSchedPrefs()}
               accessibilityLabel='Tap to reset scheduling settings'
               />
            </View>
            

         </View>
         <View style={{flex: 1, margin: 10, padding: 10, backgroundColor: 'pink'}}>
            <Text style={styles.subTitle}>Default Task Preferences</Text>
            <Text>Specify the default settings on quick-added tasks.</Text>
            <TaskCategoryInput onSelect={setCategory} category={category} />
            <PriorityInput priority={priority} setPriority={setPriority}/>
            <InterestInput interest={interest} setInterest={setInterest}/>
            <DifficultyInput difficulty={difficulty} setDifficulty={setDifficulty}/>
            <DurationInput durationText={durationText} duration={duration} setDuration={setDuration} />

            <View style={{margin: 5, padding: 10}}>
               <Button 
               title="SAVE TASK DEFAULTS"
               buttonStyle={{backgroundColor: 'indigo'}}
               onPress={() => saveDefaultTask()}
               accessibilityLabel='Tap to save task settings'
               />
               <Button 
               containerStyle={{marginTop: 10}}
               title="RESET TASK DEFAULTS"
               onPress={() => onTaskReset()}
               accessibilityLabel='Tap to reset task defaults'
               />
            </View>
         </View>
      </ScrollView> 
   );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
     marginHorizontal: 20
   },
   subTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
      color: 'indigo'
   },

});

export default connect(mapState, mapDispatch)(Preferences);