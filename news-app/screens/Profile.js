import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Profile() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const updateStreak = async () => {
      const ref = doc(db, 'users', 'demoUser');
      const snap = await getDoc(ref);

      if (!snap.exists()) return;

      const data = snap.data();
      const today = new Date().toDateString();

      if (data.lastOpened !== today) {
        const newStreak = data.lastOpened ? data.streak + 1 : 1;

        await updateDoc(ref, {
          streak: newStreak,
          lastOpened: today
        });

        setStreak(newStreak);
      } else {
        setStreak(data.streak);
      }
    };

    updateStreak();
  }, []);

  return (
    <View>
      <Text>🔥 Streak: {streak}</Text>
    </View>
  );
}