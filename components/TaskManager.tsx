import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet} from 'react-native';
import Realm from 'realm';
import { useRealm, useQuery} from '@realm/react';
export const TaskSchema = {
    name: 'Rahul',
    properties: {
      _id: 'objectId',
      name: 'string',
      isCompleted: { type: 'bool', default: false },
    },
    primaryKey: '_id',
  };

  export const TaskSchema2 = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      name: 'string',
      isCompleted: { type: 'bool', default: false },
    },
    primaryKey: '_id',
  };
  
  export const TaskManager = () => {
    const realm = useRealm();
    const tasks:any = useQuery('Rahul');
  
    const [taskName, setTaskName] = useState('');
  
    const addTask = () => {
      if (taskName.trim() === '') return;
      realm.write(() => {
        realm.create('Task', {
          _id: new Realm.BSON.ObjectId(),
          name: taskName,
        });
      });
      setTaskName('');
    };
  
    const toggleTaskCompletion = (task:{isCompleted:boolean}) => {
      realm.write(() => {
        task.isCompleted = !task.isCompleted;
      });
    };
  
    const deleteTask = async (task:string) => {
      await realm.write(() => {
        realm.delete(task);
      });
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Realm CRUD Operations</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <Button title="Add Task" onPress={addTask} />
        <FlatList
          data={tasks}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => {
            console.log(item,"====>ieieie")
            return(
              <View style={styles.taskContainer}>
                <Text
                  style={[
                    styles.taskText,
                    item.isCompleted && styles.completedTaskText,
                  ]}>
                  {item.name}
                </Text>
                <Button
                  title={item.isCompleted ? 'Undo' : 'Complete'}
                  onPress={() => toggleTaskCompletion(item)}
                />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => deleteTask(item)}
                />
              </View>
            )
          }}
        />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    taskText: {
      fontSize: 16,
    },
    completedTaskText: {
      textDecorationLine: 'line-through',
      color: 'green',
    },
  });