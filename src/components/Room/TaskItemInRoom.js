import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ProgressCircle from 'react-native-progress-circle';
import firestore from '@react-native-firebase/firestore';
import DoingIcon from '../../assets/icons/doing.png';
import ReviewingIcon from '../../assets/icons/reviewing.png';
import DoneIcon from '../../assets/icons/done.png';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const TaskItemInRoom = ({name, underTakerId, progress, status, deadline}) => {
  const [underTakerName, setUnderTakerName] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(underTakerId)
      .onSnapshot((querySnapshot) =>
        setUnderTakerName(querySnapshot.data().displayName),
      );
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.taskName}>{name}</Text>
        <Text style={styles.text}>{underTakerName}</Text>
        <Text style={styles.text}>{deadline}</Text>
      </View>
      <View style={styles.progress}>
        <Image
          style={styles.icon}
          source={
            status === 'Doing'
              ? DoingIcon
              : status === 'Reviewing'
              ? ReviewingIcon
              : DoneIcon
          }
        />
        <Text
          style={[
            styles.text,
            {
              color:
                status === 'Doing'
                  ? '#00B0FF'
                  : status === 'Reviewing'
                  ? '#FDD835'
                  : '#00C853',
              fontWeight: 'bold',
            },
          ]}>
          {status}
        </Text>
      </View>
      {/* <ProgressCircle
        percent={progress}
        radius={40}
        borderWidth={8}
        color={colors.primary}
        shadowColor={colors.secondary}
        bgColor="white">
        <Text style={styles.progress}>{progress}%</Text>
      </ProgressCircle> */}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: '2rem',
    marginBottom: '3rem',
    padding: dimensions.standardSpacing,
    marginHorizontal: '0.5rem',
    borderRadius: dimensions.borderRadius,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: dimensions.elevation,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  info: {
    flexShrink: 1,
  },
  taskName: {
    fontSize: '4.5rem',
    fontWeight: '700',
  },
  text: {
    marginTop: '1rem',
    fontSize: '4rem',
  },
  icon: {
    width: '6rem',
    height: '6rem',
  },
  progress: {
    alignItems: 'center',
    width: '20rem',
  },
  // progress: {
  //   fontSize: '4.5rem',
  // },
});

export default TaskItemInRoom;
